import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { generateRadialFloorTexture } from './utils/generateRadialFloorTexture.js';
import { GradientEquirectTexture, WebGLPathTracer } from '../src/index.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getScaledSettings } from './utils/getScaledSettings.js';
import { LoaderElement } from './utils/LoaderElement.js';
import { ParallelMeshBVHWorker } from 'three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js';

const MODEL_LIST = {
	'Panoramic Telescope': {
		url: './models/panoramic_telescope.glb',

		credit: 'Panoramic Telescope (Rundblickfernrohr)',
		opacityToTransmission: true,
		camera_X: 1.909,
		camera_Y: 0,
		camera_Z: - 0.139,
		camera_thetaX: - 177.489,
		camera_thetaY: 84.787,
		camera_thetaZ: 177.5,
		scaleFactor: 0.008,
		frames: 90,
		postProcess( model ) {

			const toRemove = [];
			model.updateMatrixWorld();

			model.traverse( c => {

				if ( c.material ) {

					c.material.emissiveIntensity = 0;
					if ( c.material instanceof THREE.MeshPhysicalMaterial ) {

						const material = c.material;
						material.metalness = 0.0;
						if ( material.transmission === 1.0 ) {

							material.roughness = 0.0;
							material.metalness = 0.0;
							if ( c.name.includes( '29' ) ) {

								material.ior = 1.52;
								material.color.set( 0xffffff );

							} else {

								material.ior = 1.52;

							}

						}

					} else if ( c.material.opacity < 1.0 ) {

						toRemove.push( c );

					}

				}

			} );

			toRemove.forEach( c => c.parent.remove( c ) );

		}
	},
	'Dove Prism': {
		url: './models/octopus_vs_dove_prism.glb',

		credit: 'Dove prism + Octopus (https://skfb.ly/oqIRG)',
		opacityToTransmission: true,
		camera_X: - 0.1,
		camera_Y: 0.1,
		camera_Z: 10,
		camera_thetaX: - 0.883,
		camera_thetaY: - 0.519,
		camera_thetaZ: - 0.008,
		scaleFactor: 0.06,
		frames: 360,
		postProcess( model ) {

			const toRemove = [];
			model.updateMatrixWorld();

			model.traverse( c => {

				if ( c.material ) {

					c.material.emissiveIntensity = 0;
					if ( c.material instanceof THREE.MeshPhysicalMaterial ) {

						const material = c.material;
						material.metalness = 0.0;
						if ( material.transmission === 1.0 ) {

							material.roughness = 0.0;
							material.metalness = 0.0;
							if ( c.name.includes( '29' ) ) {

								material.ior = 1.52;
								material.color.set( 0xffffff );

							} else {

								material.ior = 1.52;

							}

						}

					} else if ( c.material.opacity < 1.0 ) {

						toRemove.push( c );

					}

				}

			} );

			toRemove.forEach( c => c.parent.remove( c ) );

		}
	},
	'Right-Angle Prism': {
		url: './models/octopus_vs_right-angle_prism.glb',

		credit: 'Right-angle prism + Octopus (https://skfb.ly/oqIRG)',
		opacityToTransmission: true,
		camera_X: 0,
		camera_Y: 1.5,
		camera_Z: 0.075,
		camera_thetaX: - 90,
		camera_thetaY: 0,
		camera_thetaZ: 180,
		scaleFactor: 0.015,
		frames: 360,
		postProcess( model ) {

			const toRemove = [];
			model.updateMatrixWorld();

			model.traverse( c => {

				if ( c.material ) {

					c.material.emissiveIntensity = 0;
					if ( c.material instanceof THREE.MeshPhysicalMaterial ) {

						const material = c.material;
						material.metalness = 0.0;
						if ( material.transmission === 1.0 ) {

							material.roughness = 0.0;
							material.metalness = 0.0;
							if ( c.name.includes( '29' ) ) {

								material.ior = 1.52;
								material.color.set( 0xffffff );

							} else {

								material.ior = 1.52;

							}

						}

					} else if ( c.material.opacity < 1.0 ) {

						toRemove.push( c );

					}

				}

			} );

			toRemove.forEach( c => c.parent.remove( c ) );

		}
	},
	'Amici Roof Prism': {
		url: './models/octopus_vs_amici_prism.glb',

		credit: 'Amici roof prism + Octopus (https://skfb.ly/oqIRG)',
		opacityToTransmission: true,
		camera_X: 0,
		camera_Y: 1.5,
		camera_Z: 0.075,
		camera_thetaX: - 90,
		camera_thetaY: 0,
		camera_thetaZ: 180,
		scaleFactor: 0.015,
		frames: 360,
		postProcess( model ) {

			const toRemove = [];
			model.updateMatrixWorld();

			model.traverse( c => {

				if ( c.material ) {

					c.material.emissiveIntensity = 0;
					if ( c.material instanceof THREE.MeshPhysicalMaterial ) {

						const material = c.material;
						material.metalness = 0.0;
						if ( material.transmission === 1.0 ) {

							material.roughness = 0.0;
							material.metalness = 0.0;
							if ( c.name.includes( '29' ) ) {

								material.ior = 1.52;
								material.color.set( 0xffffff );

							} else {

								material.ior = 1.52;

							}

						}

					} else if ( c.material.opacity < 1.0 ) {

						toRemove.push( c );

					}

				}

			} );

			toRemove.forEach( c => c.parent.remove( c ) );

		}
	},
};

