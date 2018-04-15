/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import PreAnimation from "./pre_animation";
import PreStyle from "./pre_style";

global.THREE = require('./three.min.js');
global.$ = require('jquery');

document.addEventListener('DOMContentLoaded', () => {

    const loader = new THREE.TextureLoader();

    $.getJSON("../wind_data.json", (json_data) => {
        loader.load(
            // resource URL
            './assets/logo-white.png',

            // onLoad callback
            texture => {
                const pre_animation = new PreAnimation(texture, json_data, () => {
                    // const style = new PreStyle();

                    window.addEventListener('resize', () => {
                        // style.resizeCanvas();
                        pre_animation.resizeCanvas();
                    });
                });
            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            (err) => {
                console.error('An error happened.');
            }
        );
    });


    // Three.js Inspector debug
    window.THREE = THREE;
});
