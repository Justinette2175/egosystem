import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();

const axesHelper1 = new THREE.AxesHelper(5);
scene1.add(axesHelper1);
const axesHelper2 = new THREE.AxesHelper(5);
scene2.add(axesHelper2);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const planeGeometry1 = new THREE.PlaneGeometry();
const planeGeometry2 = new THREE.PlaneGeometry();

const texture1 = new THREE.TextureLoader().load("img/grid.png");
const texture2 = texture1.clone();

const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
const material2 = new THREE.MeshBasicMaterial({ map: texture2 });

texture2.minFilter = THREE.NearestFilter;
texture2.magFilter = THREE.NearestFilter;

const plane1 = new THREE.Mesh(planeGeometry1, material1);
const plane2 = new THREE.Mesh(planeGeometry2, material2);

scene1.add(plane1);
scene2.add(plane2);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const options = {
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
const gui = new GUI();
const textureFolder = gui.addFolder("THREE.Texture");
textureFolder
  .add(texture2, "minFilter", options.minFilters)
  .onChange(() => updateMinFilter());
textureFolder
  .add(texture2, "magFilter", options.magFilters)
  .onChange(() => updateMagFilter());
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

const stats = Stats();
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

  renderer.setScissor(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2 - 2,
    window.innerHeight
  );
  renderer.render(scene2, camera);

  renderer.setScissorTest(false);
}
animate();
