
import React, { useRef } from 'react';
import { motion, type Transition, useScroll, useTransform, type Variants } from 'framer-motion';
import { type Project } from '../../data/projects';


// --- Reusable Frame Components for realistic project presentation ---
const BrowserFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-[#1a1a1a] border border-white/10 rounded-t-xl overflow-hidden shadow-2xl h-full w-full flex flex-col ${className}`}>
    <div className="bg-[#222] px-4 py-2 flex items-center gap-2 border-b border-white/5 flex-shrink-0">
      <span className="w-2.5 h-2.5 bg-red-500/50 rounded-full"></span>
      <span className="w-2.5 h-2.5 bg-yellow-500/50 rounded-full"></span>
      <span className="w-2.5 h-2.5 bg-green-500/50 rounded-full"></span>
    </div>
    <div className="flex-grow relative bg-black overflow-hidden">
      {children}
    </div>
  </div>
);

const PhoneFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`relative mx-auto border-[#0a0a0a] bg-[#0a0a0a] border-[8px] md:border-[12px] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl w-full aspect-[9/19] overflow-hidden ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-[#0a0a0a] rounded-b-2xl z-20"></div>
      <div className="rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden w-full h-full bg-black relative">
        {children}
      </div>
  </div>
);

// A dedicated component to render the project's visual representation.
const ProjectVisual = ({ project }: { project: Project }) => {
    const imageUrl = project.projectThumbnail || project.imageUrls[0];
    switch (project.displayType) {
        case 'web':
            return (
                <div className="w-full aspect-video">
                    <BrowserFrame>
                        <img src={imageUrl} className="w-full h-full object-cover object-top" alt={project.title} />
                    </BrowserFrame>
                </div>
            );
        case 'mobile':
            return (
                <div className="w-full max-w-[280px] mx-auto py-4">
                    <PhoneFrame>
                        <img src={imageUrl} className="w-full h-full object-cover" alt={project.title} />
                    </PhoneFrame>
                </div>
            );
        case 'design':
        default:
             return (
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <img src={imageUrl} className="w-full h-auto object-contain" alt={project.title} />
                </div>
            );
    }
}

interface ShowcaseProjectItemProps {
  project: Project;
  onClick: () => void;
  index: number;
  container: React.RefObject<HTMLElement | null>;
}

// --- Animated Project Item for the scrollable showcase ---
const ShowcaseProjectItem: React.FC<ShowcaseProjectItemProps> = ({ project, onClick, index, container }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container: container as any,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    const isReversed = index % 2 !== 0;

    const contentVariants: Variants = {
        hidden: { opacity: 0, x: isReversed ? 50 : -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section 
            ref={ref} 
            className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-24 md:py-32 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
        >
            <motion.div 
                className="w-full lg:w-1/2" 
                style={{ scale }}
            >
                <motion.div style={{ y: imageY }}>
                     <ProjectVisual project={project} />
                </motion.div>
            </motion.div>
            
            <motion.div 
                className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <span className="text-[#F1D500] font-mono text-xs tracking-[0.3em] uppercase mb-4 font-bold">0{index + 1} // Project</span>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">{project.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">{tag}</span>
                    ))}
                </div>
                <button
                    onClick={onClick}
                    className="group relative bg-[#F1D500] text-black font-black px-10 py-4 rounded-xl transition-all hover:bg-white hover:scale-105 active:scale-95 self-center lg:self-start flex items-center gap-3 overflow-hidden"
                >
                    <span className="relative z-10 text-sm tracking-widest">EXPLORE CASE STUDY</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </motion.div>
        </section>
    );
};


// --- Main ShowcasePage Component ---
interface ShowcasePageProps {
    title: string;
    projects: Project[];
    onBack: () => void;
    onShowProjectDetail: (project: Project) => void;
}

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
};


export const ShowcasePage: React.FC<ShowcasePageProps> = ({ title, projects, onBack, onShowProjectDetail }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    return (
        <motion.div
            key="showcase"
            ref={scrollContainerRef}
            className="flex-grow flex flex-col w-full h-full"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Minimalist Header */}
            <header className="w-full pt-12 pb-8 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <button onClick={onBack} className="group mb-6 text-xs text-gray-500 hover:text-[#F1D500] flex items-center gap-2 font-bold tracking-[0.2em] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            BACK TO PORTFOLIO
                        </button>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">{title}</h2>
                    </div>
                    <p className="text-gray-500 text-sm md:text-base max-w-sm mb-2 font-medium">
                        Selected works demonstrating expertise in {title.toLowerCase()} and digital craftsmanship.
                    </p>
                </div>
            </header>
            
            {/* Scrollable Project List */}
            <main className="w-full max-w-7xl mx-auto px-6 z-10 pb-32">
                {projects.map((project, index) => (
                    <ShowcaseProjectItem 
                        key={project.id} 
                        project={project}
                        index={index}
                        container={scrollContainerRef}
                        onClick={() => onShowProjectDetail(project)} 
                    />
                ))}
            </main>
        </motion.div>
    );
};
