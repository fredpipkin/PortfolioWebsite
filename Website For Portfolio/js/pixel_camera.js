var videoArt = function(p) {
  var video;
  var canvas;
  var canvasWidth = 500;
  var canvasHeight = 300;
  let pixelSizeSlider, pixelPerFrameSlider, ditherSlider, frameRateSlider;
  var lastPixelSize = 25;
  var lastFrameRate = 60;
  var backgroundColour = 0;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth , canvasHeight);
    p.pixelDensity(1);
    
    pixelSizeSlider = p.createSlider(10, 40, lastPixelSize);    
    pixelPerFrameSlider = p.createSlider(1, 100, 10);
    frameRateSlider = p.createSlider(1, 60, lastFrameRate);
    ditherSlider = p.createSlider(0, 40, 0);
  
    video = p.createCapture(p.VIDEO);
    resetCanvas();
  }

  p.draw = function() {  
    var pixelSize = pixelSizeSlider.value();
    var currentFrameRate = frameRateSlider.value();

    if (lastPixelSize != pixelSize) {    
      lastPixelSize = pixelSize;
      resetCanvas();
    }

    if (lastFrameRate != currentFrameRate) {
      p.frameRate(currentFrameRate);
      lastFrameRate = currentFrameRate;
    }

    drawVideoImage();
  }

  function keyPressed() {
    if (keyCode === 32) {
      p.saveCanvas('myCanvas.jpg', );
    }
  } 

  function resetCanvas() {
    video.show();
    video.size(p.floor(canvasWidth/lastPixelSize), p.floor(canvasHeight/lastPixelSize));
    video.hide();
    p.background(backgroundColour);     
  }

  function drawVideoImage() {
    var pixelsPerFrame = pixelPerFrameSlider.value();
    var pixelSize = pixelSizeSlider.value();
    var dither = ditherSlider.value();
    dither = p.floor(p.random(-dither, dither));

    for (var i = 0; i < pixelsPerFrame; i++) { 
      var x = p.floor(p.random(1, video.width));
      var y = p.floor(p.random(1, video.height));

      var pixelColour = video.get(x,y);

      p.noStroke();
      p.fill(pixelColour[0], pixelColour[1], pixelColour[2]);
      p.ellipse(x * pixelSize + dither, y * pixelSize + dither, pixelSize, pixelSize);
    }
  }
}