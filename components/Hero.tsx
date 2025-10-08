import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="max-w-4xl text-center">
      <motion.div 
        className="font-museo text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter mb-8 inline-flex cursor-pointer"
        whileHover="hover"
      >
        <motion.span 
            style={{ color: '#7A7A7A' }}
            variants={{ hover: { x: -15, scale: 1.05 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
            A
        </motion.span>
        <motion.span 
            style={{ color: '#F1D500' }}
            variants={{ hover: { x: 15, scale: 1.05 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
            C
        </motion.span>
      </motion.div>
      <p className="text-2xl md:text-4xl text-[#7A7A7A] leading-tight">
        Hi, I'm <span className="font-bold text-[#F1D500]">Arendu Chanda</span>, a software developer who
        loves building web and mobile applications. I’m passionate about using
        technology to solve problems and create meaningful solutions.
      </p>
    </div>
  );
};

export default Hero;