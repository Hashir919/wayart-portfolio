import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight, MousePointer2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

import heroImage from "../assets/hero-character.png";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Simplified transforms for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 md:pt-40 pb-16 md:pb-20 overflow-hidden"
    >
      {/* Advanced Background Glows - Reduced on mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 md:bg-primary/20 rounded-full blur-[120px] md:blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 md:bg-secondary/15 rounded-full blur-[120px] md:blur-[160px] animate-pulse delay-1000 mobile-hide-decor" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full glass-premium mb-6 md:mb-8 text-primary border-primary/20"
          >
            <Sparkles size={14} className="animate-pulse md:w-4" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
              Commissions Open
            </span>
          </motion.div>

          <h1 className="text-fluid-hero font-black mb-6 md:mb-8 leading-[0.95] tracking-tighter">
            Hi, I'm <br />
            <span className="text-gradient glow-text">Warry Kane</span>
          </h1>
          <p className="text-base md:text-2xl text-white/50 mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Digital artist specializing in <span className="text-white">warm, cozy, and anime-inspired</span> illustrations. Bringing your characters to life with soft lighting.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-5 justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="group w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-bg-deep font-black rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,133,161,0.2)] transition-all duration-500"
              >
                Start Commission
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass-premium text-white font-black rounded-2xl hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3"
              >
                Explore Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: y1, rotate }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]">
            {/* Multi-layered Decorative Rings - Hidden on small screens */}
            <div className="mobile-hide-decor absolute -inset-6 border-[2px] border-primary/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="mobile-hide-decor absolute -inset-10 border border-secondary/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            
            <div className="w-full h-full rounded-[2.5rem] md:rounded-[4rem] rotate-2 overflow-hidden border-4 md:border-8 border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] animate-float-premium relative group">
              <OptimizedImage
                src={heroImage}
                alt="Artist Profile Illustration"
                priority={true}
                className="w-full h-full"
              />
            </div>

            {/* Floating Elements - Simplified for mobile */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 p-3 md:p-4 glass-premium rounded-2xl md:rounded-3xl text-primary shadow-xl"
            >
              <Sparkles size={24} className="md:w-8 md:h-8" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="mobile-hide-decor absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-3 md:p-5 glass-premium rounded-[1.5rem] md:rounded-[2rem] text-secondary shadow-xl flex items-center gap-2 md:gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <MousePointer2 size={18} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-30">Status</p>
                <p className="text-xs md:text-sm font-black">Online</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint - Static on mobile */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mobile-hide-decor">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-primary/30 to-transparent" />
      </div>
    </section>
  );
}