const envMaps = {
	'Aristea Wreck Puresky': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/aristea_wreck_puresky_2k.hdr',
	'Peppermint Powerplant': 'https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/peppermint_powerplant_2k.hdr',
};

const models = MODEL_LIST;

const urlParams = new URLSearchParams( window.location.search );
const initialFrame = parseInt( urlParams.get( 'frame' ) ) || 0;

const orthoWidth = 2;

const params = {
	multipleImportanceSampling: false,
	acesToneMapping: true,
	renderScale: 1 / window.devicePixelRatio,
	frame: initialFrame,
	model: '',
	envMap: envMaps[ 'Aristea Wreck Puresky' ],

	environmentIntensity: 0.4,
	environmentRotation: 0,
	cameraProjection: 'Orthographic', // 'Perspective',
	backgroundType: 'Environment', // 'Gradient',
	bgGradientTop: '#ada8f0',
	bgGradientBottom: '#b3b3b3',
	backgroundBlur: 0.5,
	transparentBackground: false,
	checkerboardTransparency: false,
	enable: true,
	floorColor: '#111111',
	floorOpacity: 0,
	floorRoughness: 0.2,
	floorMetalness: 0.2,
	downloadImage: () => {

		const canvas = renderer.domElement;
		const link = document.createElement( 'a' );
		link.href = canvas.toDataURL( 'image/png' );
		link.download = 'render_frame_' + params.frame + '.png';
		link.click();

	},
	...getScaledSettings(),
	bounces: 6,
	filterGlossyFactor: 0,
	tiles: 2,
};

let floorPlane, gui, stats;
let pathTracer, renderer, orthoCamera, perspectiveCamera, activeCamera;
let controls, scene, model;
let gradientMap;
let loader;
let mixer;
let gltf; // Global gltf to access animations

let lastModel = null;

init();

animate.lastLoggedPosition = null;

