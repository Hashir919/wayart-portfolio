import { motion } from "motion/react";
import { Sparkles, Palette, Zap, ArrowRight, Loader2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import OptimizedImage from "../components/OptimizedImage";

import aboutHeroImage from "../assets/character.png";

export default function About() {
  const { data: portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const about = portfolioData?.about || {
    title: "The Artist Behind the Glass",
    quote: "Bringing warmth and magic to every character I touch.",
    description: "Welcome! I'm Warry Kane, a digital illustrator and concept artist dedicated to creating characters that feel alive.",
    points: ["3+ Years of Digital Painting", "Anime & Character Specialist", "Global Commission Experience"],
    stats: [{ value: "3+ Years", label: "Experience" }, { value: "100+", label: "Projects" }],
    images: []
  };

  const skills = [
    { icon: <Palette size={20} />, title: "Character Design", desc: "Crafting unique personalities through visual storytelling." },
    { icon: <Zap size={20} />, title: "Digital Painting", desc: "Expert use of light, shadow, and texture." },
    { icon: <Award size={20} />, title: "Anime Style", desc: "Specializing in modern and cozy anime aesthetics." },
  ];

  return (
    <section id="about" className="relative responsive-section overflow-hidden bg-bg-deep">
      {/* Dynamic Background decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 mobile-hide-decor">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-secondary/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto responsive-padding">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 md:border-8 border-white/5 glass-premium transform-gpu rotate-2 hover:rotate-0 transition-all duration-700 group">
              <OptimizedImage
                src={aboutHeroImage}
                alt="Artist Portrait"
                className="group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Dynamic Stats Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 md:-right-8 p-6 md:p-8 glass-premium rounded-3xl border border-primary/20 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center min-w-[150px]"
            >
              <p className="text-primary font-black text-3xl md:text-5xl mb-1 tracking-tighter">
                {about.stats[0]?.value || "3+"}
              </p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40">
                {about.stats[0]?.label || "Years"}
              </p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/20 mb-6 text-primary">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Storyteller</span>
              </div>
              
              <h2 className="text-fluid-4xl md:text-7xl font-black mb-6 md:mb-10 tracking-tighter leading-[0.95]">
                {about.title} <span className="text-primary">.</span>
              </h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary/60 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-8 block"
              >
                "{about.quote}"
              </motion.p>
              
              <p className="text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed font-medium">
                {about.description}
              </p>

              {/* Dynamic Points Section */}
              <div className="space-y-4 mb-12">
                {about.points.map((point, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm md:text-base font-bold tracking-tight">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                  >
                    <div className="text-primary mb-3 group-hover:scale-110 transition-transform">{skill.icon}</div>
                    <p className="text-xs font-black mb-1 uppercase tracking-wider">{skill.title}</p>
                    <p className="text-[10px] text-white/30 font-medium leading-relaxed">{skill.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-primary text-bg-deep font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:brightness-110 transition-all font-sans"
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
