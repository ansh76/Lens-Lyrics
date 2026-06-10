import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CinematicDust from './CinematicDust'; 

export default function HeroVideo() {
  const [flash, setFlash] = useState(false);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 800); 
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      
      {/* 1. Background Video Layer (Cinematic YouTube Loop) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/Create_an_ultra_cinematic_lux.mp4"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 scale-[1.15] object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* 2. WebGL 3D Cinematic Dust */}
        <CinematicDust />

        {/* Vignette Overlay for premium depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#090909_100%)] opacity-85" />
      </div>

      {/* 3. The Camera Flash Overlay State */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 1, backgroundColor: "#ffffff" }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 z-[999] pointer-events-none"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
      </AnimatePresence>

      {/* 4. Main Typography & Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gold tracking-[0.3em] text-[10px] uppercase font-medium mb-6"
        >
          Lens Lyrics By Abhishek Rajput
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight"
        >
          Visualizing <br />
          <em className="text-gold font-normal italic">the unseen</em> moments.
        </motion.h1>

        {/* 5. The Physical Shutter Release Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          onClick={triggerFlash}
          className="mt-16 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group hover:border-gold transition-colors duration-500 relative cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-gold/20 backdrop-blur-sm transition-colors duration-500 border border-white/10 group-hover:border-gold/50" />
          <span className="absolute -bottom-8 text-[8px] uppercase tracking-[0.3em] text-white/40 group-hover:text-gold transition-colors duration-500 whitespace-nowrap">
            Release Shutter
          </span>
        </motion.button>
      </div>

      {/* 6. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[9px] uppercase tracking-widest text-muted">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}