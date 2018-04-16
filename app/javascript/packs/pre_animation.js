'use strict'
export default class {
    constructor(mobile_flag, texture, json, callback) {
        this.texture = texture;
        this.window_size = [window.innerWidth, window.innerHeight];

        this.wind_data = json;

        this.counter = 0;

        this.threshold = mobile_flag ? 0.02: 0.0082;
        this.power = mobile_flag ? 0.002: 0.001;

        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.window_size[0], this.window_size[1]);

        this.logoLayer();

        this.layerBlend();

        const wrapper = document.querySelector(".top-content");
        wrapper.appendChild(this.renderer.domElement);

        this.update();

        callback();

        // Three.js Inspector debug
        window.scene = this.final.scene;

        window.scene = this.logo.scene;

        this.resizeCanvas();
    }
    update() {
        this.final.material.uniforms.wind.value = new THREE.Vector2(this.wind_data[this.counter].direction, this.wind_data[this.counter].velocity * this.power);

        this.counter++;

        if (this.counter >= this.wind_data.length) this.counter = 0;

        this.draw(() => {
            requestAnimationFrame(this.update.bind(this));
        });
    }

    draw(callback) {
        this.renderer.render(this.logo.scene, this.logo.camera, this.logo.rt);

        // this.renderer.render(this.logo.scene, this.logo.camera);

        this.final.material.uniforms['texture'].value = this.logo.rt.texture;

        this.renderer.render(this.final.scene, this.final.camera);
        // console.log(this.logo.rt.texture);
        callback();


    }

    logoLayer() {
        this.logo = {};
        this.logo.rt = new THREE.WebGLRenderTarget(this.window_size[0], this.window_size[1], {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBFormat
        });


        this.logo.scene = new THREE.Scene();

        this.logo.camera = new THREE.PerspectiveCamera(45, this.window_size[0] / this.window_size[1], 1, 10000);
        this.logo.camera.position.set(0,0,1000);


        this.createLogo();

        this.logo.light = new THREE.DirectionalLight(0xffffff);
        this.logo.light.position.set(1, 1, 1);

        this.logo.scene.add(this.logo.light);
    }


    createLogo() {
        this.logo.geometry = new THREE.PlaneGeometry(30, 30);
        let plane_material = new THREE.MeshBasicMaterial({
            map: this.texture
        });

        this.logo.obj = new THREE.Mesh(this.logo.geometry, plane_material);

        console.log(this.logo.obj);

        this.logo.scene.add(this.logo.obj);
    }

    layerBlend() {
        this.final = {};

        this.final.scene = new THREE.Scene();

        this.final.camera = new THREE.PerspectiveCamera(45, this.window_size[0] / this.window_size[1], 1, 10000);
        this.final.camera.position.set(0, 0, 1000);

        this.final.material = new THREE.ShaderMaterial({
            fragmentShader: document.getElementById('fs').innerHTML,
            vertexShader: document.getElementById('vs').innerHTML,
            uniforms: {
                texture: {
                    type: "t",
                    value: this.logo.rt.texture
                },
                wind: {
                    type: "v2",
                    value: new THREE.Vector2(this.wind_data[0].direction, this.wind_data[0].velocity * this.power)
                }
            }
        });

        this.final.geometry = new THREE.PlaneGeometry( this.window_size[0], this.window_size[1], 1, 1 );
        this.final.plane = new THREE.Mesh( this.final.geometry, this.final.material );

        this.final.scene.add(this.final.plane);
    }

    resizeCanvas() {
        this.window_size = [window.innerWidth, window.innerHeight];

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.window_size[0], this.window_size[1]);

        this.logo.rt.setSize(this.window_size[0], this.window_size[1]);
        // this.logo.rt.setPixelRatio(window.devecePixecRatio);

        this.logo.camera.aspect = this.window_size[0] / this.window_size[1];
        // this.logo.camera.position.set(0, 0, 2000 - (this.window_size[0] > this.window_size[1]? this.window_size[0] : this.window_size[1]) *1.75);
        this.logo.camera.updateProjectionMatrix();

        // console.log(this.window_size[0] < this.window_size[1]? this.window_size[0] : this.window_size[1]);

        console.log(this.logo.obj);

        let size = (this.window_size[0] < this.window_size[1]? this.window_size[0] : this.window_size[1]) * this.threshold;

        this.logo.obj.scale.set(size, size, size);
        // this.final.camera.aspect = this.window_size[0] / this.window_size[1];
        // this.final.camera.updateProjectionMatrix();
    }

}

