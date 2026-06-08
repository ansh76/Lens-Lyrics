import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The frames captured by Abhishek are pure poetry. He managed to capture the quiet, unspoken glances and the raw energy of our day in a way that feels incredibly cinematic. Absolute masters of their craft.",
    author: "Dr. Rohan & Kiara",
    project: "Royal Vows, Udaipur"
  },
  {
    quote: "A completely elevated visual experience. Lens Lyrics delivered a brand campaign that was structurally powerful, rich in tone, and exceeded our creative direction. Meticulous execution.",
    author: "Vogue India Lead",
    project: "Editorial Campaign"
  },
  {
    quote: "Abhishek has an incredible eye for natural light. Our pre-wedding film looks like an art-house movie. Every composition is balanced, patient, and full of depth.",
    author: "Siddharth & Ananya",
    project: "Lake Como Commission"
  }
];

export default function ClientTestimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 px-[4.5vw] bg-zinc-950/40 border-b border-white/5 relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Gold Quote Icon */}
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-10">
          <Quote size={20} className="fill-current" />
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[220px] md:min-h-[180px] w-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="w-full"
            >
              <blockquote className="font-serif text-xl md:text-3xl lg:text-[32px] text-cream leading-relaxed italic max-w-3xl mx-auto">
                "{testimonials[current].quote}"
              </blockquote>
              
              <cite className="not-italic block mt-8">
                <span className="text-gold tracking-[0.2em] text-[10px] uppercase font-semibold block">
                  {testimonials[current].author}
                </span>
                <span className="text-muted tracking-wider text-[10px] uppercase font-light block mt-1">
                  {testimonials[current].project}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={16} />
          </button>
          
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <span className="text-cream font-medium">0{current + 1}</span>
            <span>/</span>
            <span>0{testimonials.length}</span>
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
