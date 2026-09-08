import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const container = document.getElementById('canvas-container');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Starfield
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000;
const starsPositions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {
    starsPositions[i] = (Math.random() - 0.5) * 2000;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 1.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Neon green particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const particlesPositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    particlesPositions[i] = (Math.random() - 0.5) * 1000;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x00ff41,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Central 3D object - Icosahedron
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff41,
    wireframe: true,
    transparent: true,
    opacity: 0.5
});

const icosahedron = new THREE.Mesh(geometry, material);
icosahedron.position.z = -10;
scene.add(icosahedron);

// Outer wireframe sphere
const sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff41,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = -10;
scene.add(sphere);

camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Scroll interaction
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate stars
    stars.rotation.y += 0.0001;
    stars.rotation.x += 0.00005;
    
    // Rotate particles
    particles.rotation.y -= 0.0002;
    
    // Rotate central objects with mouse interaction
    icosahedron.rotation.x += 0.005;
    icosahedron.rotation.y += 0.008;
    icosahedron.position.x += (mouseX * 2 - icosahedron.position.x) * 0.05;
    icosahedron.position.y += (mouseY * 2 - icosahedron.position.y) * 0.05;
    
    sphere.rotation.x -= 0.003;
    sphere.rotation.y -= 0.005;
    sphere.position.x = icosahedron.position.x;
    sphere.position.y = icosahedron.position.y;
    
    // Camera movement with scroll
    camera.position.z = 5 + scrollY * 0.001;
    
    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
