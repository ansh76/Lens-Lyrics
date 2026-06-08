import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import AnimatedText from '../components/ui/AnimatedText';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import Lightbox from '../components/ui/Lightbox';
import Footer from '../components/layout/Footer';
import { Camera, Plus, LayoutGrid, Grid, Film, MapPin } from 'lucide-react';

const portfolioCategories = [
  'All', 'Weddings', 'Pre-Weddings', 'Corporate', 'Commercial', 'Fashion', 'Product'
];

const archiveImages = [
  { 
    title: 'The Royal Vow', 
    type: 'Weddings', 
    place: 'Udaipur', 
    src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85', 
    lens: '85mm f/1.4', 
    shutter: '1/200s',
    camera: 'Sony A7R V',
    iso: 'ISO 100',
    aperture: 'f/1.4',
    coordinates: '24.5854° N, 73.7125° E',
    dimensions: '6100 x 8100 px',
    span: 'col-span-2 md:col-span-2 md:row-span-2'
  },
  { 
    title: 'Into The Wild', 
    type: 'Pre-Weddings', 
    place: 'Himachal', 
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85', 
    lens: '35mm f/1.8', 
    shutter: '1/500s',
    camera: 'Leica SL2',
    iso: 'ISO 200',
    aperture: 'f/1.8',
    coordinates: '32.2190° N, 77.1892° E',
    dimensions: '5400 x 7200 px',
    span: 'col-span-1 md:col-span-1 md:row-span-1'
  },
  { 
    title: 'Maison Noir', 
    type: 'Fashion', 
    place: 'New Delhi', 
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85', 
    lens: '50mm f/1.2', 
    shutter: '1/160s',
    camera: 'Hasselblad X2D',
    iso: 'ISO 64',
    aperture: 'f/1.2',
    coordinates: '28.6139° N, 77.2090° E',
    dimensions: '8200 x 10240 px',
    span: 'col-span-1 md:col-span-1 md:row-span-2'
  },
  { 
    title: 'Quiet Precision', 
    type: 'Commercial', 
    place: 'Mumbai', 
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85', 
    lens: '24-70mm f/2.8', 
    shutter: '1/250s',
    camera: 'Canon EOS R5',
    iso: 'ISO 100',
    aperture: 'f/2.8',
    coordinates: '19.0760° N, 72.8777° E',
    dimensions: '4500 x 6000 px',
    span: 'col-span-2 md:col-span-2 md:row-span-1'
  },
  { 
    title: 'Sunlit Stories', 
    type: 'Weddings', 
    place: 'Jaipur', 
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85', 
    lens: '85mm f/1.4', 
    shutter: '1/320s',
    camera: 'Sony A7R V',
    iso: 'ISO 160',
    aperture: 'f/1.4',
    coordinates: '26.9124° N, 75.7873° E',
    dimensions: '6000 x 8000 px',
    span: 'col-span-1 md:col-span-1 md:row-span-1'
  },
  { 
    title: 'Corporate Identity', 
    type: 'Corporate', 
    place: 'Bangalore', 
    src: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=85', 
    lens: '24mm f/2.0', 
    shutter: '1/125s',
    camera: 'Nikon Z7 II',
    iso: 'ISO 400',
    aperture: 'f/2.0',
    coordinates: '12.9716° N, 77.5946° E',
    dimensions: '5800 x 7800 px',
    span: 'col-span-1 md:col-span-1 md:row-span-1'
  },
  { 
    title: 'Prism of Elegance', 
    type: 'Product', 
    place: 'Jaipur', 
    src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85', 
    lens: '100mm f/2.8 Macro', 
    shutter: '1/160s',
    camera: 'Canon EOS R5',
    iso: 'ISO 100',
    aperture: 'f/2.8',
    coordinates: '26.9124° N, 75.7873° E',
    dimensions: '6000 x 8000 px',
    span: 'col-span-1 md:col-span-1 md:row-span-2'
  },
  { 
    title: 'Symphony of Lines', 
    type: 'Commercial', 
    place: 'Chennai', 
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85', 
    lens: '24-70mm f/2.8', 
    shutter: '1/400s',
    camera: 'Leica SL2',
    iso: 'ISO 100',
    aperture: 'f/4.0',
    coordinates: '13.0827° N, 80.2707° E',
    dimensions: '5200 x 7800 px',
    span: 'col-span-2 md:col-span-2 md:row-span-1'
  },
  { 
    title: 'Nebula Couture', 
    type: 'Fashion', 
    place: 'Paris', 
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85', 
    lens: '85mm f/1.2', 
    shutter: '1/250s',
    camera: 'Hasselblad X2D',
    iso: 'ISO 64',
    aperture: 'f/1.2',
    coordinates: '48.8566° N, 2.3522° E',
    dimensions: '8200 x 10240 px',
    span: 'col-span-1 md:col-span-1 md:row-span-1'
  },
  { 
    title: 'Monolithic Silence', 
    type: 'Corporate', 
    place: 'Gurugram', 
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85', 
    lens: '16-35mm f/4.0', 
    shutter: '1/125s',
    camera: 'Sony A7R V',
    iso: 'ISO 100',
    aperture: 'f/8.0',
    coordinates: '28.4595° N, 77.0266° E',
    dimensions: '6100 x 8100 px',
    span: 'col-span-2 md:col-span-2 md:row-span-2'
  },
  { 
    title: 'Golden Hours', 
    type: 'Pre-Weddings', 
    place: 'Rishikesh', 
    src: 'https://images.unsplash.com/photo-1469617833230-0a8a81665a36?auto=format&fit=crop&w=1200&q=85', 
    lens: '50mm f/1.2', 
    shutter: '1/800s',
    camera: 'Sony A7R V',
    iso: 'ISO 100',
    aperture: 'f/1.2',
    coordinates: '30.0869° N, 78.2676° E',
    dimensions: '5400 x 7200 px',
    span: 'col-span-1 md:col-span-1 md:row-span-1'
  },
  { 
    title: 'Liquid Glass', 
    type: 'Product', 
    place: 'Hyderabad', 
    src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=85', 
    lens: '90mm f/2.8 Macro', 
    shutter: '1/200s',
    camera: 'Nikon Z7 II',
    iso: 'ISO 100',
    aperture: 'f/5.6',
    coordinates: '17.3850° N, 78.4867° E',
    dimensions: '5800 x 7800 px',
    span: 'col-span-1 md:col-span-1 md:row-span-2'
  }
];

