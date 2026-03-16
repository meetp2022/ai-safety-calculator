'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseAlpha: number;
    alpha: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 200;
const BRAND_ORANGE = { r: 255, g: 87, b: 34 };

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                baseAlpha: Math.random() * 0.3 + 0.05,
                alpha: 0.1,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            if (particlesRef.current.length === 0) {
                initParticles(rect.width, rect.height);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update particles
            for (const p of particles) {
                // Mouse interaction — gentle attraction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    p.vx += (dx / dist) * force * 0.015;
                    p.vy += (dy / dist) * force * 0.015;
                    p.alpha = p.baseAlpha + force * 0.6;
                } else {
                    p.alpha += (p.baseAlpha - p.alpha) * 0.02;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.15;

                        // Check if either particle is near mouse for orange glow
                        const aDist = Math.sqrt((mouse.x - a.x) ** 2 + (mouse.y - a.y) ** 2);
                        const bDist = Math.sqrt((mouse.x - b.x) ** 2 + (mouse.y - b.y) ** 2);
                        const nearMouse = aDist < MOUSE_RADIUS || bDist < MOUSE_RADIUS;
                        const mouseInfluence = nearMouse
                            ? Math.max(
                                  1 - aDist / MOUSE_RADIUS,
                                  1 - bDist / MOUSE_RADIUS
                              )
                            : 0;

                        const r = Math.round(255 * (1 - mouseInfluence) + BRAND_ORANGE.r * mouseInfluence);
                        const g = Math.round(255 * (1 - mouseInfluence) + BRAND_ORANGE.g * mouseInfluence);
                        const bColor = Math.round(255 * (1 - mouseInfluence) + BRAND_ORANGE.b * mouseInfluence);

                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${r},${g},${bColor},${opacity + mouseInfluence * 0.2})`;
                        ctx.lineWidth = 0.5 + mouseInfluence * 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (const p of particles) {
                const dist = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
                const nearMouse = dist < MOUSE_RADIUS;
                const mouseInfluence = nearMouse ? 1 - dist / MOUSE_RADIUS : 0;

                // Glow effect near mouse
                if (mouseInfluence > 0.3) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius + 8 * mouseInfluence, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${BRAND_ORANGE.r},${BRAND_ORANGE.g},${BRAND_ORANGE.b},${mouseInfluence * 0.15})`;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                if (nearMouse) {
                    ctx.fillStyle = `rgba(${BRAND_ORANGE.r},${BRAND_ORANGE.g},${BRAND_ORANGE.b},${p.alpha + mouseInfluence * 0.5})`;
                } else {
                    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                }
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    );
}
