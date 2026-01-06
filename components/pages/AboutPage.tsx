
import React from 'react';
import Hero from '../Hero';
import Skills from '../Skills';
import { motion, type Transition } from 'framer-motion';

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

interface AboutPageProps {
    onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <motion.div
            key="about"
            className="flex-grow flex flex-col justify-center items-center text-center gap-16"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <Hero onContactClick={() => onNavigate('Contact')} />
            <Skills />
        </motion.div>
    );
};
