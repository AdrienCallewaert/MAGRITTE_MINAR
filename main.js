import { loadGLTF } from "./assets/applications/libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/applications/assets/targets/ehtargets.mind',
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const gltf = await loadGLTF('./assets/applications/assets/models/ehman/GLTF/scene.gltf');
        gltf.scene.scale.set(0.8, 0.8, 0.8);
        gltf.scene.position.set(0, 0, 0);

        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(gltf.scene);

        anchor.onTargetFound = () => {
        console.log("on target found");
        }
        anchor.onTargetLost = () => {
        console.log("on target lost");
        }

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
  }
  start();
});


