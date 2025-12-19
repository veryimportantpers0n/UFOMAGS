// Portal Tunnel - Twisting geometric tunnel effect (Adapted for About Page)
// Refactored to avoid global state and ensure proper cleanup

// Final Tuned Parameters (Constant)
const PARAMS = {
    speed: 1.5,
    rotationSpeed: 0.002,
    gateRadius: 70.04,
    tubeRadius: 3.5848,
    radialSegments: 4, // 4 = Square
    distBetweenGates: 41.16,
    fogNear: 91,
    fogFar: 597.8,
    cameraZ: 40
};

export function init(container, THREE, AsciiEffect) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Instance Variables (Closure Scoped)
    let camera, scene, renderer, effect;
    let gates = [];
    let animationId;
    let resizeObserver;

    // --- Camera ---
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = PARAMS.cameraZ;

    // --- Scene ---
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, PARAMS.fogNear, PARAMS.fogFar);

    // --- Light ---
    const light = new THREE.PointLight(0xffffff, 2, 500);
    light.position.set(0, 0, 0);
    scene.add(light);

    // --- Build Tunnel ---
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    // Helper to create geometry based on params
    const geometry = new THREE.TorusGeometry(PARAMS.gateRadius, PARAMS.tubeRadius, 4, PARAMS.radialSegments);

    function buildGates() {
        gates = [];
        for (let i = 0; i < 30; i++) {
            const gate = new THREE.Mesh(geometry, material);
            resetGatePosition(gate, i);
            scene.add(gate);
            gates.push(gate);
        }
    }

    function resetGatePosition(gate, index) {
        gate.position.z = -index * PARAMS.distBetweenGates;
        gate.rotation.z = index * 0.1;
    }

    buildGates();

    // --- Renderer ---
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // --- Effect ---
    effect = new AsciiEffect(renderer, ' .-=+^', { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.color = '#00adb5'; // Match site theme
    effect.domElement.style.backgroundColor = 'rgba(0,0,0,0.5)';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    effect.domElement.style.overflow = 'hidden';

    container.appendChild(effect.domElement);

    // --- Resize Observer ---
    resizeObserver = new ResizeObserver(() => {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        effect.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // --- Animation Loop ---
    function animate() {
        animationId = requestAnimationFrame(animate);

        gates.forEach(gate => {
            gate.position.z += PARAMS.speed;
            gate.rotation.z += PARAMS.rotationSpeed;

            const totalLen = 30 * PARAMS.distBetweenGates;
            if (gate.position.z > PARAMS.distBetweenGates) {
                gate.position.z -= totalLen;
            }
        });

        effect.render(scene, camera);
    }

    animate();

    // --- Cleanup Function ---
    return {
        stop: () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            cancelAnimationFrame(animationId);

            // Clean DOM
            if (container && container.contains(effect.domElement)) {
                container.removeChild(effect.domElement);
            }

            // Clean Three.js
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
            }
        }
    };
}
