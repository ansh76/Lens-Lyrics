import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake loading mechanism with dynamic speed
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random jumps for realistic loading feel
        return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Jab 100% ho jaye toh shutter khulne ka wait karein
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [progress, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none"
      key="preloader"
    >
      {/* 1. Mechanical Shutter Blades (Top & Bottom) */}
      <motion.div 
        initial={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute top-0 left-0 w-full h-1/2 bg-ink flex items-end justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10 border-b border-black"
      />
      <motion.div 
        initial={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-ink flex items-start justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10 border-t border-black"
      />

      {/* 2. Central Lens / Focus Ring */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute z-20 w-[180px] h-[180px] rounded-full border border-white/10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
      >
        {/* Animated Aperture Rings */}
        <motion.div 
          animate={{ rotate: progress === 100 ? 180 : 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="absolute inset-0 rounded-full border-t-2 border-l-2 border-gold/50"
        />
        <motion.div 
          animate={{ rotate: progress === 100 ? -180 : 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="absolute inset-2 rounded-full border-b border-r border-cream/30"
        />
        
        {/* Progress Counter Typography */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold mb-2 font-medium">
            {progress === 100 ? 'Focused' : 'Focusing'}
          </span>
          <span className="font-serif text-5xl text-cream tracking-tighter">
            {progress}
            <span className="text-xl text-muted">%</span>
          </span>
        </div>
      </motion.div>

      {/* 3. The Camera Flash Effect */}
      <AnimatePresence>
        {progress === 100 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-0 bg-white z-[30] mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}