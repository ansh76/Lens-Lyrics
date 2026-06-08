import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

const instaPosts = [
  { id: 1, src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=85", type: "Reel" },
  { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85", type: "Post" },
  { id: 3, src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85", type: "Post" },
  { id: 4, src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85", type: "Reel" },
];

export default function InstagramFeed() {
  return (
    <section className="py-32 px-[4.5vw] bg-black border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">Live Connection</span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mt-2">Dynamic Feed</h2>
        </div>
        <a 
          href="https://www.instagram.com/lenslyric.ar/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold border-b border-gold/30 pb-2 hover:border-gold transition-colors duration-300 w-max"
        >
          @lenslyric.ar <Instagram size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {instaPosts.map((post, idx) => (
          <motion.a
            key={post.id}
            href="https://www.instagram.com/lenslyric.ar/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative h-[40vh] md:h-[45vh] group overflow-hidden border border-white/5 rounded-sm"
          >
            <img 
              src={post.src} 
              alt="Instagram documentation visual node" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            {/* Morphic Interactive Panel */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-gold bg-black/60 flex items-center justify-center text-gold scale-75 group-hover:scale-100 transition-transform duration-500">
                <ArrowUpRight size={18} />
              </div>
              <span className="absolute bottom-4 left-4 text-[9px] tracking-widest text-gold uppercase font-medium">
                View {post.type}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}