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
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 25; // Even lower for maximum smoothness

    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 1.5 : 2.5) + 0.5,
      duration: Math.random() * 15 + 25,
      delay: Math.random() * -20, // Negative delay to start mid-animation
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,133,161,0.03)_0%,transparent_50%)]" />
      
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
            y: [0, -150],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-primary/20 blur-[1px] will-change-transform"
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* Subtle Grain Overlay - Hidden on mobile for performance */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay mobile-hide-decor" />
    </div>
  );
}
