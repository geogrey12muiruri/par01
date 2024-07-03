import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

const BlazerModel = () => {
  const { scene } = useGLTF('/path/to/blazer-model.glb');

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <primitive object={scene} scale={0.5} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

const BlazerModelWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BlazerModel />
  </Suspense>
);

export default BlazerModelWrapper;
