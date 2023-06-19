//info for magritte
import { loadGLTF } from "./assets/applications/libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

//info for video émulator
//import { mockWithVideo, mockWithImage } from "./assets/applications/libs/camera-mock.js";
//const THREE = window.MINDAR.IMAGE.THREE;

//-----------------------------------------------------------------------------------------

//mockWithVideo("./assets/applications/assets/mock-videos/ar_magritte.mp4");

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./assets/applications/assets/targets/ehtargets.mind",
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const gltf = await loadGLTF("./assets/applications/assets/models/ehman/GLTF/scene.gltf");
        gltf.scene.scale.set(0.8, 0.8, 0.8);
        gltf.scene.position.set(0, 0, 0);
        //gltf.scene.position.set(0, -1, 0); descend
        //gltf.scene.position.set(-1, 0, 0); avance

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(gltf.scene);

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const clock = new THREE.Clock();

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
          const delta = clock.getDelta();
          // Dev Pack
          gltf.scene.rotation.set(90, 0, 0);
          mixer.update(delta);
          renderer.render(scene, camera);
        });
      }
      start();
    });
    