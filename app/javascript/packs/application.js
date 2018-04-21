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
    let mobile_flag = false;

    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('iphone') != -1) {
        // console.log('iPhone');
        mobile_flag = true;
    } else if (userAgent.indexOf('ipad') != -1) {
        // console.log('iPad');
        mobile_flag = false;
    } else if (userAgent.indexOf('android') != -1) {
        mobile_flag = true;
    }

    console.log("mobile", mobile_flag);

    const loader = new THREE.TextureLoader();

    $.getJSON("../wind_data.json", (json_data) => {
        loader.load(
            // resource URL
            './assets/logo-white.png',

            // onLoad callback
            texture => {
                const pre_animation = new PreAnimation(mobile_flag, texture, json_data, () => {
                    // const style = new PreStyle();

                    let window_size = [window.innerWidth, innerHeight];

                    window.addEventListener('resize', () => {
                        // style.resizeCanvas();
                        pre_animation.resizeCanvas();

                        window_size = [window.innerWidth, innerHeight];
                    });

                    if (mobile_flag) {
                        window.addEventListener("deviceorientation", (e) => {
                            pre_animation.deviseOrientation(e);
;                        });

                    } else {
                        window.addEventListener("mousemove", (e) => {
                            pre_animation.mouseMove(e);
                        });
                    }


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
