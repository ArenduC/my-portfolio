
import React, { useState } from 'react';
// FIX: Corrected import casing to match filename 'Animatedbackground.tsx' and resolve build error.
import AnimatedBackground from './components/Animatedbackground';
import Header from './components/Header';
import { AboutPage } from './components/pages/AboutPage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { ContactPage } from './components/pages/ContactPage';
import { BlogPage } from './components/pages/BlogPage';
import { ShowcasePage } from './components/pages/ShowcasePage';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';

// Define a more robust view state
interface ViewState {
  name: string;
  title?: string;
  projects?: any[]; // A more specific type could be used here
}

function App() {
  const [view, setView] = useState<ViewState>({ name: 'About' });
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const handleSetView = (name: string, payload = {}) => {
    setView({ name, ...payload });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -100, y: -100 });
  };

  const renderPage = () => {
    switch (view.name) {
      case 'Portfolio':
        return <PortfolioPage onShowcase={(title, projects) => handleSetView('Showcase', { title, projects })} />;
      case 'Showcase':
        return <ShowcasePage title={view.title!} projects={view.projects!} onBack={() => handleSetView('Portfolio')} />;
      case 'Contact':
        return <ContactPage />;
      case 'Blog':
        return <BlogPage />;
      case 'About':
      default:
        return <AboutPage />;
    }
  };

  return (
    <main 
        className="relative w-full bg-[#101010] text-white overflow-x-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      <AnimatedBackground mousePos={mousePos} />
      <div className="relative z-10 flex min-h-screen w-full flex-col p-6 sm:p-8 md:p-16">
        <Header activeTab={view.name} setActiveTab={(tab) => handleSetView(tab)} />
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
        <Footer />
      </div>
    </main>
  );
}

export default App;