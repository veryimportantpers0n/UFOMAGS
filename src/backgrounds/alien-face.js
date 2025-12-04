// Alien Face - Classic grey alien head
let camera, scene, renderer, effect, headGroup;
let animationId;

export function init(container, THREE, AsciiEffect) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 80;

    scene = new THREE.Scene();

    // Dramatic Lighting for the face
    const light = new THREE.DirectionalLight(0xffffff, 2.0);
    light.position.set(0, 50, 100);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222222));

    // --- Build The Alien Head Procedurally ---
    headGroup = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({ flatShading: true });

    // 1. The Skull (Deformed Sphere)
    const skullGeo = new THREE.SphereGeometry(20, 16, 16);
    // Scale: x=1, y=1.3 (tall), z=1.2 (deep)
    skullGeo.scale(1, 1.3, 1.2); 
    const skull = new THREE.Mesh(skullGeo, material);

    // 2. The Chin (Smaller sphere blended at bottom)
    const chinGeo = new THREE.SphereGeometry(12, 16, 16);
    chinGeo.scale(0.8, 1, 0.8);
    const chin = new THREE.Mesh(chinGeo, material);
    chin.position.y = -18;
    chin.position.z = 2;

    // 3. The Eyes (Large, slanted, black ovals)
    const eyeGeo = new THREE.SphereGeometry(7, 12, 12);
    eyeGeo.scale(1.8, 1, 0.5); // Wide and flat
    
    const leftEye = new THREE.Mesh(eyeGeo, material);
    leftEye.position.set(-8, -2, 14);
    leftEye.rotation.z = -0.4; // Slant
    leftEye.rotation.y = -0.3; // Wrap around head

    const rightEye = new THREE.Mesh(eyeGeo, material);
    rightEye.position.set(8, -2, 14);
    rightEye.rotation.z = 0.4;
    rightEye.rotation.y = 0.3;

    headGroup.add(skull, chin, leftEye, rightEye);
    scene.add(headGroup);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // High contrast ASCII set
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
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

    // Breathing motion
    headGroup.position.y = Math.sin(time) * 2;
    // Look around slightly
    headGroup.rotation.y = Math.sin(time * 0.5) * 0.2;
    headGroup.rotation.x = Math.cos(time * 0.3) * 0.1;

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);
}
