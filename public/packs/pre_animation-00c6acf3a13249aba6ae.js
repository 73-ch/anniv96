/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************************************!*\
  !*** ./app/javascript/packs/pre_animation.js ***!
  \***********************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(mobile_flag, texture, json, callback) {
        _classCallCheck(this, _class);

        this.texture = texture;
        this.window_size = [window.innerWidth, window.innerHeight];

        this.wind_data = json;

        this.counter = 0;

        this.threshold = mobile_flag ? 0.02 : 0.0082;
        this.mobile_power = mobile_flag ? 0.002 : 0.001;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.window_size[0], this.window_size[1]);

        this.move_rad = 0;

        this.logoLayer();

        this.layerBlend();

        var wrapper = document.querySelector(".top-content");
        wrapper.appendChild(this.renderer.domElement);

        this.update();

        callback();

        // Three.js Inspector debug
        window.scene = this.final.scene;

        window.scene = this.logo.scene;

        this.resizeCanvas();
    }

    _createClass(_class, [{
        key: 'update',
        value: function update() {
            var _this = this;

            var d = this.wind_data[this.counter];

            var power = Math.exp(2 - Math.abs(Math.cos(d.direction) - Math.cos(this.move_rad))) * 0.5;

            this.final.material.uniforms.wind.value = new THREE.Vector2(d.direction, d.velocity * this.mobile_power * power);

            this.counter++;

            if (this.counter >= this.wind_data.length) this.counter = 0;

            this.draw(function () {
                requestAnimationFrame(_this.update.bind(_this));
            });
        }
    }, {
        key: 'draw',
        value: function draw(callback) {
            this.renderer.render(this.logo.scene, this.logo.camera, this.logo.rt);

            // this.renderer.render(this.logo.scene, this.logo.camera);

            this.final.material.uniforms['texture'].value = this.logo.rt.texture;

            this.renderer.render(this.final.scene, this.final.camera);
            // console.log(this.logo.rt.texture);
            callback();
        }
    }, {
        key: 'logoLayer',
        value: function logoLayer() {
            this.logo = {};
            this.logo.rt = new THREE.WebGLRenderTarget(this.window_size[0], this.window_size[1], {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.NearestFilter,
                format: THREE.RGBFormat
            });

            this.logo.scene = new THREE.Scene();

            this.logo.camera = new THREE.PerspectiveCamera(45, this.window_size[0] / this.window_size[1], 1, 10000);
            this.logo.camera.position.set(0, 0, 1000);

            this.createLogo();

            this.logo.light = new THREE.DirectionalLight(0xffffff);
            this.logo.light.position.set(1, 1, 1);

            this.logo.scene.add(this.logo.light);
        }
    }, {
        key: 'createLogo',
        value: function createLogo() {
            this.logo.geometry = new THREE.PlaneGeometry(30, 30);
            var plane_material = new THREE.MeshBasicMaterial({
                map: this.texture
            });

            this.logo.obj = new THREE.Mesh(this.logo.geometry, plane_material);

            console.log(this.logo.obj);

            this.logo.scene.add(this.logo.obj);
        }
    }, {
        key: 'layerBlend',
        value: function layerBlend() {
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

            this.final.geometry = new THREE.PlaneGeometry(this.window_size[0], this.window_size[1], 1, 1);
            this.final.plane = new THREE.Mesh(this.final.geometry, this.final.material);

            this.final.scene.add(this.final.plane);
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            this.window_size = [window.innerWidth, window.innerHeight - 60];

            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.window_size[0], this.window_size[1]);

            this.logo.rt.setSize(this.window_size[0], this.window_size[1]);
            // this.logo.rt.setPixelRatio(window.devecePixecRatio);

            this.logo.camera.aspect = this.window_size[0] / this.window_size[1];
            // this.logo.camera.position.set(0, 0, 2000 - (this.window_size[0] > this.window_size[1]? this.window_size[0] : this.window_size[1]) *1.75);
            this.logo.camera.updateProjectionMatrix();

            // console.log(this.window_size[0] < this.window_size[1]? this.window_size[0] : this.window_size[1]);

            console.log(this.logo.obj);

            var size = (this.window_size[0] < this.window_size[1] ? this.window_size[0] : this.window_size[1]) * this.threshold;

            this.logo.obj.scale.set(size, size, size);
            // this.final.camera.aspect = this.window_size[0] / this.window_size[1];
            // this.final.camera.updateProjectionMatrix();
        }
    }, {
        key: 'actionDevise',
        value: function actionDevise(e) {
            // this.power =
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(e) {
            // console.log();
            this.move_rad = Math.atan2(e.clientX / this.window_size[0] * 2 - 1, e.clientY / this.window_size[1] * -2 + 1);
            this.move_rad += this.move_rad < 0 ? Math.PI * 2 : 0;
        }
    }, {
        key: 'deviseOrientation',
        value: function deviseOrientation(e) {
            this.move_rad = e.alpha / 360 * Math.PI;
        }
    }]);

    return _class;
}();

/* harmony default export */ __webpack_exports__["default"] = (_class);

/***/ })
/******/ ]);
//# sourceMappingURL=pre_animation-00c6acf3a13249aba6ae.js.map