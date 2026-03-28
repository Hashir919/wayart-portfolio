import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Image as ImageIcon } from "lucide-react";

import portfolioData from "../data/portfolio.json";

export default function PortfolioCategoryPage() {
  const { categoryId } = useParams();
  
  // Find category data from JSON
  const data = portfolioData.categories.find(c => c.id === categoryId);
  const images = data ? data.artworks.map(a => a.url) : [];

  if (!data) return (
    <div className="py-40 text-center mx-auto">
      <h2 className="text-3xl font-black text-white mb-8">Category Not Found</h2>
      <Link to="/portfolio" className="text-primary font-black uppercase tracking-widest">Return to Portfolio</Link>
    </div>
  );

  return (
    <div className="py-24 md:py-32 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-8 md:mb-16 hover:gap-4 transition-all duration-500 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-primary/60 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Portfolio Category</span>
          <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.9]">{data.name}</h1>
          <p className="text-lg md:text-2xl text-white/40 max-w-2xl font-medium leading-relaxed">{data.desc}</p>
          <div className="w-24 h-1 md:h-1.5 bg-gradient-to-r from-primary to-secondary mt-8 md:mt-12 rounded-full" />
        </motion.div>

        {/* Dynamic Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {images.length > 0 ? (
            images.map((imgSrc, i) => (
              <motion.div
                key={imgSrc}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-premium border border-white/5 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <img 
                   src={imgSrc} 
                   alt={`${data.name} portfolio item`} 
                   loading="lazy"
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                   <div className="flex items-center gap-2 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <Sparkles size={14} className="text-primary"/>
                     <span className="font-black uppercase tracking-[0.2em] text-[10px] text-primary">View Full</span>
                   </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 md:py-20 text-center glass-premium rounded-[2rem] md:rounded-[3rem] border border-white/5 border-dashed">
              <ImageIcon size={40} className="mx-auto text-white/10 mb-4 md:w-12 md:h-12" />
              <p className="text-white/40 uppercase tracking-widest text-[10px] md:text-xs font-black">Gallery Empty</p>
            </div>
          )}
        </div>

        {/* Closing CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 md:mt-32 text-center"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 bg-primary text-bg-deep font-black rounded-2xl text-[10px] md:text-xs uppercase tracking-widest hover:shadow-[0_20px_50px_rgba(255,133,161,0.3)] transition-all duration-500 group"
          >
            Inquire About This Service
            <Sparkles size={18} className="group-hover:scale-125 transition-transform md:w-5 md:h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
