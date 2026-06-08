import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Calendar, Sparkles, User, Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const servicesList = [
  'Wedding Stories',
  'Pre-Wedding Films',
  'Fashion & Editorial',
  'Commercial Projects',
  'Corporate Identity',
  'Product Photography',
  'Cinematic Films'
];

const budgetRanges = [
  '₹15,000 - ₹30,000',
  '₹30,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000+'
];

export default function BookingDrawer({ isOpen, onClose, selectedService, setSelectedService }: BookingDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState(budgetRanges[1]);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set the body overflow to hidden when drawer is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sanitizeInput = (val: string): string => {
    return val
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Sanitize user inputs to protect against XSS injection vulnerabilities
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedDetails = sanitizeInput(details);

    console.log("Inquiry registered securely:", {
      name: sanitizedName,
      email: sanitizedEmail,
      details: sanitizedDetails,
      date,
      budget,
      selectedService
    });
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setDate('');
    setBudget(budgetRanges[1]);
    setDetails('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    // Reset success screen only when drawer fully closes (wait for animation)
    setTimeout(() => {
      if (!isOpen) resetForm();
    }, 300);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: '0%', 
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%', 
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Content */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-[520px] bg-[#090909] border-l border-white/10 z-50 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium flex items-center gap-1.5">
                  <Sparkles size={10} className="text-gold" /> Initiate Project
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-cream mt-1">Book a Session</h2>
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
                  
                  {/* Service Choice */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Select Service
                    </label>
                    <div className="relative">
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-none px-4 py-3 text-sm text-cream focus:outline-none focus:border-gold transition-colors duration-300 appearance-none font-sans"
                      >
                        <option value="" disabled>Select a specialty...</option>
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Client Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Your Full Name
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-muted/60">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aravind Sharma"
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-none pl-12 pr-4 py-3.5 text-sm text-cream placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-sans"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-muted/60">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. hello@domain.com"
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-none pl-12 pr-4 py-3.5 text-sm text-cream placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-sans"
                      />
                    </div>
                  </div>

                  {/* Date of Event */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Target Date
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-muted/60">
                        <Calendar size={16} />
                      </span>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full bg-[#111] border border-white/10 rounded-none pl-12 pr-4 py-3.5 text-sm text-cream focus:outline-none focus:border-gold transition-colors duration-300 font-sans appearance-none"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Estimated Budget
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudget(range)}
                          className={`border p-3 text-center text-xs tracking-wider font-light transition-all duration-300 ${
                            budget === range 
                              ? 'border-gold bg-gold/5 text-gold font-medium' 
                              : 'border-white/5 bg-[#111] text-muted hover:border-white/20 hover:text-cream'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message/Details */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium block">
                      Project Details / Notes
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-muted/60">
                        <MessageSquare size={16} />
                      </span>
                      <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Tell us about your visual goals, theme, or specific frames you have in mind..."
                        rows={4}
                        className="w-full bg-[#111] border border-white/10 rounded-none pl-12 pr-4 py-3.5 text-sm text-cream placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-sans resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold hover:bg-gold/90 text-black font-semibold tracking-[0.15em] text-xs uppercase flex items-center justify-center gap-2 group transition-all duration-300 select-none relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Inquiry 
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-cream mb-3">Inquiry Received</h3>
                  <p className="text-muted text-sm max-w-sm leading-[1.8] font-light mb-8">
                    Thank you, <span className="text-gold font-medium">{name}</span>. We've logged your request for <span className="text-cream font-medium">{selectedService}</span>. Our team will review your creative brief and reach out within 24 hours to schedule a consultation.
                  </p>
                  
                  <button
                    onClick={handleClose}
                    className="px-8 py-3.5 border border-white/10 hover:border-gold text-[10px] tracking-[0.2em] uppercase text-cream hover:text-gold transition-all duration-300"
                  >
                    Back to services
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-white/5 bg-black/40 text-center">
              <p className="text-[10px] tracking-[0.1em] text-muted/60 font-light">
                Lens Lyrics Private Office © 2026. All rights preserved.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
