import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, ArrowRight, MousePointer2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import heroImage from "../assets/hero-character.png";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-40 pb-20 overflow-hidden"
    >
      {/* Advanced Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/15 rounded-full blur-[160px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full glass-premium mb-6 md:mb-8 text-primary border-primary/20 shimmer"
          >
            <Sparkles size={14} className="animate-pulse md:w-4" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              Commissions Open
            </span>
          </motion.div>

          <h1 className="text-fluid-hero font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter">
            Hi, I'm <br />
            <span className="text-gradient glow-text">Warry Kane</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/60 mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Digital artist specializing in <span className="text-white">warm, cozy, and anime-inspired</span> illustrations. Bringing your characters to life with soft lighting.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-5 justify-center lg:justify-start">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/commissions"
                className="group w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-bg-deep font-black rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,133,161,0.3)] hover:shadow-[0_20px_50px_rgba(255,133,161,0.5)] transition-all duration-500"
              >
                Start Commission
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform md:w-[22px]" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
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
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]">
            {/* Multi-layered Decorative Rings - Hidden on very small screens for performance */}
            <div className="hidden sm:block absolute -inset-6 md:-inset-10 border-[3px] border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="hidden sm:block absolute -inset-10 md:-inset-16 border border-secondary/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            <div className="hidden sm:block absolute -inset-14 md:-inset-24 border-[0.5px] border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
            
            <div className="w-full h-full rounded-[2.5rem] md:rounded-[4rem] rotate-3 overflow-hidden border-4 md:border-8 border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] animate-float-premium relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <img
                src={heroImage}
                alt="Artist Profile"
                loading="eager" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 p-3 md:p-4 glass-premium rounded-2xl md:rounded-3xl text-primary shadow-xl"
            >
              <Sparkles size={24} className="md:w-8 md:h-8" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-3 md:p-5 glass-premium rounded-[1.5rem] md:rounded-[2rem] text-secondary shadow-xl flex items-center gap-2 md:gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <MousePointer2 size={18} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-50">Artist Status</p>
                <p className="text-xs md:text-sm font-black">Active Now</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
