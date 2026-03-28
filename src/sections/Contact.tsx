import { motion } from "motion/react";
import { Mail, MessageSquare, Send, Instagram, Twitter, ExternalLink, Sparkles, Loader2, Github } from "lucide-react";
import React, { useState } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";

export default function Contact() {
  const { data: portfolioData, loading } = usePortfolioData();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const contact = portfolioData?.contact || {
    email: "warry@wayart.com",
    discord: "Warry#0001",
    socials: { twitter: "#", instagram: "#", github: "#" }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent! (Demo mode)");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, label: "Instagram", url: contact.socials.instagram, color: "hover:border-pink-500/30", iconColor: "group-hover:text-pink-500" },
    { icon: <Twitter size={20} />, label: "Twitter", url: contact.socials.twitter, color: "hover:border-blue-400/30", iconColor: "group-hover:text-blue-400" },
    { icon: <Github size={20} />, label: "GitHub", url: contact.socials.github, color: "hover:border-gray-500/30", iconColor: "group-hover:text-gray-400" },
  ];

  return (
    <section id="contact" className="relative responsive-section overflow-hidden bg-bg-deep">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 mobile-hide-decor">
        <div className="absolute top-[20%] left-[-10%] w-80 h-80 bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto responsive-padding">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/20 mb-6 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open for Commissions</span>
            </div>
            <h2 className="text-fluid-4xl md:text-7xl font-black mb-8 md:mb-10 tracking-tighter leading-[0.95]">
              Let's Bring Your <span className="text-gradient">Vision</span> to Life <span className="text-primary">.</span>
            </h2>
            <p className="text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed font-medium">
              Ready to start a new artwork or commission? Drop me a message and let's discuss your ideas!
            </p>

            <div className="space-y-4 md:space-y-6">
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-5 p-5 md:p-6 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Email Me</p>
                  <p className="text-sm md:text-lg font-black">{contact.email}</p>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, i) => (
                   <a 
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-5 rounded-[1.5rem] bg-white/5 border border-white/5 ${social.color} transition-all group`}
                  >
                    <div className={`${social.iconColor} transition-colors`}>{social.icon}</div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{social.label}</span>
                    <ExternalLink size={14} className="ml-auto text-white/10" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <form 
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[2.5rem] glass-premium border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 mb-3 ml-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Warry Kane"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 mb-3 ml-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="hello@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-widest font-black text-white/30 mb-3 ml-2">Tell me about your vision</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="I'd love to commission a character illustration..."
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:bg-white/10 outline-none transition-all text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-bg-deep font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-[0.2em] text-xs font-sans"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Transmit Vision <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-3 text-white/20">
              <MessageSquare size={14} />
              <p className="text-[10px] uppercase tracking-widest font-black">Average response: 24-48h</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
