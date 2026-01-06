
import React, { useRef, useEffect } from 'react';

// Defines a complex procedural SVG path.
const getPathData = (width: number, height: number): string => {
    const curves = 20;
    let path = `M ${width * 0.5} ${height * 0.1}`;
    for (let i = 0; i < curves; i++) {
        const cp1x = (Math.random() * 2 - 0.5) * width;
        const cp1y = (Math.random() * 2 - 0.5) * height;
        const cp2x = (Math.random() * 2 - 0.5) * width;
        const cp2y = (Math.random() * 2 - 0.5) * height;
        const endX = (Math.random() * 1.4 - 0.2) * width;
        const endY = (Math.random() * 1.4 - 0.2) * height;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    }
    const finalCp1x = (Math.random() * 2 - 0.5) * width;
    const finalCp1y = (Math.random() * 2 - 0.5) * height;
    const finalCp2x = (Math.random() * 2 - 0.5) * width;
    const finalCp2y = (Math.random() * 2 - 0.5) * height;
    path += ` C ${finalCp1x} ${finalCp1y}, ${finalCp2x} ${finalCp2y}, ${width * 0.5} ${height * 0.1} Z`;
    return path;
};

type PillState = 'moving' | 'angry' | 'thankful';

interface AnimatedBackgroundProps {
    mousePos: { x: number; y: number };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mousePos }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef(mousePos);

    useEffect(() => {
        mousePosRef.current = mousePos;
    }, [mousePos]);

    const animationState = useRef({
        animationFrameId: 0,
        path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
        path2D: new Path2D(),
        pathLength: 0,
        progress: 0,
        speed: 1.5,
        pillState: 'moving' as PillState,
        thankYouTimer: 0,
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
            state.progress = 0;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            if (state.pathLength > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the faint background path
                ctx.save();
                ctx.strokeStyle = 'rgba(241, 213, 0, 0.05)';
                ctx.lineWidth = 1;
                ctx.stroke(state.path2D);
                ctx.restore();

                const currentPoint = state.path.getPointAtLength(state.progress);
                const prevPointProgress = (state.progress - state.speed * 2 + state.pathLength) % state.pathLength;
                const prevPoint = state.path.getPointAtLength(prevPointProgress);
                const angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x);
                
                const rect = canvas.getBoundingClientRect();
                const currentMousePos = mousePosRef.current; 
                const canvasMouseX = currentMousePos.x - rect.left;
                const canvasMouseY = currentMousePos.y - rect.top;

                const dx = canvasMouseX - currentPoint.x;
                const dy = canvasMouseY - currentPoint.y;
                const cosAngle = Math.cos(-angle);
                const sinAngle = Math.sin(-angle);
                const localMouseX = dx * cosAngle - dy * sinAngle;
                const localMouseY = dx * sinAngle + dy * cosAngle;

                // Hit detection area around the pill
                const isHovering = localMouseX >= -15 && localMouseX <= 15 &&
                                     localMouseY >= -15 && localMouseY <= 15;

                switch (state.pillState) {
                    case 'moving':
                        if (isHovering) {
                            state.pillState = 'angry';
                        } else {
                            state.progress = (state.progress + state.speed) % state.pathLength;
                        }
                        break;
                    case 'angry':
                        if (!isHovering) {
                            state.pillState = 'thankful';
                            state.thankYouTimer = 120;
                        }
                        break;
                    case 'thankful':
                        state.thankYouTimer--;
                        if (state.thankYouTimer <= 0) {
                            state.pillState = 'moving';
                        }
                        break;
                }
                
                // Draw the yellow pill
                ctx.save();
                ctx.translate(currentPoint.x, currentPoint.y);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.roundRect(-10, -4, 20, 8, 4); 
                ctx.fillStyle = '#F1D500';
                ctx.fill();
                ctx.restore(); 

                // Draw reactions
                if (state.pillState === 'angry') {
                    ctx.save();
                    ctx.translate(currentPoint.x, currentPoint.y);
                    ctx.rotate(angle);
                    ctx.translate(0, -32);
                    ctx.rotate(-angle);

                    ctx.fillStyle = 'rgba(235, 69, 52, 0.95)';
                    ctx.beginPath();
                    ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(-3.5, -0.5, 1.2, 0, Math.PI * 2);
                    ctx.arc(3.5, -0.5, 1.2, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(-5, -4); ctx.lineTo(-2, -3);
                    ctx.moveTo(5, -4); ctx.lineTo(2, -3);
                    ctx.stroke();
                    ctx.restore();

                } else if (state.pillState === 'thankful') {
                    ctx.save();
                    ctx.translate(currentPoint.x, currentPoint.y);
                    ctx.rotate(angle);
                    ctx.translate(0, -25); 
                    ctx.rotate(-angle); 
                    
                    ctx.fillStyle = 'rgba(16, 16, 16, 0.95)';
                    ctx.strokeStyle = '#F1D500';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(-35, -12, 70, 22, 8);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = '#F1D500';
                    ctx.font = '12px Ubuntu';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Thank you!', 0, 0);
                    ctx.restore();
                }
            }
            state.animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(state.animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default AnimatedBackground;
