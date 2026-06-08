import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, url);
  const [hovered, setHover] = useState(false);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate mouse position mapped to rotation angles
    if (hovered) {
      targetRotation.current.x = (state.pointer.y * Math.PI) / 8; // Tilt up/down
      targetRotation.current.y = (state.pointer.x * Math.PI) / 8; // Tilt left/right
    } else {
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
    }

    // Smoothly interpolate (lerp) current rotation to target rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetRotation.current.x, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation.current.y, 0.1);
  });

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* The plane that holds the image */}
      <planeGeometry args={[4, 5.5, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.2} 
        metalness={0.1} 
      />
    </mesh>
  );
}

export default function ImageCard3D({ imageUrl, altText }: { imageUrl: string, altText: string }) {
  return (
    <div className="w-full h-full relative cursor-none group">
      {/* 3D Canvas Context */}
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Complex lighting setup to give it a glossy, premium photo finish */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#c6a85b" />
        <Model url={imageUrl} />
      </Canvas>
      
      {/* Fallback/Accessibility Layer */}
      <span className="sr-only">{altText}</span>
    </div>
  );
}