// Portal Tunnel - Twisting geometric tunnel effect
let camera, scene, renderer, effect;
let gates = [];
let animationId;

export function init(container, THREE, AsciiEffect) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 0;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 100, 600); // Fog fades items in distance

    const light = new THREE.PointLight(0xffffff, 2, 500);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Create Tunnel "Gates"
    // Using rectangular toruses
    const geometry = new THREE.TorusGeometry(50, 2, 4, 4); // 4 sides = Square
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    for(let i=0; i<30; i++) {
        const gate = new THREE.Mesh(geometry, material);
        gate.position.z = -i * 50; // Space them out
        gate.rotation.z = i * 0.1; // Twist the tunnel
        
        scene.add(gate);
        gates.push(gate);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Characters
    effect = new AsciiEffect(renderer, ' .-=+^', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = '#0f0';
    effect.domElement.style.backgroundColor = 'black';

    container.appendChild(effect.domElement);
    window.addEventListener('resize', onWindowResize);
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // SETTINGS: Moderate speed
    const speed = 1.5;
    const rotationSpeed = 0.002;

    gates.forEach(gate => {
        gate.position.z += speed;
        gate.rotation.z += rotationSpeed;

        // Reset if it passes the camera
        if(gate.position.z > 50) {
            gate.position.z = -1450; // Send to back of line
        }
    });

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);

    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
                else object.material.dispose();
            }
        });
    }
    if(renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
    }
}
