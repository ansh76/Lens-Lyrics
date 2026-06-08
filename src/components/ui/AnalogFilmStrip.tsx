import { motion } from 'framer-motion';

// Reliable high-res placeholder images
const images = [
  "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80"
];

export default function AnalogFilmStrip() {
  // Duplicate array for seamless infinite looping
  const loopImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full overflow-hidden bg-black py-8 border-y border-white/10 flex items-center">
      
      {/* Top Film Sprockets */}
      <div className="absolute top-2 left-0 right-0 h-4 flex gap-4 w-[200%] opacity-20">
        {[...Array(100)].map((_, i) => (
          <div key={`top-${i}`} className="w-3 h-4 bg-white/50 rounded-sm shrink-0" />
        ))}
      </div>

      {/* Infinite Scrolling Track */}
      <motion.div 
        className="flex gap-4 px-4 w-max items-center mt-4 mb-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {loopImages.map((src, idx) => (
          <div key={idx} className="relative w-[300px] h-[200px] shrink-0 bg-ink p-2 grayscale hover:grayscale-0 transition-all duration-700">
             <img src={src} alt="Film frame" className="w-full h-full object-cover" />
             {/* Frame Numbers */}
             <span className="absolute -bottom-6 left-2 text-[8px] text-white/30 font-mono tracking-widest">
               {idx + 1}A
             </span>
          </div>
        ))}
      </motion.div>

      {/* Bottom Film Sprockets */}
      <div className="absolute bottom-2 left-0 right-0 h-4 flex gap-4 w-[200%] opacity-20">
        {[...Array(100)].map((_, i) => (
          <div key={`bot-${i}`} className="w-3 h-4 bg-white/50 rounded-sm shrink-0" />
        ))}
      </div>
      
    </div>
  );
}