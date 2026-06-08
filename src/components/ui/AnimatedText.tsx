import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
}

export default function AnimatedText({ text, className = '', el: Element = 'h2', delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ');
  const Component = Element as unknown as React.ComponentType<{ className?: string; children?: React.ReactNode }>;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <Component className={`${className} overflow-hidden`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="inline-block flex flex-wrap"
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
            <motion.span variants={childVariants} className="inline-block whitespace-nowrap">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}