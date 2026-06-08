import PageWrapper from '../components/layout/PageWrapper';
import HeroVideo from '../components/home/HeroVideo';
import BrandMetrics from '../components/home/BrandMetrics';
import DisciplinesShowcase from '../components/home/DisciplinesShowcase';
import HorizontalGallery from '../components/home/HorizontalGallery';
import ClientTestimonials from '../components/home/ClientTestimonials';
import InstagramFeed from '../components/home/InstagramFeed';
import AnimatedText from '../components/ui/AnimatedText';
import Footer from '../components/layout/Footer';
import { useScroll, motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

export default function Home() {
  useDocumentMetadata("Cinematic Editorial & Documentary Photography", "Lens Lyrics is an independent imagery house led by Abhishek Rajput. We approach humans, architecture, and editorial spaces with deep clarity and absolute structural presence.");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const statementY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <PageWrapper>
      <div ref={containerRef} className="bg-black w-full relative z-10 select-none text-cream selection:bg-gold selection:text-black">
        
        {/* 1. Cinematic Video Hero */}
        <HeroVideo />

        {/* 2. Brand Core Philosophy Statement */}
        <section className="py-32 md:py-40 px-[8.5vw] bg-[#090909] border-b border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
          <motion.div style={{ y: statementY }} className="w-full md:w-2/3">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block mb-4">Our Philosophy</span>
            <AnimatedText 
              text="Not just photographs. Proof that you were here, and that it mattered."
              className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-cream"
              el="h2"
            />
          </motion.div>
          <div className="w-full md:w-1/3">
            <p className="text-muted text-sm leading-[1.8] font-light max-w-sm">
              Lens Lyrics is an independent imagery house led by Abhishek Rajput. We approach humans, architecture, and editorial spaces with deep clarity and absolute structural presence.
            </p>
          </div>
        </section>

        {/* 3. Visual Heritage Brand Metrics */}
        <BrandMetrics />

        {/* 4. Split Directory Pillars Showcase */}
        <DisciplinesShowcase />

        {/* 5. Horizontal Infinite Scroll Featured Gallery */}
        <HorizontalGallery />

        {/* 6. Luxury Quotes Client Testimonials */}
        <ClientTestimonials />

        {/* 7. Live Instagram Social Stream */}
        <InstagramFeed />

        {/* 8. Unified Footer */}
        <Footer />

      </div>
    </PageWrapper>
  );
}