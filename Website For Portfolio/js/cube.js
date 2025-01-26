// Set up scene
const scene = new THREE.Scene();
const width = 500;
const height = 300;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); 
document.getElementById('three-container').appendChild(renderer.domElement); 

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

// Animate the cube rotation
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube on each frame
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start animation
animate();

// Adjust the canvas and camera when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(width, height);
  camera.aspect = width/ height; 
  camera.updateProjectionMatrix(); 
});
