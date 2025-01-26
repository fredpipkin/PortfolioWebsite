// GSAP animation for MC Escher-inspired effect
gsap.to(".cube", {
    duration: 5,
    rotationX: 360,      
    rotationY: 360,      
    scale: 0.5,          
    x: 50,               
    y: 50,               
    z: 50,               
    ease: "power4.inOut",
    repeat: -1,          
    yoyo: true,          
    stagger: 0.1         
  });
  
  // Additional effect, make the cubes change color as they merge
  gsap.to(".cube", {
    duration: 5,
    backgroundColor: "#ff5733",
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 1,
      from: "random",
      repeat: -1
    }
  });
  