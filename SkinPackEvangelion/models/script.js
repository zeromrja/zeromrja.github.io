const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
let currentModel = null;
let isRotating = true; // Variable para controlar la animación de giro

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

            // Configura todos los materiales del modelo para usar MeshBasicMaterial
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    const basicMaterial = new THREE.MeshBasicMaterial();
                    basicMaterial.copy(child.material); // Copia las propiedades del material original

                    // Asigna el nuevo material MeshBasicMaterial
                    child.material = basicMaterial;
                }
            });

            currentModel = gltf.scene;
            scene.add(currentModel);

            const bbox = new THREE.Box3().setFromObject(gltf.scene);
            const center = bbox.getCenter(new THREE.Vector3());
            const size = bbox.getSize(new THREE.Vector3());

            camera.position.set(center.x, center.y, center.z - size.z * 6);
            camera.lookAt(center);

            animate(); // Inicia la animación de rotación
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

// Event listener para detectar interacción con el ratón o trackpad
renderer.domElement.addEventListener('pointerdown', () => {
    isRotating = false; // Se ha hecho click o se está arrastrando con el ratón o trackpad
});

renderer.domElement.addEventListener('mousedown', () => {
    isRotating = false; // Se ha hecho click o se está arrastrando con el ratón o trackpad
});

function animate() {
    requestAnimationFrame(animate);

    if (isRotating && currentModel) {
        currentModel.rotation.y += 0.01; // Ajusta la velocidad de rotación según necesites
    }

    controls.update(); // Actualiza los controles de órbita
    renderer.render(scene, camera); // Renderiza la escena
}

document.getElementById('modelSelect').addEventListener('change', (event) => {
    const selectedModel = event.target.value;
    loadModel(selectedModel);
});
