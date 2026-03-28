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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 40;

    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.05,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,133,161,0.05)_0%,transparent_50%)]" />
      
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
            y: [0, -200],
            x: [0, (Math.random() * 40 - 20)],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-primary/20 blur-[1px] md:blur-[2px] will-change-transform"
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] md:opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
