// UFO Fleet - Classic flying saucers over digital landscape
let camera, scene, renderer, effect;
let ufos = [];
let animationId;
const start = Date.now();

export function init(container, THREE, AsciiEffect) {
    // Reset arrays
    ufos = [];

    // 1. Setup Camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    // 2. Setup Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    // 3. Lights
    const pointLight1 = new THREE.PointLight(0xffffff, 2.5);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    // 4. Create the UFOs
    for (let i = 0; i < 15; i++) {
        createUFO(THREE);
    }

    // 5. Create a "Digital Landscape" (The Grid Floor)
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000, 20, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true 
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Lay flat
    plane.position.y = -100;
    scene.add(plane);

    // 6. Setup Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 7. Apply the ASCII Effect
    effect = new AsciiEffect(renderer, ' .-+*=%@#X0', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = '#00ff00'; // Force Green Color
    effect.domElement.style.backgroundColor = 'black';

    // Add to container
    container.appendChild(effect.domElement);

    // Handle Window Resize
    window.addEventListener('resize', onWindowResize);

    // Start Loop
    animate();
}

function createUFO(THREE) {
    const ufoGroup = new THREE.Group();

    // The Saucer Disk
    const geometryDisk = new THREE.SphereGeometry(30, 16, 8);
    geometryDisk.scale(1, 0.3, 1); 
    const material = new THREE.MeshPhongMaterial({ flatShading: true });
    const disk = new THREE.Mesh(geometryDisk, material);
    
    // The Cockpit
    const geometryDome = new THREE.SphereGeometry(12, 10, 10);
    const dome = new THREE.Mesh(geometryDome, material);
    dome.position.y = 8;

    ufoGroup.add(disk);
    ufoGroup.add(dome);

    // Random Position
    ufoGroup.position.x = (Math.random() - 0.5) * 800;
    ufoGroup.position.y = (Math.random() * 200) - 50;
    ufoGroup.position.z = (Math.random() - 0.5) * 800;

    // Random Speed
    ufoGroup.userData = {
        speedY: (Math.random() * 0.02) + 0.01,
        speedRot: (Math.random() * 0.05) + 0.02,
        baseY: ufoGroup.position.y,
        offset: Math.random() * 100
    };

    scene.add(ufoGroup);
    ufos.push(ufoGroup);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    animationId = requestAnimationFrame(animate);

    const timer = Date.now() - start;

    scene.rotation.y = timer * 0.0001;

    ufos.forEach((ufo) => {
        ufo.rotation.y += ufo.userData.speedRot;
        ufo.position.y = ufo.userData.baseY + Math.sin(timer * 0.002 + ufo.userData.offset) * 20;
        ufo.rotation.z = Math.sin(timer * 0.001 + ufo.userData.offset) * 0.1;
    });

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);
    
    // Clean memory
    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
                else object.material.dispose();
            }
        });
    }

    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
    }
}
