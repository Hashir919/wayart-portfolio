import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const particles = useMemo(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return [];
    
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 5 : 12; // Extremely low count for smoothness

    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 1 : 2) + 0.5,
      duration: Math.random() * 20 + 30,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.1 + 0.05,
    }));
  }, [prefersReducedMotion]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-50">
      {/* Base Gradient Overlay - Optimized */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,133,161,0.02)_0%,transparent_50%)]" />
      
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [0, -100],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-primary/10 will-change-transform"
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
