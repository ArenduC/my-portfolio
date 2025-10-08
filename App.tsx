import React, { useState } from 'react';
// FIX: Corrected import path casing to resolve file name casing conflict.
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import { AboutPage } from './components/pages/AboutPage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { ContactPage } from './components/pages/ContactPage';
import { BlogPage } from './components/pages/BlogPage';
import { ShowcasePage } from './components/pages/ShowcasePage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { type Project } from './data/projects';

// Define a more robust view state
interface ViewState {
  name: string;
  title?: string;
  projects?: Project[];
  project?: Project;
  previousView?: ViewState;
}

function App() {
  const [view, setView] = useState<ViewState>({ name: 'About' });
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const handleSetView = (name: string, payload = {}) => {
    setView(currentView => ({ name, ...payload, previousView: currentView }));
  };

  const handleBack = () => {
    if (view.previousView) {
      setView(view.previousView);
    } else {
      // Fallback for safety
      if (view.name === 'ProjectDetail') handleSetView('Showcase');
      if (view.name === 'Showcase') handleSetView('Portfolio');
    }
  };


  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: event.clientX, y: event.clientY });
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button')
    ) {
      setCursorVariant('hover');
    } else {
      setCursorVariant('default');
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -100, y: -100 });
    setCursorVariant('default');
  };

  const renderPage = () => {
    switch (view.name) {
      case 'Portfolio':
        return <PortfolioPage onShowcase={(title, projects) => handleSetView('Showcase', { title, projects })} />;
      case 'Showcase':
        return <ShowcasePage 
                  title={view.title!} 
                  projects={view.projects!} 
                  onBack={() => handleSetView('Portfolio')}
                  onShowProjectDetail={(project) => handleSetView('ProjectDetail', { project, title: view.title, projects: view.projects })}
                />;
      case 'ProjectDetail':
        return <ProjectDetailPage project={view.project!} onBack={handleBack} />;
      case 'Contact':
        return <ContactPage />;
      case 'Blog':
        return <BlogPage />;
      case 'About':
      default:
        return <AboutPage />;
    }
  };
  
  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(241, 213, 0, 0.5)',
      mixBlendMode: 'normal' as const,
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      mixBlendMode: 'difference' as const,
    },
  };

  return (
    <main 
        className="relative w-full bg-[#101010] text-white overflow-x-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: mousePos.x - 16,
          translateY: mousePos.y - 16,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <AnimatedBackground mousePos={mousePos} />
      <div className="relative z-10 flex h-screen w-full flex-col p-6 sm:p-8 md:p-16">
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