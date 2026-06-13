import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // Disable body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu on desktop screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-0 left-0 right-0 z-50 h-[88px] flex items-center justify-between px-[4.5vw] glass-nav"
      >
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3.5 z-50 group"
        >
          <div className="relative w-[56px] h-[36px] flex items-center justify-center">
            <svg
              viewBox="0 0 140 90"
              className="w-full h-full text-gold group-hover:scale-105 transition-transform duration-500 ease-out"
            >
              <defs>
                <linearGradient id="luxuryGoldMini" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#bf953f" />
                  <stop offset="50%" stop-color="#fcf6ba" />
                  <stop offset="100%" stop-color="#aa771c" />
                </linearGradient>
              </defs>

              {/* Camera Body Path */}
              <path
                d="M 12,28 
                   A 5,5 0 0,1 17,23 
                   L 30,23 
                   A 3,3 0 0,0 33,20 
                   L 36,15 
                   A 5,5 0 0,1 40,12 
                   L 60,12 
                   A 5,5 0 0,1 64,15 
                   L 67,20 
                   A 3,3 0 0,0 70,23 
                   L 83,23 
                   A 5,5 0 0,1 88,28 
                   L 88,67 
                   A 5,5 0 0,1 83,72 
                   L 17,72 
                   A 5,5 0 0,1 12,67 
                   Z"
                fill="none"
                stroke="url(#luxuryGoldMini)"
                stroke-width="3"
                stroke-linejoin="round"
              />

              {/* Shutter Button */}
              <path d="M 22,23 L 22,18 C 22,17, 28,17, 28,18 L 28,23 Z" fill="url(#luxuryGoldMini)" />

              {/* Lens Circle */}
              <circle cx="50" cy="47" r="17" fill="none" stroke="url(#luxuryGoldMini)" stroke-width="3" />
              
              {/* Rotating Shutter Blades */}
              <g transform="translate(50, 47)">
                <g className="group-hover:rotate-[120deg] transition-transform duration-700 ease-out origin-center">
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" />
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" transform="rotate(60)" />
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" transform="rotate(120)" />
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" transform="rotate(180)" />
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" transform="rotate(240)" />
                  <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldMini)" transform="rotate(300)" />
                </g>
              </g>

              {/* Monogram "AR" text next to camera */}
              <text
                x="88"
                y="61"
                font-family="'Playfair Display', serif"
                font-size="44"
                font-weight="bold"
                fill="url(#luxuryGoldMini)"
                letter-spacing="-2"
              >
                AR
              </text>
            </svg>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="font-serif text-[12.5px] tracking-[0.2em] font-medium text-cream group-hover:text-gold transition-colors duration-300 uppercase leading-none">
              lenslyrics
            </span>
            <span className="text-[6px] tracking-[0.38em] not-italic text-muted/70 uppercase font-light leading-none">
              ar archives
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.17em]">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="relative group py-2"
            >
              <span className={`transition-colors duration-300 ${location.pathname === link.path ? 'text-gold' : 'text-cream group-hover:text-gold'}`}>
                {link.name}
              </span>
              {/* Active Link Underline Indicator */}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Button */}
        <div className="flex items-center gap-6 z-50">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer"
            className="hidden md:flex text-[10px] tracking-[0.12em] uppercase items-center gap-2 border-b border-gold pb-1 hover:text-gold transition-colors duration-300"
          >
            Follow Us
          </a>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-cream hover:text-gold transition-colors p-2 -mr-2 focus:outline-none"
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 flex flex-col justify-between px-[6vw] pt-[120px] pb-12 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-[22px] uppercase tracking-[0.2em] font-serif mt-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-gold font-medium' : 'text-cream/80 hover:text-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 border-t border-gold/10 pt-8 mt-auto"
            >
              <span className="text-[9px] tracking-[0.3em] uppercase text-muted/60">Get in touch</span>
              <a href="mailto:info@lenslyrics.ar" className="text-[13px] text-gold tracking-wider hover:underline font-light">
                info@lenslyrics.ar
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] tracking-[0.15em] uppercase self-start border-b border-gold pb-1 text-cream hover:text-gold transition-colors duration-300 mt-2"
              >
                Follow Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}