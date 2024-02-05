'use client';

import { Canvas } from '@react-three/fiber';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import styles from "../page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight color="#fff" intensity={1} />
        <directionalLight color="red" position={[0, 0, 5]} />
      </Canvas>
    </main>
  );
}
