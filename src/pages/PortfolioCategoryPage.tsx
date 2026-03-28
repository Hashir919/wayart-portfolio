import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, Calendar, Tag, ShieldCheck, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import OptimizedImage from "../components/OptimizedImage";

export default function PortfolioCategoryPage() {
  const { categoryId } = useParams();
  const { data: fullData, loading, error } = usePortfolioData();

  // Find category and its artworks
  const category = fullData?.categories.find(
    c => c.id === categoryId || c.slug === categoryId
  );
  
  // Artworks are nested inside the category object in the JSON
  const artworks = category?.artworks || [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-deep pt-20 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-black animate-pulse">
          Fetching Gallery
        </p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-deep pt-20 px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter">
          {error ? "Connection Error" : "Category Not Found"}
        </h1>
        <Link 
          to="/portfolio" 
          className="px-8 py-4 bg-white/5 hover:bg-white/10 text-primary font-black uppercase tracking-widest text-xs rounded-2xl border border-primary/20 transition-all font-sans"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-deep pt-28 md:pt-32 pb-20 overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] -z-10 mobile-hide-decor" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[140px] -z-10 mobile-hide-decor" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-6 md:mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Gallery Index</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-fluid-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-[0.9]">
                {category.name} <span className="text-primary">.</span>
              </h1>
              <p className="text-base md:text-xl text-white/40 leading-relaxed font-medium">
                {category.desc}
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/5 mobile-hide-decor backdrop-blur-sm">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest font-black text-white/20 mb-1">Archive Size</p>
                <p className="text-2xl font-black text-primary">{artworks.length}</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <ShieldCheck className="text-primary/30" size={24} />
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {artworks.length > 0 ? (
              artworks.map((artwork, i) => (
                <motion.div
                  key={artwork.id || i}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 glass-premium transform-gpu">
                    <OptimizedImage
                      src={artwork.url}
                      alt={`Artwork ${i + 1}`}
                      aspectRatio="aspect-[4/5]"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      <div className="p-5 glass-premium rounded-2xl border-white/10 backdrop-blur-3xl shadow-2xl">
                        <div className="flex items-center gap-3 text-white/40 mb-2">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                            <Tag size={12} className="text-primary" />
                            {category.name}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                            <Calendar size={12} className="text-secondary" />
                            2024
                          </span>
                        </div>
                        <button 
                          className="w-full py-3 bg-white text-bg-deep font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                        >
                          View Original <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center glass-premium rounded-[2rem] border border-white/5 border-dashed"
              >
                <ImageIcon size={40} className="mx-auto text-white/10 mb-4" />
                <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Archive Empty</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 text-center"
        >
          <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-primary/20 via-white/5 to-secondary/20">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-bg-deep rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-all duration-500 group"
            >
              Start Your Own Project
              <Sparkles size={16} className="group-hover:scale-125 transition-transform text-primary" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
