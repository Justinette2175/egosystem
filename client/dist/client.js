"use strict";
exports.__esModule = true;
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var dat_gui_1 = require("dat.gui");
var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();
var axesHelper1 = new THREE.AxesHelper(5);
scene1.add(axesHelper1);
var axesHelper2 = new THREE.AxesHelper(5);
scene2.add(axesHelper2);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
new OrbitControls_1.OrbitControls(camera, renderer.domElement);
var planeGeometry1 = new THREE.PlaneGeometry();
var planeGeometry2 = new THREE.PlaneGeometry();
var texture1 = new THREE.TextureLoader().load("img/grid.png");
var texture2 = texture1.clone();
var material1 = new THREE.MeshBasicMaterial({ map: texture1 });
var material2 = new THREE.MeshBasicMaterial({ map: texture2 });
texture2.minFilter = THREE.NearestFilter;
texture2.magFilter = THREE.NearestFilter;
var plane1 = new THREE.Mesh(planeGeometry1, material1);
var plane2 = new THREE.Mesh(planeGeometry2, material2);
scene1.add(plane1);
scene2.add(plane2);
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
var options = {
    minFilters: {
        NearestFilter: THREE.NearestFilter,
        NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
        NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
        "LinearFilter ": THREE.LinearFilter,
        "LinearMipMapLinearFilter (Default)": THREE.LinearMipMapLinearFilter,
        LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter
    },
    magFilters: {
        NearestFilter: THREE.NearestFilter,
        "LinearFilter (Default)": THREE.LinearFilter
    }
};
var gui = new dat_gui_1.GUI();
var textureFolder = gui.addFolder("THREE.Texture");
textureFolder
    .add(texture2, "minFilter", options.minFilters)
    .onChange(function () { return updateMinFilter(); });
textureFolder
    .add(texture2, "magFilter", options.magFilters)
    .onChange(function () { return updateMagFilter(); });
textureFolder.open();
function updateMinFilter() {
    // for Three r137 and earlier
    // texture2.minFilter = Number(texture2.minFilter)
    // texture2.needsUpdate = true
    // for Three r138 and later
    material2.map = new THREE.TextureLoader().load("img/grid.png");
    material2.map.minFilter = Number(texture2.minFilter);
    material2.map.magFilter = Number(texture2.magFilter);
}
function updateMagFilter() {
    // for Three r137 and earlier
    // texture2.magFilter = Number(texture2.magFilter)
    // texture2.needsUpdate = true
    // for Three r138 and later
    material2.map = new THREE.TextureLoader().load("img/grid.png");
    material2.map.minFilter = Number(texture2.minFilter);
    material2.map.magFilter = Number(texture2.magFilter);
}
var stats = (0, stats_module_1["default"])();
document.body.appendChild(stats.dom);
function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}
function render() {
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, window.innerWidth / 2 - 2, window.innerHeight);
    renderer.render(scene1, camera);
    renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2 - 2, window.innerHeight);
    renderer.render(scene2, camera);
    renderer.setScissorTest(false);
}
animate();
