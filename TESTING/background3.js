import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { AsciiEffect } from 'https://unpkg.com/three@0.160.0/examples/jsm/effects/AsciiEffect.js';

let camera, scene, renderer, effect;
let ufos = [];
let animationId;

export function init(container) {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    // Move camera further back to see the whole swarm
    camera.position.z = 600; 
    camera.position.y = 0; 

    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222222));

    // Create a Swarm
    const geometry = new THREE.ConeGeometry(20, 10, 8);
    // Combine two cones to make a classic diamond/saucer shape
    const geometry2 = new THREE.ConeGeometry(20, 10, 8);
    
    // We create many UFOs scattered in all directions (X, Y, Z)
    for (let i = 0; i < 40; i++) {
        const group = new THREE.Group();
        
        const top = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ flatShading: true }));
        const bot = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({ flatShading: true }));
        bot.rotation.x = Math.PI; // Flip bottom cone
        bot.position.y = -5;
        top.position.y = 5;

        group.add(top);
        group.add(bot);

        // SCATTER LOGIC: Randomize Height (Y) as well as X and Z
        group.position.x = Math.random() * 1200 - 600;
        group.position.y = Math.random() * 800 - 400; // This fills the vertical screen
        group.position.z = Math.random() * 1000 - 500;

        group.rotation.z = (Math.random() - 0.5);
        group.rotation.x = (Math.random() - 0.5);

        // Custom speed for each
        group.userData = {
            rotSpeed: Math.random() * 0.05,
            flySpeed: Math.random() * 2 + 0.5
        };

        scene.add(group);
        ufos.push(group);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Using binary code for the background effect
    effect = new AsciiEffect(renderer, ' 01', { invert: true });
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

    ufos.forEach(ufo => {
        ufo.rotation.y += ufo.userData.rotSpeed;
        ufo.position.z += ufo.userData.flySpeed;

        // Loop them back if they fly too close
        if(ufo.position.z > 800) {
            ufo.position.z = -800;
        }
    });

    // Slowly rotate the whole swarm
    scene.rotation.y += 0.001;

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);
}