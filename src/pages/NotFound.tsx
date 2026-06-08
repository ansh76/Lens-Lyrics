import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

export default function NotFound() {
  useDocumentMetadata("404 Page Not Found", "The page you are looking for does not exist on lens lyric.ar visual archives.");

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black w-full relative z-10 flex flex-col items-center justify-center text-cream px-6 py-20 font-sans">
        <div className="max-w-2xl text-center space-y-6 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-medium">
            ERROR CODE 404 // VISUAL REEL MISSING
          </span>
          
          <AnimatedText 
            text="Frame index not found."
            className="font-serif text-5xl md:text-7xl text-cream tracking-tight leading-tight"
            el="h1"
          />

          <p className="text-muted text-sm leading-[1.8] font-light max-w-md mx-auto">
            The coordinates you requested do not correlate to any stored visual records. The gallery may have been archived or relocated.
          </p>

          <div className="pt-6">
            <Link to="/">
              <MagneticButton>
                <span className="flex items-center gap-2">
                  <ArrowLeft size={12} /> Back to archives
                </span>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
