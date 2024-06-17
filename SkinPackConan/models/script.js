// Configura la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
let currentModel = null;
let light = new THREE.DirectionalLight(0xffffff, 0.75);

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('fondo.png');
scene.background = backgroundTexture;

function loadModel(modelPath) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    loader.load(
        modelPath,
        function (gltf) {
            console.log('Model loaded successfully');

            gltf.scene.traverse((child) => {
                if (child.isMesh) {

                    if (child.material.map) {
                        child.material.transparent = true;
                    }
                }
            });

            currentModel = gltf.scene;
            scene.add(currentModel);

            const bbox = new THREE.Box3().setFromObject(gltf.scene);
            const center = bbox.getCenter(new THREE.Vector3());
            const size = bbox.getSize(new THREE.Vector3());

            camera.position.set(center.x, center.y, center.z - size.z * 6);
            camera.lookAt(center);

            light.position.copy(camera.position);
            light.target = gltf.scene;
            scene.add(light);

            animate();
        },
        undefined,
        function (error) {
            console.error('Error loading model:', error);
        }
    );
}

loadModel('model1.gltf');

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    light.position.copy(camera.position);
    light.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

document.getElementById('modelSelect').addEventListener('change', (event) => {
    const selectedModel = event.target.value;
    loadModel(selectedModel);
});