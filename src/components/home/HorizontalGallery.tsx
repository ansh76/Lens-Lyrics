import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  { id: 1, title: "The Royal Vows", category: "Wedding", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85" },
  { id: 2, title: "Urban Elegance", category: "Fashion", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85" },
  { id: 3, title: "Corporate Horizon", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85" },
  { id: 4, title: "Midnight Symphony", category: "Pre-Wedding", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85" },
  { id: 5, title: "Ethereal Light", category: "Portrait", img: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85" }
];

// Browser window resize par safely width check karne ke liye custom hook
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // 1. Math Calculation: Exact container width
  useIsomorphicLayoutEffect(() => {
    const updateRange = () => {
      if (scrollTrackRef.current) {
        const totalScrollableWidth = scrollTrackRef.current.scrollWidth - window.innerWidth;
        setScrollRange(totalScrollableWidth);
      }
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  // 2. Core Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 3. Smooth Translation (Sliding Only, No Skew) 
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const springX = useSpring(xTransform, { stiffness: 400, damping: 60, mass: 0.5 });

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black z-10">
      
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Premium Text */}
        <div className="absolute top-[10%] left-[5vw] z-0 pointer-events-none opacity-20">
          <h2 className="font-serif text-5xl md:text-[100px] text-transparent bg-clip-text bg-gradient-to-b from-white to-black tracking-wider leading-none">
            Featured<br/>Archives
          </h2>
        </div>

        {/* Dynamic Scroll Track - Only applying horizontal slide (springX) */}
        <motion.div 
          ref={scrollTrackRef}
          style={{ x: springX }} 
          className="flex gap-10 md:gap-20 px-[5vw] md:px-[10vw] w-max z-20 will-change-transform items-center"
        >
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              className="relative w-[85vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] shrink-0 group overflow-hidden cursor-pointer bg-ink/50 border border-white/5 shadow-2xl"
            >
              {/* Image */}
              <img 
                src={project.img} 
                alt={project.title}
                loading={idx < 2 ? "eager" : "lazy"} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 filter grayscale-[40%] group-hover:grayscale-0"
              />
              
              {/* Gradient Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Staggered Typography Reveal */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                <div className="overflow-hidden mb-2">
                  <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-semibold block translate-y-full group-hover:translate-y-0 transition-transform duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    0{project.id} — {project.category}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-serif text-3xl md:text-5xl text-cream translate-y-full group-hover:translate-y-0 transition-transform duration-[0.8s] delay-75 ease-[cubic-bezier(0.19,1,0.22,1)]">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Minimalist Golden Hover Border */}
              <div className="absolute inset-5 border border-white/0 group-hover:border-gold/30 transition-all duration-[0.8s] pointer-events-none scale-95 group-hover:scale-100 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}