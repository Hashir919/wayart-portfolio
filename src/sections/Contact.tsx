import { motion } from "motion/react";
import { Send, Twitter, Instagram, Github, Mail, MessageCircle, Sparkles } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export default function Contact() {
  const { contact } = portfolioData;

  const socialIcons = {
    twitter: Twitter,
    instagram: Instagram,
    github: Github
  };

  return (
    <section id="contact" className="responsive-section relative overflow-hidden">
      {/* Background Section Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[180px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

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
            Get in Touch
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
            Let's Start a <span className="text-gradient">Project</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
            Ready to bring your vision to life? Fill out the form below or reach out via social media.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="lg:col-span-2 space-y-8 md:space-y-10"
          >
            <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Sparkles size={120} className="text-primary" />
              </div>

              <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-10 text-white tracking-tight">Contact Information</h3>
              
              <div className="space-y-6 md:space-y-8">
                <motion.div 
                   whileHover={{ x: 10 }}
                   className="flex items-center gap-4 md:gap-6 group/item cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 glass-premium rounded-xl md:rounded-2xl flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-bg-deep transition-all duration-500">
                    <Mail size={22} className="md:w-[28px]" />
                  </div>
                  <div>
                     <h4 className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Email</h4>
                     <p className="text-sm md:text-xl font-bold text-white/70 group-hover/item:text-primary transition-colors duration-500 tracking-tight break-all">{contact.email}</p>
                  </div>
                </motion.div>

                <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 md:gap-6 group/item cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 glass-premium rounded-xl md:rounded-2xl flex items-center justify-center text-secondary group-hover/item:bg-secondary group-hover/item:text-bg-deep transition-all duration-500">
                    <MessageCircle size={22} className="md:w-[28px]" />
                  </div>
                  <div>
                    <h4 className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Discord</h4>
                    <p className="text-sm md:text-xl font-bold text-white/70 group-hover/item:text-secondary transition-colors duration-500 tracking-tight">{contact.discord}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 md:mt-16">
                <h4 className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 md:mb-8 text-center md:text-left text-nowrap">Connect on Socials</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {Object.entries(contact.socials).map(([key, url]) => {
                     const Icon = socialIcons[key as keyof typeof socialIcons];
                     if (!Icon || !url || url === "#") return null;
                     return (
                       <motion.a
                         key={key}
                         href={url}
                         target="_blank"
                         rel="noreferrer"
                         whileHover={{ y: -10, scale: 1.1, rotate: 5 }}
                         whileTap={{ scale: 0.95 }}
                         className="w-12 h-12 md:w-16 md:h-16 glass-premium rounded-xl md:rounded-2xl flex items-center justify-center text-white/40 hover:text-primary transition-all duration-500 shadow-xl border-white/5 hover:border-primary/30"
                       >
                         <Icon size={20} className="md:w-6 md:h-6" />
                       </motion.a>
                     );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="lg:col-span-3"
          >
            <form action={`mailto:${contact.email}`} method="GET" className="glass-premium p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] border-white/5 space-y-8 md:space-y-10 shadow-3xl">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Display Name</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="E.g. Jane Doe"
                    className="w-full px-6 md:px-8 py-4 md:py-5 glass-premium rounded-xl md:rounded-2xl border-white/5 focus:border-primary/30 focus:outline-none transition-all duration-500 placeholder:text-white/10 font-bold tracking-tight text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-6 md:px-8 py-4 md:py-5 glass-premium rounded-xl md:rounded-2xl border-white/5 focus:border-primary/30 focus:outline-none transition-all duration-500 placeholder:text-white/10 font-bold tracking-tight text-white text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Project Details</label>
                <textarea
                  name="body"
                  rows={5}
                  placeholder="Tell me about your amazing character and vision..."
                  className="w-full px-6 md:px-8 py-4 md:py-6 glass-premium rounded-[1.5rem] md:rounded-[2rem] border-white/5 focus:border-primary/30 focus:outline-none transition-all duration-500 placeholder:text-white/10 font-bold tracking-tight text-white resize-none text-sm md:text-base"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 md:py-6 bg-primary text-bg-deep font-black uppercase tracking-[0.3em] text-[10px] md:text-xs rounded-xl md:rounded-2xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,133,161,0.3)] hover:shadow-[0_20px_50px_rgba(255,133,161,0.5)] transition-all duration-700 group/btn"
              >
                Launch Request
                <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 md:w-5 md:h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
