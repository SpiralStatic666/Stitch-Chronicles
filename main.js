import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene, Camera and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//Geometrical Shapes
const torusKnotGeo = new THREE.TorusKnotGeometry(100, 0.09, 100, 5);
const torusKnotMaterial = new THREE.MeshNormalMaterial({ color: 0x4b0082 });
const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMaterial);
const torusKnot1 = new THREE.Mesh(torusKnotGeo, torusKnotMaterial);
const torusKnot2 = new THREE.Mesh(torusKnotGeo, torusKnotMaterial);
scene.add(torusKnot, torusKnot1, torusKnot2);

//Ligthing
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Background
//  const bgTexture = new THREE.TextureLoader().load("backg.jpg");
//  scene.background = bgTexture;

//Helpers
//  const gridHelper = new THREE.GridHelper(200,50)
//  scene.add(gridHelper)
const controls = new OrbitControls(camera, renderer.domElement);

//Random Generate
function addStar() {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

//Shooting Stars
// const starGeo = new THREE.SphereGeometry(0.5, 24, 24);
// const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
// const shootingStar = new THREE.Mesh(starGeo, starMaterial);
// scene.add(shootingStar)

//Animating and Rendering (Also Resizing)

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.z += 0.01;
  torusKnot.rotation.y += 0.005;

  torusKnot1.rotation.x += 0.011;
  torusKnot1.rotation.z += 0.011;
  torusKnot1.rotation.y += 0.004;

  torusKnot2.rotation.x += 0.013;
  torusKnot2.rotation.z += 0.013;
  torusKnot2.rotation.y += 0.006;

  controls.update();
  renderer.render(scene, camera);
}
animate();
window.addEventListener("resize", onWindowResize, false);