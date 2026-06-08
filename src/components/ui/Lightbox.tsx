import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Sliders, Settings, Maximize } from 'lucide-react';

interface LightboxProps {
  imageSrc: string;
  imageTitle: string;
  imageCategory: string;
  imageCamera?: string;
  imageIso?: string;
  imageAperture?: string;
  imageLens?: string;
  imageShutter?: string;
  imagePlace?: string;
  imageCoordinates?: string;
  imageDimensions?: string;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  imageTitle,
  imageCategory,
  imageCamera = 'N/A',
  imageIso = 'N/A',
  imageAperture = 'N/A',
  imageLens = 'N/A',
  imageShutter = 'N/A',
  imagePlace = 'N/A',
  imageCoordinates = 'N/A',
  imageDimensions = 'N/A',
  onPrev,
  onNext
}: LightboxProps) {
  const [showMetadata, setShowMetadata] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowMetadata(false);
    }
  }, [isOpen]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawerVariants: Variants = {
    hidden: { 
      y: isMobile ? '100%' : 0, 
      x: !isMobile ? '100%' : 0,
      opacity: 0 
    },
    visible: { 
      y: 0, 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    },
    exit: { 
      y: isMobile ? '100%' : 0, 
      x: !isMobile ? '100%' : 0,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col md:flex-row h-screen w-screen overflow-hidden"
        >
          {/* Main Stage Display (Left Area) */}
          <div className="relative flex-1 h-[60vh] md:h-full flex flex-col justify-between p-6 border-r border-white/5">
            {/* Header controls inside stage */}
            <div className="flex justify-between items-center w-full z-10">
              <div className="flex flex-col text-left">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">{imageCategory}</span>
                <h3 className="font-serif text-2xl text-cream mt-1 tracking-tight">{imageTitle}</h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMetadata(!showMetadata)}
                  className={`flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-300 cursor-pointer ${showMetadata ? 'bg-gold border-gold text-black' : 'border-white/10 text-cream hover:border-gold hover:text-gold'}`}
                  title="Toggle Metadata Drawer"
                >
                  <Sliders size={16} />
                </button>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Carousel Content */}
            <div className="relative flex-1 w-full flex items-center justify-center px-4 max-h-[70vh] md:max-h-full my-auto">
              {onPrev && (
                <button 
                  onClick={onPrev}
                  className="absolute left-0 p-4 rounded-full bg-ink/60 border border-white/5 text-cream hover:border-gold hover:text-gold transition-all duration-300 z-10 cursor-pointer backdrop-blur-md"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <motion.div
                key={imageSrc}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="max-w-full max-h-[50vh] md:max-h-[75vh] relative flex items-center justify-center"
              >
                <img
                  src={imageSrc}
                  alt={imageTitle}
                  className="max-w-full max-h-[50vh] md:max-h-[75vh] object-contain shadow-[0_24px_100px_rgba(0,0,0,0.9)] border border-white/5 rounded-xs"
                />
                
                {/* Vintage negative film border styling */}
                <div className="absolute inset-0 border border-white/10 pointer-events-none scale-[1.01]" />
              </motion.div>

              {onNext && (
                <button 
                  onClick={onNext}
                  className="absolute right-0 p-4 rounded-full bg-ink/60 border border-white/5 text-cream hover:border-gold hover:text-gold transition-all duration-300 z-10 cursor-pointer backdrop-blur-md"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Bottom context bar */}
            <div className="flex justify-between items-center text-[9px] tracking-[0.25em] uppercase text-muted pt-4 font-mono">
              <span>LENS LYRICS ARCHIVE // EXHIBIT</span>
              <span className="hidden sm:inline">DEVELOPED PRINT CO.</span>
            </div>
          </div>

          {/* Photographic Metadata Sidebar Drawer (Right Area) */}
          <AnimatePresence>
            {showMetadata && (
              <motion.aside
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute md:relative bottom-0 left-0 right-0 md:top-0 h-[48vh] md:h-full w-full md:w-[350px] lg:w-[400px] bg-ink border-t md:border-t-0 md:border-l border-white/5 p-8 flex flex-col justify-between overflow-y-auto font-sans text-left z-20 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] md:shadow-none"
              >
                <div>
                  <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                    <Settings className="text-gold animate-spin-slow" size={14} />
                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold">EXIF Metadata Panel</span>
                  </div>

                  {/* Camera Body and Lens Profile */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-xs text-gold border border-white/5">
                        <Camera size={18} />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-muted block mb-1 font-mono">Camera System</span>
                        <h4 className="text-sm font-semibold text-cream leading-tight">{imageCamera}</h4>
                        <span className="text-[10px] text-muted tracking-wider block mt-1 font-mono">{imageLens}</span>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="border-t border-white/5 pt-6">
                      <span className="text-[8px] uppercase tracking-widest text-muted block mb-4 font-mono">Exposure Parameters</span>
                      <div className="grid grid-cols-3 gap-4 font-mono text-center">
                        <div className="bg-white/3 border border-white/5 p-3 rounded-xs">
                          <span className="text-[7px] text-muted block mb-1">SHUTTER</span>
                          <span className="text-[11px] font-semibold text-cream">{imageShutter}</span>
                        </div>
                        <div className="bg-white/3 border border-white/5 p-3 rounded-xs">
                          <span className="text-[7px] text-muted block mb-1">APERTURE</span>
                          <span className="text-[11px] font-semibold text-cream">{imageAperture}</span>
                        </div>
                        <div className="bg-white/3 border border-white/5 p-3 rounded-xs">
                          <span className="text-[7px] text-muted block mb-1">ISO</span>
                          <span className="text-[11px] font-semibold text-cream">{imageIso}</span>
                        </div>
                      </div>
                    </div>

                    {/* Geolocation Details */}
                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 rounded-xs text-gold border border-white/5 mt-0.5">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-muted block mb-1 font-mono">Spatial Coordinates</span>
                          <h4 className="text-sm font-semibold text-cream leading-tight">{imagePlace}</h4>
                          <span className="text-[10px] text-muted tracking-wider block mt-1 font-mono">{imageCoordinates}</span>
                        </div>
                      </div>
                    </div>

                    {/* Archival Print Specifications */}
                    <div className="border-t border-white/5 pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/5 rounded-xs text-gold border border-white/5 mt-0.5">
                          <Maximize size={18} />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-muted block mb-1 font-mono">Digital Canvas / Output</span>
                          <h4 className="text-sm font-semibold text-cream leading-tight">{imageDimensions}</h4>
                          <span className="text-[10px] text-muted tracking-wider block mt-1 font-mono">Giclée Fine Art Print Spec</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-muted">
                  <span>HASH: #LL-{(Math.random() * 100000).toFixed(0)}</span>
                  <span>SYSTEM: FULLY AUTHENTIC</span>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}