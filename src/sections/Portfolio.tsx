import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import OptimizedImage from "../components/OptimizedImage";

export default function Portfolio() {
  const { data: portfolioData, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="py-20 text-center h-[400px] flex flex-col items-center justify-center">
        <p className="text-white/20 uppercase tracking-widest text-xs font-black">Gallery Connection Error</p>
      </div>
    );
  }

  return (
    <section id="portfolio" className="relative responsive-section overflow-hidden bg-bg-deep">
      {/* Background Decor */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[140px] -z-10 mobile-hide-decor" />
      
      <div className="max-w-7xl mx-auto responsive-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/20 mb-6 text-primary">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Featured Categories</span>
            </div>
            <h2 className="text-fluid-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
              Explore the <span className="text-gradient">WayArt</span> Collections <span className="text-primary">.</span>
            </h2>
            <p className="text-base md:text-xl text-white/40 font-medium leading-relaxed">
              Each collection represents a unique world of warm aesthetics, anime-inspired characters, and soft lighting techniques.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mobile-hide-decor"
          >
            <Link 
              to="/portfolio"
              className="px-8 py-4 glass-premium text-white font-black rounded-2xl border border-white/5 hover:bg-white/5 transition-all flex items-center gap-3 text-xs uppercase tracking-widest"
            >
              Browse All <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioData.categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/portfolio/${category.slug}`}
                className="group block relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 glass-premium transform-gpu"
              >
                <OptimizedImage
                  src={category.coverImage}
                  alt={category.name}
                  aspectRatio="aspect-[4/5]"
                  className="group-hover:scale-110 transition-transform duration-1000 ease-soft"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent p-6 md:p-10 flex flex-col justify-end transition-all duration-500">
                  <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3 md:mb-4 block translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    Portfolio
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black mb-2 md:mb-4 leading-none tracking-tighter">
                    {category.name}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm font-medium line-clamp-2 md:line-clamp-none transition-opacity duration-500">
                    {category.desc}
                  </p>
                  
                  <div className="mt-4 md:mt-6 w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary flex items-center justify-center text-bg-deep translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-primary/20">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
