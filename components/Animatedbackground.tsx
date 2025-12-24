
import React, { useRef, useEffect } from 'react';

// Defines a smooth, organic looping path that drifts across the viewport.
const getPathData = (width: number, height: number): string => {
    const points = 6;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    
    let path = "";
    const getPoint = (i: number) => {
        const angle = (i / points) * Math.PI * 2;
        // Abstract variation to create a more organic loop
        const variance = (Math.sin(angle * 3) * radius * 0.2) + (Math.cos(angle * 2) * radius * 0.1);
        const r = radius + variance;
        return {
            x: centerX + Math.cos(angle) * r,
            y: centerY + Math.sin(angle) * r
        };
    };

    const p0 = getPoint(0);
    path = `M ${p0.x} ${p0.y}`;

    for (let i = 0; i < points; i++) {
        const p1 = getPoint(i);
        const p2 = getPoint(i + 1);
        
        // Control points for a very smooth cubic Bezier loop
        const angle1 = (i / points) * Math.PI * 2;
        const angle2 = ((i + 1) / points) * Math.PI * 2;
        const cpDist = radius * 0.5;

        const c1x = p1.x + Math.cos(angle1 + Math.PI / 2) * cpDist;
        const c1y = p1.y + Math.sin(angle1 + Math.PI / 2) * cpDist;
        const c2x = p2.x + Math.cos(angle2 - Math.PI / 2) * cpDist;
        const c2y = p2.y + Math.sin(angle2 - Math.PI / 2) * cpDist;

        path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }

    return path + " Z";
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
        speed: 0.8, // Slower, more elegant motion
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

                // Draw the faint abstract loop path
                ctx.save();
                ctx.strokeStyle = 'rgba(241, 213, 0, 0.03)';
                ctx.lineWidth = 1.5;
                ctx.stroke(state.path2D);
                ctx.restore();

                const currentPoint = state.path.getPointAtLength(state.progress);
                const prevPointProgress = (state.progress - 5 + state.pathLength) % state.pathLength;
                const prevPoint = state.path.getPointAtLength(prevPointProgress);
                const angle = Math.atan2(currentPoint.y - prevPoint.y, currentPoint.x - prevPoint.x);
                
                const rect = canvas.getBoundingClientRect();
                const currentMousePos = mousePosRef.current; 
                const canvasMouseX = currentMousePos.x - rect.left;
                const canvasMouseY = currentMousePos.y - rect.top;

                const dx = canvasMouseX - currentPoint.x;
                const dy = canvasMouseY - currentPoint.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);

                // Interaction check: closer range for the pill
                const isHovering = distToMouse < 35;

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
                            state.thankYouTimer = 100;
                        }
                        break;
                    case 'thankful':
                        state.thankYouTimer--;
                        if (state.thankYouTimer <= 0) {
                            state.pillState = 'moving';
                        }
                        break;
                }
                
                // Draw the pill (oval yellow shape)
                ctx.save();
                ctx.translate(currentPoint.x, currentPoint.y);
                ctx.rotate(angle);
                
                // Glow effect for the pill
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(241, 213, 0, 0.4)';
                
                ctx.beginPath();
                ctx.roundRect(-12, -5, 24, 10, 6); 
                ctx.fillStyle = '#F1D500';
                ctx.fill();
                ctx.restore(); 

                // Draw Popups/States
                if (state.pillState === 'angry') {
                    ctx.save();
                    ctx.translate(currentPoint.x, currentPoint.y);
                    ctx.translate(0, -35);
                    
                    ctx.fillStyle = 'rgba(235, 69, 52, 0.95)';
                    ctx.beginPath();
                    ctx.arc(0, 0, 12, 0, Math.PI * 2);
                    ctx.fill();

                    // Angry eyes
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1.5;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(-5, -2); ctx.lineTo(-2, 0);
                    ctx.moveTo(5, -2); ctx.lineTo(2, 0);
                    ctx.stroke();
                    ctx.restore();

                } else if (state.pillState === 'thankful') {
                    ctx.save();
                    ctx.translate(currentPoint.x, currentPoint.y);
                    ctx.translate(0, -30); 
                    
                    ctx.fillStyle = 'rgba(16, 16, 16, 0.9)';
                    ctx.strokeStyle = '#F1D500';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(-40, -12, 80, 24, 8);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = '#F1D500';
                    ctx.font = '500 12px Ubuntu';
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
