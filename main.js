import { loadGLTF } from "./assets/applications/libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/applications/assets/targets/ehtargets.mind',
            //imageTargetSrc: './assets/applications/assets/targets/target_eh-card.mind',
        });
        const { renderer, scene, camera } = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const gltf = await loadGLTF('./assets/applications/assets/models/statue/scene.gltf');
        gltf.scene.scale.set(0.4, 0.4, 0.4);
       // gltf.scene.scale.set(0.4, 0.4, 0.4);
        gltf.scene.position.set(5, 0, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(gltf.scene);

        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const clock = new THREE.Clock();

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();
            gltf.scene.rotation.set(0, gltf.scene.rotation.y + delta, 0);
            mixer.update(delta);
            renderer.render(scene, camera);
        });
    }
    start();
});