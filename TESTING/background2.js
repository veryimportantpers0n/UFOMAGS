import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { AsciiEffect } from 'https://unpkg.com/three@0.160.0/examples/jsm/effects/AsciiEffect.js';

let camera, scene, renderer, effect;
let handGroup, comet;
let stars = [];
let animationId;

export function init(container) {
    // 1. Camera Setup
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 600;

    scene = new THREE.Scene();
    
    // 2. Lights (Pink and Blue to match the image)
    const pinkLight = new THREE.PointLight(0xff00ff, 3, 800);
    pinkLight.position.set(-200, 200, 200); // Top Left
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x00ffff, 2, 800);
    blueLight.position.set(200, -200, 200); // Bottom Right
    scene.add(blueLight);

    // 3. The Cyber Hand (Procedural)
    handGroup = new THREE.Group();
    // Position it roughly where the hand is in your image (Top Left)
    handGroup.position.set(-200, 150, 0); 
    // Rotate to point towards bottom right
    handGroup.rotation.z = -Math.PI / 4; 

    const material = new THREE.MeshPhongMaterial({ flatShading: true });

    // The Palm
    const palmGeo = new THREE.BoxGeometry(60, 100, 20);
    const palm = new THREE.Mesh(palmGeo, material);
    handGroup.add(palm);

    // The Fingers (4 fingers)
    // We create an array to store finger joints so we can animate them
    handGroup.userData.fingers = [];

    for(let i = 0; i < 4; i++) {
        const fingerRoot = new THREE.Group();
        // Space them out on the palm
        fingerRoot.position.x = (i * 18) - 25; 
        fingerRoot.position.y = 50; // Top of palm

        // 1st Segment
        const seg1Geo = new THREE.BoxGeometry(12, 40, 12);
        const seg1 = new THREE.Mesh(seg1Geo, material);
        seg1.position.y = 20; // Offset so it pivots at bottom
        
        // Joint for 2nd segment
        const joint1 = new THREE.Group();
        joint1.position.y = 40; // Top of seg1

        // 2nd Segment
        const seg2Geo = new THREE.BoxGeometry(10, 35, 10);
        const seg2 = new THREE.Mesh(seg2Geo, material);
        seg2.position.y = 17.5;

        // Joint for 3rd segment (Tip)
        const joint2 = new THREE.Group();
        joint2.position.y = 35;

        // 3rd Segment (Tip)
        const seg3Geo = new THREE.ConeGeometry(5, 20, 4);
        const seg3 = new THREE.Mesh(seg3Geo, material);
        seg3.position.y = 10;

        // Construct the hierarchy
        joint2.add(seg3);
        joint1.add(seg2);
        joint1.add(joint2);
        seg1.add(joint1);
        fingerRoot.add(seg1);
        
        // Save references for animation
        fingerRoot.userData = {
            base: fingerRoot,
            joint1: joint1,
            joint2: joint2,
            speed: 0.5 + (i * 0.1), // Different speeds
            offset: i * 0.5
        };

        handGroup.add(fingerRoot);
        handGroup.userData.fingers.push(fingerRoot.userData);
    }
    
    // Add Thumb
    const thumbRoot = new THREE.Group();
    thumbRoot.position.set(35, 0, 0);
    thumbRoot.rotation.z = -0.5;
    const thumbGeo = new THREE.BoxGeometry(15, 40, 15);
    const thumb = new THREE.Mesh(thumbGeo, material);
    thumb.position.y = 20;
    thumbRoot.add(thumb);
    handGroup.add(thumbRoot);

    scene.add(handGroup);

    // 4. The Comet/Star (The target)
    comet = new THREE.Group();
    comet.position.set(200, -150, 50); // Bottom Right
    
    const coreGeo = new THREE.IcosahedronGeometry(20, 0);
    const core = new THREE.Mesh(coreGeo, material);
    comet.add(core);

    // Comet Trail (Simple lines)
    for(let i=0; i<10; i++) {
        const trail = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 80), material);
        trail.position.x = -40 - (Math.random() * 50);
        trail.position.y = (Math.random() - 0.5) * 40;
        trail.position.z = (Math.random() - 0.5) * 40;
        comet.add(trail);
    }
    
    // Point comet at hand
    comet.lookAt(handGroup.position);
    scene.add(comet);

    // 5. Background Stars
    const starGeo = new THREE.TetrahedronGeometry(2);
    for(let i=0; i<100; i++) {
        const s = new THREE.Mesh(starGeo, material);
        s.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 500
        );
        scene.add(s);
        stars.push(s);
    }

    // 6. Renderer & Effect
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Use "Solid" characters to make the hand look clear
    effect = new AsciiEffect(renderer, ' .-=+*#%@', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    
    // *** COLOR MATCHING ***
    // We set the CSS Color to Hot Pink to match your image reference
    effect.domElement.style.color = '#ff00aa'; 
    effect.domElement.style.backgroundColor = '#110022'; // Very dark purple background

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

    // 1. Animate Hand "Reaching"
    // Gently float the whole hand
    handGroup.position.y = 150 + Math.sin(time) * 10;

    // Animate Fingers (Curling motion)
    handGroup.userData.fingers.forEach(f => {
        // Base joint curl
        f.base.rotation.x = Math.sin(time * f.speed + f.offset) * 0.2; 
        // Middle joint curl
        f.joint1.rotation.x = 0.2 + Math.sin(time * f.speed + f.offset) * 0.3;
        // Tip joint curl
        f.joint2.rotation.x = 0.2 + Math.sin(time * f.speed + f.offset) * 0.3;
    });

    // 2. Animate Comet
    comet.rotation.z -= 0.1; // Spin core
    // Shake slightly
    comet.position.x = 200 + Math.random() * 2;
    comet.position.y = -150 + Math.random() * 2;

    // 3. Animate Stars (Fly past)
    stars.forEach(s => {
        s.position.z += 2; // Fly towards camera
        if(s.position.z > 500) s.position.z = -500;
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