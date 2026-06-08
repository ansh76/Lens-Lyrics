import { motion } from 'framer-motion';

const metrics = [
  { id: 'I', title: 'GLOBAL DESTINATIONS', value: '12+ Countries', desc: 'Assignments executed worldwide.' },
  { id: 'II', title: 'SHUTTER RELEASES', value: '150K+ Frames', desc: 'Patience in capturing the unseen.' },
  { id: 'III', title: 'RETOUCHED WORK', value: '8,500+ Hours', desc: 'Crafting our signature color tones.' },
  { id: 'IV', title: 'PUBLISHED ARTICLES', value: '14 Editorials', desc: 'Featured in elite visual journals.' }
];

export default function BrandMetrics() {
  return (
    <section className="py-20 bg-zinc-950/20 border-b border-white/5 relative z-20">
      <div className="px-[4.5vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col space-y-3 p-4 md:p-6 border-l border-white/5 hover:border-gold/30 transition-colors duration-500"
          >
            <span className="font-mono text-[9px] text-gold tracking-widest block uppercase">
              METRIC {metric.id}
            </span>
            <div className="space-y-1">
              <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream block font-medium">
                {metric.value}
              </span>
              <span className="text-[10px] tracking-wider text-cream font-medium block">
                {metric.title}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted font-light">
              {metric.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
