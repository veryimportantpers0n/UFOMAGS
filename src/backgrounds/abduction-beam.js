// Abduction Beam - UFO with tractor beam pulling objects up
let camera, scene, renderer, effect, particles;
let animationId;

export function init(container, THREE, AsciiEffect) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 250;
    camera.position.y = 50;

    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(100, 100, 100);
    scene.add(light);

    // 1. UFO at top
    const ufoGeo = new THREE.SphereGeometry(40, 16, 8);
    ufoGeo.scale(1, 0.3, 1);
    const ufo = new THREE.Mesh(ufoGeo, new THREE.MeshPhongMaterial({ flatShading: true }));
    ufo.position.y = 150;
    scene.add(ufo);

    // 2. The Beam (Wireframe Cylinder)
    const beamGeo = new THREE.CylinderGeometry(20, 100, 300, 16, 4, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0; // Below UFO
    scene.add(beam);

    // 3. Floating Particles (Being abducted)
    particles = new THREE.Group();
    const pGeo = new THREE.TetrahedronGeometry(4);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 50; i++) {
        const p = new THREE.Mesh(pGeo, pMat);
        resetParticle(p);
        particles.add(p);
    }
    scene.add(particles);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // Use vertical bars to simulate light beam characters
    effect = new AsciiEffect(renderer, ' .|lI', { invert: true });
    effect.setSize(width, height);
    effect.domElement.style.color = '#00adb5'; // Cyan to match site theme
    effect.domElement.style.backgroundColor = 'rgba(0,0,0,0.5)';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0';
    effect.domElement.style.left = '0';
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    effect.domElement.style.overflow = 'hidden';

    container.appendChild(effect.domElement);

    // Resize Observer for container
    const resizeObserver = new ResizeObserver(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        effect.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // Store observer to disconnect later
    container.resizeObserver = resizeObserver;

    animate();
}

function resetParticle(p) {
    // Random position at bottom of cone
    p.position.y = -150;
    p.position.x = (Math.random() - 0.5) * 150;
    p.position.z = (Math.random() - 0.5) * 150;

    // Random rotation speed
    p.userData = {
        speed: Math.random() * 1 + 0.5,
        rot: Math.random() * 0.1
    };
}

// Global resize handler removed in favor of ResizeObserver
function animate() {
    animationId = requestAnimationFrame(animate);

    particles.children.forEach(p => {
        p.position.y += p.userData.speed;
        p.rotation.y += p.userData.rot;
        p.rotation.z += p.userData.rot;

        // Narrow position as they go up (into the cone)
        p.position.x *= 0.995;
        p.position.z *= 0.995;

        if (p.position.y > 150) {
            resetParticle(p);
        }
    });

    effect.render(scene, camera);
}

export function stop(container) {
    if (container && container.resizeObserver) {
        container.resizeObserver.disconnect();
    }
    cancelAnimationFrame(animationId);
}
