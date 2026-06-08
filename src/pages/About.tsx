import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import AnimatedText from '../components/ui/AnimatedText';
import ImageCard3D from '../components/ui/ImageCard3D';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

export default function About() {
  useDocumentMetadata("About the Photographer", "Meet Abhishek Rajput, the principal artist and storyteller behind lens lyric.ar. Discover our vision and documentary approach.");
  return (
    <PageWrapper>
      <div className="pt-[140px] bg-black min-h-screen">
        <section className="px-[4.5vw] grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink/50 border border-white/5">
  <ImageCard3D 
    imageUrl="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=85" 
    altText="Abhishek Rajput"
  />
  <div className="absolute bottom-8 left-8 pointer-events-none z-10">
    <span className="text-[10px] tracking-[0.3em] text-cream uppercase font-medium">The Artist</span>
  </div>
</div>
          
          <div className="flex flex-col gap-8">
            <AnimatedText 
              text="Observer. Storyteller. Light chaser."
              className="font-serif text-5xl md:text-6xl text-cream"
              el="h2"
            />
            <p className="text-muted text-sm leading-[1.8] font-light max-w-lg">
              I believe the most beautiful photographs happen in the space between poses. My work is about finding that space, then letting it breathe. Lens Lyrics is an independent photography and film studio led by Abhishek Rajput.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mt-8 border-t border-white/10 pt-8">
              <div>
                <b className="block font-serif text-3xl text-gold">09</b>
                <span className="text-[9px] uppercase tracking-widest text-muted">Years behind the lens</span>
              </div>
              <div>
                <b className="block font-serif text-3xl text-gold">240+</b>
                <span className="text-[9px] uppercase tracking-widest text-muted">Stories documented</span>
              </div>
              <div>
                <b className="block font-serif text-3xl text-gold">18</b>
                <span className="text-[9px] uppercase tracking-widest text-muted">Countries travelled</span>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageWrapper>
  );
}