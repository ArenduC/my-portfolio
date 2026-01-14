
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
                description: 'The very website you are browsing now, built with React and Framer Motion.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/GeminiPorjectBoardThumnel.png',
                imageUrls: [
                    'https://raw.githubusercontent.com/ArenduC/arendu/main/assets/image/reactDIT01.svg',
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
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
                longDescription: 'This personal portfolio is designed to showcase my skills and projects in a clean, modern, and interactive way. It features a dynamic animated background, smooth page transitions with Framer Motion, and a fully responsive design that works across all devices. The project is built on a robust stack including React and TypeScript for a type-safe and component-based architecture.',
                liveUrl: 'https://geminiprojectboard.vercel.app/#/',
                repoUrl: 'https://geminiprojectboard.vercel.app/#/',
            },
            {
                id: 2,
                title: 'E-commerce Platform',
                displayType: 'web',
                description: 'A full-featured e-commerce site for a fictional brand, built with Angular.',
                projectThumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
                imageUrls: [
                    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1523474253046-2cd2c788f3ff?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                ],
                tags: ['Angular', 'TypeScript', 'SCSS', 'NgRx', 'REST API'],
                longDescription: 'This project is a comprehensive e-commerce platform featuring product catalogs, user authentication, a shopping cart, and a checkout process. State management is handled efficiently using NgRx. The front-end is built with Angular and is fully responsive, interacting with a mock REST API for data.',
                liveUrl: 'https://example.com/ecommerce',
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
                title: 'Fitness Tracker App',
                displayType: 'mobile',
                description: 'A cross-platform mobile app to track workouts and nutrition, built with Flutter.',
                projectThumbnail: 'https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/PORTFOLIO/MACAThumbnail.png',
                imageUrls: [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
                ],
                tags: ['Flutter', 'Dart', 'Firebase', 'Provider'],
                longDescription: 'This fitness tracker helps users monitor their physical activity and diet. Features include real-time workout tracking, barcode scanner for food logging, and progress charts. It uses Firebase for backend services like authentication and database, with Provider for state management.',
                repoUrl: 'https://github.com/example/fitness-app',
            },
            {
                id: 4,
                title: 'Recipe Finder App',
                displayType: 'mobile',
                description: 'A mobile application for discovering and saving recipes, using a public API.',
                projectThumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
                imageUrls: [
                    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800',
                ],
                tags: ['Flutter', 'Dart', 'REST API', 'Bloc'],
                longDescription: 'This app allows users to search for recipes based on ingredients they have. It fetches data from a third-party API and presents it in a user-friendly interface. Users can save their favorite recipes for later access. The app architecture is built using the BLoC pattern for a clean separation of concerns.',
                repoUrl: 'https://github.com/example/recipe-app',
            },
        ],
    },
    {
        title: 'UI/UX & 3D Design',
        description: 'Designing intuitive interfaces and creating 3D models and scenes.',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        projects: [
            {
                id: 5,
                title: '3D Abstract Scene',
                displayType: 'design',
                description: 'Exploring abstract 3D forms and light in Blender.',
                projectThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
                imageUrls: [
                    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
                ],
                tags: ['Blender', '3D Modeling', 'Rendering'],
                longDescription: 'This project focuses on the interplay of geometric shapes, procedural textures, and dynamic lighting. Created using Blender, it explores how minimal forms can evoke complex emotions through composition and color theory.',
            },
            {
                id: 6,
                title: 'Mobile App UI/UX',
                displayType: 'design',
                description: 'A complete UI/UX design for a conceptual travel planning application.',
                projectThumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
                imageUrls: [
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1433086566608-e6d2823830b0?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
                ],
                tags: ['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'],
                longDescription: 'This project involved user research, creating user personas, wireframing, and building a high-fidelity, interactive prototype for a travel app. The goal was to create an intuitive and visually appealing interface that simplifies trip planning. A complete design system and component library were also created in Figma.',
                liveUrl: 'https://www.figma.com/proto/example',
            },
        ],
    },
];
