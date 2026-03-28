import { motion } from "motion/react";
import { User, Image, Framer, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Character & Reference Sheets",
    path: "/commissions/character-sheets",
    desc: "Bring your original characters to life with detailed front, back, and expression views ready for reference.",
    icon: <User size={40} />,
    color: "from-primary/30 to-primary/5",
    glow: "rgba(255, 133, 161, 0.4)",
    borderColor: "border-primary/20",
  },
  {
    id: 2,
    title: "Posters & Cover Art",
    path: "/commissions/posters-covers",
    desc: "Epic, cinematic illustrations perfect for book covers, music albums, or high-quality wall prints.",
    icon: <Image size={40} />,
    color: "from-secondary/30 to-secondary/5",
    glow: "rgba(255, 179, 142, 0.4)",
    borderColor: "border-secondary/20",
  },
  {
    id: 3,
    title: "VTuber Models",
    path: "/commissions/vtuber-models",
    desc: "High-resolution, perfectly layered PSD files ready for Live2D rigging. From headshot to full body models.",
    icon: <Framer size={40} />,
    color: "from-accent/30 to-accent/5",
    glow: "rgba(230, 57, 70, 0.4)",
    borderColor: "border-accent/20",
  },
];

export default function Commissions() {
  return (
    <section id="commissions" className="responsive-section relative overflow-hidden bg-bg-deep/30">
      {/* Background Section Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto responsive-padding">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center mb-16 md:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Commission Services
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
            Choose Your <span className="text-gradient">Category</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
            Every piece is crafted with passion and precision. Select a category below to explore details and pricing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Link 
                to={cat.path}
                className="group block relative h-full"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02, 
                    rotateY: 5, 
                    rotateX: -2,
                    boxShadow: `0 0 50px -10px ${cat.glow}` 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative p-8 md:p-12 h-full rounded-[2.5rem] md:rounded-[3.5rem] glass-premium border ${cat.borderColor} flex flex-col items-center text-center overflow-hidden transition-all duration-500`}
                >
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
                  
                  {/* Icon Area */}
                  <div className={`mb-8 md:mb-12 w-20 h-20 md:w-24 md:h-24 glass-premium rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary group-hover:text-bg-deep transition-all duration-700 shadow-2xl`}>
                    {cat.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                    {cat.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-white/50 leading-relaxed font-medium mb-8 md:mb-10">
                    {cat.desc}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
                    View Details
                    <ArrowRight size={14} className="md:w-4 md:h-4" />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-24 md:w-32 h-24 md:h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Floating Accent */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 glass-premium rounded-xl md:rounded-2xl text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] shimmer">
            <Sparkles size={14} className="text-primary animate-pulse" />
            Custom requests are always welcome
          </div>
        </motion.div>
      </div>
    </section>
  );
}
