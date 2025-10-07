import React from 'react';
// FIX: Import the Transition type from framer-motion.
import { motion, type Transition } from 'framer-motion';

// Mock data for portfolio categories
const portfolioCategories = [
    {
        title: 'Web Development',
        description: 'Creating responsive and dynamic websites and web applications.',
        projects: [
            { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with a custom CMS.', imageUrls: ['/placeholder-web1.png', '/placeholder-web2.png', '/placeholder-web3.png'], tags: ['React', 'Node.js', 'PostgreSQL'], longDescription: 'This project involved building a complete e-commerce platform from scratch. It features a product catalog, user authentication, a shopping cart, and an admin dashboard for managing products and orders.', repoUrl: 'https://github.com' },
            { id: 2, title: 'Corporate Website', description: 'A sleek and modern corporate website for a tech startup.', imageUrls: ['/placeholder-web2.png', '/placeholder-web3.png'], tags: ['Gatsby', 'Contentful', 'GraphQL'], repoUrl: 'https://github.com' },
            { id: 3, title: 'Data Visualization Dashboard', description: 'An interactive dashboard for visualizing complex datasets.', imageUrls: ['/placeholder-web3.png'], tags: ['D3.js', 'React', 'Firebase'], liveUrl: '#' },
        ]
    },
    {
        title: 'Mobile Apps',
        description: 'Building cross-platform mobile applications for iOS and Android.',
        projects: [
            { id: 4, title: 'Social Networking App', description: 'A feature-rich social app with real-time chat.', imageUrls: ['/placeholder-mobile1.png', '/placeholder-mobile2.png'], tags: ['Flutter', 'Firebase', 'Dart'], repoUrl: 'https://github.com' },
            { id: 5, title: 'Fitness Tracker', description: 'An app to track workouts, nutrition, and progress.', imageUrls: ['/placeholder-mobile2.png', '/placeholder-mobile1.png'] , tags: ['React Native', 'Redux', 'SQLite'] },
        ]
    },
    {
        title: 'UI/UX Design',
        description: 'Designing intuitive and beautiful user interfaces.',
        projects: [
            { id: 6, title: 'Design System', description: 'A comprehensive design system for a suite of products.', imageUrls: ['/placeholder-ui1.png', '/placeholder-ui2.png'], tags: ['Figma', 'Storybook'] },
            { id: 7, title: 'Mobile Banking App Redesign', description: 'A complete redesign of a mobile banking application.', imageUrls: ['/placeholder-ui2.png'], tags: ['Figma', 'User Research'], liveUrl: '#' },
        ]
    }
];

const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
};

// FIX: Explicitly type pageTransition to fix TypeScript error where the 'type' property was being widened to 'string'.
const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

interface PortfolioPageProps {
    onShowcase: (title: string, projects: any[]) => void;
}

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
            <div className="max-w-4xl w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Work</h2>
                <p className="text-lg md:text-xl text-[#7A7A7A] mb-12">
                    Here's a selection of projects I've worked on. Click on a category to see more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {portfolioCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            className="bg-[#3c3c39]/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => onShowcase(category.title, category.projects)}
                        >
                            <h3 className="text-2xl font-bold text-[#F1D500] mb-2">{category.title}</h3>
                            <p className="text-gray-400">{category.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};