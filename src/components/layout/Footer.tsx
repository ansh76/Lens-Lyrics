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
          <Link to="/" className="flex items-center gap-3.5 group w-max">
            <div className="relative w-[56px] h-[36px] flex items-center justify-center">
              <svg
                viewBox="0 0 140 90"
                className="w-full h-full text-gold group-hover:scale-105 transition-transform duration-500 ease-out"
              >
                <defs>
                  <linearGradient id="luxuryGoldFooter" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  stroke="url(#luxuryGoldFooter)"
                  stroke-width="3"
                  stroke-linejoin="round"
                />

                {/* Shutter Button */}
                <path d="M 22,23 L 22,18 C 22,17, 28,17, 28,18 L 28,23 Z" fill="url(#luxuryGoldFooter)" />

                {/* Lens Circle */}
                <circle cx="50" cy="47" r="17" fill="none" stroke="url(#luxuryGoldFooter)" stroke-width="3" />
                
                {/* Rotating Shutter Blades */}
                <g transform="translate(50, 47)">
                  <g className="group-hover:rotate-[120deg] transition-transform duration-700 ease-out origin-center">
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" />
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" transform="rotate(60)" />
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" transform="rotate(120)" />
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" transform="rotate(180)" />
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" transform="rotate(240)" />
                    <path d="M 0,-15 L 13,-7.5 L 3,-3 Z" fill="url(#luxuryGoldFooter)" transform="rotate(300)" />
                  </g>
                </g>

                {/* Monogram "AR" text next to camera */}
                <text
                  x="88"
                  y="61"
                  font-family="'Playfair Display', serif"
                  font-size="44"
                  font-weight="bold"
                  fill="url(#luxuryGoldFooter)"
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