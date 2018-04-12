'use strict'
export default class {
    constructor(_canvas) {
        this.canvas = _canvas;

        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.renderer.setPixelRatio(window.deveicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, 1920 / 1112, 1, 10000);
        this.camera.position.set(0, 0, 100);


        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
        this.box = new THREE.Mesh(geometry, material);
        this.scene.add(this.box);

        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(1, 1, 1);

        this.scene.add(this.light);

        this.renderer.render(this.scene, this.camera);

        const wrapper = document.querySelector(".top-content");
        wrapper.appendChild(this.renderer.domElement);

        this.update();

        // Three.js Inspector debug
        window.scene = this.scene;
    }

    update() {
        this.box.rotation.x += 0.01;
        this.box.rotation.y += 0.01;


        this.draw(() => {
            requestAnimationFrame(this.update.bind(this));
        });
    }

    draw(callback) {
        this.renderer.render(this.scene, this.camera);

        callback();
    }


}

