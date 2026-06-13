import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicDust from '../home/CinematicDust';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [animationStage, setAnimationStage] = useState(0); // 0: Dark, 1: Flash & Sweep & Reveal, 2: Settle, 3: Completed
  const [percent, setPercent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Percent counter fake load for aesthetic realism
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Stage trigger timings
    // 0s: start black, dust particles float
    // 1.2s: white streak flash sweeps
    const sweepTimer = setTimeout(() => {
      setAnimationStage(1);
    }, 1200);

    // 4.2s: settle into place with shimmering and flares
    const settleTimer = setTimeout(() => {
      setAnimationStage(2);
    }, 4200);

    // 7.0s: start fading out/shutting down preloader
    const completeTimer = setTimeout(() => {
      setAnimationStage(3);
    }, 7000);

    // 8.0s: trigger parent onComplete to render the main site
    const endTimer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(settleTimer);
      clearTimeout(completeTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={animationStage === 3 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden select-none"
    >
      {/* 3D Cinematic Dust & Particles */}
      <CinematicDust />

      {/* Vignette Shadow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-95 pointer-events-none z-10" />

      {/* Cinematic Grid Lines Overlay */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-[0.03] z-10">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border border-white/40 border-dashed" />
        ))}
      </div>

      {/* Main Logo Reveal Container */}
      <div className="relative flex flex-col items-center justify-center z-25">
        
        {/* SVG Logo Mark: Camera outline + Aperture + AR Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            animationStage >= 1
              ? {
                  opacity: 1,
                  scale: 1,
                  clipPath: "inset(0 0% 0 0)",
                }
              : {
                  opacity: 0,
                  scale: 0.95,
                  clipPath: "inset(0 100% 0 0)",
                }
          }
          transition={{
            opacity: { duration: 0.8, ease: "easeOut", delay: 1.2 },
            scale: { duration: 2.0, ease: [0.19, 1, 0.22, 1], delay: 1.2 },
            clipPath: { duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: 1.2 },
          }}
          className="relative w-[320px] md:w-[450px] aspect-[16/10] flex items-center justify-center"
        >
          <svg
            viewBox="0 0 600 320"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(198,168,91,0.15)]"
          >
            <defs>
              {/* Luxury Gold Metallic Gradients */}
              <linearGradient id="luxuryGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#bf953f" />
                <stop offset="20%" stop-color="#fcf6ba" />
                <stop offset="40%" stop-color="#b38728" />
                <stop offset="60%" stop-color="#fbf5b7" />
                <stop offset="80%" stop-color="#d4af37" />
                <stop offset="100%" stop-color="#aa771c" />
              </linearGradient>

              {/* Shimmer Line Reflection Gradient */}
              <linearGradient id="shimmer" x1="-100%" y1="0%" x2="200%" y2="0%">
                <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                <stop offset="35%" stop-color="rgba(255,255,255,0)" />
                <stop offset="50%" stop-color="rgba(255,255,255,0.4)" />
                <stop offset="65%" stop-color="rgba(255,255,255,0)" />
                <stop offset="100%" stop-color="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* Camera Body Path (Metallic Gold) */}
            <path
              d="M 60,110 
                 A 15,15 0 0,1 75,95 
                 L 130,95 
                 A 10,10 0 0,0 138,88 
                 L 148,70 
                 A 15,15 0 0,1 162,62 
                 L 238,62 
                 A 15,15 0 0,1 252,70 
                 L 262,88 
                 A 10,10 0 0,0 270,95 
                 L 325,95 
                 A 15,15 0 0,1 340,110 
                 L 340,230 
                 A 15,15 0 0,1 325,245 
                 L 75,245 
                 A 15,15 0 0,1 60,230 
                 Z"
              fill="none"
              stroke="url(#luxuryGold)"
              stroke-width="4.5"
              stroke-linejoin="round"
            />

            {/* Shutter button detail */}
            <path d="M 92,95 L 92,87 A 3,3 0 0,1 95,84 L 111,84 A 3,3 0 0,1 114,87 L 114,95 Z" fill="url(#luxuryGold)" />

            {/* Lens Rings */}
            <circle cx="200" cy="170" r="58" fill="none" stroke="url(#luxuryGold)" stroke-width="4.5" />
            <circle cx="200" cy="170" r="50" fill="none" stroke="url(#luxuryGold)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />

            {/* Rotating Aperture Shutter Blades */}
            <motion.g
              initial={{ rotate: -150 }}
              animate={animationStage >= 1 ? { rotate: 20 } : { rotate: -150 }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
              style={{ originX: "200px", originY: "170px" }}
            >
              {/* Aperture iris blades forming the camera eye */}
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(0)" />
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(60)" />
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(120)" />
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(180)" />
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(240)" />
              <path d="M 0,-50 L 43.3,-25 L 10,-10 Z" fill="url(#luxuryGold)" transform="translate(200,170) rotate(300)" />
            </motion.g>

            {/* AR Monogram Text (overlapping right shoulder of camera) */}
            <text
              x="325"
              y="225"
              font-family="'Playfair Display', serif"
              font-size="165"
              font-weight="500"
              fill="url(#luxuryGold)"
              letter-spacing="-10"
            >
              AR
            </text>

            {/* Subtle logo shimmer/shimmer shine reflection sweep */}
            <motion.rect
              x="50"
              y="60"
              width="450"
              height="190"
              fill="url(#shimmer)"
              style={{ mixBlendMode: 'overlay' }}
              animate={animationStage >= 2 ? {
                x: ["-100%", "200%"],
              } : { x: "-100%" }}
              transition={{
                repeat: Infinity,
                repeatDelay: 4,
                duration: 2.5,
                ease: "easeInOut",
              }}
            />
          </svg>
          
          {/* Outer glow background element */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,91,0.1)_0%,transparent_70%)] blur-[40px] pointer-events-none z-0" />
        </motion.div>

        {/* Text Details: LENSLYRICS AR */}
        <div className="overflow-hidden flex flex-col items-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={animationStage >= 1 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 1.8 }}
            className="flex flex-col items-center mt-2"
          >
            <h2 className="font-serif text-3xl md:text-4xl tracking-[0.45em] text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] font-light leading-none">
              LENSLYRICS
            </h2>
            
            {/* Elegant Subline with thin gold borders */}
            <div className="flex items-center gap-6 w-[200px] md:w-[280px] mt-4">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#bf953f]/40 to-[#bf953f]/80" />
              <span className="font-serif text-xs md:text-sm text-[#fcf6ba] tracking-[0.3em] font-light">
                AR
              </span>
              <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-[#bf953f]/40 to-[#bf953f]/80" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Sweep Light & Lens Flare overlays */}
      <AnimatePresence>
        {animationStage === 1 && (
          <>
            {/* White sweep light streak */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "200%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-y-0 w-[50%] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none mix-blend-screen skew-x-12 blur-[15px] z-30"
            />

            {/* Lens Flare: Core tracking glow with flare lines */}
            <motion.div
              initial={{ left: "-20%", opacity: 0.2 }}
              animate={{ left: "120%", opacity: [0.2, 1, 1, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none z-40"
            >
              {/* Radial glow center */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(198,168,91,0.3)_30%,transparent_70%)] rounded-full blur-md" />
              
              {/* Horizontal anamorphic streak */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 scale-y-[0.4]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[30px] bg-gradient-to-r from-transparent via-gold/15 to-transparent blur-md" />

              {/* Diagonal ring/flare circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border border-white/5 rounded-full scale-125 rotate-12 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-gold/10 rounded-full scale-90 -rotate-45 pointer-events-none" />
            </motion.div>

            {/* Shutter flash light overlay at start of sweep */}
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute inset-0 bg-white z-[999] pointer-events-none mix-blend-overlay"
            />
          </>
        )}
      </AnimatePresence>

      {/* Floating loading percentage counter on the bottom */}
      <div className="absolute bottom-12 font-mono text-[9px] tracking-[0.4em] text-muted/50 uppercase z-20 flex items-center gap-2">
        <span>Establishing Frame</span>
        <span>|</span>
        <span className="text-gold">{percent}%</span>
      </div>
    </motion.div>
  );
}