async function init() {

	loader = new LoaderElement();
	loader.attach( document.body );

	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		preserveDrawingBuffer: true,
	} );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	document.body.appendChild( renderer.domElement );

	pathTracer = new WebGLPathTracer( renderer );
	pathTracer.setBVHWorker( new ParallelMeshBVHWorker() );
	pathTracer.physicallyCorrectLights = true;
	pathTracer.tiles.set( params.tiles, params.tiles );
	pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
	pathTracer.transmissiveBounces = params.bounces;

	const aspect = window.innerWidth / window.innerHeight;
	perspectiveCamera = new THREE.PerspectiveCamera( 40, aspect, 0.025, 500 );
	orthoCamera = new THREE.OrthographicCamera(
		orthoWidth / - 2,
		orthoWidth / 2,
		orthoWidth / aspect / 2,
		orthoWidth / aspect / - 2,
		- 500, 500
	);

	controls = new OrbitControls( perspectiveCamera, renderer.domElement );
	controls.target.set( 0, 0, 0 );
	controls.update();
	controls.addEventListener( 'change', () => {

		pathTracer.updateCamera();
		console.log( `Camera position (OrbitControls): x=${activeCamera.position.x.toFixed( 3 )}, y=${activeCamera.position.y.toFixed( 3 )}, z=${activeCamera.position.z.toFixed( 3 )}` );
		console.log( `Camera rotation (OrbitControls): x=${THREE.MathUtils.radToDeg( activeCamera.rotation.x ).toFixed( 3 )}, y=${THREE.MathUtils.radToDeg( activeCamera.rotation.y ).toFixed( 3 )}, z=${THREE.MathUtils.radToDeg( activeCamera.rotation.z ).toFixed( 3 )}` );
		console.log( `OrbitControls target: x=${controls.target.x.toFixed( 3 )}, y=${controls.target.y.toFixed( 3 )}, z=${controls.target.z.toFixed( 3 )}` );

	} );

	onHashChange();

	const selectedModel = models[ params.model ] || models[ Object.keys( models )[ 0 ] ];

	perspectiveCamera.position.set( selectedModel.camera_X, selectedModel.camera_Y, selectedModel.camera_Z );
	orthoCamera.position.set( selectedModel.camera_X, selectedModel.camera_Y, selectedModel.camera_Z );
	perspectiveCamera.rotation.set(
		THREE.MathUtils.degToRad( selectedModel.camera_thetaX || 0 ),
		THREE.MathUtils.degToRad( selectedModel.camera_thetaY || 0 ),
		THREE.MathUtils.degToRad( selectedModel.camera_thetaZ || 0 )
	);
	orthoCamera.rotation.set(
		THREE.MathUtils.degToRad( selectedModel.camera_thetaX || 0 ),
		THREE.MathUtils.degToRad( selectedModel.camera_thetaY || 0 ),
		THREE.MathUtils.degToRad( selectedModel.camera_thetaZ || 0 )
	);

	updateCameraProjection( params.cameraProjection );

	console.log( `Initial camera position: x=${activeCamera.position.x.toFixed( 3 )}, y=${activeCamera.position.y.toFixed( 3 )}, z=${activeCamera.position.z.toFixed( 3 )}` );
	console.log( `Initial camera rotation: x=${THREE.MathUtils.radToDeg( activeCamera.rotation.x ).toFixed( 3 )}, y=${THREE.MathUtils.radToDeg( activeCamera.rotation.y ).toFixed( 3 )}, z=${THREE.MathUtils.radToDeg( activeCamera.rotation.z ).toFixed( 3 )}` );

	gradientMap = new GradientEquirectTexture();
	gradientMap.topColor.set( params.bgGradientTop );
	gradientMap.bottomColor.set( params.bgGradientBottom );
	gradientMap.update();

	scene = new THREE.Scene();
	scene.background = gradientMap;

	const floorTex = generateRadialFloorTexture( 1024 );
	floorPlane = new THREE.Mesh(
		new THREE.PlaneGeometry(),
		new THREE.MeshStandardMaterial( {
			map: floorTex,
			transparent: true,
			color: 0x111111,
			roughness: 0.1,
			metalness: 0.0,
			side: THREE.DoubleSide,
		} )
	);
	floorPlane.scale.setScalar( 5 );
	floorPlane.rotation.x = - Math.PI / 2;
	scene.add( floorPlane );


	stats = new Stats();
	document.body.appendChild( stats.dom );
	stats.dom.style.display = 'none';	// Hide the Stats Container

	// Load environment map
	await new Promise( resolve => {

		new RGBELoader()
			.load( params.envMap, texture => {

				if ( scene.environment ) {

					scene.environment.dispose();

				}

				texture.mapping = THREE.EquirectangularReflectionMapping;
				scene.environment = texture;
				pathTracer.updateEnvironment();
				console.log( 'Environment map loaded:', params.envMap );
				resolve();

			}, undefined, err => {

				console.error( 'Failed to load environment map:', err );
				resolve(); // Continue even if loading fails

			} );

	} );

	onResize();
	buildGui();
	onParamsChange();

	animate();

	window.addEventListener( 'resize', onResize );
	window.addEventListener( 'hashchange', onHashChange );

}

