
import React, { useRef } from 'react';
import { motion, type Transition, useScroll, useTransform, type Variants } from 'framer-motion';
import { GitHubIcon } from '../icons/GitHubIcon';
import { type Project } from '../../data/projects';

// --- Reusable Frame Components ---
const BrowserFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden shadow-lg h-full w-full flex flex-col ${className}`}>
    <div className="bg-gray-900/70 px-4 py-2 flex items-center gap-2 border-b border-gray-700/50 flex-shrink-0">
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
    </div>
    <div className="flex-grow relative bg-black overflow-hidden">
      {children}
    </div>
  </div>
);

const PhoneFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`relative mx-auto border-black bg-black border-[10px] rounded-[2.5rem] shadow-xl w-full h-full overflow-hidden ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
        {children}
      </div>
  </div>
);

const ProjectVisual = ({ project, imageUrl }: { project: Project, imageUrl: string }) => {
    switch (project.displayType) {
        case 'web':
            return (
                <BrowserFrame>
                    <img src={imageUrl} className="w-full h-full object-cover object-top" alt={project.title} />
                </BrowserFrame>
            );
        case 'mobile':
            return (
                <div className="w-full max-w-[280px] mx-auto aspect-[9/19]">
                     <PhoneFrame>
                        <img src={imageUrl} className="w-full h-full object-cover" alt={project.title} />
                    </PhoneFrame>
                </div>
            );
        case 'design':
        default:
             return (
                <img src={imageUrl} className="w-full h-auto object-contain rounded-lg shadow-lg" alt={project.title} />
            );
    }
}

// --- Animation Variants ---
const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const pageTransition: Transition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

const contentVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Main Component ---
interface ProjectDetailPageProps {
    project: Project;
    onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div
            key={`project-${project.id}`}
            ref={scrollRef}
            className="fixed inset-0 z-[60] bg-[#101010] overflow-y-auto custom-scrollbar"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Cinematic Full-Width Header */}
            <header className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black">
                <motion.div 
                    className="absolute inset-0 w-full h-full"
                    style={{ y: parallaxY, opacity: heroOpacity }}
                >
                    <img
                        src={project.projectThumbnail || project.imageUrls[0]}
                        alt={`${project.title} cinematic`}
                        className="w-full h-full object-cover"
                    />
                    {/* Depth Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/20 to-transparent" />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                {/* Floating Title and UI Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="inline-block px-4 py-1 rounded bg-[#F1D500] text-black text-[10px] font-black uppercase tracking-[0.3em] mb-4 shadow-xl">
                                Project Spotlight
                            </span>
                            <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Fixed Navigation UI */}
                <div className="fixed top-8 left-8 z-[70]">
                     <button 
                        onClick={onBack} 
                        className="group bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 text-white hover:bg-[#F1D500] hover:text-black transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-90"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-black text-xs uppercase tracking-widest">Back to Gallery</span>
                    </button>
                </div>
            </header>

            {/* Content Section with Overlay Effect */}
            <main className="relative z-30 -mt-24 px-4 md:px-0">
                <div className="max-w-6xl mx-auto">
                     <div className="bg-[#161616] border border-white/5 rounded-[2.5rem] p-8 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                        <motion.div 
                            variants={contentVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-wrap gap-3 mb-12">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-white/5 text-gray-400 border border-white/10 text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                                <motion.div variants={itemVariants} className="lg:col-span-3">
                                    <h2 className="text-xs font-black text-[#F1D500] uppercase tracking-[0.4em] mb-6">Mission & Execution</h2>
                                    <p className="text-gray-300 text-xl md:text-2xl leading-relaxed font-light">
                                        {project.longDescription || project.description}
                                    </p>
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="flex flex-col gap-6">
                                    <h2 className="text-xs font-black text-[#F1D500] uppercase tracking-[0.4em] mb-2">Navigation</h2>
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#F1D500] text-black font-black py-5 rounded-2xl text-center transition-all hover:bg-white hover:scale-[1.03] shadow-lg text-sm tracking-widest">
                                            LAUNCH LIVE
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 border border-white/10 text-white font-bold py-5 rounded-2xl text-center flex items-center justify-center gap-3 transition-all hover:bg-white/10 text-sm tracking-widest">
                                            <GitHubIcon className="w-5 h-5" />
                                            <span>GITHUB REPO</span>
                                        </a>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Gallery Details */}
                 <div className="max-w-7xl mx-auto py-40 px-6">
                    <div className="space-y-60">
                        {project.imageUrls.map((url, index) => {
                            const isReversed = index % 2 !== 0;
                            const feature = project.features?.[index];
                            return (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col md:flex-row items-center gap-20 md:gap-32 ${isReversed ? 'md:flex-row-reverse' : ''}`}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="w-full md:w-3/5">
                                        <ProjectVisual project={project} imageUrl={url} />
                                    </div>
                                    <div className={`w-full md:w-2/5 ${isReversed ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="text-[#F1D500] font-mono text-xs font-bold tracking-[0.5em] mb-6 block">PROJECT MODULE 0{index + 1}</span>
                                        <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                                            {feature?.title || `Architectural Insight`}
                                        </h3>
                                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
                                            {feature?.description || "An in-depth look at the interface logic and component integration strategies used to deliver a robust performance profile."}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Footer Return */}
                <section className="py-60 bg-gradient-to-t from-black to-transparent text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button 
                            onClick={onBack}
                            className="text-[#F1D500] text-3xl md:text-5xl font-black tracking-tighter hover:text-white transition-colors"
                        >
                            BACK TO WORK
                        </button>
                    </motion.div>
                </section>
            </main>
        </motion.div>
    );
};
