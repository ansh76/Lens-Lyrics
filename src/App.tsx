import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Core UI Imports
import Navbar from './components/layout/Navbar';
import Preloader from './components/ui/Preloader'; 
import ErrorBoundary from './components/ui/ErrorBoundary';

// Static Import for Home to eliminate initial loading screen completely
import Home from './pages/Home';

// Pre-resolve import promises for other pages to load them in parallel
const portfolioPromise = import('./pages/Portfolio');
const servicesPromise = import('./pages/Services');
const aboutPromise = import('./pages/About');
const blogPromise = import('./pages/Blog');
const contactPromise = import('./pages/Contact');
const notFoundPromise = import('./pages/NotFound');
const cinematicGridPromise = import('./components/ui/CinematicGrid');

const Portfolio = React.lazy(() => portfolioPromise);
const Services = React.lazy(() => servicesPromise);
const About = React.lazy(() => aboutPromise);
const Blog = React.lazy(() => blogPromise);
const Contact = React.lazy(() => contactPromise);
const NotFound = React.lazy(() => notFoundPromise);
const CinematicGrid = React.lazy(() => cinematicGridPromise);

const LoadingFallback = () => null;

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