function animate() {

	requestAnimationFrame( animate );
	stats.update();

	// Optional: Log camera position and rotation if changed
	if ( activeCamera ) {

		const pos = activeCamera.position;
		const rot = activeCamera.rotation;
		const target = controls.target;
		if ( ! animate.lastLoggedPosition ||
            pos.x !== animate.lastLoggedPosition.x ||
            pos.y !== animate.lastLoggedPosition.y ||
            pos.z !== animate.lastLoggedPosition.z ||
            rot.x !== animate.lastLoggedRotation?.x ||
            rot.y !== animate.lastLoggedRotation?.y ||
            rot.z !== animate.lastLoggedRotation?.z ) {

			console.log( `Camera position (animate): x=${pos.x.toFixed( 3 )}, y=${pos.y.toFixed( 3 )}, z=${pos.z.toFixed( 3 )}` );
			console.log( `Camera rotation (animate): x=${THREE.MathUtils.radToDeg( rot.x ).toFixed( 3 )}, y=${THREE.MathUtils.radToDeg( rot.y ).toFixed( 3 )}, z=${THREE.MathUtils.radToDeg( rot.z ).toFixed( 3 )}` );
			console.log( `OrbitControls target (animate): x=${target.x.toFixed( 3 )}, y=${target.y.toFixed( 3 )}, z=${target.z.toFixed( 3 )}` );
			animate.lastLoggedPosition = pos.clone();
			animate.lastLoggedRotation = rot.clone();
			animate.lastLoggedTarget = target.clone();

		}

	}

	if ( ! model ) {

		return;

	}

	if ( params.enable ) {

		if ( ! params.pause || pathTracer.samples < 1 ) {

			pathTracer.renderSample();

		}

	} else {

		renderer.render( scene, activeCamera );

	}

	loader.setSamples( pathTracer.samples, pathTracer.isCompiling );

}

function onParamsChange() {

	pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
	pathTracer.bounces = params.bounces;
	pathTracer.filterGlossyFactor = params.filterGlossyFactor;
	pathTracer.renderScale = params.renderScale;

	floorPlane.material.color.set( params.floorColor );
	floorPlane.material.roughness = params.floorRoughness;
	floorPlane.material.metalness = params.floorMetalness;
	floorPlane.material.opacity = params.floorOpacity;

	scene.environmentIntensity = params.environmentIntensity;
	scene.environmentRotation.y = params.environmentRotation;
	scene.backgroundBlurriness = params.backgroundBlur;

	if ( params.backgroundType === 'Gradient' ) {

		gradientMap.topColor.set( params.bgGradientTop );
		gradientMap.bottomColor.set( params.bgGradientBottom );
		gradientMap.update();
		scene.background = gradientMap;
		scene.backgroundIntensity = 1;
		scene.environmentRotation.y = 0;
		console.log( 'Background set to Gradient' ); // Debug

	} else {

		scene.background = scene.environment;
		scene.backgroundIntensity = params.environmentIntensity;
		scene.backgroundRotation.y = params.environmentRotation;
		console.log( 'Background set to Environment' ); // Debug

	}

	if ( params.transparentBackground ) {

		scene.background = null;
		renderer.setClearAlpha( 0 );
		console.log( 'Background set to transparent' ); // Debug

	}

	// Handle frame update
	if ( model && mixer && gltf && gltf.animations && gltf.animations.length > 0 ) {

		const clip = gltf.animations[ 0 ];
		const action = mixer.clipAction( clip );
		const fps = 30;
		const frameTime = params.frame / fps;
		const clampedTime = Math.min( Math.max( frameTime, 0 ), clip.duration );

		action.reset();
		action.play();
		mixer.update( clampedTime );
		action.paused = true;

		model.updateMatrixWorld( true );

	}

	pathTracer.updateMaterials();
	pathTracer.updateEnvironment();
	pathTracer.samples = 0; // Force re-render
	console.log( 'Path tracer environment updated' ); // Debug

	// Force render for standard mode
	if ( ! params.enable ) {

		renderer.render( scene, activeCamera );

	}

}

function onHashChange() {

	let hashModel = '';
	if ( window.location.hash ) {

		const modelName = decodeURI( window.location.hash.substring( 1 ) );
		if ( modelName in models ) {

			hashModel = modelName;

		}

	}

	if ( ! ( hashModel in models ) ) {

		hashModel = Object.keys( models )[ 0 ];

	}

	params.model = hashModel;
	updateModel();

}

