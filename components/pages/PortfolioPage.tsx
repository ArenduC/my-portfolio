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
        className="bg-[#3c3c39]/60 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer group border border-gray-700/50"
        variants={cardVariants}
        whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
    >
        <div 
            className="w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${category.thumbnail})` }}
        />
        <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
            <p className="text-gray-400">{category.description}</p>
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
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Work</h2>
                <p className="text-lg md:text-xl text-[#7A7A7A] mb-12">
                    Here are some of the areas I've worked in. Select a category to see the projects.
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