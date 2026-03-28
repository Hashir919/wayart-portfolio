import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ShieldCheck, AlertCircle, FileText, Sparkles } from "lucide-react";

const tosItems = [
  {
    id: 1,
    title: "General Terms",
    content: "I reserve the right to refuse any commission request. All prices are in USD and must be paid via PayPal or Ko-fi. I do not accept cryptocurrency or NFTs.",
    icon: <FileText size={20} />,
  },
  {
    id: 2,
    title: "Usage Rights",
    content: "Commissions are for personal use only unless commercial rights are purchased. You may use the artwork for social media, streaming, or printing for yourself. You may not resell the artwork or use it for AI training.",
    icon: <ShieldCheck size={20} />,
  },
  {
    id: 3,
    title: "Refund Policy",
    content: "Full refunds are available before the sketch is started. 50% refunds are available after the sketch is approved. No refunds are available once the final coloring has begun.",
    icon: <AlertCircle size={20} />,
  },
  {
    id: 4,
    title: "Deadlines & Rush Orders",
    content: "Standard turnaround time is 2-4 weeks depending on complexity. Rush orders (under 1 week) are available for an additional 50% fee.",
    icon: <Sparkles size={20} />,
  },
];

export default function TOS() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="tos" className="responsive-section relative overflow-hidden">
      <div className="max-w-4xl mx-auto responsive-padding">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="text-center mb-16 md:mb-20"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Fine Print
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
            Terms of <span className="text-gradient">Service</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
            Please read these terms carefully before requesting a commission. They are designed to ensure a smooth collaboration.
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {tosItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`glass-premium rounded-2xl md:rounded-[2.5rem] border-white/5 overflow-hidden transition-all duration-700 ${
                openId === item.id ? "border-primary/30 shadow-[0_20px_40px_rgba(255,133,161,0.1)] bg-primary/[0.02]" : ""
              }`}
            >
              <button
                className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-left group"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 glass-premium ${openId === item.id ? "text-primary bg-primary/20 scale-110" : "text-white/30"}`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-lg md:text-2xl font-black tracking-tight transition-colors duration-500 ${openId === item.id ? "text-white" : "text-white/40 group-hover:text-white/60"}`}>
                    {item.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${openId === item.id ? "text-primary" : "text-white/10"}`}
                >
                  <ChevronDown size={22} className="md:w-7 md:h-7" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 md:px-10 pb-6 md:pb-10 pt-2 text-white/50 leading-relaxed text-sm md:text-lg font-medium border-t border-white/5 mt-2">
                       <div className="p-4 md:p-6 bg-white/[0.02] rounded-xl md:rounded-3xl border border-white/5">
                        {item.content}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Help Link */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-[10px] md:text-sm font-bold text-white/20 uppercase tracking-widest leading-relaxed">Questions about these terms? <br className="md:hidden" /> <a href="#contact" className="text-primary hover:glow-text transition-all underline underline-offset-8">Ask here</a></p>
        </div>
      </div>
    </section>
  );
}
