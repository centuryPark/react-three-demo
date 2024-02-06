import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'

const BoxScale = ({ position, size = [1, 1, 1] } : any) => {
  const boxRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_state, delta) => (boxRef.current.rotation.x += delta))

  return (
    <mesh
      ref={boxRef}
      castShadow
      position={position}
      scale={active ? 1.2 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(false)}
      onPointerOut={() => setHover(true)}
    >
      <boxGeometry
        args={size}
      />
      <meshStandardMaterial color={hovered ? 'yellow' : 'orange'} />
    </mesh>
  )
}

export default BoxScale;
