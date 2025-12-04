// Alien Towers - Two rotating tower structures
let camera, scene, renderer, effect;
let towers = [];
let animationId;

export function init(container, THREE, AsciiEffect) {
    // 1. Camera Setup
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400; // Pull back to see sides

    scene = new THREE.Scene();

    // 2. Lights
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 100, 200);
    scene.add(light);

    // 3. Create Geometry (Simple Cubes)
    const geometry = new THREE.BoxGeometry(40, 40, 40);
    const material = new THREE.MeshPhongMaterial({ flatShading: true });

    // 4. Build Left and Right Towers
    // We create 2 columns, one at x=-350 (Left), one at x=350 (Right)
    const positions = [-350, 350];

    positions.forEach(xPos => {
        const group = new THREE.Group();
        group.position.x = xPos;
        
        // Stack 8 boxes vertically
        for(let i = -4; i < 4; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = i * 50; // Vertical spacing
            
            // Random rotation for "alien artifact" look
            mesh.rotation.y = Math.random();
            mesh.rotation.z = Math.random();
            
            group.add(mesh);
        }
        
        scene.add(group);
        towers.push(group);
    });

    // 5. Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    effect = new AsciiEffect(renderer, ' [|]', { invert: true });
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

    towers.forEach((tower, index) => {
        // Rotate towers slowly
        // If index is 0 (left), rotate one way, if 1 (right) rotate other
        const dir = index === 0 ? 1 : -1;
        tower.rotation.y = time * 0.5 * dir;
        
        // Bob up and down
        tower.position.y = Math.sin(time + index) * 20;
    });

    effect.render(scene, camera);
}

export function stop() {
    window.removeEventListener('resize', onWindowResize);
    cancelAnimationFrame(animationId);
    if(renderer) {
        renderer.dispose();
    }
}
