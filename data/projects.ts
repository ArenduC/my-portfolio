// A centralized place for all portfolio project data.

// Define the Project type for type safety and consistency.
export interface Project {
    id: number;
    title: string;
    description: string;       // Short description for cards
    imageUrls: string[];       // Image URLs for the modal carousel
    tags: string[];            // Technology tags/badges
    longDescription?: string;  // Longer description for the modal
    liveUrl?: string;          // Link to the live project
    repoUrl?: string;          // Link to the GitHub repository
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
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Web+Dev',
        projects: [
            {
                id: 1,
                title: 'Personal Portfolio',
                description: 'The very website you are browsing now, built with React and Framer Motion.',
                imageUrls: [
                    'https://placehold.co/800x600/101010/F1D500?text=Portfolio+Screenshot+1',
                    'https://placehold.co/800x600/101010/F1D500?text=Mobile+View',
                    'https://placehold.co/800x600/101010/F1D500?text=Project+Showcase',
                ],
                tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                longDescription: 'This personal portfolio is designed to showcase my skills and projects in a clean, modern, and interactive way. It features a dynamic animated background, smooth page transitions with Framer Motion, and a fully responsive design that works across all devices. The project is built on a robust stack including React and TypeScript for a type-safe and component-based architecture.',
                liveUrl: '#',
                repoUrl: 'https://github.com/example/portfolio',
            },
            {
                id: 2,
                title: 'E-commerce Platform',
                description: 'A full-featured e-commerce site for a fictional brand, built with Angular.',
                imageUrls: [
                    'https://placehold.co/800x600/101010/F1D500?text=E-commerce+Home',
                    'https://placehold.co/800x600/101010/F1D500?text=Product+Page',
                    'https://placehold.co/800x600/101010/F1D500?text=Shopping+Cart',
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
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Mobile+Dev',
        projects: [
            {
                id: 3,
                title: 'Fitness Tracker App',
                description: 'A cross-platform mobile app to track workouts and nutrition, built with Flutter.',
                imageUrls: [
                    'https://placehold.co/600x800/101010/F1D500?text=Fitness+Dashboard',
                    'https://placehold.co/600x800/101010/F1D500?text=Workout+Log',
                    'https://placehold.co/600x800/101010/F1D500?text=Nutrition+Scanner',
                ],
                tags: ['Flutter', 'Dart', 'Firebase', 'Provider'],
                longDescription: 'This fitness tracker helps users monitor their physical activity and diet. Features include real-time workout tracking, barcode scanner for food logging, and progress charts. It uses Firebase for backend services like authentication and database, with Provider for state management.',
                repoUrl: 'https://github.com/example/fitness-app',
            },
            {
                id: 4,
                title: 'Recipe Finder App',
                description: 'A mobile application for discovering and saving recipes, using a public API.',
                imageUrls: [
                    'https://placehold.co/600x800/101010/F1D500?text=Recipe+Search',
                    'https://placehold.co/600x800/101010/F1D500?text=Recipe+Details',
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
        thumbnail: 'https://placehold.co/600x400/101010/F1D500?text=Design',
        projects: [
            {
                id: 5,
                title: '3D Donut',
                description: 'My first foray into 3D modeling following the famous Blender Guru tutorial.',
                imageUrls: [
                    'https://placehold.co/800x600/101010/F1D500?text=Final+Donut+Render',
                    'https://placehold.co/800x600/101010/F1D500?text=Modeling+View',
                ],
                tags: ['Blender', '3D Modeling', 'Rendering'],
                longDescription: 'Every 3D artist starts somewhere, and for many, it\'s with a donut. This project was my introduction to the fundamentals of Blender, including modeling, sculpting, texturing, lighting, and rendering with Cycles. It was a foundational learning experience that sparked my interest in 3D design.',
            },
            {
                id: 6,
                title: 'Mobile App UI/UX',
                description: 'A complete UI/UX design for a conceptual travel planning application.',
                imageUrls: [
                    'https://placehold.co/800x600/101010/F1D500?text=Travel+App+Mockup',
                    'https://placehold.co/800x600/101010/F1D500?text=User+Flow+Diagram',
                    'https://placehold.co/800x600/101010/F1D500?text=Component+Library',
                ],
                tags: ['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'],
                longDescription: 'This project involved user research, creating user personas, wireframing, and building a high-fidelity, interactive prototype for a travel app. The goal was to create an intuitive and visually appealing interface that simplifies trip planning. A complete design system and component library were also created in Figma.',
                liveUrl: 'https://www.figma.com/proto/example',
            },
        ],
    },
];