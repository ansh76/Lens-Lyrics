import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { X, ArrowUpRight, Camera, MapPin, Eye } from 'lucide-react';

interface ArchiveItem {
  id: string;
  span: string;
  img: string;
  title: string;
  category: string;
  client: string;
  year: string;
  desc: string;
}

// ==========================================
// 1. DATA: THE EDITORIAL ARCHIVE
// ==========================================
const archiveData: ArchiveItem[] = [
  { id: '1', span: "md:col-span-2 md:row-span-2", img: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85", title: "Ethereal Light", category: "Portrait", client: "Vogue India", year: "2023", desc: "A study of natural light and human expression captured in the early hours of winter." },
  { id: '2', span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85", title: "Into The Wild", category: "Pre-Wedding", client: "Private", year: "2024", desc: "Escaping the city bounds to document raw, unfiltered connection." },
  { id: '3', span: "md:col-span-1 md:row-span-2", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85", title: "Maison Noir", category: "Fashion", client: "Dior", year: "2023", desc: "High fashion editorial focusing on stark contrasts and brutalist architecture." },
  { id: '4', span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85", title: "The Royal Vow", category: "Wedding", client: "Private", year: "2023", desc: "Heritage wedding documented with a mix of digital and 35mm film." },
  { id: '5', span: "md:col-span-2 md:row-span-1", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=85", title: "Quiet Precision", category: "Commercial", client: "Audi", year: "2024", desc: "Automotive lifestyle campaign highlighting sleek lines and motion." },
  { id: '6', span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85", title: "Corporate Horizon", category: "Architecture", client: "WeWork", year: "2022", desc: "Spatial documentation of modern collaborative workspaces." },
  { id: '7', span: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85", title: "Sunlit Stories", category: "Wedding", client: "Private", year: "2024", desc: "Golden hour documentation of a deeply intimate ceremony." },
];

// ==========================================
// 2. COMPONENT: 3D INTERACTIVE GRID ITEM
// ==========================================
const GridItem = ({ item, onClick, index }: { item: ArchiveItem, onClick: () => void, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Framer Motion 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`card-container-${item.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group cursor-none overflow-hidden bg-ink rounded-sm ${item.span}`}
    >
      {/* Interactive Cursor Follower Text */}
      <motion.div 
        className="absolute z-[50] pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-difference text-white flex items-center justify-center"
        style={{ x: mouseXSpring, y: mouseYSpring }}
      >
        <span className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Eye size={12}/> View Project
        </span>
      </motion.div>

      {/* Image with Scale Hover */}
      <motion.div layoutId={`card-image-${item.id}`} className="w-full h-full relative z-10" style={{ transformZ: 50 } as React.CSSProperties}>
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
      </motion.div>

      {/* Persistent Meta Data */}
      <motion.div layoutId={`card-meta-${item.id}`} className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none" style={{ transformZ: 100 } as React.CSSProperties}>
        <span className="text-[9px] text-gold tracking-[0.3em] uppercase font-semibold block mb-2">
          {item.category}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-cream leading-none">
          {item.title}
        </h3>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 3. MAIN SECTION COMPONENT
// ==========================================
export default function CinematicGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Find the selected item details
  const selectedItem = archiveData.find(item => item.id === selectedId);

  return (
    <section className="relative min-h-screen bg-[#050505] py-32 px-[4.5vw] overflow-hidden" style={{ perspective: "1200px" }}>
      
      {/* Editorial Header */}
      <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-semibold block mb-6 flex items-center gap-4">
            <div className="w-8 h-[1px] bg-gold" /> The Masterclass Archive
          </span>
          <h2 className="font-serif text-6xl md:text-8xl lg:text-[110px] text-cream tracking-tighter leading-[0.9]">
            Interactive <br /> <i>Experiences.</i>
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-right">
          <p className="text-muted text-sm font-light max-w-sm md:text-right font-mono uppercase tracking-widest text-[10px]">
            Scroll & Hover to interact with the 3D grid.<br/> Click any archive to expand.
          </p>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center self-start md:self-end text-gold animate-[spin_10s_linear_infinite]">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* The Asymmetrical 3D Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px] relative z-10">
        {archiveData.map((item, index) => (
          <GridItem 
            key={item.id} 
            item={item} 
            index={index}
            onClick={() => setSelectedId(item.id)} 
          />
        ))}
      </div>

      {/* ==========================================
          4. EXPANDED VIEW MODAL (SHARED LAYOUT)
          ========================================== */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-[4.5vw] bg-black/90 backdrop-blur-xl"
          >
            {/* Background Click to Close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedId(null)} />

            {/* The Expanded Content Container */}
            <motion.div 
              layoutId={`card-container-${selectedItem.id}`}
              className="w-full max-w-6xl h-[80vh] bg-ink relative overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm z-10"
            >
              {/* Left: Expanded Image */}
              <motion.div layoutId={`card-image-${selectedItem.id}`} className="w-full md:w-2/3 h-1/2 md:h-full relative">
                <img src={selectedItem.img} alt={selectedItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Right: Expanded Metadata Details */}
              <div className="w-full md:w-1/3 p-10 md:p-16 flex flex-col justify-center relative bg-[#090909]">
                <motion.button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-muted hover:text-white hover:border-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </motion.button>

                <motion.div layoutId={`card-meta-${selectedItem.id}`}>
                  <span className="text-[10px] text-gold tracking-[0.3em] uppercase font-semibold mb-4 block">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-5xl md:text-6xl text-cream mb-8 leading-tight">
                    {selectedItem.title}
                  </h3>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-6 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  <div>
                    <span className="text-white block mb-1">Client</span>
                    {selectedItem.client}
                  </div>
                  <div>
                    <span className="text-white block mb-1">Year</span>
                    {selectedItem.year}
                  </div>
                  <div>
                    <span className="text-white block mb-1">Overview</span>
                    <p className="text-muted leading-relaxed font-sans normal-case tracking-normal text-sm">
                      {selectedItem.desc}
                    </p>
                  </div>
                  
                  <button className="mt-8 border border-white/20 py-4 text-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center gap-3">
                    View Full Gallery <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}