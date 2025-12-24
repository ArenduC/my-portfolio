
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
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
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
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <motion.div
            key={`project-${project.id}`}
            ref={scrollRef}
            className="flex-grow w-full overflow-y-auto custom-scrollbar"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Header with Parallax Image */}
            <header className="relative h-80 md:h-[500px] w-full overflow-hidden">
                <motion.div 
                    className="absolute inset-0"
                    style={{ y: parallaxY }}
                >
                    <img
                        src={project.projectThumbnail || project.imageUrls[0]}
                        alt={`${project.title} main image`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/70 to-transparent" />
                </motion.div>
                <div className="absolute top-6 left-6 z-10">
                     <button onClick={onBack} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-full p-2 text-white hover:bg-black/60 transition-colors flex items-center gap-2 pr-4 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>
            </header>

            {/* Content Section */}
            <main className="relative -mt-24 md:-mt-32 z-10">
                <div className="max-w-4xl mx-auto px-4 md:px-0">
                     <div className="bg-black/20 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 md:p-10">
                        <motion.div 
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</motion.h1>
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-[#F1D500]/20 text-[#F1D500] text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                                ))}
                            </motion.div>
                            <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed mb-12">
                                {project.longDescription || project.description}
                            </motion.p>
                            
                            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pb-4">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-[#F1D500] text-gray-900 font-bold px-6 py-2.5 rounded-lg transition-all hover:bg-yellow-300 hover:scale-105 transform">
                                        View Live
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#F1D500] border border-[#F1D500]/50 font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all hover:bg-[#F1D500]/10 hover:border-[#F1D500]">
                                        <GitHubIcon className="w-5 h-5" />
                                        <span>View Code</span>
                                    </a>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Image Gallery */}
                 <div className="max-w-4xl mx-auto px-6 md:px-8 py-16">
                    <div className="pt-12 border-t border-gray-700/50">
                        <motion.h2 
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true, amount: 0.5 }}
                             transition={{ duration: 0.5 }}
                             className="text-3xl font-bold text-white text-center mb-16">
                             Project Gallery
                        </motion.h2>
                        <div className="space-y-20 md:space-y-32">
                            {project.imageUrls.map((url, index) => {
                                const isReversed = index % 2 !== 0;
                                return (
                                    <motion.div
                                        key={index}
                                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                    >
                                        <motion.div 
                                            className="w-full md:w-3/5"
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <ProjectVisual project={project} imageUrl={url} />
                                        </motion.div>
                                        <div className={`w-full md:w-2/5 text-center ${isReversed ? 'md:text-right' : 'md:text-left'}`}>
                                            <h3 className="text-2xl font-semibold text-[#F1D500] mb-3">Key Feature #{index + 1}</h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                This screenshot captures the project's core functionality, designed for intuitive user interaction and a seamless visual experience.
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};
