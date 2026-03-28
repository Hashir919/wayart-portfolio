import { motion } from "motion/react";
import { User, Palette, Heart, CheckCircle2 } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="responsive-section relative overflow-hidden">
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
            The Artist
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
            Personal <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-32 h-1 md:h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full blur-[1px]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="glass-premium p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border-primary/10 relative overflow-hidden shadow-2xl"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 pointer-events-none">
              <Heart size={200} className="fill-primary" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-8 tracking-tight">{about.title}</h3>
            
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-6 md:mb-8 relative z-10 font-medium italic">
              "{about.quote}"
            </p>
            
            <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8 relative z-10 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: about.description.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>') }}>
            </p>
            
            <div className="space-y-4 mb-10 relative z-10">
              {about.points.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-primary md:w-[18px]" />
                  <span className="text-[10px] md:text-sm font-bold text-white/70 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              {about.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 md:p-6 glass-premium rounded-2xl md:rounded-3xl ${i === 0 ? 'border-primary/20' : 'border-secondary/20'} flex flex-col items-center text-center`}
                >
                  <div className={`p-3 md:p-4 ${i === 0 ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'} rounded-xl md:rounded-2xl mb-3 md:mb-4`}>
                    {i === 0 ? <Palette size={20} className="md:w-6 md:h-6" /> : <User size={20} className="md:w-6 md:h-6" />}
                  </div>
                  <h4 className="font-black text-xl md:text-2xl text-white">{stat.value}</h4>
                  <p className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="grid grid-cols-2 gap-4 md:gap-6"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden glass-premium border-primary/20 shadow-2xl aspect-[5/7]">
                <img
                   src={about.images[0] || "https://picsum.photos/seed/placeholder1/500/700"}
                   alt="Art Sample 1"
                   loading="lazy"
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 md:grayscale-[0.5] group-hover:grayscale-0"
                   referrerPolicy="no-referrer"
                />
              </div>
              <div className="group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden glass-premium border-secondary/20 shadow-2xl aspect-square">
                <img
                   src={about.images[1] || "https://picsum.photos/seed/placeholder2/500/500"}
                   alt="Art Sample 2"
                   loading="lazy"
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 md:grayscale-[0.5] group-hover:grayscale-0"
                   referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
              <div className="group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden glass-premium border-secondary/20 shadow-2xl aspect-square">
                <img
                   src={about.images[2] || "https://picsum.photos/seed/placeholder3/500/500"}
                   alt="Art Sample 3"
                   loading="lazy"
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 md:grayscale-[0.5] group-hover:grayscale-0"
                   referrerPolicy="no-referrer"
                />
              </div>
              <div className="group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden glass-premium border-primary/20 shadow-2xl aspect-[5/7]">
                <img
                   src={about.images[3] || "https://picsum.photos/seed/placeholder4/500/700"}
                   alt="Art Sample 4"
                   loading="lazy"
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 md:grayscale-[0.5] group-hover:grayscale-0"
                   referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
