import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import OptimizedImage from "../components/OptimizedImage";

// Import local assets
import characterImg from "../assets/character.png";
import coverartImg from "../assets/coverart.png";
import vtuberImg from "../assets/vtuber.png";
import heroImg from "../assets/hero-character.png";

const CATEGORIES = [
  {
    id: 1,
    name: "Character Art & Reference Sheets",
    desc: "Detailed anime character designs and comprehensive reference sheets.",
    image: characterImg,
    link: "https://www.behance.net/gallery/246641699/Char-and-ref-sheets"
  },
  {
    id: 2,
    name: "Cover Art & Posters",
    desc: "Captivating cover illustrations and cinematic posters for stories and music.",
    image: coverartImg,
    link: "https://www.behance.net/gallery/246642227/Cover-art-and-posters"
  },
  {
    id: 3,
    name: "VTuber 3D Models",
    desc: "Fully rigged 3D models tailored for VTubers with expressive movements.",
    image: vtuberImg,
    link: "https://www.behance.net/gallery/246642457/Vtuber3D-models"
  },
  {
    id: 4,
    name: "Emotes",
    desc: "Adorable and expressive chibi emotes for Twitch, Discord, and more.",
    image: heroImg,
    link: "https://www.behance.net/gallery/246642643/Emotes"
  }
];

export default function Portfolio() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="portfolio" className="relative responsive-section overflow-hidden bg-bg-deep py-20">
      {/* Background Decor - Optimized */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10 mobile-hide-decor opacity-30" />
      
      <div className="max-w-7xl mx-auto responsive-padding px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/10 mb-6 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Collections</span>
            </div>
            <h2 className="text-fluid-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
              Explore the <span className="text-gradient">WayArt</span> Portfolio <span className="text-primary">.</span>
            </h2>
            <p className="text-base md:text-xl text-white/40 font-medium leading-relaxed">
              Discover unique worlds of anime-inspired characters and high-end 3D models crafted with care.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : i * 0.1 }}
              className="group relative"
            >
              <a
                href={category.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 transition-all duration-300 hover:border-primary/20"
              >
                <OptimizedImage
                  src={category.image}
                  alt={category.name}
                  aspectRatio="aspect-[16/9]"
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay - Simplified */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/40 to-transparent p-6 md:p-10 flex flex-col justify-end">
                  <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Behance Collection
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black mb-2 leading-none tracking-tighter">
                    {category.name}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm font-medium line-clamp-2 transition-colors duration-300 group-hover:text-white/60">
                    {category.desc}
                  </p>
                  
                  <div className="mt-4 md:mt-6 w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary flex items-center justify-center text-bg-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
