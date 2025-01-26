const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer to the .content div, not to the body
const content = document.querySelector('.content'); 
content.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, roughness: 0.5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733, roughness: 0.5 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(3, 0, 0);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0x404040, 1); 
scene.add(ambientLight);

const spotlight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.5, 2);
spotlight.position.set(10, 10, 10);
spotlight.target = sphere; 
scene.add(spotlight);
scene.add(spotlight.target);

const clock = new THREE.Clock();

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1; 
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1; 
});

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  sphere.rotation.x = time * 0.5;
  sphere.rotation.y = time * 0.5;
  cube.rotation.x = time * 0.7;
  cube.rotation.y = time * 0.7;
  spotlight.position.x = mouseX * 15;
  spotlight.position.y = -mouseY * 15 + 10; 
  spotlight.target.position.x = mouseX * 5;
  spotlight.target.position.y = -mouseY * 5 + 1;
  renderer.render(scene, camera);
}

camera.position.z = 5;
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
