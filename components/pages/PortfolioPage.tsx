import React from 'react';
import { motion, type Transition, type Variants } from 'framer-motion';
import { projectData, type Project } from '../../data/projects';

const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
};

const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

// Animation variants for the container and cards
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2, // Start after page transition
        },
    },
};

const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 },
    },
};

interface PortfolioPageProps {
    onShowcase: (title: string, projects: Project[]) => void;
}

const CategoryCard = ({ category, onClick }) => (
    <motion.div 
        onClick={onClick}
        className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer group border border-gray-700/50 shadow-lg aspect-[3/2]"
        variants={cardVariants}
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(241, 213, 0, 0.2)' }}
    >
        {/* Background Image with Zoom Effect */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${category.thumbnail})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-left">
            <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-6">
                 <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                 <p className="text-gray-300 text-sm transition-opacity duration-300 group-hover:opacity-0">{category.description}</p>
            </div>

            {/* Call to Action - Appears on Hover */}
            <div className="absolute bottom-6 left-6 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:bottom-8">
                <span className="text-[#F1D500] font-semibold flex items-center gap-2">
                    View Projects 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </div>
    </motion.div>
);

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onShowcase }) => {
    return (
        <motion.div
            key="portfolio"
            className="flex-grow flex flex-col justify-center items-center text-center px-4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="max-w-6xl w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore My Creations</h2>
                <p className="text-lg md:text-xl text-[#7A7A7A] mb-12 max-w-3xl mx-auto">
                    I thrive on turning complex problems into beautiful, intuitive designs. Dive in to see my work in web, mobile, and design.
                </p>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {projectData.map(category => (
                        <CategoryCard 
                            key={category.title}
                            category={category}
                            onClick={() => onShowcase(category.title, category.projects)}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};