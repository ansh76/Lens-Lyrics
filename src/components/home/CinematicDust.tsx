import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export default function CinematicDust() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        {/* Floating cinematic dust motes */}
        <Sparkles 
          count={300} 
          scale={15} 
          size={1.5} 
          speed={0.2} 
          opacity={0.4} 
          color="#c6a85b" // Gold tint
          noise={1}
        />
        <Sparkles 
          count={100} 
          scale={20} 
          size={3} 
          speed={0.1} 
          opacity={0.1} 
          color="#ffffff" 
        />
      </Canvas>
    </div>
  );
}