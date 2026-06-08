import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import Footer from '../components/layout/Footer';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import BookingDrawer from '../components/services/BookingDrawer';
import { 
  ArrowUpRight, 
  Check, 
  Camera, 
  ChevronDown, 
  HelpCircle, 
  Clock, 
  Layers, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

// Highly optimized sample images from Unsplash matching photography categories
const services = [
  {
    id: '01',
    title: 'Wedding Stories',
    category: 'Weddings',
    price: 'Starting at ₹45,000',
    desc: 'Honest, cinematic frames that preserve every quiet glance and loud celebration.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    includes: [
      '8 Hours of continuous coverage by lead filmmakers',
      'Lead photographer + second shooter',
      '150+ high-resolution custom retouched files',
      'Private online preview & download gallery',
      'Luxury leather-bound fine art photo book'
    ],
    gear: 'Sony A7R V, Sony A9 III, 35mm & 85mm f/1.4 GM',
    timeline: 'Previews in 7 days, complete gallery in 4 weeks'
  },
  {
    id: '02',
    title: 'Pre-Wedding Films',
    category: 'Pre-Weddings',
    price: 'Starting at ₹25,000',
    desc: 'Bespoke love stories crafted with intentional movement, music, and dramatic lighting.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Full day production at two curated locations',
      'Creative storyboarding & fashion consulting',
      '2-3 minute cinematic highlight film (4K)',
      '60-second teaser optimized for social media',
      'Professional sound recording & audio design'
    ],
    gear: 'Sony FX3 Cinema Line, DJI Ronin RS3 Pro, prime kit',
    timeline: 'Teaser in 5 days, film delivery in 3 weeks'
  },
  {
    id: '03',
    title: 'Fashion & Editorial',
    category: 'Fashion',
    price: 'Starting at ₹35,000',
    desc: 'Distinctive visual narratives built for designers, modeling agencies, and modern campaigns.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    includes: [
      '6 Hours of studio or location production',
      'Moodboard design & collaborative art direction',
      '25 high-end retouched editorial selections',
      'Full digital and commercial usage rights',
      'Professional lighting setup (Profoto B10X)'
    ],
    gear: 'Hasselblad X2D 100C, 38mm & 90mm XCD lenses',
    timeline: 'Selection proofing in 48 hours, delivery in 14 days'
  },
  {
    id: '04',
    title: 'Commercial Projects',
    category: 'Commercial',
    price: 'Starting at ₹50,000',
    desc: 'Purposeful imagery that gives products, architecture, and spaces a strong visual presence.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Pre-production concept and staging plan',
      'Commercial product staging & macro shots',
      'Lifestyle-context action frames',
      '40+ retouched commercial-grade visuals',
      'Global print and web commercial licensing'
    ],
    gear: 'Sony A7R V, 90mm f/2.8 Macro G, 24-70mm f/2.8 GM II',
    timeline: 'Proofing in 3 days, master assets in 10 business days'
  },
  {
    id: '05',
    title: 'Cinematic Films',
    category: 'Film',
    price: 'Starting at ₹60,000',
    desc: 'Emotion-led documentary and commercial films, crafted with meticulous detail.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    includes: [
      '2 Cinematographers + director of photography',
      '4K 10-bit color profile recording',
      'Licensed atmospheric soundscapes & music licensing',
      '4-6 minute narrative wedding or brand film',
      'Full ceremony and speeches archive cuts'
    ],
    gear: 'RED Komodo 6K, Sony FX6, anamorphic cinema lens kit',
    timeline: 'Initial cut review in 4 weeks, delivery in 6 weeks'
  }
];

const packages = [
  {
    name: 'Vanguard',
    type: 'Essential',
    price: '₹25,000',
    tagline: 'Ideal for small sessions, portraits, or minimal coverage.',
    features: [
      '4 Hours continuous coverage',
      '1 Lead visual creator',
      '50 High-res retouched digital photos',
      'Online proofing archive (60 days)',
      'Single shooter gear setup',
      'Standard licensing rights'
    ]
  },
  {
    name: 'Heritage',
    type: 'Signature',
    price: '₹55,000',
    tagline: 'Our most sought-after full-day creative package.',
    features: [
      '8 Hours continuous coverage',
      '2 Lead photographers + 1 assistant',
      '120+ High-res retouched digital photos',
      'Premium custom-bound photo book (40 pages)',
      'Private online gallery (1 year archive)',
      'Social media preview frames (48 hours)',
      'Pre-shoot location scouting'
    ],
    isFeatured: true
  },
  {
    name: 'Cine-Opus',
    type: 'Elite Combo',
    price: '₹95,000',
    tagline: 'Ultimate photo and cinematic video merger for high-end narratives.',
    features: [
      'Full day event coverage (Up to 12 Hours)',
      '3 Crew members (2 photo, 1 cinematic video)',
      '200+ High-res retouched digital photos',
      '5-Minute 4K master highlight film',
      '1-Minute social teaser highlight',
      'Luxury glass cover album + 2 parent print books',
      'Raw files delivered on custom USB-C SSD'
    ]
  }
];

