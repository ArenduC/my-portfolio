
import React, { useRef, useEffect, useState } from 'react';

const getPathData = (width: number, height: number): string => {
    const curves = 16;
    let path = `M ${width * 0.5} ${height * 0.1}`;
    for (let i = 0; i < curves; i++) {
        const cp1x = (Math.random() * 1.4 - 0.2) * width;
        const cp1y = (Math.random() * 1.4 - 0.2) * height;
        const cp2x = (Math.random() * 1.4 - 0.2) * width;
        const cp2y = (Math.random() * 1.4 - 0.2) * height;
        const endX = (Math.random() * 0.8 + 0.1) * width;
        const endY = (Math.random() * 0.8 + 0.1) * height;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
    }
    path += ` Z`;
    return path;
};

type PillState = 'moving' | 'hovering' | 'clicked';

interface AnimatedBackgroundProps {
    mousePos: { x: number; y: number };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ mousePos }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef(mousePos);
    const [pillState, setPillState] = useState<PillState>('moving');

    useEffect(() => {
        mousePosRef.current = mousePos;
    }, [mousePos]);

    const animationState = useRef({
        animationFrameId: 0,
        path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
        path2D: new Path2D(),
        pathLength: 0,
        progress: 0,
        speed: 1.4,
        isHovered: false,
    });

    useEffect(() => {
        const handleGlobalClick = () => {
            if (animationState.current.isHovered && pillState === 'hovering') {
                const link = document.createElement('a');
                link.href = "https://zcxsscvheqidzvkhlnwz.supabase.co/storage/v1/object/public/Default%20image/resume.pdf";
                link.download = "Arendu_Chanda_Resume.pdf";
                link.click();
                setPillState('clicked');
                setTimeout(() => setPillState('moving'), 3000);
            }
        };
        window.addEventListener('mousedown', handleGlobalClick);
        return () => window.removeEventListener('mousedown', handleGlobalClick);
    }, [pillState]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const state = animationState.current;

        const resizeCanvas = () => {
            const oldWidth = canvas.width;
            const oldHeight = canvas.height;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Only regenerate path if it hasn't been created or window size changed significantly
            if (state.pathLength === 0 || Math.abs(oldWidth - canvas.width) > 100) {
                const pathData = getPathData(canvas.width, canvas.height);
                state.path.setAttribute('d', pathData);
                state.path2D = new Path2D(pathData);
                // @ts-ignore: path is SVGPathElement
                state.pathLength = state.path.getTotalLength();
                // Ensure progress stays within bounds
                state.progress = state.progress % (state.pathLength || 1);
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = (time: number) => {
            if (state.pathLength > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Subtle background trace
                ctx.save();
                ctx.strokeStyle = 'rgba(241, 213, 0, 0.04)';
                ctx.lineWidth = 1;
                ctx.stroke(state.path2D);
                ctx.restore();

                // 1. Calculate current position based on EXISTING progress
                // @ts-ignore
                const currentPoint = state.path.getPointAtLength(state.progress);
                const currentMousePos = mousePosRef.current;
                const distToPill = Math.hypot(currentMousePos.x - currentPoint.x, currentMousePos.y - currentPoint.y);
                
                const isNear = distToPill < 65; // Slightly larger hit area for stability
                state.isHovered = isNear;

                // 2. Decide if we should advance the progress for the NEXT frame
                if (pillState === 'clicked') {
                    // Stay stopped
                } else if (isNear) {
                    if (pillState !== 'hovering') setPillState('hovering');
                } else {
                    if (pillState === 'hovering') setPillState('moving');
                    state.progress = (state.progress + state.speed) % state.pathLength;
                }

                // 3. Render at the position defined by state.progress
                // @ts-ignore
                const renderPoint = state.path.getPointAtLength(state.progress);
                const prevPointProgress = (state.progress - 2 + state.pathLength) % state.pathLength;
                // @ts-ignore
                const prevPoint = state.path.getPointAtLength(prevPointProgress);
                const angle = Math.atan2(renderPoint.y - prevPoint.y, renderPoint.x - prevPoint.x);

                // Render Yellow Pill
                ctx.save();
                ctx.translate(renderPoint.x, renderPoint.y);
                ctx.rotate(angle);
                
                if (pillState === 'hovering' || pillState === 'clicked') {
                    const glow = Math.sin(time / 150) * 5 + 15;
                    ctx.beginPath();
                    ctx.arc(0, 0, glow, 0, Math.PI * 2);
                    ctx.fillStyle = pillState === 'clicked' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(241, 213, 0, 0.2)';
                    ctx.fill();
                }

                ctx.beginPath();
                // @ts-ignore
                if (ctx.roundRect) {
                  // @ts-ignore
                  ctx.roundRect(-12, -5, 24, 10, 5); 
                } else {
                  ctx.rect(-12, -5, 24, 10);
                }
                
                if (pillState === 'clicked') {
                    ctx.fillStyle = '#10B981';
                } else if (pillState === 'hovering') {
                    ctx.fillStyle = '#FFFFFF';
                } else {
                    ctx.fillStyle = '#F1D500';
                }
                ctx.fill();
                
                // Text inside pill
                if (pillState === 'hovering' || pillState === 'clicked') {
                   ctx.rotate(-angle); 
                   ctx.fillStyle = pillState === 'clicked' ? '#FFFFFF' : '#000000';
                   ctx.font = 'bold 8px Ubuntu';
                   ctx.textAlign = 'center';
                   ctx.textBaseline = 'middle';
                   ctx.fillText(pillState === 'clicked' ? '✓' : 'CV', 0, 0);
                }
                ctx.restore();

                // Interactive Bubble (Tooltip)
                if (pillState === 'hovering') {
                    ctx.save();
                    ctx.translate(renderPoint.x, renderPoint.y - 40);
                    ctx.fillStyle = '#F1D500';
                    ctx.beginPath();
                    // @ts-ignore
                    if (ctx.roundRect) ctx.roundRect(-60, -12, 120, 24, 12);
                    else ctx.rect(-60, -12, 120, 24);
                    ctx.fill();
                    // Arrow
                    ctx.beginPath();
                    ctx.moveTo(-5, 12); ctx.lineTo(5, 12); ctx.lineTo(0, 18); ctx.fill();
                    // Label
                    ctx.fillStyle = '#101010';
                    ctx.font = 'bold 10px Ubuntu';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('DOWNLOAD CV', 0, 0);
                    ctx.restore();
                }

                if (pillState === 'clicked') {
                    ctx.save();
                    ctx.translate(renderPoint.x, renderPoint.y - 40);
                    ctx.fillStyle = '#10B981';
                    ctx.font = 'bold 12px Ubuntu';
                    ctx.textAlign = 'center';
                    ctx.fillText('DOWNLOAD STARTED ✓', 0, 0);
                    ctx.restore();
                }
            }
            state.animationFrameId = window.requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.cancelAnimationFrame(state.animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [pillState]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default AnimatedBackground;
