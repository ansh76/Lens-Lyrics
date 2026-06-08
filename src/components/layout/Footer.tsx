import { Link } from 'react-router-dom';
import { Aperture, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink border-t border-white/5 pt-20 pb-10 px-[4.5vw] relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 items-start mb-20">
        
        {/* Brand Meta */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase group w-max">
            <div className="relative w-[34px] h-[34px] flex items-center justify-center">
              <div className="absolute inset-0 border border-gold/40 rounded-full group-hover:border-gold group-hover:scale-105 transition-all duration-500" />
              <svg
                viewBox="0 0 100 100"
                className="w-4 h-4 text-gold group-hover:rotate-[60deg] transition-transform duration-700 ease-out animate-[spin_10s_linear_infinite]"
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
          <p className="text-[12px] text-muted leading-relaxed max-w-[240px] mt-2">
            Cinematic frames & luxury editorial narratives documented worldwide.
          </p>
        </div>

        {/* Navigation Index */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">Explore</span>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link to="/" className="hover:text-cream transition-colors duration-300 w-max">Home</Link>
            <Link to="/portfolio" className="hover:text-cream transition-colors duration-300 w-max">Portfolio</Link>
            <Link to="/services" className="hover:text-cream transition-colors duration-300 w-max">Services & Creative Scale</Link>
            <Link to="/blog" className="hover:text-cream transition-colors duration-300 w-max">Journal Archives</Link>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">Social Index</span>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cream transition-colors duration-300 w-max">Instagram <ArrowUpRight size={12} /></a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cream transition-colors duration-300 w-max">Vimeo Channel <ArrowUpRight size={12} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cream transition-colors duration-300 w-max">Pinterest Boards <ArrowUpRight size={12} /></a>
          </div>
        </div>

        {/* Interactive CTA */}
        <div className="flex flex-col items-start md:items-end justify-center h-full">
          <Link to="/contact">
            <MagneticButton>
              Start a project <ArrowUpRight size={14} className="inline ml-1" />
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-muted">
        <span>© {currentYear} lens lyric.ar · Abhishek Rajput</span>
        <span>India & Worldwide Portfolio</span>
      </div>
    </footer>
  );
}