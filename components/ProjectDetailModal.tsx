import React, { useState } from 'react';
// FIX: Import the Variants and AnimatePresence types from framer-motion.
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { GitHubIcon } from './icons/GitHubIcon';

// FIX: Update Project interface to use an array for images.
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

interface ProjectDetailModalProps {
    project: Project;
    onClose: () => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants: Variants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: { 
        y: "0", 
        opacity: 1,
        transition: { duration: 0.3, type: "spring", damping: 25, stiffness: 200 }
    },
    exit: { 
        y: "100vh", 
        opacity: 0,
        transition: { duration: 0.3 }
    },
};

const carouselVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = page % project.imageUrls.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div
                layoutId={`project-card-${project.id}`}
                className="bg-[#292525]/80 backdrop-blur-lg border border-gray-700/50 rounded-lg w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                variants={modalVariants}
            >
                {/* Image Carousel */}
                <div className="w-full h-64 md:h-80 bg-gray-700 relative flex-shrink-0 overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={page}
                            src={project.imageUrls[imageIndex]}
                            custom={direction}
                            variants={carouselVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                            className="absolute h-full w-full object-cover"
                        />
                    </AnimatePresence>
                    
                    {project.imageUrls.length > 1 && (
                        <>
                            <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
                                <button onClick={() => paginate(-1)} className="bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors">
                                    &#10094;
                                </button>
                            </div>
                            <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
                                <button onClick={() => paginate(1)} className="bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors">
                                    &#10095;
                                </button>
                            </div>
                             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                                {project.imageUrls.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    
                     <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6 md:p-8 flex-grow">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F1D500] mb-4">{project.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-[#F1D500]/20 text-[#F1D500] text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        {project.longDescription || project.description}
                    </p>
                    <div className="flex items-center gap-4">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-[#F1D500] text-gray-900 font-bold px-6 py-2 rounded-md transition-transform hover:scale-105">
                                View Live
                            </a>
                        )}
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                                <GitHubIcon className="w-5 h-5" />
                                <span>View Code</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};