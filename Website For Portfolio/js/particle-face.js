// Sets up canvas
const canvas = document.getElementById("particle-face");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, 400);

// Sets scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 5;

//Initialises particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

// Randomises particles
for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 4; // X
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4; // Y
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z
}
// Add it to geometry
particles.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

// Create material for particles
const particleMaterial = new THREE.PointsMaterial({
  color: 0x00ff00,
  size: 0.05,
});

// Sorts out the click to change output
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

canvas.addEventListener("click", () => {
  const newPositions = particlePositions.map((pos) => pos * (1 + Math.random() * 0.5));
  particles.setAttribute("position", new THREE.BufferAttribute(newPositions, 3));
});

//Animation loop
function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.y += 0.001; 
  renderer.render(scene, camera);
}

animate();
