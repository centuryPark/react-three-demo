'use client';

import { Canvas } from '@react-three/fiber';
import BoxScale from './components/box';
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight color="#fff" intensity={1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <BoxScale position={[1, 0, 0]} />
        <BoxScale position={[-1, 0, 0]} />
      </Canvas>
    </main>
  );
}
