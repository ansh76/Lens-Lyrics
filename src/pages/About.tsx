import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import AnimatedText from '../components/ui/AnimatedText';
import CameraViewfinder from '../components/ui/CameraViewfinder';
import MagneticButton from '../components/ui/MagneticButton';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import { Instagram, ArrowUpRight, Camera, Film, Compass, Quote } from 'lucide-react';

export default function About() {
  useDocumentMetadata(
    "About the Founder - Abhishek Rajput",
    "Meet Abhishek Rajput, the founder and lead cinematographer of Lens Lyrics. Capturing authentic, raw human moments across the globe."
  );

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Timeline scroll tracking
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(timelineProgress, [0, 1], [0, 1]);

  const milestones = [
    {
      year: "2017",
      title: "The First Frame",
      desc: "Began as a self-taught street photographer, capturing the raw geometry of light and daily life in metropolitan hubs.",
      icon: <Camera className="w-4 h-4 text-gold" />
    },
    {
      year: "2019",
      title: "Editorial Directives",
      desc: "Transitioned to commercial cinematography and fashion editorials, learning to shape artificial light to match natural behavior.",
      icon: <Film className="w-4 h-4 text-gold" />
    },
    {
      year: "2021",
      title: "Founding Lens Lyrics",
      desc: "Launched Lens Lyrics with a philosophy of letting stories breathe without forced poses, blending editorial excellence with authentic emotions.",
      icon: <Quote className="w-4 h-4 text-gold" />
    },
    {
      year: "2025",
      title: "Global Archives",
      desc: "Documenting weddings, fashion narratives, and editorial projects in over 18 countries, building an international heritage brand.",
      icon: <Compass className="w-4 h-4 text-gold" />
    }
  ];

  return (
    <PageWrapper>
      <div ref={containerRef} className="bg-black min-h-screen text-cream overflow-hidden">
        
        {/* Hero Section */}
        <section className="pt-[140px] pb-24 px-[4.5vw] grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Portrait Viewfinder */}
          <div className="lg:col-span-5 relative w-full max-w-[480px] mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <CameraViewfinder 
                src="/assets/abhishek.jpg" 
                alt="Abhishek Rajput - Founder of Lens Lyrics" 
              />
            </motion.div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-mono">Creative Director</span>
              <AnimatedText 
                text="Abhishek Rajput"
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-cream"
                el="h1"
              />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-muted text-sm md:text-base leading-[1.8] font-light max-w-xl"
            >
              I believe the most beautiful photographs happen in the space between poses. My work is about finding that space, then letting it breathe. Lens Lyrics is an independent photography and film studio led by Abhishek Rajput, dedicated to capturing editorial presence and absolute raw sincerity.
            </motion.p>

            {/* Metrics cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 md:gap-6 border-t border-b border-white/10 py-6 my-2"
            >
              <div className="group border border-white/5 hover:border-gold/30 bg-ink/40 p-4 rounded-sm transition-all duration-500">
                <b className="block font-serif text-3xl md:text-4xl text-gold group-hover:scale-105 transition-transform duration-500 origin-left">09+</b>
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-muted block mt-1">Years behind the lens</span>
              </div>
              <div className="group border border-white/5 hover:border-gold/30 bg-ink/40 p-4 rounded-sm transition-all duration-500">
                <b className="block font-serif text-3xl md:text-4xl text-gold group-hover:scale-105 transition-transform duration-500 origin-left">240+</b>
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-muted block mt-1">Stories documented</span>
              </div>
              <div className="group border border-white/5 hover:border-gold/30 bg-ink/40 p-4 rounded-sm transition-all duration-500">
                <b className="block font-serif text-3xl md:text-4xl text-gold group-hover:scale-105 transition-transform duration-500 origin-left">18+</b>
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-muted block mt-1">Countries travelled</span>
              </div>
            </motion.div>

            {/* Instagram Link section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-2"
            >
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-muted/70">Connect on social</span>
                <span className="font-serif text-lg text-cream flex items-center gap-1.5 mt-0.5">
                  @_onlyabhiii
                  <Instagram size={14} className="text-gold" />
                </span>
              </div>
              
              <a 
                href="https://instagram.com/_onlyabhiii" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MagneticButton className="px-6 py-3 border border-white/10 hover:border-gold">
                  Follow Creator <ArrowUpRight className="inline-block ml-1 w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                </MagneticButton>
              </a>
            </motion.div>

          </div>
        </section>

        {/* Dynamic Philosophy Callout */}
        <section className="py-24 px-[4.5vw] bg-ink/30 border-y border-white/5 relative flex items-center justify-center min-h-[45vh] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl text-center flex flex-col items-center gap-6 relative z-10">
            <span className="text-[9px] tracking-[0.4em] uppercase text-gold">The Shutter Philosophy</span>
            <AnimatedText 
              text="“A camera is a license to observe closely. It maps the lyric of human vulnerability, freezing feelings that will never repeat.”"
              className="font-serif text-2xl md:text-4xl lg:text-5xl leading-relaxed text-cream/90 italic"
              el="p"
            />
            <div className="h-[1px] w-12 bg-gold/50 mt-4" />
          </div>
        </section>

        {/* Visual Timeline Journey */}
        <section className="py-32 px-[4.5vw] max-w-5xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.4em] uppercase text-gold">Milestones</span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">Chronicles of Abhishek</h2>
            <p className="text-muted text-xs font-light max-w-xs mt-2 uppercase tracking-wider">Tracing the path of visual narrative</p>
          </div>

          <div ref={timelineRef} className="relative mt-12 pl-6 md:pl-0">
            {/* The vertical tracking line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2">
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute top-0 bottom-0 left-0 right-0 bg-gold origin-top"
              />
            </div>

            {/* Timeline Milestones */}
            <div className="flex flex-col gap-16 md:gap-24">
              {milestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle Node on Timeline */}
                    <div className="absolute left-[24px] md:left-1/2 top-1.5 md:top-auto -translate-x-1/2 w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center z-10 transition-colors duration-500 hover:border-gold">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                    </div>

                    {/* Timeline Content Block */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0 md:px-8">
                      <div className={`flex flex-col gap-2 ${
                        !isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'
                      }`}>
                        <span className="font-serif text-4xl md:text-5xl text-gold/80 font-light tracking-tight">{milestone.year}</span>
                        <div className="flex items-center gap-2 mt-1">
                          {milestone.icon}
                          <h3 className="font-sans text-sm tracking-[0.15em] uppercase font-semibold text-cream">{milestone.title}</h3>
                        </div>
                        <p className="text-muted text-xs md:text-sm leading-relaxed font-light mt-1 max-w-sm">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for structure */}
                    <div className="hidden md:block w-[10%]" />
                    <div className="hidden md:block w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </PageWrapper>
  );
}