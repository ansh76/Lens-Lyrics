import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  // Mechanical shutter blade animation variants using the 'custom' prop for staggering
  const bladeVariants: Variants = {
    initial: { scaleY: 1 },
    animate: (i: number) => ({ 
      scaleY: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.05 // Dynamic delay based on the index
      } 
    }),
    exit: (i: number) => ({ 
      scaleY: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.05 // Reverse or keep same delay for closing
      } 
    })
  };

  return (
    <>
      {/* The Shutter Mechanism */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex h-screen w-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i} // Pass the index to the variants
            className="h-full w-1/5 bg-ink border-r border-white/5 origin-top"
            variants={bladeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        ))}
      </div>

      {/* The Page Content */}
      <motion.main
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.main>
    </>
  );
}