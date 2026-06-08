import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Core UI Imports
import Navbar from './components/layout/Navbar';
import Preloader from './components/ui/Preloader'; 
import ErrorBoundary from './components/ui/ErrorBoundary';

// Lazy Loaded Pages for performance bundle optimization
const Home = React.lazy(() => import('./pages/Home'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Services = React.lazy(() => import('./pages/Services'));
const About = React.lazy(() => import('./pages/About'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const CinematicGrid = React.lazy(() => import('./components/ui/CinematicGrid'));

const LoadingFallback = () => (
  <div className="min-h-screen w-full bg-black text-cream flex items-center justify-center font-sans">
    <div className="flex flex-col items-center gap-4">
      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      <span className="text-[10px] tracking-[0.2em] text-muted uppercase font-light">Retrieving archives...</span>
    </div>
  </div>
);

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      {/* 1. Global Preloader logic */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main App Content (Loads after preloader) */}
      {!isLoading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/cinematic-grid" element={<CinematicGrid />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                {/* 404 Route Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </>
      )}
    </ErrorBoundary>
  );
}