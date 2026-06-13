import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CameraViewfinderProps {
  src: string;
  alt: string;
}

export default function CameraViewfinder({ src, alt }: CameraViewfinderProps) {
  const [isBlinking, setIsBlinking] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = isHovered || isTapped;

  // Mouse hover tilt/parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.4 };
  const moveX = useSpring(x, springConfig);
  const moveY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Map mouse position relative to center (-25 to 25 px)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    x.set(mouseX * -20); // invert to feel like physical lens tilt
    y.set(mouseY * -20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Blinking REC logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside to clear tapped state
  useEffect(() => {
    if (!isTapped) return;
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsTapped(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTapped]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onClick={() => setIsTapped((prev) => !prev)}
      className={`relative w-full aspect-[3/4] overflow-hidden rounded-sm border bg-black cursor-crosshair select-none group transition-all duration-700 ease-out ${
        isActive 
          ? 'border-gold shadow-[0_0_50px_rgba(198,168,91,0.4)]' 
          : 'border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:border-gold/50 hover:shadow-[0_0_40px_rgba(198,168,91,0.25)]'
      }`}
    >
      {/* Background Image with Parallax & Hover zoom */}
      <motion.div
        style={{
          x: moveX,
          y: moveY,
          scale: 1.15,
        }}
        className="absolute inset-0 w-full h-full will-change-transform transition-all duration-300"
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover contrast-[1.05] transition-all duration-1000 ease-expo ${
            isActive 
              ? 'grayscale-0 brightness-105' 
              : 'grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105'
          }`}
        />
      </motion.div>

      {/* Camera Viewfinder Overlays */}
      
      {/* 1. Vignette shadow */}
      <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply transition-opacity duration-700 ${
        isActive ? 'opacity-75' : 'opacity-90 group-hover:opacity-75'
      }`} />

      {/* 2. Rule of Thirds Grid (Faint dashed lines) */}
      <div className={`absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 transition-opacity duration-700 ${
        isActive ? 'opacity-35' : 'opacity-15 group-hover:opacity-35'
      }`}>
        <div className="border-r border-b border-white/20 border-dashed" />
        <div className="border-r border-b border-white/20 border-dashed" />
        <div className="border-b border-white/20 border-dashed" />
        <div className="border-r border-b border-white/20 border-dashed" />
        <div className="border-r border-b border-white/20 border-dashed" />
        <div className="border-b border-white/20 border-dashed" />
        <div className="border-r border-white/20 border-dashed" />
        <div className="border-r border-white/20 border-dashed" />
        <div className="border-white/20 border-dashed" />
      </div>

      {/* 3. Corner Crop Marks */}
      <div className={`absolute inset-6 pointer-events-none transition-colors duration-700 ${
        isActive ? 'text-gold' : 'text-white/40 group-hover:text-gold/80'
      }`}>
        {/* Top-Left */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-current transition-colors duration-700" />
        {/* Top-Right */}
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-current transition-colors duration-700" />
        {/* Bottom-Left */}
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-current transition-colors duration-700" />
        {/* Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-current transition-colors duration-700" />
      </div>

      {/* 4. Top Status Row */}
      <div className="absolute top-6 left-6 right-6 pointer-events-none flex justify-between items-center text-[9px] tracking-[0.2em] font-mono text-white/80">
        {/* Blinking REC */}
        <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-2 py-1 rounded-xs">
          <span
            className={`w-2.5 h-2.5 rounded-full bg-[#ff3b30] transition-opacity duration-500 ${
              isBlinking ? 'opacity-100 shadow-[0_0_8px_#ff3b30]' : 'opacity-20'
            }`}
          />
          <span>REC</span>
        </div>
        
        {/* Battery & Resolution */}
        <div className="flex items-center gap-3 bg-black/35 backdrop-blur-xs px-2 py-1 rounded-xs">
          <span>4K 60FPS</span>
          <div className="flex items-center gap-1.5">
            <span>98%</span>
            <div className="w-5 h-2.5 border border-white/40 p-[1px] flex items-center rounded-2xs">
              <div className="h-full w-[90%] bg-gold/90 rounded-3xs" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Center Focusing Reticle */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
            borderColor: isActive 
              ? ['rgba(198,168,91,0.7)', 'rgba(198,168,91,0.95)', 'rgba(198,168,91,0.7)']
              : ['rgba(255,255,255,0.2)', 'rgba(198,168,91,0.6)', 'rgba(255,255,255,0.2)'],
          }}
          transition={{
            repeat: Infinity,
            duration: isActive ? 2 : 4,
            ease: "easeInOut"
          }}
          className={`w-14 h-14 border flex items-center justify-center rounded-2xs transition-colors duration-700 ${
            isActive ? 'border-gold/60' : 'border-white/20'
          }`}
        >
          <div className={`w-1 h-1 rounded-full transition-all duration-700 ${
            isActive ? 'bg-gold scale-125 shadow-[0_0_8px_#c6a85b]' : 'bg-gold/75'
          }`} />
        </motion.div>
      </div>

      {/* 6. Bottom Status / Camera Settings Bar */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-between items-center text-[8px] tracking-[0.25em] font-mono text-white/80">
        <div className="flex items-center gap-3 bg-black/35 backdrop-blur-xs px-2 py-1 rounded-xs">
          <span>1/250s</span>
          <span>f/2.8</span>
          <span className="text-gold">ISO 400</span>
        </div>
        <div className="bg-black/35 backdrop-blur-xs px-2 py-1 rounded-xs">
          <span>RAW</span>
          <span className="ml-3 text-white/50">MF</span>
        </div>
      </div>

      {/* Hover/Tap Overlay Hint */}
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 pointer-events-none flex items-center justify-center ${
        isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
      }`}>
        <span className="text-[9px] tracking-[0.3em] text-cream uppercase bg-black/60 border border-white/10 px-4 py-2 rounded-xs backdrop-blur-md">
          Activate Lens
        </span>
      </div>
    </div>
  );
}
