'use client';

import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import styles from "../page.module.css";
import { useEffect, useRef } from 'react';
import { PerspectiveCamera, Stats, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* 
camera={{
          position: [100, 200, 300],
          fov: 45, // 摄像机视锥体垂直视野角度
          aspect: window.innerWidth / window.innerHeight, // 摄像机视锥体长宽比
          near: 1, //摄像机视锥体近端面
          far: 2000, //摄像机视锥体远端面

        }}
*/

const Modal = () => {
  const groupRef = useRef<any>(null!);
  const fbx = useLoader(FBXLoader, '/models/Samba Dancing.fbx');
  let mixer: any;
  if (fbx.animations.length) {
    mixer = new THREE.AnimationMixer(fbx);
    const action = mixer.clipAction(fbx.animations[0]);
    action.play();
  }

  fbx.traverse(function (child: any) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((state, delta) => {
    mixer?.update(delta)
  })

  return (
    <primitive ref={groupRef} object={fbx} position={[10, 0, 0]} />
  )
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <main ref={containerRef} className={styles.main}>
      <Canvas shadows>
        <OrbitControls target={[0, 100, 0]} />
        <PerspectiveCamera
          position={[100, 200, 500]}
          fov={45}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={1000}
          castShadow
          makeDefault />
        <color attach="background" args={['#a0a0a0']} />
        <fog attach="fog" color="#a0a0a0" near={200} far={1000} />
        <hemisphereLight position={[0, 200, 0]} args={['#ffffff', '#444', 5]} />
        <directionalLight
          args={['#fff', 5]}
          castShadow
          position={[0, 200, 100]}>
          <orthographicCamera attach="shadow-camera" args={[-100, 150, 300, -200]} />
        </directionalLight>
        <mesh
          receiveShadow
          rotation={[- Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeGeometry attach="geometry" args={[20000, 20000]} />
          <meshStandardMaterial attach="material" color="#000" depthWrite={false} />
        </mesh>
        <gridHelper
          position={[0, 0, 0]}
          args={[2000, 20, 0x000000, 0x000000]}
        >
        </gridHelper>
        <Stats />
        <Modal />
      </Canvas>
    </main>
  );
}
