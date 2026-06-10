import { motion, useMotionValue, useSpring, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { FormEvent, useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import { ArrowUpRight, MessageCircle, Camera, Check, ShieldCheck } from 'lucide-react';
import useDocumentMetadata from '../hooks/useDocumentMetadata';
import CinematicDust from '../components/home/CinematicDust';

// 1. Custom Animated Input with floating labels & gold highlight
interface AnimatedInputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

function AnimatedInput({ label, id, type = "text", required = false, placeholder, value, onChange }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="flex flex-col gap-2 relative">
      <motion.label 
        htmlFor={id} 
        animate={{
          y: isFocused || value ? -2 : 6,
          scale: isFocused || value ? 0.95 : 1,
          color: isFocused ? "#c6a85b" : "rgba(157, 154, 147, 0.6)"
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="text-[9px] uppercase tracking-[0.2em] origin-left select-none pointer-events-none"
      >
        {label}
      </motion.label>
      <input 
        type={type} 
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ""}
        className="bg-transparent border-b border-white/10 pb-3 text-cream focus:outline-none transition-colors placeholder:text-white/10 text-sm font-light z-10"
      />
      {/* Expanding Focus Underline */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-center z-20"
      />
    </div>
  );
}

// 2. Custom Animated Textarea with floating labels & gold highlight
interface AnimatedTextareaProps {
  label: string;
  id: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

function AnimatedTextarea({ label, id, required = false, placeholder, value, onChange }: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="flex flex-col gap-2 relative">
      <motion.label 
        htmlFor={id} 
        animate={{
          y: isFocused || value ? -2 : 6,
          scale: isFocused || value ? 0.95 : 1,
          color: isFocused ? "#c6a85b" : "rgba(157, 154, 147, 0.6)"
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="text-[9px] uppercase tracking-[0.2em] origin-left select-none pointer-events-none"
      >
        {label}
      </motion.label>
      <textarea 
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ""}
        className="bg-transparent border-b border-white/10 pb-3 text-cream focus:outline-none transition-colors placeholder:text-white/10 text-sm font-light min-h-[100px] resize-none z-10"
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-center z-20"
      />
    </div>
  );
}

// 3. Custom Animated Select with dropdown support
interface AnimatedSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

function AnimatedSelect({ label, id, value, onChange, options }: AnimatedSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="flex flex-col gap-2 relative">
      <motion.label 
        htmlFor={id} 
        animate={{
          y: -2,
          scale: 0.95,
          color: isFocused ? "#c6a85b" : "rgba(157, 154, 147, 0.6)"
        }}
        className="text-[9px] uppercase tracking-[0.2em] origin-left select-none"
      >
        {label}
      </motion.label>
      <div className="relative">
        <select 
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-white/10 pb-3 text-cream focus:outline-none transition-colors appearance-none text-sm font-light cursor-pointer z-10"
        >
          {options.map((opt) => (
            <option key={opt} className="bg-ink text-cream" value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-2 bottom-3 pointer-events-none text-muted text-[8px] opacity-65">▼</div>
      </div>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-center z-20"
      />
    </div>
  );
}

export default function Contact() {
  useDocumentMetadata(
    "Get in Touch", 
    "Contact Abhishek Rajput at lens lyric.ar to discuss commissions, wedding story scheduling, fashion editorial setups, or commercial pricing."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [refCode, setRefCode] = useState("");
  
  // Focal Plane Curtain Shutter Animation Controls
  const curtainTopControls = useAnimation();
  const curtainBottomControls = useAnimation();

  const contactContainerRef = useRef<HTMLDivElement>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Wedding Photography");
  const [message, setMessage] = useState("");

  // Mouse cursor tracking for background light leaks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 45, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Initial position in center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Run initial shutter open animation on mount (curtains slide apart)
  useEffect(() => {
    curtainTopControls.start({
      y: "-100%",
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }
    });
    curtainBottomControls.start({
      y: "100%",
      transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.1 }
    });
  }, [curtainTopControls, curtainBottomControls]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `LL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(generatedCode);

    // Simulate database write / network delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // 1. Close Shutter (curtains meet in middle)
    await Promise.all([
      curtainTopControls.start({
        y: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      }),
      curtainBottomControls.start({
        y: 0,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      })
    ]);

    // 2. Toggle status views while closed
    setIsSent(true);
    setIsSubmitting(false);

    // 3. Open Shutter (curtains slide apart) to reveal success details
    await Promise.all([
      curtainTopControls.start({
        y: "-100%",
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      }),
      curtainBottomControls.start({
        y: "100%",
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
      })
    ]);
  };

  const handleReset = async () => {
    // 1. Close Shutter
    await Promise.all([
      curtainTopControls.start({
        y: 0,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
      }),
      curtainBottomControls.start({
        y: 0,
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
      })
    ]);

    // 2. Clear values
    setIsSent(false);
    setName("");
    setEmail("");
    setInterest("Wedding Photography");
    setMessage("");

    // 3. Re-open Shutter
    await Promise.all([
      curtainTopControls.start({
        y: "-100%",
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
      }),
      curtainBottomControls.start({
        y: "100%",
        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
      })
    ]);
  };

  return (
    <PageWrapper>
      <div 
        ref={contactContainerRef}
        onMouseMove={handleMouseMove}
        className="pt-[140px] bg-black min-h-screen w-full relative z-10 flex flex-col justify-between overflow-hidden animate-fade-in"
      >
        {/* Cinematic WebGL Particles */}
        <CinematicDust />

        {/* Dynamic Light Leak (Follows Cursor) */}
        <motion.div
          style={{
            x: useTransform(smoothX, (val) => val - 250),
            y: useTransform(smoothY, (val) => val - 250),
            backgroundImage: 'radial-gradient(circle, rgba(198,168,91,0.14) 0%, rgba(233,229,221,0.02) 50%, transparent 75%)'
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px] z-0 hidden md:block"
        />

        <main className="px-[4.5vw] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-center relative z-10">
          
          {/* Left Column: Typography & Info details */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-mono block mb-4">
              Let's make something timeless
            </span>
            <AnimatedText 
              text="Have a story worth telling?"
              className="font-serif text-5xl md:text-7xl lg:text-[80px] tracking-tight text-cream leading-[1] mb-8"
              el="h1"
            />
            <p className="text-muted text-sm leading-[2] max-w-[400px] mb-12 font-light">
              Tell us a little about what you're planning. We take on a limited number of commissions every year to ensure every story gets our absolute focus.
            </p>

            <div className="flex flex-col gap-6 mt-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold block mb-1">Direct Inquiries</span>
                <a href="mailto:hello@lenslyrics.in" className="text-cream text-lg hover:text-gold transition-colors duration-300 flex items-center gap-2 w-max group">
                  hello@lenslyrics.in <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
              
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold block mb-1">WhatsApp</span>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-cream text-lg hover:text-gold transition-colors duration-300 flex items-center gap-2 w-max group">
                  +91 98765 43210 <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Card Form & Focal-Plane Shutter */}
          <div className="lg:col-span-7 w-full relative">
            
            <div className="relative overflow-hidden rounded-sm border border-white/5 bg-ink/35 backdrop-blur-xl p-8 md:p-12 min-h-[500px] flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              
              {/* Focal-Plane Curtain Shutter Overlay */}
              <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-sm">
                {/* Top Curtain */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={curtainTopControls}
                  className="absolute top-0 left-0 w-full h-1/2 bg-[#090909] border-b border-gold/30 shadow-[0_2px_12px_rgba(198,168,91,0.15)] pointer-events-auto"
                />
                {/* Bottom Curtain */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={curtainBottomControls}
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-[#090909] border-t border-gold/30 shadow-[0_-2px_12px_rgba(198,168,91,0.15)] pointer-events-auto"
                />
              </div>

              <AnimatePresence mode="wait">
                {!isSent ? (
                  /* Form View */
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col gap-6 relative z-10"
                  >
                    <AnimatedInput 
                      label="Your Name" 
                      id="name"
                      required
                      placeholder="Abhishek Rajput"
                      value={name}
                      onChange={setName}
                    />

                    <AnimatedInput 
                      label="Email Address" 
                      id="email"
                      type="email"
                      required
                      placeholder="abhi@lenslyrics.in"
                      value={email}
                      onChange={setEmail}
                    />

                    <AnimatedSelect 
                      label="I'm interested in" 
                      id="interest"
                      value={interest}
                      onChange={setInterest}
                      options={[
                        "Wedding Photography",
                        "Fashion & Editorial",
                        "Commercial Photography",
                        "Cinematic Film"
                      ]}
                    />

                    <AnimatedTextarea 
                      label="Tell us your story" 
                      id="message"
                      required
                      placeholder="Locations, dates, and visual style preferences..."
                      value={message}
                      onChange={setMessage}
                    />

                    <div className="mt-4 flex items-center justify-between">
                      <MagneticButton className="px-8 py-3 border border-white/10 hover:border-gold">
                        {isSubmitting ? 'Shutter Loading...' : 'Release Inquiry'}
                      </MagneticButton>
                      <Camera size={18} className="text-white/20 animate-pulse hidden sm:block" />
                    </div>
                  </motion.form>
                ) : (
                  /* Success View (Archive Card) */
                  <motion.div 
                    key="success-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full flex flex-col gap-6 relative z-10 text-center items-center py-6"
                  >
                    {/* Ring Icon */}
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5 mb-2 relative animate-bounce">
                      <Check className="w-8 h-8 text-gold" />
                      <span className="absolute inset-0 rounded-full border border-gold/10 scale-125 animate-ping" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-[0.35em] text-gold font-mono">Archive Logged</span>
                      <h2 className="font-serif text-3xl text-cream">Story Logged Successfully</h2>
                    </div>

                    <div className="border border-white/5 bg-black/40 p-5 rounded-xs w-full max-w-md text-left flex flex-col gap-3 text-xs font-light">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted uppercase text-[8px] tracking-widest">Client</span>
                        <span className="text-cream font-medium">{name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted uppercase text-[8px] tracking-widest">Inquiry Type</span>
                        <span className="text-gold font-medium">{interest}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-muted uppercase text-[8px] tracking-widest">Archive Reference</span>
                        <span className="text-cream font-mono">{refCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted uppercase text-[8px] tracking-widest">Status</span>
                        <span className="text-green-500 flex items-center gap-1 font-mono">
                          <ShieldCheck size={12} /> Live Queue
                        </span>
                      </div>
                    </div>

                    <p className="text-muted text-xs leading-relaxed max-w-sm font-light mt-2">
                      Thank you for sharing your story details, {name.split(' ')[0]}. A direct link has been routed to Abhishek. We will respond within 24 hours.
                    </p>

                    <button 
                      onClick={handleReset}
                      className="mt-4 text-[10px] tracking-[0.2em] uppercase text-gold hover:text-cream border-b border-gold/30 hover:border-cream pb-1 transition-all duration-300"
                    >
                      Log Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </PageWrapper>
  );
}