import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Palette, Zap, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

import aboutHeroImage from "../assets/character.png";

const ABOUT_DATA = {
  title: "The Artist Behind the Glass",
  quote: "Bringing warmth and magic to every character I touch.",
  description: "Welcome! I'm Warry Kane, a digital illustrator and concept artist dedicated to creating characters that feel alive.",
  points: ["3+ Years of Digital Painting", "Anime & Character Specialist", "Global Commission Experience"],
  stats: [{ value: "3+ Years", label: "Experience" }, { value: "100+", label: "Projects" }]
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  
  const skills = [
    { icon: <Palette size={20} />, title: "Character Design", desc: "Crafting personality through visuals." },
    { icon: <Zap size={20} />, title: "Digital Painting", desc: "Expert use of light and shadow." },
    { icon: <Award size={20} />, title: "Anime Style", desc: "Cozy and modern aesthetics." },
  ];

  return (
    <section id="about" className="relative responsive-section overflow-hidden bg-bg-deep py-20">
      {/* Background decor - Optimized */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] mobile-hide-decor" />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] mobile-hide-decor" />
      </div>

      <div className="max-w-7xl mx-auto responsive-padding px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 md:border-8 border-white/5 shadow-xl group">
              <OptimizedImage
                src={aboutHeroImage}
                alt="Artist Portrait"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Stats card simplified */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 p-6 md:p-8 glass-premium rounded-3xl border border-primary/10 shadow-xl flex flex-col items-center justify-center min-w-[140px]">
              <p className="text-primary font-black text-3xl md:text-5xl mb-1 tracking-tighter">
                {ABOUT_DATA.stats[0].value}
              </p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40">
                {ABOUT_DATA.stats[0].label}
              </p>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/20 mb-6 text-primary">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Storyteller</span>
              </div>
              
              <h2 className="text-fluid-4xl md:text-7xl font-black mb-6 md:mb-10 tracking-tighter leading-[0.95]">
                {ABOUT_DATA.title} <span className="text-primary">.</span>
              </h2>
              
              <p className="text-primary/60 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-8 block">
                "{ABOUT_DATA.quote}"
              </p>
              
              <p className="text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed font-medium">
                {ABOUT_DATA.description}
              </p>

              {/* Skills Grid - Simplified */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="text-primary mb-3">{skill.icon}</div>
                    <p className="text-xs font-black mb-1 uppercase tracking-wider">{skill.title}</p>
                    <p className="text-[10px] text-white/30 font-medium leading-relaxed">{skill.desc}</p>
                  </div>
                ))}
              </div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/#portfolio"
                  className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-primary text-bg-deep font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-primary/10 transition-all font-sans"
                >
                  Explore My Archive <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
