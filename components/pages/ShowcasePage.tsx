import React, { useState } from 'react';
// FIX: Import the Transition type from framer-motion.
import { motion, type Transition, AnimatePresence } from 'framer-motion';
import { ProjectDetailModal } from '../ProjectDetailModal';

// FIX: Define a reusable Project interface with imageUrls array
interface Project {
    id: number;
    title: string;
    description: string;
    imageUrls: string[];
    tags: string[];
    longDescription?: string;
    liveUrl?: string;
    repoUrl?: string;
}

interface ShowcasePageProps {
    title: string;
    projects: Project[];
    onBack: () => void;
}

const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

// FIX: Explicitly type pageTransition to fix TypeScript error where the 'type' property was being widened to 'string'.
const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
};

const ProjectCard = ({ project, onClick }) => (
    <motion.div
        layoutId={`project-card-${project.id}`}
        onClick={onClick}
        className="bg-[#3c3c39]/60 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer group border border-gray-700/50"
        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
    >
        <div className="w-full h-40 sm:h-48 bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url(${project.imageUrls[0]})` }}>
            {/* Using the first image as the thumbnail */}
        </div>
        <div className="p-4">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-3 h-10 overflow-hidden">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-[#F1D500]/20 text-[#F1D500] text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
    </motion.div>
);

export const ShowcasePage: React.FC<ShowcasePageProps> = ({ title, projects, onBack }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    return (
        <>
            <motion.div
                key="showcase"
                className="flex-grow flex flex-col px-4 w-full"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
            >
                <div className="w-full max-w-6xl mx-auto">
                    <button onClick={onBack} className="mb-8 text-sm text-[#F1D500] hover:underline flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Portfolio
                    </button>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-lg md:text-xl text-[#7A7A7A] mb-12">
                        A collection of my work in this area. Click a project for more details.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                    </div>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailModal 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </>
    );
};