function onResize() {

	const w = window.innerWidth;
	const h = window.innerHeight;
	const dpr = window.devicePixelRatio;

	renderer.setSize( w, h );
	renderer.setPixelRatio( dpr );

	const aspect = w / h;
	perspectiveCamera.aspect = aspect;
	perspectiveCamera.updateProjectionMatrix();

	const orthoHeight = orthoWidth / aspect;
	orthoCamera.top = orthoHeight / 2;
	orthoCamera.bottom = orthoHeight / - 2;
	orthoCamera.updateProjectionMatrix();

	pathTracer.updateCamera();

}

function buildGui() {

	if ( gui ) {

		gui.destroy();

	}

	gui = new GUI();

	gui.add( params, 'model', Object.keys( models ) )
		.name( '3D Model' )
		.onChange( v => {

			window.location.hash = v;

		} );

	const frameCount = MODEL_LIST[ params.model ].frames || 100;

	gui.add( params, 'cameraProjection', [ 'Perspective', 'Orthographic' ] )
		.name( 'Camera Projection' )
		.onChange( v => {

			updateCameraProjection( v );

		} );

	gui.add( params, 'frame', 0, frameCount, 5 )
		.name( 'Frame #' )
		.onChange( ( value ) => {

			// Live update logic (no reload)
			onParamsChange( value );

		} )
		.onFinishChange( ( value ) => {

			// Updated frame in URL
			const url = new URL( window.location );
			url.searchParams.set( 'frame', value );
			history.pushState( {}, '', url ); // Update URL without reloading
			if ( params.enable ) {

				updateModel();

			}

		} );

	gui.add( params, 'downloadImage' ).name( 'Download Image' );

	const pathTracingFolder = gui.addFolder( 'Path Tracer' );
	pathTracingFolder.add( params, 'enable' ).name( 'Enable PBR Path Tracing' ).onChange( updateModel );
	pathTracingFolder.add( params, 'multipleImportanceSampling' ).onChange( onParamsChange );
	pathTracingFolder.add( params, 'acesToneMapping' ).onChange( v => {

		renderer.toneMapping = v ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping;

	} );
	pathTracingFolder.add( params, 'bounces', 1, 20, 1 ).onChange( onParamsChange );
	pathTracingFolder.add( params, 'filterGlossyFactor', 0, 1 ).onChange( onParamsChange );
	pathTracingFolder.add( params, 'renderScale', 0.1, 1.0, 0.01 ).onChange( onParamsChange );
	pathTracingFolder.add( params, 'tiles', 1, 10, 1 ).onChange( v => {

		pathTracer.tiles.set( v, v );

	} );

	pathTracingFolder.open();

	const environmentFolder = gui.addFolder( 'Environment' );
	environmentFolder.add( params, 'envMap', envMaps ).name( 'map' ).onChange( updateEnvMap );
	environmentFolder.add( params, 'environmentIntensity', 0.0, 10.0 ).onChange( onParamsChange ).name( 'intensity' );
	environmentFolder.add( params, 'environmentRotation', 0, 2 * Math.PI ).onChange( onParamsChange );
	environmentFolder.open();

	const backgroundFolder = gui.addFolder( 'Background' );
	backgroundFolder.add( params, 'backgroundType', [ 'Environment', 'Gradient' ] ).onChange( onParamsChange );
	backgroundFolder.addColor( params, 'bgGradientTop' ).onChange( onParamsChange );
	backgroundFolder.addColor( params, 'bgGradientBottom' ).onChange( onParamsChange );
	backgroundFolder.add( params, 'backgroundBlur', 0, 1 ).onChange( onParamsChange );
	backgroundFolder.add( params, 'transparentBackground', 0, 1 ).onChange( onParamsChange );
	backgroundFolder.add( params, 'checkerboardTransparency' ).onChange( v => {

		if ( v ) document.body.classList.add( 'checkerboard' );
		else document.body.classList.remove( 'checkerboard' );

	} );
	backgroundFolder.open();

	const floorFolder = gui.addFolder( 'Floor' );
	floorFolder.addColor( params, 'floorColor' ).onChange( onParamsChange );
	floorFolder.add( params, 'floorRoughness', 0, 1 ).onChange( onParamsChange );
	floorFolder.add( params, 'floorMetalness', 0, 1 ).onChange( onParamsChange );
	floorFolder.add( params, 'floorOpacity', 0, 1 ).onChange( onParamsChange );
	floorFolder.close();

}

