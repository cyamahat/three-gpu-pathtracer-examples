// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fj5J1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _meshoptDecoderModuleJs = require("three/examples/jsm/libs/meshopt_decoder.module.js");
var _rgbeloaderJs = require("three/examples/jsm/loaders/RGBELoader.js");
var _gltfloaderJs = require("three/examples/jsm/loaders/GLTFLoader.js");
var _lilGuiModuleMinJs = require("three/examples/jsm/libs/lil-gui.module.min.js");
var _statsModuleJs = require("three/examples/jsm/libs/stats.module.js");
var _statsModuleJsDefault = parcelHelpers.interopDefault(_statsModuleJs);
var _generateRadialFloorTextureJs = require("./utils/generateRadialFloorTexture.js");
var _indexJs = require("../src/index.js");
var _orbitControlsJs = require("three/examples/jsm/controls/OrbitControls.js");
var _getScaledSettingsJs = require("./utils/getScaledSettings.js");
var _loaderElementJs = require("./utils/LoaderElement.js");
var _parallelMeshBVHWorkerJs = require("three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js");
const MODEL_LIST = {
    "Panoramic Telescope": {
        url: "./cartoon_octopus_takes_a_tea_bath/panoramic_telescope_2025-05-25.glb",
        credit: "Panoramic Telescope (Rundblickfernrohr)",
        opacityToTransmission: true,
        camera_X: 1.84,
        camera_Y: -0.46,
        camera_Z: -0.26,
        camera_thetaX: 125,
        camera_thetaY: 75,
        camera_thetaZ: -125,
        scaleFactor: 0.008,
        frames: 90,
        postProcess (model) {
            const toRemove = [];
            model.updateMatrixWorld();
            model.traverse((c)=>{
                if (c.material) {
                    c.material.emissiveIntensity = 0;
                    if (c.material instanceof _three.MeshPhysicalMaterial) {
                        const material = c.material;
                        material.metalness = 0.0;
                        if (material.transmission === 1.0) {
                            material.roughness = 0.0;
                            material.metalness = 0.0;
                            if (c.name.includes("29")) {
                                material.ior = 1.52;
                                material.color.set(0xffffff);
                            } else material.ior = 1.52;
                        }
                    } else if (c.material.opacity < 1.0) toRemove.push(c);
                }
            });
            toRemove.forEach((c)=>c.parent.remove(c));
        }
    },
    "Dove Prism": {
        url: "./cartoon_octopus_takes_a_tea_bath/octopus_vs_dove_prism_2025-05-23.glb",
        credit: "Dove prism + Octopus (https://skfb.ly/oqIRG)",
        opacityToTransmission: true,
        camera_X: -0.1,
        camera_Y: 0.1,
        camera_Z: 10,
        camera_thetaX: -0.883,
        camera_thetaY: -0.519,
        camera_thetaZ: -0.008,
        scaleFactor: 0.06,
        frames: 360,
        postProcess (model) {
            const toRemove = [];
            model.updateMatrixWorld();
            model.traverse((c)=>{
                if (c.material) {
                    c.material.emissiveIntensity = 0;
                    if (c.material instanceof _three.MeshPhysicalMaterial) {
                        const material = c.material;
                        material.metalness = 0.0;
                        if (material.transmission === 1.0) {
                            material.roughness = 0.0;
                            material.metalness = 0.0;
                            if (c.name.includes("29")) {
                                material.ior = 1.52;
                                material.color.set(0xffffff);
                            } else material.ior = 1.52;
                        }
                    } else if (c.material.opacity < 1.0) toRemove.push(c);
                }
            });
            toRemove.forEach((c)=>c.parent.remove(c));
        }
    },
    "Right-Angle Prism": {
        url: "./cartoon_octopus_takes_a_tea_bath/octopus_vs_right-angle_prism_2025-05-25.glb",
        credit: "Right-angle prism + Octopus (https://skfb.ly/oqIRG)",
        opacityToTransmission: true,
        camera_X: 0,
        camera_Y: 1.5,
        camera_Z: 0.075,
        camera_thetaX: -90,
        camera_thetaY: 0,
        camera_thetaZ: 180,
        scaleFactor: 0.015,
        frames: 360,
        postProcess (model) {
            const toRemove = [];
            model.updateMatrixWorld();
            model.traverse((c)=>{
                if (c.material) {
                    c.material.emissiveIntensity = 0;
                    if (c.material instanceof _three.MeshPhysicalMaterial) {
                        const material = c.material;
                        material.metalness = 0.0;
                        if (material.transmission === 1.0) {
                            material.roughness = 0.0;
                            material.metalness = 0.0;
                            if (c.name.includes("29")) {
                                material.ior = 1.52;
                                material.color.set(0xffffff);
                            } else material.ior = 1.52;
                        }
                    } else if (c.material.opacity < 1.0) toRemove.push(c);
                }
            });
            toRemove.forEach((c)=>c.parent.remove(c));
        }
    },
    "Amici Roof Prism": {
        url: "./cartoon_octopus_takes_a_tea_bath/octopus_vs_amici_prism_2025-05-25.glb",
        credit: "Amici roof prism + Octopus (https://skfb.ly/oqIRG)",
        opacityToTransmission: true,
        camera_X: 0,
        camera_Y: 1.5,
        camera_Z: 0.075,
        camera_thetaX: -90,
        camera_thetaY: 0,
        camera_thetaZ: 180,
        scaleFactor: 0.015,
        frames: 360,
        postProcess (model) {
            const toRemove = [];
            model.updateMatrixWorld();
            model.traverse((c)=>{
                if (c.material) {
                    c.material.emissiveIntensity = 0;
                    if (c.material instanceof _three.MeshPhysicalMaterial) {
                        const material = c.material;
                        material.metalness = 0.0;
                        if (material.transmission === 1.0) {
                            material.roughness = 0.0;
                            material.metalness = 0.0;
                            if (c.name.includes("29")) {
                                material.ior = 1.52;
                                material.color.set(0xffffff);
                            } else material.ior = 1.52;
                        }
                    } else if (c.material.opacity < 1.0) toRemove.push(c);
                }
            });
            toRemove.forEach((c)=>c.parent.remove(c));
        }
    }
};
const envMaps = {
    "Aristea Wreck Puresky": "https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/aristea_wreck_puresky_2k.hdr",
    "Peppermint Powerplant": "https://raw.githubusercontent.com/gkjohnson/3d-demo-data/master/hdri/peppermint_powerplant_2k.hdr"
};
const models = MODEL_LIST;
const urlParams = new URLSearchParams(window.location.search);
const initialFrame = parseInt(urlParams.get("frame")) || 0;
const orthoWidth = 2;
const params = {
    multipleImportanceSampling: false,
    acesToneMapping: true,
    renderScale: 1 / window.devicePixelRatio,
    frame: initialFrame,
    model: "",
    envMap: envMaps["Aristea Wreck Puresky"],
    environmentIntensity: 0.4,
    environmentRotation: 0,
    cameraProjection: "Perspective",
    backgroundType: "Environment",
    bgGradientTop: "#ada8f0",
    bgGradientBottom: "#b3b3b3",
    backgroundBlur: 0.5,
    transparentBackground: false,
    checkerboardTransparency: false,
    enable: true,
    floorColor: "#111111",
    floorOpacity: 0,
    floorRoughness: 0.2,
    floorMetalness: 0.2,
    downloadImage: ()=>{
        const canvas = renderer.domElement;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "render_frame_" + params.frame + ".png";
        link.click();
    },
    ...(0, _getScaledSettingsJs.getScaledSettings)(),
    bounces: 6,
    filterGlossyFactor: 0,
    tiles: 2
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
    loader = new (0, _loaderElementJs.LoaderElement)();
    loader.attach(document.body);
    renderer = new _three.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.toneMapping = _three.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);
    pathTracer = new (0, _indexJs.WebGLPathTracer)(renderer);
    pathTracer.setBVHWorker(new (0, _parallelMeshBVHWorkerJs.ParallelMeshBVHWorker)());
    pathTracer.physicallyCorrectLights = true;
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.transmissiveBounces = params.bounces;
    const aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera = new _three.PerspectiveCamera(40, aspect, 0.025, 500);
    orthoCamera = new _three.OrthographicCamera(orthoWidth / -2, orthoWidth / 2, orthoWidth / aspect / 2, orthoWidth / aspect / -2, -500, 500);
    controls = new (0, _orbitControlsJs.OrbitControls)(perspectiveCamera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.addEventListener("change", ()=>{
        pathTracer.updateCamera();
        console.log(`Camera position (OrbitControls): x=${activeCamera.position.x.toFixed(3)}, y=${activeCamera.position.y.toFixed(3)}, z=${activeCamera.position.z.toFixed(3)}`);
        console.log(`Camera rotation (OrbitControls): x=${_three.MathUtils.radToDeg(activeCamera.rotation.x).toFixed(3)}, y=${_three.MathUtils.radToDeg(activeCamera.rotation.y).toFixed(3)}, z=${_three.MathUtils.radToDeg(activeCamera.rotation.z).toFixed(3)}`);
        console.log(`OrbitControls target: x=${controls.target.x.toFixed(3)}, y=${controls.target.y.toFixed(3)}, z=${controls.target.z.toFixed(3)}`);
    });
    onHashChange();
    const selectedModel = models[params.model] || models[Object.keys(models)[0]];
    perspectiveCamera.position.set(selectedModel.camera_X, selectedModel.camera_Y, selectedModel.camera_Z);
    orthoCamera.position.set(selectedModel.camera_X, selectedModel.camera_Y, selectedModel.camera_Z);
    perspectiveCamera.rotation.set(_three.MathUtils.degToRad(selectedModel.camera_thetaX || 0), _three.MathUtils.degToRad(selectedModel.camera_thetaY || 0), _three.MathUtils.degToRad(selectedModel.camera_thetaZ || 0));
    orthoCamera.rotation.set(_three.MathUtils.degToRad(selectedModel.camera_thetaX || 0), _three.MathUtils.degToRad(selectedModel.camera_thetaY || 0), _three.MathUtils.degToRad(selectedModel.camera_thetaZ || 0));
    updateCameraProjection(params.cameraProjection);
    console.log(`Initial camera position: x=${activeCamera.position.x.toFixed(3)}, y=${activeCamera.position.y.toFixed(3)}, z=${activeCamera.position.z.toFixed(3)}`);
    console.log(`Initial camera rotation: x=${_three.MathUtils.radToDeg(activeCamera.rotation.x).toFixed(3)}, y=${_three.MathUtils.radToDeg(activeCamera.rotation.y).toFixed(3)}, z=${_three.MathUtils.radToDeg(activeCamera.rotation.z).toFixed(3)}`);
    gradientMap = new (0, _indexJs.GradientEquirectTexture)();
    gradientMap.topColor.set(params.bgGradientTop);
    gradientMap.bottomColor.set(params.bgGradientBottom);
    gradientMap.update();
    scene = new _three.Scene();
    scene.background = gradientMap;
    const floorTex = (0, _generateRadialFloorTextureJs.generateRadialFloorTexture)(1024);
    floorPlane = new _three.Mesh(new _three.PlaneGeometry(), new _three.MeshStandardMaterial({
        map: floorTex,
        transparent: true,
        color: 0x111111,
        roughness: 0.1,
        metalness: 0.0,
        side: _three.DoubleSide
    }));
    floorPlane.scale.setScalar(5);
    floorPlane.rotation.x = -Math.PI / 2;
    scene.add(floorPlane);
    stats = new (0, _statsModuleJsDefault.default)();
    document.body.appendChild(stats.dom);
    stats.dom.style.display = "none"; // Hide the Stats Container
    // Load environment map
    await new Promise((resolve)=>{
        new (0, _rgbeloaderJs.RGBELoader)().load(params.envMap, (texture)=>{
            if (scene.environment) scene.environment.dispose();
            texture.mapping = _three.EquirectangularReflectionMapping;
            scene.environment = texture;
            pathTracer.updateEnvironment();
            console.log("Environment map loaded:", params.envMap);
            resolve();
        }, undefined, (err)=>{
            console.error("Failed to load environment map:", err);
            resolve(); // Continue even if loading fails
        });
    });
    onResize();
    buildGui();
    onParamsChange();
    animate();
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);
}
function animate() {
    requestAnimationFrame(animate);
    stats.update();
    // Optional: Log camera position and rotation if changed
    if (activeCamera) {
        const pos = activeCamera.position;
        const rot = activeCamera.rotation;
        const target = controls.target;
        if (!animate.lastLoggedPosition || pos.x !== animate.lastLoggedPosition.x || pos.y !== animate.lastLoggedPosition.y || pos.z !== animate.lastLoggedPosition.z || rot.x !== animate.lastLoggedRotation?.x || rot.y !== animate.lastLoggedRotation?.y || rot.z !== animate.lastLoggedRotation?.z) {
            console.log(`Camera position (animate): x=${pos.x.toFixed(3)}, y=${pos.y.toFixed(3)}, z=${pos.z.toFixed(3)}`);
            console.log(`Camera rotation (animate): x=${_three.MathUtils.radToDeg(rot.x).toFixed(3)}, y=${_three.MathUtils.radToDeg(rot.y).toFixed(3)}, z=${_three.MathUtils.radToDeg(rot.z).toFixed(3)}`);
            console.log(`OrbitControls target (animate): x=${target.x.toFixed(3)}, y=${target.y.toFixed(3)}, z=${target.z.toFixed(3)}`);
            animate.lastLoggedPosition = pos.clone();
            animate.lastLoggedRotation = rot.clone();
            animate.lastLoggedTarget = target.clone();
        }
    }
    if (!model) return;
    if (params.enable) {
        if (!params.pause || pathTracer.samples < 1) pathTracer.renderSample();
    } else renderer.render(scene, activeCamera);
    loader.setSamples(pathTracer.samples, pathTracer.isCompiling);
}
function onParamsChange() {
    pathTracer.multipleImportanceSampling = params.multipleImportanceSampling;
    pathTracer.bounces = params.bounces;
    pathTracer.filterGlossyFactor = params.filterGlossyFactor;
    pathTracer.renderScale = params.renderScale;
    floorPlane.material.color.set(params.floorColor);
    floorPlane.material.roughness = params.floorRoughness;
    floorPlane.material.metalness = params.floorMetalness;
    floorPlane.material.opacity = params.floorOpacity;
    scene.environmentIntensity = params.environmentIntensity;
    scene.environmentRotation.y = params.environmentRotation;
    scene.backgroundBlurriness = params.backgroundBlur;
    if (params.backgroundType === "Gradient") {
        gradientMap.topColor.set(params.bgGradientTop);
        gradientMap.bottomColor.set(params.bgGradientBottom);
        gradientMap.update();
        scene.background = gradientMap;
        scene.backgroundIntensity = 1;
        scene.environmentRotation.y = 0;
        console.log("Background set to Gradient"); // Debug
    } else {
        scene.background = scene.environment;
        scene.backgroundIntensity = params.environmentIntensity;
        scene.backgroundRotation.y = params.environmentRotation;
        console.log("Background set to Environment"); // Debug
    }
    if (params.transparentBackground) {
        scene.background = null;
        renderer.setClearAlpha(0);
        console.log("Background set to transparent"); // Debug
    }
    // Handle frame update
    if (model && mixer && gltf && gltf.animations && gltf.animations.length > 0) {
        const clip = gltf.animations[0];
        const action = mixer.clipAction(clip);
        const fps = 30;
        const frameTime = params.frame / fps;
        const clampedTime = Math.min(Math.max(frameTime, 0), clip.duration);
        action.reset();
        action.play();
        mixer.update(clampedTime);
        action.paused = true;
        model.updateMatrixWorld(true);
    }
    pathTracer.updateMaterials();
    pathTracer.updateEnvironment();
    pathTracer.samples = 0; // Force re-render
    console.log("Path tracer environment updated"); // Debug
    // Force render for standard mode
    if (!params.enable) renderer.render(scene, activeCamera);
}
function onHashChange() {
    let hashModel = "";
    if (window.location.hash) {
        const modelName = decodeURI(window.location.hash.substring(1));
        if (modelName in models) hashModel = modelName;
    }
    if (!(hashModel in models)) hashModel = Object.keys(models)[0];
    params.model = hashModel;
    updateModel();
}
function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio;
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    const aspect = w / h;
    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();
    const orthoHeight = orthoWidth / aspect;
    orthoCamera.top = orthoHeight / 2;
    orthoCamera.bottom = orthoHeight / -2;
    orthoCamera.updateProjectionMatrix();
    pathTracer.updateCamera();
}
function buildGui() {
    if (gui) gui.destroy();
    gui = new (0, _lilGuiModuleMinJs.GUI)();
    gui.add(params, "model", Object.keys(models)).name("3D Model").onChange((v)=>{
        window.location.hash = v;
    });
    const frameCount = MODEL_LIST[params.model].frames || 100;
    gui.add(params, "cameraProjection", [
        "Perspective",
        "Orthographic"
    ]).name("Camera Projection").onChange((v)=>{
        updateCameraProjection(v);
    });
    gui.add(params, "frame", 0, frameCount, 5).name("Frame #").onChange((value)=>{
        // Live update logic (no reload)
        onParamsChange(value);
    }).onFinishChange((value)=>{
        // Updated frame in URL
        const url = new URL(window.location);
        url.searchParams.set("frame", value);
        history.pushState({}, "", url); // Update URL without reloading
        if (params.enable) updateModel();
    });
    gui.add(params, "downloadImage").name("Download Image");
    const pathTracingFolder = gui.addFolder("Path Tracer");
    pathTracingFolder.add(params, "enable").name("Enable PBR Path Tracing").onChange(updateModel);
    pathTracingFolder.add(params, "multipleImportanceSampling").onChange(onParamsChange);
    pathTracingFolder.add(params, "acesToneMapping").onChange((v)=>{
        renderer.toneMapping = v ? _three.ACESFilmicToneMapping : _three.NoToneMapping;
    });
    pathTracingFolder.add(params, "bounces", 1, 20, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, "filterGlossyFactor", 0, 1).onChange(onParamsChange);
    pathTracingFolder.add(params, "renderScale", 0.1, 1.0, 0.01).onChange(onParamsChange);
    pathTracingFolder.add(params, "tiles", 1, 10, 1).onChange((v)=>{
        pathTracer.tiles.set(v, v);
    });
    pathTracingFolder.open();
    const environmentFolder = gui.addFolder("Environment");
    environmentFolder.add(params, "envMap", envMaps).name("map").onChange(updateEnvMap);
    environmentFolder.add(params, "environmentIntensity", 0.0, 10.0).onChange(onParamsChange).name("intensity");
    environmentFolder.add(params, "environmentRotation", 0, 2 * Math.PI).onChange(onParamsChange);
    environmentFolder.open();
    const backgroundFolder = gui.addFolder("Background");
    backgroundFolder.add(params, "backgroundType", [
        "Environment",
        "Gradient"
    ]).onChange(onParamsChange);
    backgroundFolder.addColor(params, "bgGradientTop").onChange(onParamsChange);
    backgroundFolder.addColor(params, "bgGradientBottom").onChange(onParamsChange);
    backgroundFolder.add(params, "backgroundBlur", 0, 1).onChange(onParamsChange);
    backgroundFolder.add(params, "transparentBackground", 0, 1).onChange(onParamsChange);
    backgroundFolder.add(params, "checkerboardTransparency").onChange((v)=>{
        if (v) document.body.classList.add("checkerboard");
        else document.body.classList.remove("checkerboard");
    });
    backgroundFolder.open();
    const floorFolder = gui.addFolder("Floor");
    floorFolder.addColor(params, "floorColor").onChange(onParamsChange);
    floorFolder.add(params, "floorRoughness", 0, 1).onChange(onParamsChange);
    floorFolder.add(params, "floorMetalness", 0, 1).onChange(onParamsChange);
    floorFolder.add(params, "floorOpacity", 0, 1).onChange(onParamsChange);
    floorFolder.close();
}
function updateEnvMap() {
    new (0, _rgbeloaderJs.RGBELoader)().load(params.envMap, (texture)=>{
        if (scene.environment) scene.environment.dispose();
        texture.mapping = _three.EquirectangularReflectionMapping;
        scene.environment = texture;
        pathTracer.updateEnvironment();
        console.log("Environment map updated:", params.envMap); // Debug
        if (params.backgroundType === "Environment") {
            scene.background = scene.environment;
            scene.backgroundIntensity = params.environmentIntensity;
            scene.backgroundRotation.y = params.environmentRotation;
            pathTracer.samples = 0; // Force re-render
            console.log("Background set to Environment after map update"); // Debug
            if (!params.enable) renderer.render(scene, activeCamera); // Force standard render
        }
        onParamsChange();
    }, undefined, (err)=>{
        console.error("Failed to load environment map:", err);
    });
}
function updateCameraProjection(cameraProjection) {
    if (activeCamera) {
        perspectiveCamera.position.copy(activeCamera.position);
        orthoCamera.position.copy(activeCamera.position);
        perspectiveCamera.rotation.copy(activeCamera.rotation);
        orthoCamera.rotation.copy(activeCamera.rotation);
    }
    if (cameraProjection === "Perspective") activeCamera = perspectiveCamera;
    else activeCamera = orthoCamera;
    controls.object = activeCamera;
    controls.update();
    pathTracer.setCamera(activeCamera);
    // Log the camera position and rotation after switching projection
    console.log(`Camera position after projection change (${cameraProjection}): x=${activeCamera.position.x.toFixed(3)}, y=${activeCamera.position.y.toFixed(3)}, z=${activeCamera.position.z.toFixed(3)}`);
    console.log(`Camera rotation after projection change (${cameraProjection}): x=${_three.MathUtils.radToDeg(activeCamera.rotation.x).toFixed(3)}, y=${_three.MathUtils.radToDeg(activeCamera.rotation.y).toFixed(3)}, z=${_three.MathUtils.radToDeg(activeCamera.rotation.z).toFixed(3)}`);
    console.log(`OrbitControls target after projection change (${cameraProjection}): x=${controls.target.x.toFixed(3)}, y=${controls.target.y.toFixed(3)}, z=${controls.target.z.toFixed(3)}`);
}
function convertOpacityToTransmission(model, ior) {
    model.traverse((c)=>{
        if (c.material) {
            const material = c.material;
            if (material.opacity < 0.65 && material.opacity > 0.2) {
                const newMaterial = new _three.MeshPhysicalMaterial();
                for(const key in material)if (key in material) {
                    if (material[key] === null) continue;
                    if (material[key].isTexture) newMaterial[key] = material[key];
                    else if (material[key].copy && material[key].constructor === newMaterial[key].constructor) newMaterial[key].copy(material[key]);
                    else if (typeof material[key] === "number") newMaterial[key] = material[key];
                }
                newMaterial.opacity = 1.0;
                newMaterial.transmission = 1.0;
                newMaterial.ior = ior;
                const hsl = {};
                newMaterial.color.getHSL(hsl);
                hsl.l = Math.max(hsl.l, 0.35);
                newMaterial.color.setHSL(hsl.h, hsl.s, hsl.l);
                c.material = newMaterial;
            }
        }
    });
}
async function updateModel() {
    if (gui) document.body.classList.remove("checkerboard");
    const modelInfo = models[params.model];
    renderer.domElement.style.visibility = "hidden";
    loader.setPercentage(0);
    if (model) {
        model.traverse((c)=>{
            if (c.material) {
                const material = c.material;
                for(const key in material)if (material[key] && material[key].isTexture) material[key].dispose();
            }
        });
        scene.remove(model);
        model = null;
        if (mixer) {
            mixer.stopAllAction();
            mixer = null;
        }
    }
    try {
        gltf = await new (0, _gltfloaderJs.GLTFLoader)().setMeshoptDecoder((0, _meshoptDecoderModuleJs.MeshoptDecoder)).loadAsync(modelInfo.url, (progress)=>{
            if (progress.total !== 0 && progress.total >= progress.loaded) loader.setPercentage(0.5 * progress.loaded / progress.total);
        });
        model = gltf.scene;
        scene.add(model);
        // Apply per-model scale factor
        const scaleFactor = modelInfo.scaleFactor || 1;
        model.scale.setScalar(scaleFactor);
        // Center the model
        const box = new _three.Box3().setFromObject(model);
        const center = new _three.Vector3();
        box.getCenter(center);
        model.position.addScaledVector(box.min, -0.5).addScaledVector(box.max, -0.5);
        // Update floor plane
        box.setFromObject(model);
        floorPlane.position.y = box.min.y;
        // Update camera only if model changes
        if (params.model !== lastModel) {
            perspectiveCamera.position.set(modelInfo.camera_X, modelInfo.camera_Y, modelInfo.camera_Z);
            orthoCamera.position.set(modelInfo.camera_X, modelInfo.camera_Y, modelInfo.camera_Z);
            perspectiveCamera.rotation.set(_three.MathUtils.degToRad(modelInfo.camera_thetaX || 0), _three.MathUtils.degToRad(modelInfo.camera_thetaY || 0), _three.MathUtils.degToRad(modelInfo.camera_thetaZ || 0));
            orthoCamera.rotation.set(_three.MathUtils.degToRad(modelInfo.camera_thetaX || 0), _three.MathUtils.degToRad(modelInfo.camera_thetaY || 0), _three.MathUtils.degToRad(modelInfo.camera_thetaZ || 0));
            controls.target.copy(center);
            controls.update();
            pathTracer.updateCamera();
            lastModel = params.model;
        }
        // Handle animations
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new _three.AnimationMixer(model);
            const clip = gltf.animations[0];
            const action = mixer.clipAction(clip);
            const fps = 30;
            const frameTime = params.frame / fps;
            const clampedTime = Math.min(Math.max(frameTime, 0), clip.duration);
            action.reset();
            action.play();
            mixer.update(clampedTime);
            action.paused = true;
            model.updateMatrixWorld(true);
            model.traverse((object)=>{
                if (object.isMesh && object.geometry) {
                    object.geometry.computeVertexNormals();
                    object.geometry.attributes.position.needsUpdate = true;
                    if (object.geometry.attributes.normal) object.geometry.attributes.normal.needsUpdate = true;
                }
            });
        }
        if (modelInfo.opacityToTransmission) convertOpacityToTransmission(model, modelInfo.ior || 1.5);
        model.traverse((c)=>{
            if (c.material) c.material.thickness = 1.0;
        });
        if (modelInfo.postProcess) modelInfo.postProcess(model);
        if (modelInfo.rotation) model.rotation.set(...modelInfo.rotation);
        await pathTracer.setSceneAsync(scene, activeCamera, {
            onProgress: (v)=>loader.setPercentage(0.5 + 0.5 * v)
        });
        loader.setPercentage(1);
        loader.setCredits(modelInfo.credit || "");
        buildGui();
        onParamsChange();
        renderer.domElement.style.visibility = "visible";
        if (params.checkerboardTransparency) document.body.classList.add("checkerboard");
    } catch (err) {
        loader.setCredits("Failed to load model: " + err.message);
        loader.setPercentage(1);
    }
}

},{"three":"ktPTu","three/examples/jsm/libs/meshopt_decoder.module.js":"Go3D5","three/examples/jsm/loaders/RGBELoader.js":"cfP3d","three/examples/jsm/loaders/GLTFLoader.js":"dVRsF","three/examples/jsm/libs/lil-gui.module.min.js":"dUXFx","three/examples/jsm/libs/stats.module.js":"6xUSB","./utils/generateRadialFloorTexture.js":"fyW1M","../src/index.js":"8lqZg","three/examples/jsm/controls/OrbitControls.js":"7mqRv","./utils/getScaledSettings.js":"lfwhv","./utils/LoaderElement.js":"h1Zxa","three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js":"iSl3b","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cfP3d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RGBELoader", ()=>RGBELoader);
var _three = require("three");
// https://github.com/mrdoob/three.js/issues/5552
// http://en.wikipedia.org/wiki/RGBE_image_format
class RGBELoader extends (0, _three.DataTextureLoader) {
    constructor(manager){
        super(manager);
        this.type = (0, _three.HalfFloatType);
    }
    // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
    parse(buffer) {
        const /* default error routine.  change this to change error handling */ rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
            switch(rgbe_error_code){
                case rgbe_read_error:
                    throw new Error("THREE.RGBELoader: Read Error: " + (msg || ""));
                case rgbe_write_error:
                    throw new Error("THREE.RGBELoader: Write Error: " + (msg || ""));
                case rgbe_format_error:
                    throw new Error("THREE.RGBELoader: Bad File Format: " + (msg || ""));
                default:
                case rgbe_memory_error:
                    throw new Error("THREE.RGBELoader: Memory Error: " + (msg || ""));
            }
        }, /* offsets to red, green, and blue components in a data (float) pixel */ //RGBE_DATA_RED = 0,
        //RGBE_DATA_GREEN = 1,
        //RGBE_DATA_BLUE = 2,
        /* number of floats per pixel, use 4 since stored in rgba image format */ //RGBE_DATA_SIZE = 4,
        /* flags indicating which fields in an rgbe_header_info are valid */ RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer, lineLimit, consume) {
            const chunkSize = 128;
            lineLimit = !lineLimit ? 1024 : lineLimit;
            let p = buffer.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
            while(0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer.byteLength){
                s += chunk;
                len += chunk.length;
                p += chunkSize;
                chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
            }
            if (-1 < i) {
                /*for (i=l-1; i>=0; i--) {
						byteCode = m.charCodeAt(i);
						if (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;
						else if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;
						if (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate
					}*/ if (false !== consume) buffer.pos += len + i + 1;
                return s + chunk.slice(0, i);
            }
            return false;
        }, /* minimal header reading.  modify if you want to parse more information */ RGBE_ReadHeader = function(buffer) {
            // regexes to parse header info fields
            const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, // RGBE format header struct
            header = {
                valid: 0,
                /* indicate which fields are valid */ string: "",
                /* the actual header string */ comments: "",
                /* comments found in header */ programtype: "RGBE",
                /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */ format: "",
                /* RGBE format, default 32-bit_rle_rgbe */ gamma: 1.0,
                /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */ exposure: 1.0,
                /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */ width: 0,
                height: 0 /* image dimensions, width/height */ 
            };
            let line, match;
            if (buffer.pos >= buffer.byteLength || !(line = fgets(buffer))) rgbe_error(rgbe_read_error, "no header found");
            /* if you want to require the magic token then uncomment the next line */ if (!(match = line.match(magic_token_re))) rgbe_error(rgbe_format_error, "bad initial token");
            header.valid |= RGBE_VALID_PROGRAMTYPE;
            header.programtype = match[1];
            header.string += line + "\n";
            while(true){
                line = fgets(buffer);
                if (false === line) break;
                header.string += line + "\n";
                if ("#" === line.charAt(0)) {
                    header.comments += line + "\n";
                    continue; // comment line
                }
                if (match = line.match(gamma_re)) header.gamma = parseFloat(match[1]);
                if (match = line.match(exposure_re)) header.exposure = parseFloat(match[1]);
                if (match = line.match(format_re)) {
                    header.valid |= RGBE_VALID_FORMAT;
                    header.format = match[1]; //'32-bit_rle_rgbe';
                }
                if (match = line.match(dimensions_re)) {
                    header.valid |= RGBE_VALID_DIMENSIONS;
                    header.height = parseInt(match[1], 10);
                    header.width = parseInt(match[2], 10);
                }
                if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
            }
            if (!(header.valid & RGBE_VALID_FORMAT)) rgbe_error(rgbe_format_error, "missing format specifier");
            if (!(header.valid & RGBE_VALID_DIMENSIONS)) rgbe_error(rgbe_format_error, "missing image size specifier");
            return header;
        }, RGBE_ReadPixels_RLE = function(buffer, w, h) {
            const scanline_width = w;
            if (scanline_width < 8 || scanline_width > 0x7fff || // this file is not run length encoded
            2 !== buffer[0] || 2 !== buffer[1] || buffer[2] & 0x80) // return the flat buffer
            return new Uint8Array(buffer);
            if (scanline_width !== (buffer[2] << 8 | buffer[3])) rgbe_error(rgbe_format_error, "wrong scanline width");
            const data_rgba = new Uint8Array(4 * w * h);
            if (!data_rgba.length) rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
            let offset = 0, pos = 0;
            const ptr_end = 4 * scanline_width;
            const rgbeStart = new Uint8Array(4);
            const scanline_buffer = new Uint8Array(ptr_end);
            let num_scanlines = h;
            // read in each successive scanline
            while(num_scanlines > 0 && pos < buffer.byteLength){
                if (pos + 4 > buffer.byteLength) rgbe_error(rgbe_read_error);
                rgbeStart[0] = buffer[pos++];
                rgbeStart[1] = buffer[pos++];
                rgbeStart[2] = buffer[pos++];
                rgbeStart[3] = buffer[pos++];
                if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) rgbe_error(rgbe_format_error, "bad rgbe scanline format");
                // read each of the four channels for the scanline into the buffer
                // first red, then green, then blue, then exponent
                let ptr = 0, count;
                while(ptr < ptr_end && pos < buffer.byteLength){
                    count = buffer[pos++];
                    const isEncodedRun = count > 128;
                    if (isEncodedRun) count -= 128;
                    if (0 === count || ptr + count > ptr_end) rgbe_error(rgbe_format_error, "bad scanline data");
                    if (isEncodedRun) {
                        // a (encoded) run of the same value
                        const byteValue = buffer[pos++];
                        for(let i = 0; i < count; i++)scanline_buffer[ptr++] = byteValue;
                    //ptr += count;
                    } else {
                        // a literal-run
                        scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
                        ptr += count;
                        pos += count;
                    }
                }
                // now convert data from buffer into rgba
                // first red, then green, then blue, then exponent (alpha)
                const l = scanline_width; //scanline_buffer.byteLength;
                for(let i = 0; i < l; i++){
                    let off = 0;
                    data_rgba[offset] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 1] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 2] = scanline_buffer[i + off];
                    off += scanline_width; //1;
                    data_rgba[offset + 3] = scanline_buffer[i + off];
                    offset += 4;
                }
                num_scanlines--;
            }
            return data_rgba;
        };
        const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;
            destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
            destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
            destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
            destArray[destOffset + 3] = 1;
        };
        const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
            const e = sourceArray[sourceOffset + 3];
            const scale = Math.pow(2.0, e - 128.0) / 255.0;
            // clamping to 65504, the maximum representable value in float16
            destArray[destOffset + 0] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
            destArray[destOffset + 1] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
            destArray[destOffset + 2] = (0, _three.DataUtils).toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
            destArray[destOffset + 3] = (0, _three.DataUtils).toHalfFloat(1);
        };
        const byteArray = new Uint8Array(buffer);
        byteArray.pos = 0;
        const rgbe_header_info = RGBE_ReadHeader(byteArray);
        const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
        let data, type;
        let numElements;
        switch(this.type){
            case 0, _three.FloatType:
                numElements = image_rgba_data.length / 4;
                const floatArray = new Float32Array(numElements * 4);
                for(let j = 0; j < numElements; j++)RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
                data = floatArray;
                type = (0, _three.FloatType);
                break;
            case 0, _three.HalfFloatType:
                numElements = image_rgba_data.length / 4;
                const halfArray = new Uint16Array(numElements * 4);
                for(let j = 0; j < numElements; j++)RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
                data = halfArray;
                type = (0, _three.HalfFloatType);
                break;
            default:
                throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
        }
        return {
            width: w,
            height: h,
            data: data,
            header: rgbe_header_info.string,
            gamma: rgbe_header_info.gamma,
            exposure: rgbe_header_info.exposure,
            type: type
        };
    }
    setDataType(value) {
        this.type = value;
        return this;
    }
    load(url, onLoad, onProgress, onError) {
        function onLoadCallback(texture, texData) {
            switch(texture.type){
                case 0, _three.FloatType:
                case 0, _three.HalfFloatType:
                    texture.colorSpace = (0, _three.LinearSRGBColorSpace);
                    texture.minFilter = (0, _three.LinearFilter);
                    texture.magFilter = (0, _three.LinearFilter);
                    texture.generateMipmaps = false;
                    texture.flipY = true;
                    break;
            }
            if (onLoad) onLoad(texture, texData);
        }
        return super.load(url, onLoadCallback, onProgress, onError);
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xUSB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var Stats = function() {
    var mode = 0;
    var container = document.createElement("div");
    container.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
    container.addEventListener("click", function(event) {
        event.preventDefault();
        showPanel(++mode % container.children.length);
    }, false);
    //
    function addPanel(panel) {
        container.appendChild(panel.dom);
        return panel;
    }
    function showPanel(id) {
        for(var i = 0; i < container.children.length; i++)container.children[i].style.display = i === id ? "block" : "none";
        mode = id;
    }
    //
    var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;
    var fpsPanel = addPanel(new Stats.Panel("FPS", "#0ff", "#002"));
    var msPanel = addPanel(new Stats.Panel("MS", "#0f0", "#020"));
    if (self.performance && self.performance.memory) var memPanel = addPanel(new Stats.Panel("MB", "#f08", "#201"));
    showPanel(0);
    return {
        REVISION: 16,
        dom: container,
        addPanel: addPanel,
        showPanel: showPanel,
        begin: function() {
            beginTime = (performance || Date).now();
        },
        end: function() {
            frames++;
            var time = (performance || Date).now();
            msPanel.update(time - beginTime, 200);
            if (time >= prevTime + 1000) {
                fpsPanel.update(frames * 1000 / (time - prevTime), 100);
                prevTime = time;
                frames = 0;
                if (memPanel) {
                    var memory = performance.memory;
                    memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        },
        update: function() {
            beginTime = this.end();
        },
        // Backwards Compatibility
        domElement: container,
        setMode: showPanel
    };
};
Stats.Panel = function(name, fg, bg) {
    var min = Infinity, max = 0, round = Math.round;
    var PR = round(window.devicePixelRatio || 1);
    var WIDTH = 80 * PR, HEIGHT = 48 * PR, TEXT_X = 3 * PR, TEXT_Y = 2 * PR, GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR, GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;
    var canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = "width:80px;height:48px";
    var context = canvas.getContext("2d");
    context.font = "bold " + 9 * PR + "px Helvetica,Arial,sans-serif";
    context.textBaseline = "top";
    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    return {
        dom: canvas,
        update: function(value, maxValue) {
            min = Math.min(min, value);
            max = Math.max(max, value);
            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect(0, 0, WIDTH, GRAPH_Y);
            context.fillStyle = fg;
            context.fillText(round(value) + " " + name + " (" + round(min) + "-" + round(max) + ")", TEXT_X, TEXT_Y);
            context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
        }
    };
};
exports.default = Stats;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fyW1M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateRadialFloorTexture", ()=>generateRadialFloorTexture);
var _three = require("three");
function generateRadialFloorTexture(dim) {
    const data = new Uint8Array(dim * dim * 4);
    for(let x = 0; x < dim; x++)for(let y = 0; y < dim; y++){
        const xNorm = x / (dim - 1);
        const yNorm = y / (dim - 1);
        const xCent = 2.0 * (xNorm - 0.5);
        const yCent = 2.0 * (yNorm - 0.5);
        let a = Math.max(Math.min(1.0 - Math.sqrt(xCent ** 2 + yCent ** 2), 1.0), 0.0);
        a = a ** 2;
        a = a * 1.5;
        a = Math.min(a, 1.0);
        const i = y * dim + x;
        data[i * 4 + 0] = 255;
        data[i * 4 + 1] = 255;
        data[i * 4 + 2] = 255;
        data[i * 4 + 3] = a * 255;
    }
    const tex = new _three.DataTexture(data, dim, dim);
    tex.format = _three.RGBAFormat;
    tex.type = _three.UnsignedByteType;
    tex.minFilter = _three.LinearFilter;
    tex.magFilter = _three.LinearFilter;
    tex.wrapS = _three.RepeatWrapping;
    tex.wrapT = _three.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lfwhv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getScaledSettings", ()=>getScaledSettings);
function getScaledSettings() {
    let tiles = 3;
    let renderScale = Math.max(1 / window.devicePixelRatio, 0.5);
    // adjust performance parameters for mobile
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio < 0.65) {
        tiles = 4;
        renderScale = 0.5 / window.devicePixelRatio;
    }
    return {
        tiles,
        renderScale
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h1Zxa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LoaderElement", ()=>LoaderElement);
let _styleElement;
function initializeStyles() {
    if (_styleElement) return;
    _styleElement = document.createElement("style");
    _styleElement.textContent = /* css */ `

		.loader-container, .description {
			position: absolute;
			width: 100%;
			font-family: 'Courier New', Courier, monospace;
			color: white;
			font-weight: light;
			align-items: flex-start;
			font-size: 14px;
			pointer-events: none;
			user-select: none;
		}

		.loader-container {
			display: flex;
			flex-direction: column;
			bottom: 0;
		}

		.description {
			top: 0;
			width: 100%;
			text-align: center;
			padding: 5px 0;
		}

		.loader-container .bar {
			height: 2px;
			background: white;
			width: 100%;
		}

		.loader-container .credits,
		.loader-container .samples,
		.loader-container .percentage {
			padding: 5px;
			margin: 0 0 1px 1px;
			background: rgba( 0, 0, 0, 0.2 );
			border-radius: 2px;
			display: inline-block;
		}

		.loader-container:not(.loading) .bar,
		.loader-container:not(.loading) .percentage,
		.loader-container.loading .credits,
		.loader-container.loading .samples,
		.loader-container .credits:empty {
			display: none;
		}

		.loader-container .credits a,
		.loader-container .credits,
		.loader-container .samples {
			color: rgba( 255, 255, 255, 0.75 );
		}
	`;
    document.head.appendChild(_styleElement);
}
class LoaderElement {
    constructor(){
        initializeStyles();
        const container = document.createElement("div");
        container.classList.add("loader-container");
        const percentageEl = document.createElement("div");
        percentageEl.classList.add("percentage");
        container.appendChild(percentageEl);
        const samplesEl = document.createElement("div");
        samplesEl.classList.add("samples");
        container.appendChild(samplesEl);
        const creditsEl = document.createElement("div");
        creditsEl.classList.add("credits");
        container.appendChild(creditsEl);
        const loaderBarEl = document.createElement("div");
        loaderBarEl.classList.add("bar");
        container.appendChild(loaderBarEl);
        const descriptionEl = document.createElement("div");
        descriptionEl.classList.add("description");
        container.appendChild(descriptionEl);
        this._description = descriptionEl;
        this._loaderBar = loaderBarEl;
        this._percentage = percentageEl;
        this._credits = creditsEl;
        this._samples = samplesEl;
        this._container = container;
        this.setPercentage(0);
    }
    attach(container) {
        container.appendChild(this._container);
        container.appendChild(this._description);
    }
    setPercentage(perc) {
        this._loaderBar.style.width = `${perc * 100}%`;
        if (perc === 0) this._percentage.innerText = "Loading...";
        else this._percentage.innerText = `${(perc * 100).toFixed(0)}%`;
        if (perc >= 1) this._container.classList.remove("loading");
        else this._container.classList.add("loading");
    }
    setSamples(count, compiling = false) {
        if (compiling) this._samples.innerText = "compiling shader...";
        else this._samples.innerText = `${Math.floor(count)} samples`;
    }
    setCredits(credits) {
        this._credits.innerHTML = credits;
    }
    setDescription(description) {
        this._description.innerHTML = description;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iSl3b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParallelMeshBVHWorker", ()=>ParallelMeshBVHWorker);
var _three = require("three");
var _meshBVHJs = require("../core/MeshBVH.js");
var _workerBaseJs = require("./utils/WorkerBase.js");
var _bufferUtilsJs = require("../utils/BufferUtils.js");
var _generateMeshBVHWorkerJs = require("./GenerateMeshBVHWorker.js");
var _geometryUtilsJs = require("../core/build/geometryUtils.js");
const DEFAULT_WORKER_COUNT = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 4;
class _ParallelMeshBVHWorker extends (0, _workerBaseJs.WorkerBase) {
    constructor(){
        const worker = new Worker(require("fcf328a20d6da8f8"));
        super(worker);
        this.name = "ParallelMeshBVHWorker";
        this.maxWorkerCount = Math.max(DEFAULT_WORKER_COUNT, 4);
        if (!(0, _bufferUtilsJs.isSharedArrayBufferSupported)()) throw new Error("ParallelMeshBVHWorker: Shared Array Buffers are not supported.");
    }
    runTask(worker, geometry, options = {}) {
        return new Promise((resolve, reject)=>{
            if (!geometry.index && !options.indirect) (0, _geometryUtilsJs.ensureIndex)(geometry, options);
            if (geometry.getAttribute("position").isInterleavedBufferAttribute || geometry.index && geometry.index.isInterleavedBufferAttribute) throw new Error("ParallelMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");
            worker.onerror = (e)=>{
                reject(new Error(`ParallelMeshBVHWorker: ${e.message}`));
            };
            worker.onmessage = (e)=>{
                const { data } = e;
                if (data.error) {
                    reject(new Error(data.error));
                    worker.onmessage = null;
                } else if (data.serialized) {
                    const { serialized, position } = data;
                    const bvh = (0, _meshBVHJs.MeshBVH).deserialize(serialized, geometry, {
                        setIndex: false
                    });
                    const boundsOptions = {
                        setBoundingBox: true,
                        ...options
                    };
                    // we need to replace the arrays because they're neutered entirely by the
                    // webworker transfer.
                    geometry.attributes.position.array = position;
                    if (serialized.index) {
                        if (geometry.index) geometry.index.array = serialized.index;
                        else {
                            const newIndex = new (0, _three.BufferAttribute)(serialized.index, 1, false);
                            geometry.setIndex(newIndex);
                        }
                    }
                    if (boundsOptions.setBoundingBox) geometry.boundingBox = bvh.getBoundingBox(new (0, _three.Box3)());
                    if (options.onProgress) options.onProgress(data.progress);
                    resolve(bvh);
                    worker.onmessage = null;
                } else if (options.onProgress) options.onProgress(data.progress);
            };
            const index = geometry.index ? geometry.index.array : null;
            const position = geometry.attributes.position.array;
            worker.postMessage({
                operation: "BUILD_BVH",
                maxWorkerCount: this.maxWorkerCount,
                index: (0, _bufferUtilsJs.convertToBufferType)(index, SharedArrayBuffer),
                position: (0, _bufferUtilsJs.convertToBufferType)(position, SharedArrayBuffer),
                options: {
                    ...options,
                    onProgress: null,
                    includedProgressCallback: Boolean(options.onProgress),
                    groups: [
                        ...geometry.groups
                    ]
                }
            });
        });
    }
}
class ParallelMeshBVHWorker {
    constructor(){
        if ((0, _bufferUtilsJs.isSharedArrayBufferSupported)()) return new _ParallelMeshBVHWorker();
        else {
            console.warn("ParallelMeshBVHWorker: SharedArrayBuffers not supported. Falling back to single-threaded GenerateMeshBVHWorker.");
            const object = new (0, _generateMeshBVHWorkerJs.GenerateMeshBVHWorker)();
            object.maxWorkerCount = DEFAULT_WORKER_COUNT;
            return object;
        }
    }
}

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","../utils/BufferUtils.js":"gBAF9","./GenerateMeshBVHWorker.js":"3qwBo","../core/build/geometryUtils.js":"ejhro","fcf328a20d6da8f8":"a3V7i","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bGfl5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WorkerBase", ()=>WorkerBase);
class WorkerBase {
    constructor(worker){
        this.name = "WorkerBase";
        this.running = false;
        this.worker = worker;
        this.worker.onerror = (e)=>{
            if (e.message) throw new Error(`${this.name}: Could not create Web Worker with error "${e.message}"`);
            else throw new Error(`${this.name}: Could not create Web Worker.`);
        };
    }
    runTask() {}
    generate(...args) {
        if (this.running) throw new Error("GenerateMeshBVHWorker: Already running job.");
        if (this.worker === null) throw new Error("GenerateMeshBVHWorker: Worker has been disposed.");
        this.running = true;
        const promise = this.runTask(this.worker, ...args);
        promise.finally(()=>{
            this.running = false;
        });
        return promise;
    }
    dispose() {
        this.worker.terminate();
        this.worker = null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3qwBo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GenerateMeshBVHWorker", ()=>GenerateMeshBVHWorker);
var _three = require("three");
var _meshBVHJs = require("../core/MeshBVH.js");
var _workerBaseJs = require("./utils/WorkerBase.js");
class GenerateMeshBVHWorker extends (0, _workerBaseJs.WorkerBase) {
    constructor(){
        const worker = new Worker(require("a30a60cb1342ab0e"));
        super(worker);
        this.name = "GenerateMeshBVHWorker";
    }
    runTask(worker, geometry, options = {}) {
        return new Promise((resolve, reject)=>{
            if (geometry.getAttribute("position").isInterleavedBufferAttribute || geometry.index && geometry.index.isInterleavedBufferAttribute) throw new Error("GenerateMeshBVHWorker: InterleavedBufferAttribute are not supported for the geometry attributes.");
            worker.onerror = (e)=>{
                reject(new Error(`GenerateMeshBVHWorker: ${e.message}`));
            };
            worker.onmessage = (e)=>{
                const { data } = e;
                if (data.error) {
                    reject(new Error(data.error));
                    worker.onmessage = null;
                } else if (data.serialized) {
                    const { serialized, position } = data;
                    const bvh = (0, _meshBVHJs.MeshBVH).deserialize(serialized, geometry, {
                        setIndex: false
                    });
                    const boundsOptions = Object.assign({
                        setBoundingBox: true
                    }, options);
                    // we need to replace the arrays because they're neutered entirely by the
                    // webworker transfer.
                    geometry.attributes.position.array = position;
                    if (serialized.index) {
                        if (geometry.index) geometry.index.array = serialized.index;
                        else {
                            const newIndex = new (0, _three.BufferAttribute)(serialized.index, 1, false);
                            geometry.setIndex(newIndex);
                        }
                    }
                    if (boundsOptions.setBoundingBox) geometry.boundingBox = bvh.getBoundingBox(new (0, _three.Box3)());
                    if (options.onProgress) options.onProgress(data.progress);
                    resolve(bvh);
                    worker.onmessage = null;
                } else if (options.onProgress) options.onProgress(data.progress);
            };
            const index = geometry.index ? geometry.index.array : null;
            const position = geometry.attributes.position.array;
            const transferable = [
                position
            ];
            if (index) transferable.push(index);
            worker.postMessage({
                index,
                position,
                options: {
                    ...options,
                    onProgress: null,
                    includedProgressCallback: Boolean(options.onProgress),
                    groups: [
                        ...geometry.groups
                    ]
                }
            }, transferable.map((arr)=>arr.buffer).filter((v)=>typeof SharedArrayBuffer === "undefined" || !(v instanceof SharedArrayBuffer)));
        });
    }
}

},{"three":"ktPTu","../core/MeshBVH.js":"biELs","./utils/WorkerBase.js":"bGfl5","a30a60cb1342ab0e":"fdDYf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fdDYf":[function(require,module,exports) {
let workerURL = require("e749081da713e3e0");
let bundleURL = require("f5f696cc5788c7cc");
let url = bundleURL.getBundleURL("bOlxE") + "generateMeshBVH.worker.e1a14054.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"e749081da713e3e0":"cn2gM","f5f696cc5788c7cc":"lgJ39"}],"cn2gM":[function(require,module,exports) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? "import " + JSON.stringify(workerUrl) + ";" : "importScripts(" + JSON.stringify(workerUrl) + ");";
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: "application/javascript"
        }));
    }
};

},{}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"a3V7i":[function(require,module,exports) {
let workerURL = require("da62a61870d65f2");
let bundleURL = require("7eb1529063851933");
let url = bundleURL.getBundleURL("bOlxE") + "parallelMeshBVH.worker.fa7afa10.js";
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"da62a61870d65f2":"cn2gM","7eb1529063851933":"lgJ39"}]},["fj5J1"], "fj5J1", "parcelRequire5b70")

//# sourceMappingURL=index.ef8dcd8d.js.map
