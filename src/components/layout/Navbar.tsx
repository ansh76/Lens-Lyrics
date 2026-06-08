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
          className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase z-50 group"
        >
          <div className="relative w-[34px] h-[34px] flex items-center justify-center">
            <div className="absolute inset-0 border border-gold/40 rounded-full group-hover:border-gold group-hover:scale-105 transition-all duration-500" />
            <svg
              viewBox="0 0 100 100"
              className="w-4 h-4 text-gold group-hover:rotate-[60deg] transition-transform duration-700 ease-out"
            >
              <path
                fill="currentColor"
                d="M50 5c-9.1 0-17.7 2.9-24.9 7.9l19.5 25.5 10.4-5.4L50 5zm-33.8 15C10.7 27.8 7.5 38.5 7.5 50h32.1l-10-25.1L16.2 20zm-.5 38.8l16.1 27.9L49.6 60H15.7v-.2zm39 25.9c12.2 0 23-6.6 28.9-16.7L60.5 50.1l-5.4 10.4 4.6 24.2zM83.8 40l-16.1-27.9L50.4 40h33.4z"
                className="opacity-90"
              />
              <circle cx="50" cy="50" r="10" fill="currentColor" className="opacity-40" />
            </svg>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="font-serif text-[12.5px] tracking-[0.16em] font-medium text-cream group-hover:text-gold transition-colors duration-300 lowercase leading-none">
              lens lyric.ar
            </span>
            <span className="text-[6px] tracking-[0.38em] not-italic text-muted/70 uppercase font-light leading-none">
              visual archives
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