function updateEnvMap() {

	new RGBELoader()
		.load( params.envMap, texture => {

			if ( scene.environment ) {

				scene.environment.dispose();

			}

			texture.mapping = THREE.EquirectangularReflectionMapping;
			scene.environment = texture;
			pathTracer.updateEnvironment();
			console.log( 'Environment map updated:', params.envMap ); // Debug
			if ( params.backgroundType === 'Environment' ) {

				scene.background = scene.environment;
				scene.backgroundIntensity = params.environmentIntensity;
				scene.backgroundRotation.y = params.environmentRotation;
				pathTracer.samples = 0; // Force re-render
				console.log( 'Background set to Environment after map update' ); // Debug
				if ( ! params.enable ) {

					renderer.render( scene, activeCamera ); // Force standard render

				}

			}

			onParamsChange();

		}, undefined, err => {

			console.error( 'Failed to load environment map:', err );

		} );

}

function updateCameraProjection( cameraProjection ) {

	if ( activeCamera ) {

		perspectiveCamera.position.copy( activeCamera.position );
		orthoCamera.position.copy( activeCamera.position );
		perspectiveCamera.rotation.copy( activeCamera.rotation );
		orthoCamera.rotation.copy( activeCamera.rotation );

	}

	if ( cameraProjection === 'Perspective' ) {

		activeCamera = perspectiveCamera;

	} else {

		activeCamera = orthoCamera;

	}

	controls.object = activeCamera;
	controls.update();
	pathTracer.setCamera( activeCamera );

	// Log the camera position and rotation after switching projection
	console.log( `Camera position after projection change (${cameraProjection}): x=${activeCamera.position.x.toFixed( 3 )}, y=${activeCamera.position.y.toFixed( 3 )}, z=${activeCamera.position.z.toFixed( 3 )}` );
	console.log( `Camera rotation after projection change (${cameraProjection}): x=${THREE.MathUtils.radToDeg( activeCamera.rotation.x ).toFixed( 3 )}, y=${THREE.MathUtils.radToDeg( activeCamera.rotation.y ).toFixed( 3 )}, z=${THREE.MathUtils.radToDeg( activeCamera.rotation.z ).toFixed( 3 )}` );
	console.log( `OrbitControls target after projection change (${cameraProjection}): x=${controls.target.x.toFixed( 3 )}, y=${controls.target.y.toFixed( 3 )}, z=${controls.target.z.toFixed( 3 )}` );

}

function convertOpacityToTransmission( model, ior ) {

	model.traverse( c => {

		if ( c.material ) {

			const material = c.material;
			if ( material.opacity < 0.65 && material.opacity > 0.2 ) {

				const newMaterial = new THREE.MeshPhysicalMaterial();
				for ( const key in material ) {

					if ( key in material ) {

						if ( material[ key ] === null ) continue;
						if ( material[ key ].isTexture ) {

							newMaterial[ key ] = material[ key ];

						} else if ( material[ key ].copy && material[ key ].constructor === newMaterial[ key ].constructor ) {

							newMaterial[ key ].copy( material[ key ] );

						} else if ( typeof material[ key ] === 'number' ) {

							newMaterial[ key ] = material[ key ];

						}

					}

				}

				newMaterial.opacity = 1.0;
				newMaterial.transmission = 1.0;
				newMaterial.ior = ior;
				const hsl = {};
				newMaterial.color.getHSL( hsl );
				hsl.l = Math.max( hsl.l, 0.35 );
				newMaterial.color.setHSL( hsl.h, hsl.s, hsl.l );
				c.material = newMaterial;

			}

		}

	} );

}

