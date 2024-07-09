// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Define the images for the cube faces
const images = [
    'images/image1.jpg', // Example relative path
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg'
];

// Load the images and create materials for each face
const materials = images.map((image, index) => {
    const texture = new THREE.TextureLoader().load(
        image,
        () => {
            console.log(`Image ${index + 1} loaded successfully`);
        },
        undefined,
        (err) => {
            console.error(`Error loading image ${index + 1}:`, err);
        }
    );
    return new THREE.MeshBasicMaterial({ map: texture });
});

// Create a cube geometry and apply the materials
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;

// Add controls to allow the user to rotate the cube
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Function to animate the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});