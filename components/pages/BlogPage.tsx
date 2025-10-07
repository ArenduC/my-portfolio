import React from 'react';
// FIX: Import the Transition type from framer-motion.
import { motion, type Transition } from 'framer-motion';

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

export const BlogPage: React.FC = () => {
    return (
        <motion.div
            key="blog"
            className="flex-grow flex flex-col justify-center items-center text-center px-4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
             <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">From the Blog</h2>
                <p className="text-lg md:text-xl text-[#7A7A7A]">
                    New posts and articles are coming soon. Stay tuned!
                </p>
            </div>
        </motion.div>
    );
};