import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FocusImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FocusImage({ src, alt, className = "" }: FocusImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track where the image is in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map the scroll position to blur, scale, and opacity
  // 0 = bottom of screen, 0.5 = middle, 1 = top of screen
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.15, 1, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ filter: blur, scale, opacity }}
        className="w-full h-full object-cover will-change-transform"
      />
      {/* Viewfinder crosshair overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="w-[40px] h-[40px] border border-white/30 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}