export default function Portfolio() {
  useDocumentMetadata("Selected Archives", "Discover the lens lyric.ar selected visual works archive, spanning weddings, fashion, editorials, and commercial photography.");
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLayout, setActiveLayout] = useState<'editorial' | 'minimal' | 'contact'>('editorial');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? archiveImages 
    : archiveImages.filter(item => item.type === activeCategory);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <PageWrapper>
      <div className="pt-[140px] bg-black min-h-screen w-full relative z-10 select-none">
        
        {/* Portfolio Header with Statistical Badges */}
        <header className="px-[4.5vw] mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block mb-2">Visual Index</span>
            <AnimatedText 
              text="Selected Work"
              className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-cream"
              el="h1"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto font-mono text-[9px] uppercase tracking-wider text-muted">
            <div className="border border-white/10 px-4 py-2 rounded-xs backdrop-blur-sm bg-ink/30 flex items-center gap-2">
              <span className="text-gold">Archives:</span>
              <span className="text-cream font-bold">0{filteredItems.length}</span>
            </div>
            <div className="border border-white/10 px-4 py-2 rounded-xs backdrop-blur-sm bg-ink/30 flex items-center gap-2">
              <span className="text-gold">Lenses:</span>
              <span className="text-cream font-bold">16mm - 100mm</span>
            </div>
            <div className="border border-white/10 px-4 py-2 rounded-xs backdrop-blur-sm bg-ink/30 flex items-center gap-2">
              <span className="text-gold">Format:</span>
              <span className="text-cream font-bold">Medium / Full Frame</span>
            </div>
          </div>
        </header>

        {/* Live Photographic Running Marquee Ticker */}
        <div className="w-full overflow-hidden border-y border-white/5 py-3 mb-12 bg-ink/30 backdrop-blur-sm relative">
          <motion.div 
            className="flex whitespace-nowrap gap-16 text-[9px] tracking-[0.4em] uppercase text-gold font-mono"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-16 shrink-0">
                <span>LENS LYRICS // MEMORIES TO ART</span>
                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                <span>VISUAL INDEX // SELECTED WORKS</span>
                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                <span>SHUTTER & LIGHT // EST. 2021</span>
                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
              </span>
            ))}
          </motion.div>
        </div>

        {/* Categories Menu Filter & Layout Switcher Panel */}
        <div className="px-[4.5vw] mb-16 flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-6">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-none flex gap-8">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`text-[10px] tracking-[0.2em] uppercase cursor-pointer pb-2 relative transition-colors duration-300 ${activeCategory === category ? 'text-cream' : 'text-muted hover:text-cream'}`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div layoutId="portfolio-filter-line" className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold" />
                )}
              </button>
            ))}
          </div>

          {/* Grid Layout Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto border border-white/10 p-1 rounded-sm bg-ink/50 backdrop-blur-md">
            <button
              onClick={() => setActiveLayout('editorial')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xs text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${activeLayout === 'editorial' ? 'bg-gold text-black font-semibold' : 'text-muted hover:text-cream'}`}
              title="Editorial Masonry"
            >
              <LayoutGrid size={11} />
              <span>Editorial</span>
            </button>
            <button
              onClick={() => setActiveLayout('minimal')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xs text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${activeLayout === 'minimal' ? 'bg-gold text-black font-semibold' : 'text-muted hover:text-cream'}`}
              title="Minimalist Grid"
            >
              <Grid size={11} />
              <span>Minimal</span>
            </button>
            <button
              onClick={() => setActiveLayout('contact')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xs text-[9px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${activeLayout === 'contact' ? 'bg-gold text-black font-semibold' : 'text-muted hover:text-cream'}`}
              title="Film Contact Sheet"
            >
              <Film size={11} />
              <span>Contact Sheet</span>
            </button>
          </div>
        </div>

        {/* Dynamic Grid Layout container */}
        <motion.div 
          layout 
          className={`px-[4.5vw] transition-all duration-500 mb-32 ${
            activeLayout === 'editorial' 
              ? 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8' 
              : activeLayout === 'minimal' 
              ? 'grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16' 
              : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-white/10'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;

              // 1. EDITORIAL LAYOUT RENDER
              if (activeLayout === 'editorial') {
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ 
                      opacity: isAnyHovered ? (isHovered ? 1 : 0.45) : 1, 
                      y: 0, 
                      scale: 1,
                      filter: isAnyHovered ? (isHovered ? 'blur(0px)' : 'blur(2px)') : 'blur(0px)'
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    key={item.title}
                    onClick={() => setLightboxIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group cursor-pointer flex flex-col gap-4 ${item.span}`}
                  >
                    {/* Image frame container with Viewfinder HUD Overlay */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/5 rounded-xs bg-ink/50">
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-103 filter brightness-90 group-hover:brightness-100"
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Viewfinder HUD Overlays */}
                      <div className="absolute inset-4 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                        {/* Brackets */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold" />
                        
                        {/* Center focus dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          <div className="absolute w-6 h-6 border border-gold/30 rounded-full" />
                        </div>

                        {/* Top Left Exposure / Recording info */}
                        <div className="absolute top-2 left-2 text-[7px] font-mono text-gold bg-black/60 px-1.5 py-0.5 border border-white/5 tracking-widest">
                          RAW 16BIT
                        </div>

                        {/* Bottom Left Camera HUD */}
                        <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 text-[7px] font-mono text-gold bg-black/60 p-1.5 border border-white/5 tracking-wider">
                          <span>CAM: {item.camera}</span>
                          <span>ISO: {item.iso}</span>
                        </div>
                      </div>

                      {/* Floating lens details at the top right */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0 items-center bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xs text-[8px] font-mono tracking-widest text-gold z-10">
                        <Camera size={10} className="stroke-[2px]" />
                        <span>{item.lens} · {item.shutter}</span>
                      </div>

                      {/* Expand action */}
                      <div className="absolute bottom-6 right-6 w-9 h-9 bg-cream text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl z-10">
                        <Plus size={15} className="stroke-[2.5px]" />
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="flex justify-between items-start px-1">
                      <div className="overflow-hidden">
                        <span className="text-[8px] md:text-[9px] text-gold tracking-[0.25em] uppercase font-semibold block mb-0.5 md:mb-1">
                          {item.type}
                        </span>
                        <h3 className="font-serif text-sm md:text-xl text-cream tracking-tight group-hover:text-gold transition-colors duration-300">
                          {item.title}
                        </h3>
                        {/* Mobile photography specs printed underneath */}
                        <div className="text-[8px] font-mono text-muted/60 mt-1 md:hidden truncate max-w-[130px]">
                          {item.camera} · {item.lens}
                        </div>
                      </div>
                      <span className="text-[8px] md:text-[9px] text-muted tracking-widest uppercase font-light mt-1 font-mono flex items-center gap-1">
                        {item.place}
                      </span>
                    </div>
                  </motion.article>
                );
              }

              // 2. MINIMALIST LAYOUT RENDER (Balanced columns with space)
              if (activeLayout === 'minimal') {
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: isAnyHovered ? (isHovered ? 1 : 0.5) : 1, 
                      y: 0,
                      filter: isAnyHovered ? (isHovered ? 'blur(0px)' : 'blur(1px)') : 'blur(0px)'
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    key={item.title}
                    onClick={() => setLightboxIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="col-span-1 cursor-pointer flex flex-col gap-6"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/30 border border-white/5">
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div className="text-center">
                      <span className="text-[8px] font-mono text-gold tracking-[0.3em] uppercase block mb-1">
                        {item.type} // {item.place}
                      </span>
                      <h3 className="font-serif text-2xl text-cream tracking-wide">
                        {item.title}
                      </h3>
                      <span className="text-[9px] font-mono text-muted tracking-widest block mt-2">
                        {item.lens}
                      </span>
                    </div>
                  </motion.article>
                );
              }

              // 3. CONTACT SHEET LAYOUT RENDER (Raw developed darkroom proof grid)
              return (
                <motion.article
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isAnyHovered ? (isHovered ? 1 : 0.6) : 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  key={item.title}
                  onClick={() => setLightboxIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="col-span-1 border-b border-r border-white/10 p-4 md:p-6 bg-black flex flex-col gap-4 relative group cursor-crosshair select-none"
                >
                  {/* Proof strip head metadata */}
                  <div className="flex justify-between items-center text-[7px] font-mono text-muted/60 tracking-widest uppercase">
                    <span>ILFORD HP5 PLUS</span>
                    <span>FRAME 0{index + 1}</span>
                  </div>

                  {/* Image with contact marks */}
                  <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden bg-ink/80 border border-white/10 p-1">
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'grayscale-0 brightness-100 scale-101' : 'grayscale contrast-[1.15] brightness-[0.75]'
                      }`}
                    />

                    {/* Analog print grease pencil check mark when hovered */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <div className="w-16 h-16 border-2 border-red-500/80 rounded-full flex items-center justify-center rotate-[-12deg]">
                            <span className="text-[10px] font-bold text-red-500/90 font-mono tracking-widest">PRNT OK</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Frame index printed in margin */}
                    <span className="absolute bottom-1.5 left-2 text-[8px] text-white/30 font-mono">
                      0{index + 1}A
                    </span>
                  </div>

                  {/* Dense technical EXIF text strip */}
                  <div className="font-mono text-[8px] leading-relaxed text-muted flex flex-col gap-0.5 mt-1">
                    <div className="flex justify-between">
                      <span className="text-white/60">TITLE:</span>
                      <span className="text-cream truncate max-w-[80px] md:max-w-[120px]">{item.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">EXPOSURE:</span>
                      <span>{item.shutter} @ {item.aperture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">CAMERA:</span>
                      <span className="truncate max-w-[80px]">{item.camera}</span>
                    </div>
                    <div className="flex justify-between text-gold/80 border-t border-white/5 pt-1 mt-1 font-semibold">
                      <span>{item.type.toUpperCase()}</span>
                      <span>{item.place.toUpperCase()}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global Enhanced Lightbox Component */}
        <Lightbox 
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          imageSrc={lightboxIndex !== null ? filteredItems[lightboxIndex].src : ''}
          imageTitle={lightboxIndex !== null ? filteredItems[lightboxIndex].title : ''}
          imageCategory={lightboxIndex !== null ? filteredItems[lightboxIndex].type : ''}
          imageCamera={lightboxIndex !== null ? filteredItems[lightboxIndex].camera : ''}
          imageIso={lightboxIndex !== null ? filteredItems[lightboxIndex].iso : ''}
          imageAperture={lightboxIndex !== null ? filteredItems[lightboxIndex].aperture : ''}
          imageLens={lightboxIndex !== null ? filteredItems[lightboxIndex].lens : ''}
          imageShutter={lightboxIndex !== null ? filteredItems[lightboxIndex].shutter : ''}
          imagePlace={lightboxIndex !== null ? filteredItems[lightboxIndex].place : ''}
          imageCoordinates={lightboxIndex !== null ? filteredItems[lightboxIndex].coordinates : ''}
          imageDimensions={lightboxIndex !== null ? filteredItems[lightboxIndex].dimensions : ''}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <Footer />
      </div>
    </PageWrapper>
  );
}