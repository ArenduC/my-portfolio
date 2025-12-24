
import React, { useRef } from 'react';
import { motion, type Transition, useScroll, useTransform, type Variants } from 'framer-motion';
import { type Project } from '../../data/projects';


// --- Reusable Frame Components for realistic project presentation ---
const BrowserFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`bg-gray-800/50 border border-gray-700/50 rounded-t-xl overflow-hidden shadow-lg h-full w-full flex flex-col ${className}`}>
    <div className="bg-gray-900/70 px-4 py-2 flex items-center gap-2 border-b border-gray-700/50 flex-shrink-0">
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
      <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
    </div>
    <div className="flex-grow relative bg-black overflow-hidden">
      {children}
    </div>
  </div>
);

const PhoneFrame: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => (
  <div className={`relative mx-auto border-black bg-black border-[10px] rounded-[2.5rem] shadow-xl w-full h-full overflow-hidden ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
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
                <BrowserFrame>
                    <img src={imageUrl} className="w-full h-full object-cover object-top" alt={project.title} />
                </BrowserFrame>
            );
        case 'mobile':
            return (
                <div className="w-full max-w-[250px] mx-auto">
                    <PhoneFrame>
                        <img src={imageUrl} className="w-full h-full object-cover" alt={project.title} />
                    </PhoneFrame>
                </div>
            );
        case 'design':
        default:
             return (
                <img src={imageUrl} className="w-full h-auto object-contain rounded-t-xl shadow-lg" alt={project.title} />
            );
    }
}


// --- Animated Project Item for the scrollable showcase ---
const ShowcaseProjectItem = ({ project, onClick, index, container }: { project: Project; onClick: () => void; index: number; container: React.RefObject<HTMLElement> }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        container,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    const isReversed = index % 2 !== 0;

    // Variants for the content block animation, triggered by whileInView
    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section 
            ref={ref} 
            className={`flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-16 ${isReversed ? 'lg:flex-row-reverse' : ''}`}
        >
            <motion.div 
                className="w-full lg:w-3/5" 
                style={{ scale }}
            >
                <motion.div style={{ y: imageY }}>
                     <ProjectVisual project={project} />
                </motion.div>
            </motion.div>
            
            <motion.div 
                className="w-full lg:w-2/5 flex flex-col justify-center text-center lg:text-left"
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ root: container, once: true, amount: 0.3 }}
            >
                <h3 className="text-3xl md:text-4xl font-bold text-[#F1D500] mb-4">{project.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                    {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="bg-[#F1D500]/20 text-[#F1D500] text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <button
                    onClick={onClick}
                    className="bg-gray-700/50 border border-gray-600/80 text-white font-semibold px-8 py-3 rounded-lg transition-all hover:bg-gray-600/80 hover:scale-105 transform self-center lg:self-start"
                >
                    View Details
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
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
};

const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};


export const ShowcasePage: React.FC<ShowcasePageProps> = ({ title, projects, onBack, onShowProjectDetail }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    return (
        <motion.div
            key="showcase"
            ref={scrollContainerRef}
            className="flex-grow flex flex-col w-full overflow-y-auto custom-scrollbar"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Page Header (Scrolls with content) */}
            <header className="w-full py-6">
                <div className="w-full max-w-6xl mx-auto px-4">
                    <button onClick={onBack} className="mb-4 text-sm text-[#F1D500] hover:underline flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Portfolio
                    </button>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-lg md:text-xl text-[#7A7A7A]">
                        A collection of my work in this area. Scroll to explore and click a project for more details.
                    </p>
                </div>
            </header>
            
            {/* Scrollable Project List */}
            <main className="w-full max-w-6xl mx-auto px-4 z-10">
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
