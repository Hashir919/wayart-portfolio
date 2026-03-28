import { motion } from "motion/react";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import portfolioData from "../data/portfolio.json";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <motion.span
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Artistic Showcase
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Digital <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Explore my specialized services and past works. Every category represents a commitment to quality and creative vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Link to={`/portfolio/${cat.id}`} className="group relative block h-[500px] rounded-[3rem] overflow-hidden glass-premium border border-white/5">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -2,
                    boxShadow: `0 30px 60px -15px rgba(255, 133, 161, 0.4)`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full relative"
                >
                  <img
                    src={cat.coverImage || `https://picsum.photos/seed/${cat.id}/800/800`}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent transition-all duration-700 opacity-90 group-hover:opacity-100`} />

                  {/* Category Info */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                         <span className="w-8 h-[2px] bg-primary rounded-full" />
                         <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Specialization</span>
                      </div>

                      <h3 className="text-3xl font-black text-white leading-tight tracking-tight group-hover:text-primary transition-colors duration-500">
                        {cat.name}
                      </h3>

                      <p className="text-white/50 text-base font-medium leading-relaxed line-clamp-2 pr-4">
                        {cat.desc}
                      </p>

                      <div className="pt-4 flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest group-hover:text-white group-hover:gap-4 transition-all duration-500">
                        Explore Gallery
                        <ArrowRight size={16} className="text-primary" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Top Right Decorative Icon */}
                  <div className="absolute top-10 right-10 p-4 rounded-2xl glass-premium opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ImageIcon size={20} className="text-primary" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
