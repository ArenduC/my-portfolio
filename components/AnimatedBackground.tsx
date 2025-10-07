import React, { useRef, useEffect } from 'react';

// Defines a new, vastly more complex and messy SVG path procedurally.
const getPathData = (width: number, height: number): string => {
    // This new algorithm creates a much denser and more chaotic path
    // by chaining many more Bézier curves together with extreme control points.
    const curves = 20; // Increase number of curves for complexity
    let path = `M ${width * 0.5} ${height * 0.1}`;

    for (let i = 0; i < curves; i++) {
        // Use wider random ranges, including negative and >1 multiples of width/height
        // to ensure parts of the path go off-screen for a more dynamic feel.
        const cp1x = (Math.random() * 2 - 0.5) * width;
        const cp1y = (Math.random() * 2 - 0.5) * height;
        const cp2x = (Math.random() * 2 - 0.5) * width;
        const cp2y = (Math.random() * 2 - 0.5) * height;
        const endX = (Math.random() * 1.4 - 0.2) * width;
        const endY = (Math.random() * 1.4 - 0.2) * height;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    }

    // Add a final curve that smoothly connects back to the start point
    const finalCp1x = (Math.random() * 2 - 0.5) * width;
    const finalCp1y = (Math.random() * 2 - 0.5) * height;
    const finalCp2x = (Math.random() * 2 - 0.5) * width;
    const finalCp2y = (Math.random() * 2 - 0.5) * height;

    path += ` C ${finalCp1x} ${finalCp1y}, ${finalCp2x} ${finalCp2y}, ${width * 0.5} ${height * 0.1} Z`;

    return path;
};


const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Use refs to store animation state that doesn't need to trigger re-renders.
    const animationState = useRef({
        animationFrameId: 0,
        path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
        path2D: new Path2D(),
        pathLength: 0,
        progress: 0,
        speed: 1.5, // Increased speed for the longer path
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const state = animationState.current;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const pathData = getPathData(canvas.width, canvas.height);
            state.path.setAttribute('d', pathData);
            state.path2D = new Path2D(pathData);
            state.pathLength = state.path.getTotalLength();
            // Reset progress on resize to avoid jumps
            state.progress = 0;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            // FIX: Only run animation logic if the path has a valid length
            if (state.pathLength > 0) {
                // Clear the canvas for a clean background
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the solid contour line
                ctx.save();
                ctx.strokeStyle = 'rgba(241, 213, 0, 0.05)'; // #F1D500 with 5% opacity
                ctx.lineWidth = 1;
                ctx.stroke(state.path2D);
                ctx.restore();


                // Update the pill's progress along the path
                state.progress = (state.progress + state.speed) % state.pathLength;

                // Get current point and a point slightly behind to calculate rotation
                const currentPoint = state.path.getPointAtLength(state.progress);
                const prevPointProgress = (state.progress - state.speed * 2 + state.pathLength) % state.pathLength;
                const prevPoint = state.path.getPointAtLength(prevPointProgress);
                const angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x);

                // Draw the rounded rectangle
                ctx.save();
                ctx.translate(currentPoint.x, currentPoint.y);
                ctx.rotate(angle);
                ctx.beginPath();
                // A rounded rectangle centered at the origin.
                // x, y, width, height, radius
                ctx.roundRect(-10, -4, 20, 8, 4); 
                ctx.fillStyle = '#F1D500';
                ctx.fill();
                ctx.restore();
            }

            state.animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(state.animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default AnimatedBackground;