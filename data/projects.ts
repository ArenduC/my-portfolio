
// A centralized place for all portfolio project data.

export interface ProjectFeature {
    title: string;
    description: string;
}

// Define the Project type for type safety and consistency.
export interface Project {
    id: number;
    title: string;
    description: string;       // Short description for cards
    projectThumbnail: string;  // Primary thumbnail image
    imageUrls: string[];       // Image URLs for the modal carousel
    tags: string[];            // Technology tags/badges
    displayType: 'web' | 'mobile' | 'design'; // Type of project for display rendering
    longDescription?: string;  // Longer description for the modal
    liveUrl?: string;          // Link to the live project
    repoUrl?: string;          // Link to the GitHub repository
    features?: ProjectFeature[]; // Custom titles/descriptions for each gallery image
}

// Define the Category type
export interface PortfolioCategory {
    title: string;
    description: string;
    thumbnail: string;
    projects: Project[];
}

// The main data object, exported for use in components.
export const projectData: PortfolioCategory[] = [
    {
        title: 'Web Development',
        description: 'Building responsive and dynamic websites and applications.',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        projects: [
            {
                id: 1,
                title: 'Gemini Project Board',
                displayType: 'web',
                description: 'GeminiProjectBoard is a smart project management platform to plan, track, and collaborate on tasks, boards, and workflows—all in one place.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/GeminiPorjectBoardThumnel.png',
                imageUrls: [
                   
                ],
                features: [
                    {
                        title: "Project-Based Google Meet Integration",
                        description: "Each project contains a dedicated Google Meet link, keeping meetings permanently tied to the work they belong to. Team members no longer need to create or search for meeting links. With a single click, users can join the correct meeting directly from the project workspace, ensuring discussions always stay in context."
                    },
                    {
                        title: "Framer Motion Orchestration",
                        description: "Advanced layout animations and page transitions that ensure a seamless app-like experience within a single-page architecture."
                    },
                    {
                        title: "Adaptive Architecture",
                        description: "Fully responsive layouts designed with a mobile-first approach, utilizing Tailwind CSS for utility-driven styling and performance."
                    }
                ],
                tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                longDescription: 'GeminiProjectBoard is a powerful and intuitive project management app designed to help teams and individuals organize work, track progress, and collaborate efficiently. Using structured boards and tasks, users can manage projects from planning to completion with full visibility and control.',
                liveUrl: 'https://geminiprojectboard.vercel.app/#/',
                repoUrl: 'https://geminiprojectboard.vercel.app/#/',
            },
            {
                id: 2,
                title: 'Self Study',
                displayType: 'web',
                description: 'A smart self-study platform that analyzes your PDFs to create test series, practice questions, global map exercises, and GK challenges—helping you learn faster and smarter.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/Self%20Study.png',
                imageUrls: [
                   
                ],
                tags: ['Angular', 'TypeScript', 'SCSS', 'NgRx', 'REST API'],
                longDescription: 'This self-study app is designed to make learning more effective, personalized, and exam-ready. Users can upload PDFs such as notes, textbooks, or study materials, and the app automatically analyzes the content to generate structured test series, quizzes, and practice questions.',
                liveUrl: 'https://self-study-graphynovus.vercel.app/',
                repoUrl: 'https://github.com/example/ecommerce',
            },
             {
                id: 3,
                title: 'Vivid Trails',
                displayType: 'web',
                description: 'Vivid Trails is a travel storytelling platform where explorers share real journeys, connect through experiences, and participate in exciting travel story competitions.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/Vivid%20Trails.png',
                imageUrls: [
                   
                ],
                tags: ['Angular', 'TypeScript', 'SCSS', 'NgRx', 'REST API'],
                longDescription: 'Vivid Trails is a community-driven travel platform designed for storytellers, explorers, and dreamers. It allows travelers to share their personal journeys, memorable experiences, and hidden gems from around the world through engaging stories and visuals.',
                liveUrl: 'https://vivid-trails-graphynovus.vercel.app/#',
                repoUrl: 'https://github.com/example/ecommerce',
            },
        ],
    },
    {
        title: 'Mobile App Development',
        description: 'Creating beautiful and performant apps for iOS and Android with Flutter.',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
        projects: [
            {
                id: 3,
                title: 'A Mess Management App',
                displayType: 'mobile',
                description: 'A simple mess management app to track meals, manage attendance, calculate expenses, and simplify daily mess operations.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/PORTFOLIO/MACAThumbnail.png',
                imageUrls: [
                   
                ],
                tags: ['Flutter', 'Dart', 'Firebase', 'Provider'],
                longDescription: 'The Mess Management mobile app is designed to make daily mess operations simple, transparent, and efficient. It helps manage meal attendance, track food consumption, and calculate individual or group expenses with accuracy.',
                repoUrl: 'https://github.com/example/fitness-app',
            },
            {
                id: 4,
                title: 'A Resource Management App',
                displayType: 'mobile',
                description: 'A smart resource management app to track attendance, manage leave, and monitor workforce utilization in real time.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/Resource%20Management.png',
                imageUrls: [
                   
                ],
                tags: ['Flutter', 'Dart', 'REST API', 'Bloc'],
                longDescription: 'The Resource Management Android App is designed to help organizations efficiently manage their workforce through a centralized and easy-to-use platform. It enables accurate attendance tracking, seamless leave application and approval, and real-time monitoring of resource utilization.',
                repoUrl: 'https://github.com/example/recipe-app',
            },
        ],
    },
   
];
