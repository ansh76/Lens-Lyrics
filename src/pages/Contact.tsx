import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import AnimatedText from '../components/ui/AnimatedText';
import MagneticButton from '../components/ui/MagneticButton';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

export default function Contact() {
  useDocumentMetadata("Get in Touch", "Contact Abhishek Rajput at lens lyric.ar to discuss commissions, wedding story scheduling, fashion editorial setups, or commercial pricing.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <PageWrapper>
      <div className="pt-[140px] bg-black min-h-screen w-full relative z-10 flex flex-col justify-between">
        
        <main className="px-[4.5vw] grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 mb-32">
          
          {/* Left Column: Typography & Info */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium block mb-4">
              Let's make something timeless
            </span>
            <AnimatedText 
              text="Have a story worth telling?"
              className="font-serif text-5xl md:text-7xl lg:text-[90px] tracking-tight text-cream leading-[1] mb-8"
              el="h1"
            />
            <p className="text-muted text-sm leading-[2] max-w-[400px] mb-12 font-light">
              Tell us a little about what you're planning. We take on a limited number of commissions every year to ensure every story gets our absolute focus.
            </p>

            <div className="flex flex-col gap-6 mt-auto">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold block mb-1">Direct Inquiries</span>
                <a href="mailto:hello@lenslyrics.in" className="text-cream text-lg hover:text-gold transition-colors duration-300 flex items-center gap-2 w-max">
                  hello@lenslyrics.in <ArrowUpRight size={16} />
                </a>
              </div>
              
              {/* WhatsApp Integration */}
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold block mb-1">WhatsApp</span>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-cream text-lg hover:text-gold transition-colors duration-300 flex items-center gap-2 w-max">
                  +91 98765 43210 <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Form */}
          <div className="w-full">
            <form 
              onSubmit={handleSubmit}
              className="bg-ink/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[9px] uppercase tracking-[0.2em] text-gold">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  placeholder="John Doe"
                  className="bg-transparent border-b border-white/20 pb-4 text-cream focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[9px] uppercase tracking-[0.2em] text-gold">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="john@example.com"
                  className="bg-transparent border-b border-white/20 pb-4 text-cream focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="text-[9px] uppercase tracking-[0.2em] text-gold">I'm interested in</label>
                <select 
                  id="interest"
                  className="bg-transparent border-b border-white/20 pb-4 text-cream focus:outline-none focus:border-gold transition-colors appearance-none text-sm font-light cursor-pointer"
                >
                  <option className="bg-ink text-cream">Wedding Photography</option>
                  <option className="bg-ink text-cream">Fashion & Editorial</option>
                  <option className="bg-ink text-cream">Commercial Photography</option>
                  <option className="bg-ink text-cream">Cinematic Film</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[9px] uppercase tracking-[0.2em] text-gold">Tell us your story</label>
                <textarea 
                  id="message"
                  required
                  placeholder="Date, location, and what's on your mind..."
                  className="bg-transparent border-b border-white/20 pb-4 text-cream focus:outline-none focus:border-gold transition-colors placeholder:text-white/20 text-sm font-light min-h-[100px] resize-none"
                />
              </div>

              <div className="mt-4">
                <MagneticButton className={isSent ? 'border-green-500/50' : ''}>
                  {isSubmitting ? 'Sending...' : isSent ? 'Inquiry Received' : 'Send Inquiry'}
                </MagneticButton>
              </div>
            </form>
          </div>

        </main>

        <Footer />
      </div>
    </PageWrapper>
  );
}