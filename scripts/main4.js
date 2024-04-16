// ROTATING CUBES

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( -10, 10, 10 );
controls.update();

scene.background = new THREE.Color(0xdddddd)

const bgLight = new THREE.AmbientLight(0x404040, 100)
scene.add(bgLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 100)
directionalLight.position.set(0,1,0)
scene.add(directionalLight)

const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'three/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// loader.load( '/models/swat-transformed.glb', function ( gltf ) {
loader.load( '/models/swat-transformed.glb', function ( gltf ) {
    const root = gltf.scene;
	scene.add( root );
}, undefined, function ( error ) {
	console.error( error );
} );


function animate() {
	// animation loop
	requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
}

animate();