async function updateModel() {

	if ( gui ) {

		document.body.classList.remove( 'checkerboard' );

	}

	const modelInfo = models[ params.model ];

	renderer.domElement.style.visibility = 'hidden';
	loader.setPercentage( 0 );

	if ( model ) {

		model.traverse( c => {

			if ( c.material ) {

				const material = c.material;
				for ( const key in material ) {

					if ( material[ key ] && material[ key ].isTexture ) {

						material[ key ].dispose();

					}

				}

			}

		} );
		scene.remove( model );
		model = null;
		if ( mixer ) {

			mixer.stopAllAction();
			mixer = null;

		}

	}

	try {

		gltf = await new GLTFLoader()
			.setMeshoptDecoder( MeshoptDecoder )
			.loadAsync( modelInfo.url, progress => {

				if ( progress.total !== 0 && progress.total >= progress.loaded ) {

					loader.setPercentage( 0.5 * progress.loaded / progress.total );

				}

			} );

		model = gltf.scene;
		scene.add( model );

		// Apply per-model scale factor
		const scaleFactor = modelInfo.scaleFactor || 1;
		model.scale.setScalar( scaleFactor );

		// Center the model
		const box = new THREE.Box3().setFromObject( model );
		const center = new THREE.Vector3();
		box.getCenter( center );
		model.position
			.addScaledVector( box.min, - 0.5 )
			.addScaledVector( box.max, - 0.5 );

		// Update floor plane
		box.setFromObject( model );
		floorPlane.position.y = box.min.y;

		// Update camera only if model changes
		if ( params.model !== lastModel ) {

			perspectiveCamera.position.set( modelInfo.camera_X, modelInfo.camera_Y, modelInfo.camera_Z );
			orthoCamera.position.set( modelInfo.camera_X, modelInfo.camera_Y, modelInfo.camera_Z );
			perspectiveCamera.rotation.set(
				THREE.MathUtils.degToRad( modelInfo.camera_thetaX || 0 ),
				THREE.MathUtils.degToRad( modelInfo.camera_thetaY || 0 ),
				THREE.MathUtils.degToRad( modelInfo.camera_thetaZ || 0 )
			);
			orthoCamera.rotation.set(
				THREE.MathUtils.degToRad( modelInfo.camera_thetaX || 0 ),
				THREE.MathUtils.degToRad( modelInfo.camera_thetaY || 0 ),
				THREE.MathUtils.degToRad( modelInfo.camera_thetaZ || 0 )
			);

			controls.target.copy( center );
			controls.update();
			pathTracer.updateCamera();

			lastModel = params.model;

		}

		// Handle animations
		if ( gltf.animations && gltf.animations.length > 0 ) {

			mixer = new THREE.AnimationMixer( model );
			const clip = gltf.animations[ 0 ];
			const action = mixer.clipAction( clip );

			const fps = 30;
			const frameTime = params.frame / fps;
			const clampedTime = Math.min( Math.max( frameTime, 0 ), clip.duration );

			action.reset();
			action.play();
			mixer.update( clampedTime );
			action.paused = true;

			model.updateMatrixWorld( true );
			model.traverse( object => {

				if ( object.isMesh && object.geometry ) {

					object.geometry.computeVertexNormals();
					object.geometry.attributes.position.needsUpdate = true;
					if ( object.geometry.attributes.normal ) {

						object.geometry.attributes.normal.needsUpdate = true;

					}

				}

			} );

		}

		if ( modelInfo.opacityToTransmission ) {

			convertOpacityToTransmission( model, modelInfo.ior || 1.5 );

		}

		model.traverse( c => {

			if ( c.material ) {

				c.material.thickness = 1.0;

			}

		} );

		if ( modelInfo.postProcess ) {

			modelInfo.postProcess( model );

		}

		if ( modelInfo.rotation ) {

			model.rotation.set( ...modelInfo.rotation );

		}

		await pathTracer.setSceneAsync( scene, activeCamera, {
			onProgress: v => loader.setPercentage( 0.5 + 0.5 * v ),
		} );

		loader.setPercentage( 1 );
		loader.setCredits( modelInfo.credit || '' );

		buildGui();
		onParamsChange();

		renderer.domElement.style.visibility = 'visible';
		if ( params.checkerboardTransparency ) {

			document.body.classList.add( 'checkerboard' );

		}

	} catch ( err ) {

		loader.setCredits( 'Failed to load model: ' + err.message );
		loader.setPercentage( 1 );

	}

}
