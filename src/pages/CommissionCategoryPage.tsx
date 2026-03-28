import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Image as ImageIcon } from "lucide-react";

const categoryData = {
  "character-sheets": {
    title: "Character & Reference Sheets",
    desc: "High-quality, detailed reference sheets featuring multiple views, expressions, and color palettes to perfectly define your original characters."
  },
  "posters-covers": {
    title: "Posters & Cover Art",
    desc: "Cinematic, full-scale illustrations designed for maximum visual impact. Ideal for commercial projects, social media, or personal collections."
  },
  "vtuber-models": {
    title: "VTuber Models",
    desc: "Professional-grade Live2D models with clean layering and precise cuts. Every file is optimized for fluid movement and high-fidelity rigging."
  }
};

export default function CommissionCategoryPage() {
  const { categoryId } = useParams();
  const data = categoryData[categoryId as keyof typeof categoryData];

  if (!data) return (
    <div className="py-40 text-center mx-auto">
      <h2 className="text-3xl font-black text-white mb-8">Category Not Found</h2>
      <Link to="/commissions" className="text-primary font-black uppercase tracking-widest">Return to Commissions</Link>
    </div>
  );

  return (
    <div className="py-32 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/commissions" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-16 hover:gap-4 transition-all duration-500 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Categories
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <span className="text-primary/60 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Commission Gallery</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">{data.title}</h1>
          <p className="text-white/40 max-w-2xl text-xl md:text-2xl font-medium leading-relaxed">{data.desc}</p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mt-12 rounded-full" />
        </motion.div>

        {/* Gallery Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="aspect-[3/4] rounded-[3rem] glass-premium border border-white/5 flex flex-col items-center justify-center text-white/5 group overflow-hidden relative cursor-default"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="p-8 glass-premium rounded-full mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700">
                <ImageIcon size={48} className="text-white/10 group-hover:text-primary transition-colors duration-500" />
              </div>
              
              <div className="text-center px-8 relative z-10">
                <p className="font-black uppercase tracking-[0.4em] text-[10px] text-white/20 group-hover:text-white/60 transition-colors duration-500 mb-2">Portfolio Entry #0{i}</p>
                <div className="flex items-center justify-center gap-2">
                   <Sparkles size={12} className="text-primary/20" />
                   <p className="font-black uppercase tracking-widest text-[9px] text-white/10">Artwork Coming Soon</p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <Sparkles size={24} className="text-primary/10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-bg-deep font-black rounded-2xl text-xs uppercase tracking-widest hover:shadow-[0_20px_50px_rgba(255,133,161,0.3)] transition-all duration-500 group"
          >
            Inquire About This Category
            <Sparkles size={20} className="group-hover:scale-125 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
