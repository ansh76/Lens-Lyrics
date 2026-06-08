import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Aperture, Crop, Focus } from 'lucide-react';
import { Link } from 'react-router-dom';

const disciplines = [
  {
    id: '01',
    title: 'Wedding Stories',
    tagline: 'Preserving quiet glances and raw celebration in cinematic frames.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    focalLength: '85mm',
    shutter: '1/250s',
    aperture: 'f/1.4'
  },
  {
    id: '02',
    title: 'Fashion & Editorial',
    tagline: 'Distinctive visual campaigns built for brands and modern designers.',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    focalLength: '105mm',
    shutter: '1/160s',
    aperture: 'f/2.0'
  },
  {
    id: '03',
    title: 'Commercial & Brand',
    tagline: 'Elevating digital presence with highly staged product and design imagery.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    focalLength: '35mm',
    shutter: '1/125s',
    aperture: 'f/2.8'
  },
  {
    id: '04',
    title: 'Cinematic Films',
    tagline: 'Emotion-led documentary and commercial films with sound design.',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85',
    focalLength: '50mm',
    shutter: '1/50s',
    aperture: 'f/1.5'
  }
];

export default function DisciplinesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 md:py-32 px-[4.5vw] bg-black border-b border-white/5 relative z-20">
      
      {/* Title */}
      <div className="mb-16 border-b border-white/10 pb-6">
        <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block mb-2">
          CREATIVE DIRECTORY
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-cream leading-tight">
          Core Disciplines
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Directory Links */}
        <div className="lg:col-span-6 divide-y divide-white/10">
          {disciplines.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div 
                key={item.id}
                onMouseEnter={() => setActiveIdx(idx)}
                className="py-6 md:py-8 block cursor-pointer group"
              >
                <Link to="/services" className="flex items-start justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-gold font-light">{item.id}</span>
                      <h3 className={`font-serif text-2xl md:text-3xl transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-cream/50 group-hover:text-cream/80'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className={`text-xs leading-relaxed font-light transition-all duration-500 ${
                      isActive ? 'text-muted opacity-100 h-auto' : 'text-muted/0 opacity-0 h-0 overflow-hidden lg:h-auto lg:opacity-40'
                    }`}>
                      {item.tagline}
                    </p>
                    
                    {/* Inline Image for Mobile/Tablet */}
                    <div className="lg:hidden mt-4 w-full aspect-[16/10] rounded overflow-hidden border border-white/5 relative">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isActive 
                      ? 'border-gold bg-gold text-black -rotate-45' 
                      : 'border-white/10 text-muted group-hover:border-white/30'
                  }`}>
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right Side: High-res Preview Screen */}
        <div className="hidden lg:block lg:col-span-6 relative w-full aspect-[4/5] bg-zinc-950/40 border border-white/5 rounded overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={disciplines[activeIdx].img} 
                alt={disciplines[activeIdx].title} 
                className="w-full h-full object-cover grayscale brightness-90"
              />
              
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Cinematic technical HUD tags inside the image screen */}
              <div className="absolute top-6 left-6 font-mono text-[9px] tracking-widest text-white/50 flex items-center gap-2 bg-black/40 px-3 py-1.5 backdrop-blur-sm border border-white/5">
                <Focus size={10} className="text-gold" />
                <span>FOCUS MODE: MANUAL</span>
              </div>

              <div className="absolute top-6 right-6 font-mono text-[9px] tracking-widest text-white/50 flex items-center gap-2 bg-black/40 px-3 py-1.5 backdrop-blur-sm border border-white/5">
                <Aperture size={10} className="text-gold" />
                <span>{disciplines[activeIdx].focalLength} | {disciplines[activeIdx].aperture}</span>
              </div>

              <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-widest text-white/50 flex items-center gap-2 bg-black/40 px-3 py-1.5 backdrop-blur-sm border border-white/5">
                <Crop size={10} className="text-gold" />
                <span>EXP: {disciplines[activeIdx].shutter} | ISO 100</span>
              </div>

              {/* Corner focus brackets */}
              <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/20" />
              <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/20" />
              <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