const processSteps = [
  {
    id: '01',
    title: 'The Discovery',
    subtitle: 'Consultation & Moodboarding',
    desc: 'Every session begins with a conversation. We discuss your visual preferences, study moodboards, and align on color theories, locations, and styling notes.'
  },
  {
    id: '02',
    title: 'Pre-Production',
    subtitle: 'Location Scouting & Timing',
    desc: 'We map out the sunlight trajectories, select exact backdrops, draft a detailed timeline and shots list, ensuring the production is highly intentional.'
  },
  {
    id: '03',
    title: 'The Session',
    subtitle: 'Shoot Day & Creative Capture',
    desc: 'With advanced setups and a relaxed atmosphere, we create a flow that allows natural frames and raw, cinematic elements to surface without feeling forced.'
  },
  {
    id: '04',
    title: 'The Development',
    subtitle: 'Curation & Editorial Retouching',
    desc: 'Every photo is hand-selected and color graded according to our signature film look, applying delicate tone curves, grain, and skin-tone perfection.'
  },
  {
    id: '05',
    title: 'The Deliverable',
    subtitle: 'Gallery Archive & Prints',
    desc: 'Your visual assets are delivered via a high-end password-secured web portal, and physical custom-made leather books are shipped to your doorstep.'
  }
];

const faqs = [
  {
    question: 'What is your core signature photography style?',
    answer: 'We describe our approach as "editorial documentary." We aim to capture candid, raw moments of emotion with the styling, lighting, and composition found in premium editorial magazines. Every image is colored with a cinematic film tone.'
  },
  {
    question: 'Do you travel for national or international assignments?',
    answer: 'Yes. We are based in India, but travel worldwide for destination weddings, campaigns, and commercial assignments. We handle all planning, and travel costs are billed transparently at actuals.'
  },
  {
    question: 'What is your timeline for delivering the visual assets?',
    answer: 'For photography, we share an initial teaser gallery within 48-72 hours. Complete edited high-resolution galleries are delivered in 3-4 weeks. Films take 4-6 weeks to allow for music licensing, sound design, and custom grading.'
  },
  {
    question: 'Will we receive the raw unedited files?',
    answer: 'We do not release raw or unedited files because post-production represents half of our artistic stamp. However, for commercial packages or by special contract request, raw files can be acquired under license.'
  },
  {
    question: 'How do we secure a date with Lens Lyrics?',
    answer: 'Dates are secured on a first-come, first-served basis. An initial retainer of 40% along with a signed creative contract is required to block your date on our shooting calendar.'
  }
];

