// Bio Rings - Pulsing organic rings moving toward viewer
let camera, scene, renderer, effect;
let rings = [];
let animationId;

export function init(container, THREE, AsciiEffect) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 0;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 400); 

    const light = new THREE.PointLight(0xffffff, 2, 400);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Create "Bio-Rings" (Circular Torus)
    const geometry = new THREE.TorusGeometry(40, 4, 16, 50); 
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    for(let i=0; i<50; i++) {
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = -i * 20; 
        
        ring.userData = { 
            offset: i * 0.2,
            originalScale: 1
        };

        scene.add(ring);
        rings.push(ring);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    effect = new AsciiEffect(renderer, ' .:coCO8@', { invert: true });
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
    
    const time = Date.now() * 0.001;

    // SUPER SLOW SETTINGS
    const speed = 0.2; // Very slow drift
    
    rings.forEach((ring) => {
        // Move forward slowly
        ring.position.z += speed;

        // Loop logic
        if(ring.position.z > 50) {
            ring.position.z = -950; 
        }

        // Pulse speed: very slow breathing
        const pulse = 1 + Math.sin(time * 0.5 + ring.userData.offset) * 0.3;
        ring.scale.set(pulse, pulse, 1);

        // Rotation: barely moving
        ring.rotation.z += 0.001;
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
