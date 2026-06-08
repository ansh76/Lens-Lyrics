import PageWrapper from '../components/layout/PageWrapper';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import useDocumentMetadata from '../hooks/useDocumentMetadata';

const articles = [
  { title: "Capturing Golden Hour", date: "May 2026", excerpt: "Tips for authentic light..." },
  { title: "Udaipur Wedding Guide", date: "April 2026", excerpt: "Planning the perfect day..." },
];

export default function Blog() {
  useDocumentMetadata("Journal Archives", "Explore lens lyric.ar journal archives for guides on planning destination shoots, behind the scenes articles, and visual design theories.");
  return (
    <PageWrapper>
      <div className="pt-[140px] bg-black min-h-screen">
        <header className="px-[4.5vw] mb-20">
          <h1 className="font-serif text-5xl md:text-7xl text-cream mb-6">Journal</h1>
          <p className="text-muted max-w-xl">Photography articles and latest updates.</p>
        </header>

        <section className="px-[4.5vw] grid md:grid-cols-2 gap-12 mb-32">
          {articles.map((post, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/5 p-8 hover:border-gold transition-colors duration-500"
            >
              <span className="text-[9px] text-gold uppercase tracking-widest">{post.date}</span>
              <h2 className="font-serif text-2xl my-4">{post.title}</h2>
              <p className="text-muted text-sm">{post.excerpt}</p>
            </motion.div>
          ))}
        </section>
        <Footer />
      </div>
    </PageWrapper>
  );
}