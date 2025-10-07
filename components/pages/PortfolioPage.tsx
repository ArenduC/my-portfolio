import React from 'react';
import { motion, type Transition, type Variants } from 'framer-motion';

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


// Define the Project type, consistent with ShowcasePage
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

interface PortfolioPageProps {
    onShowcase: (title: string, projects: Project[]) => void;
}

// Mock Data
const webProjects: Project[] = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'The very website you are browsing now, built with React, Next.js, and Tailwind CSS.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=Portfolio-1', 'https://placehold.co/600x400/101010/F1D500?text=Portfolio-2'],
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        longDescription: 'This personal portfolio is designed to showcase my skills and projects in a clean, modern, and interactive way. It features a dynamic animated background, smooth page transitions with Framer Motion, and a fully responsive design that works across all devices. The project is built on a robust stack including React and TypeScript for a type-safe and component-based architecture.',
        repoUrl: 'https://github.com',
    },
    {
        id: 2,
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce site for a fictional brand, built with Angular.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=E-commerce-1', 'https://placehold.co/600x400/101010/F1D500?text=E-commerce-2', 'https://placehold.co/600x400/101010/F1D500?text=E-commerce-3'],
        tags: ['Angular', 'TypeScript', 'SCSS', 'NgRx'],
        longDescription: 'This project is a comprehensive e-commerce platform featuring product catalogs, user authentication, a shopping cart, and a checkout process. State management is handled efficiently using NgRx. The front-end is built with Angular and is fully responsive.',
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com',
    },
];

const mobileProjects: Project[] = [
    {
        id: 3,
        title: 'Fitness Tracker App',
        description: 'A cross-platform mobile app to track workouts and nutrition, built with Flutter.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=Fitness-1', 'https://placehold.co/600x400/101010/F1D500?text=Fitness-2'],
        tags: ['Flutter', 'Dart', 'Firebase'],
        longDescription: 'This fitness tracker helps users monitor their physical activity and diet. Features include real-time workout tracking, barcode scanner for food logging, and progress charts. It uses Firebase for backend services like authentication and database.',
        repoUrl: 'https://github.com',
    },
    {
        id: 4,
        title: 'Recipe Finder App',
        description: 'A mobile application for discovering and saving recipes, using a public API.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=Recipe-1'],
        tags: ['Flutter', 'Dart', 'REST API'],
        longDescription: 'This app allows users to search for recipes based on ingredients they have. It fetches data from a third-party API and presents it in a user-friendly interface. Users can save their favorite recipes for later access.',
        repoUrl: 'https://github.com',
    },
];

const designProjects: Project[] = [
    {
        id: 5,
        title: '3D Donut',
        description: 'My first foray into 3D modeling following the famous Blender Guru tutorial.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=Donut-3D-1'],
        tags: ['Blender'],
        longDescription: 'Every 3D artist starts somewhere, and for many, it\'s with a donut. This project was my introduction to the fundamentals of Blender, including modeling, sculpting, texturing, lighting, and rendering.',
    },
    {
        id: 6,
        title: 'Mobile App UI/UX',
        description: 'A complete UI/UX design for a conceptual travel planning application.',
        imageUrls: ['https://placehold.co/600x400/101010/F1D500?text=Travel-UI-1', 'https://placehold.co/600x400/101010/F1D500?text=Travel-UI-2'],
        tags: ['Figma', 'UI/UX Design'],
        longDescription: 'This project involved user research, wireframing, prototyping, and creating a high-fidelity design for a travel app. The goal was to create an intuitive and visually appealing interface that simplifies trip planning.',
    },
];


const portfolioCategories = [
    {
        title: 'Web Development',
        description: 'Building responsive and dynamic websites and applications.',
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Web+Dev',
        projects: webProjects,
    },
    {
        title: 'Mobile App Development',
        description: 'Creating beautiful and performant apps for iOS and Android with Flutter.',
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Mobile+Dev',
        projects: mobileProjects,
    },
    {
        title: 'UI/UX & 3D Design',
        description: 'Designing intuitive interfaces and creating 3D models and scenes.',
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Design',
        projects: designProjects,
    },
];

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
                    {portfolioCategories.map(category => (
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