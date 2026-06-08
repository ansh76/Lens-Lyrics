import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative px-8 py-4 rounded-full border border-white/20 hover:border-gold transition-colors duration-300 overflow-hidden group ${className}`}
    >
      <span className="relative z-10 text-[10px] uppercase tracking-[0.15em] text-cream group-hover:text-black transition-colors duration-300">
        {children}
      </span>
      {/* Fill effect */}
      <div className="absolute inset-0 bg-gold scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-expo z-0" />
    </motion.button>
  );
}