export default function Services() {
  useDocumentMetadata("Services & Commissions", "Discover services and commission details from lens lyric.ar, including wedding stories, editorial campaigns, and product shoots.");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Drawer states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleRowClick = (idx: number) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  const triggerInquiry = (serviceName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering accordion close
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <PageWrapper>
      <div className="pt-[140px] bg-black min-h-screen w-full relative z-10 text-cream selection:bg-gold selection:text-black font-sans">
        
        {/* HERO SECTION */}
        <section className="px-[4.5vw] mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium flex items-center gap-1.5 mb-4">
                <Sparkles size={10} className="text-gold" /> SERVICES & COMMISSIONS
              </span>
              <AnimatedText 
                text="Intended Frames."
                className="font-serif text-5xl md:text-7xl lg:text-[90px] tracking-tight text-cream leading-[1.05]"
                el="h1"
              />
              <AnimatedText 
                text="Crafted for the selective eye."
                className="font-serif text-3xl md:text-5xl lg:text-[50px] tracking-tight text-gold/80 leading-[1.1] mt-2"
                el="h2"
              />
            </div>
            <p className="text-muted text-sm md:text-base font-light leading-[1.8] max-w-[420px] md:mb-2">
              From intimate editorials to grand cinematic productions, our work is defined by patience, timing, and an uncompromising approach to detail.
            </p>
          </div>
        </section>

        {/* SPECIALTIES TICKER TICKER */}
        <div className="w-full overflow-hidden bg-zinc-950/40 border-y border-white/5 py-4 mb-24 md:mb-32 relative select-none">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <motion.div 
            className="flex gap-16 whitespace-nowrap text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted/50 font-medium w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
          >
            {[...Array(2)].map((_, mainIdx) => (
              <div key={mainIdx} className="flex gap-16 items-center">
                <span>WEDDING STORIES</span>
                <span className="text-gold">•</span>
                <span>PRE-WEDDING FILMS</span>
                <span className="text-gold">•</span>
                <span>FASHION & EDITORIAL</span>
                <span className="text-gold">•</span>
                <span>COMMERCIAL PROJECTS</span>
                <span className="text-gold">•</span>
                <span>PORTRAIT SESSIONS</span>
                <span className="text-gold">•</span>
                <span>CINEMATIC SHORT REELS</span>
                <span className="text-gold">•</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* INTERACTIVE SERVICE LIST */}
        <section className="px-[4.5vw] mb-32 relative">
          <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
            <span className="text-[10px] tracking-[0.2em] text-muted uppercase">SPECIALTY FOCUS</span>
            <span className="text-[10px] tracking-[0.2em] text-muted uppercase hidden md:block">CLICK TO CHOOSE / EXPAND SPECIALTY</span>
          </div>

          {/* Services Rows Wrapper */}
          <div className="divide-y divide-white/10">
            {services.map((service, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div key={service.id} className="relative py-1">
                  <motion.div
                    onClick={() => handleRowClick(idx)}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 cursor-pointer group transition-all duration-300 select-none"
                  >
                    {/* Index & Title */}
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="font-serif text-base md:text-xl text-gold group-hover:translate-x-1 transition-transform duration-300">
                        {service.id}
                      </span>
                      <h3 className="font-serif text-2xl md:text-4xl lg:text-[42px] text-cream group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Desc and Arrow */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-8 mt-4 md:mt-0 pl-11 md:pl-0">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted/70 font-medium">
                        {service.category}
                      </span>
                      <div className="flex items-center gap-4">
                        <motion.div 
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:text-gold group-hover:border-gold/40 transition-colors duration-300"
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expanded Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pt-2 pl-11 pr-4 md:pr-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          
                          {/* Image preview for all viewports */}
                          <div className="lg:col-span-4 w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/5 mb-4 lg:mb-0">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                          </div>

                          {/* Left Column: Description & Metadata */}
                          <div className="lg:col-span-4 space-y-6">
                            <p className="text-muted text-sm leading-[1.8] font-light">
                              {service.desc}
                            </p>
                            
                            <div className="space-y-3 font-mono text-[10px] tracking-wider text-muted">
                              <div className="flex items-center gap-2">
                                <Camera size={12} className="text-gold/60" />
                                <span><span className="text-cream">Primary Setup:</span> {service.gear}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={12} className="text-gold/60" />
                                <span><span className="text-cream">Timeline:</span> {service.timeline}</span>
                              </div>
                            </div>

                            <div className="pt-2">
                              <button 
                                onClick={(e) => triggerInquiry(service.title, e)}
                                className="px-6 py-3 border border-gold/30 hover:border-gold bg-gold/5 text-gold text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center gap-2"
                              >
                                Book consultation <ArrowUpRight size={13} />
                              </button>
                            </div>
                          </div>

                          {/* Right Column: Inclusions List */}
                          <div className="lg:col-span-4 bg-zinc-950/50 border border-white/5 p-6 md:p-8 space-y-4">
                            <span className="text-[10px] tracking-[0.2em] text-gold uppercase font-medium flex items-center gap-1.5">
                              <Layers size={11} className="text-gold" /> Included Deliverables
                            </span>
                            <ul className="space-y-3">
                              {service.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-cream font-light leading-relaxed">
                                  <span className="mt-1 w-4 h-4 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                                    <Check size={9} />
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE PACKAGES & PRICING */}
        <section className="px-[4.5vw] mb-32 bg-gradient-to-b from-transparent via-zinc-950/20 to-transparent py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">INVESTMENT TIERS</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mt-2 mb-4">Pricing Packages</h2>
            <p className="text-muted text-sm font-light leading-relaxed">
              Transparent scaling structures built to suit different visual needs. Custom options are also available upon request.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {packages.map((pkg, i) => {
              const isFeatured = pkg.isFeatured;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
                  className={`relative flex flex-col justify-between p-8 md:p-10 border transition-all duration-500 hover:translate-y-[-4px] ${
                    isFeatured 
                      ? 'bg-zinc-950 border-gold/50 shadow-[0_10px_30px_rgba(198,168,91,0.08)]' 
                      : 'bg-zinc-950/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[8px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                      Most Requested
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-baseline mb-4">
                      <div>
                        <span className="text-[9px] tracking-[0.2em] text-muted uppercase font-medium">{pkg.type}</span>
                        <h3 className="font-serif text-2xl text-cream mt-1">{pkg.name}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-light mb-8 pb-6 border-b border-white/5 min-h-[50px]">
                      {pkg.tagline}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs text-cream/95 font-light">
                          <Check size={13} className="text-gold mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Link button */}
                  <button
                    onClick={(e) => triggerInquiry(`${pkg.name} (${pkg.type})`, e)}
                    className={`w-full py-3.5 text-center text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 ${
                      isFeatured 
                        ? 'bg-gold text-black hover:bg-gold/90' 
                        : 'border border-white/10 hover:border-gold hover:text-gold text-cream'
                    }`}
                  >
                    Select {pkg.name} Plan
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* WORKFLOW PROCESS SECTION */}
        <section className="px-[4.5vw] mb-32 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 pb-8 border-b border-white/10">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium">CREATIVE PATHWAY</span>
              <h2 className="font-serif text-3xl md:text-5xl text-cream mt-2">Our Process</h2>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed font-light">
              Meticulous workflow structures designed to protect the integrity of the artistic product from consultation to delivery.
            </p>
          </div>

          {/* Timeline container */}
          <div className="relative pl-6 md:pl-10 space-y-12 md:space-y-16 border-l border-white/10 ml-2 md:ml-4">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="relative"
              >
                {/* Timeline node marker */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-black border border-gold flex items-center justify-center z-10">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold animate-pulse" />
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Step ID & Heading */}
                  <div className="md:col-span-4">
                    <span className="font-mono text-[10px] text-gold tracking-widest block uppercase mb-1">
                      Phase {step.id}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-cream leading-tight">{step.title}</h3>
                    <span className="text-[10px] text-muted tracking-wide font-light block mt-1">{step.subtitle}</span>
                  </div>

                  {/* Step Description */}
                  <div className="md:col-span-8">
                    <p className="text-muted text-sm leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE FAQ ACCORDION */}
        <section className="px-[4.5vw] mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium flex items-center justify-center gap-1.5">
              <HelpCircle size={11} className="text-gold" /> FREQUENT INQUIRIES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mt-2">Common Questions</h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, idx) => {
              const isFaqOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-2">
                  <button
                    onClick={() => setActiveFaq(isFaqOpen ? null : idx)}
                    className="w-full py-6 flex justify-between items-center text-left gap-6 group"
                  >
                    <h3 className="font-serif text-base md:text-lg text-cream group-hover:text-gold transition-colors duration-300 leading-snug">
                      {faq.question}
                    </h3>
                    <span className="w-6 h-6 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-muted group-hover:text-cream transition-colors duration-300">
                      <motion.span
                        animate={{ rotate: isFaqOpen ? 135 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-light text-sm flex items-center justify-center"
                      >
                        +
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isFaqOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted text-xs md:text-sm leading-relaxed font-light pb-6 pr-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="px-[4.5vw] mb-32 text-center py-20 bg-zinc-950/60 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,91,0.03)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block">LET'S COLLABORATE</span>
            <h2 className="font-serif text-4xl md:text-6xl text-cream tracking-tight leading-tight">
              Let's create something timeless.
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto leading-[1.8] font-light">
              Submit an inquiry to schedule a digital video call, explore artistic options, and lock down your spot on our shooting calendar.
            </p>
            <div className="pt-6 flex justify-center">
              <MagneticButton>
                <button 
                  onClick={(e) => triggerInquiry('General Consult', e as any)} 
                  className="w-full h-full"
                >
                  Start your project
                </button>
              </MagneticButton>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Booking Form Side Drawer */}
      <BookingDrawer 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
    </PageWrapper>
  );
}