import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { AsciiEffect } from 'https://unpkg.com/three@0.160.0/examples/jsm/effects/AsciiEffect.js';

let camera, scene, renderer, effect;
let artifact, debrisRing;
let animationId;

export function init(container) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(200, 200, 200);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x444444));

    // THE ARTIFACT (Giant shape in middle)
    const geometry = new THREE.IcosahedronGeometry(120, 1);
    const material = new THREE.MeshPhongMaterial({ flatShading: true });
    artifact = new THREE.Mesh(geometry, material);
    scene.add(artifact);

    // DEBRIS RING (Floating rocks around it)
    debrisRing = new THREE.Group();
    const debrisGeo = new THREE.TetrahedronGeometry(10, 0);
    
    for(let i=0; i<50; i++) {
        const debris = new THREE.Mesh(debrisGeo, material);
        const angle = Math.random() * Math.PI * 2;
        const radius = 250 + Math.random() * 100;
        
        debris.position.x = Math.cos(angle) * radius;
        debris.position.z = Math.sin(angle) * radius;
        debris.position.y = (Math.random() - 0.5) * 100;
        
        debris.rotation.set(Math.random(), Math.random(), Math.random());
        
        debrisRing.add(debris);
    }
    scene.add(debrisRing);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Remix style characters: Data analysis look
    effect = new AsciiEffect(renderer, ' .-|/=\<+>@', { invert: true });
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

    // Strange rotation for artifact
    artifact.rotation.x = time * 0.3;
    artifact.rotation.y = time * 0.2;
    
    // Pulse size
    const scale = 1 + Math.sin(time * 2) * 0.1;
    artifact.scale.set(scale, scale, scale);

    // Rotate ring
    debrisRing.rotation.y = -time * 0.1;
    debrisRing.rotation.z = Math.sin(time * 0.5) * 0.1;

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);
}