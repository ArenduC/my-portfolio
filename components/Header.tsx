
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubIcon } from './icons/GitHubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { InstagramIcon } from './icons/InstagramIcon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Add interface for NavLink props
interface NavLinkProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`font-medium relative transition-colors duration-300 px-2 py-1 ${
      isActive ? 'text-white' : 'text-[#7A7A7A] hover:text-white'
    }`}
  >
    {label}
    {isActive && (
      <motion.span
        className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#F1D500] rounded-full"
        layoutId="underline"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </button>
);

// Add interface for SocialIcon props
interface SocialIconProps {
  href: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors">
        {children}
    </a>
);

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const navItems = ['About', 'Portfolio', 'Blog', 'Contact'];

  const handleLinkClick = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const logoAColor = isMenuOpen ? '#111827' : (isLogoHovered ? '#F1D500' : '#7A7A7A');
  const logoCColor = isMenuOpen ? '#111827' : (isLogoHovered ? '#7A7A7A' : '#F1D500');

  return (
    <>
      <header className="w-full flex justify-between items-center z-50 mb-8">
        {/* Logo */}
        <motion.div
          className="font-museo text-4xl font-bold tracking-tighter cursor-pointer"
          onHoverStart={() => setIsLogoHovered(true)}
          onHoverEnd={() => setIsLogoHovered(false)}
          onClick={() => handleLinkClick('About')}
        >
          <motion.span animate={{ color: logoAColor }} transition={{ duration: 0.4 }}>A</motion.span>
          <motion.span animate={{ color: logoCColor }} transition={{ duration: 0.4 }}>C</motion.span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item}
              label={item}
              isActive={activeTab === item}
              onClick={() => setActiveTab(item)}
            />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4  pr-6 mr-2">
                <SocialIcon href="https://github.com">
                    <GitHubIcon className="w-5 h-5 text-[#7A7A7A] hover:text-white transition-colors" />
                </SocialIcon>
                <SocialIcon href="www.linkedin.com/in/arendu-chanda-474008273">
                    <LinkedInIcon className="w-5 h-5 text-[#7A7A7A] hover:text-white transition-colors" />
                </SocialIcon>
            </div>
            
           
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <a 
            href="https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/resume.pdf" 
            download
            className="p-2 text-[#F1D500] border border-[#F1D500]/30 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -mr-2">
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'text-gray-900 rotate-180' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0)' }}
            animate={{ clipPath: 'circle(150% at 100% 0)' }}
            exit={{ clipPath: 'circle(0% at 100% 0)' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="md:hidden fixed inset-0 bg-[#F1D500] z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className="text-4xl font-bold text-gray-800 hover:text-gray-900"
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center gap-8 mt-16">
               <SocialIcon href="https://github.com"><GitHubIcon className="w-8 h-8 text-gray-800" /></SocialIcon>
               <SocialIcon href="www.linkedin.com/in/arendu-chanda-474008273"><LinkedInIcon className="w-8 h-8 text-gray-800" /></SocialIcon>
               
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
