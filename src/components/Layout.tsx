import { ReactNode } from "react";
import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";
import { motion, useScroll, useSpring } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-bg-deep selection:bg-primary/30 selection:text-white antialiased overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary z-[100] origin-left shadow-[0_0_15px_rgba(255,133,161,0.5)]"
        style={{ scaleX }}
      />

      <ParticleBackground />
      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

      <footer className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-bg-card/20 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-12 border-b border-white/5">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div className="flex items-center gap-3 text-3xl font-black text-white tracking-tighter group cursor-pointer">
                <Heart className="fill-primary text-primary group-hover:scale-110 transition-transform duration-500" size={32} />
                <span>WAY<span className="text-primary font-black ml-1">ART</span></span>
              </div>
              <p className="text-white/30 font-medium max-w-xs text-center md:text-left">
                Crafting digital magic and warm illustrations for amazing people worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Explore</h4>
                <ul className="space-y-2 text-sm font-bold text-white/40">
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Social</h4>
                <ul className="space-y-2 text-sm font-bold text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-6">
            <p className="text-white/20 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="text-primary" />
              © 2026 WayArt. All rights reserved.
            </p>
            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.4em]">
              Designed with Passion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
