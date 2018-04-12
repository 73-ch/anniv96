'use strict';
export default class PreStyle {
    constructor() {
        this.canvas = document.querySelector("#pre-canvas");
        this.header = document.querySelector("header");
        this.resizeCanvas();
    }

    resizeCanvas() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        console.log('screen size', screenWidth, screenHeight);

        // let scene = new THREE.Scene();

        // console.log(scene);

        // console.log(THREE);

        this.canvas.style.width = screenWidth + "px";
        this.canvas.style.height = screenHeight + "px";
    }
}
