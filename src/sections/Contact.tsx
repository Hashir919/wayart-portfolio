import { motion } from "motion/react";
import { Mail, Sparkles, MessageCircle, ClipboardCheck, PenTool, Palette, Wand2 } from "lucide-react";

const CONTACT_INFO = {
  email: "drivenkore@gmail.com",
  discord: "kore_69",
  discordUrl: "https://discord.com" // Update with real link if available
};

const PROCESS_STEPS = [
  {
    icon: <ClipboardCheck size={20} />,
    title: "The Inquiry",
    desc: "Send your ideas & references via Email or Discord."
  },
  {
    icon: <PenTool size={20} />,
    title: "Rough Sketch",
    desc: "I'll create a draft for your composition approval."
  },
  {
    icon: <Palette size={20} />,
    title: "Refining",
    desc: "Applying line art and flat colors to the piece."
  },
  {
    icon: <Wand2 size={20} />,
    title: "Final Magic",
    desc: "Rendering, lighting, and final polish delivered."
  }
];

export default function Contact() {
  return (
    <section id="contact" className="relative responsive-section overflow-hidden bg-bg-deep py-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] mobile-hide-decor" />
        <div className="absolute bottom-[-10%] right-[-10%] w-56 h-56 bg-secondary/5 rounded-full blur-[80px] mobile-hide-decor" />
      </div>

      <div className="max-w-7xl mx-auto responsive-padding px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-primary/20 mb-6 text-primary">
              <Sparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open now</span>
            </div>
            <h2 className="text-fluid-4xl md:text-7xl font-black mb-8 md:mb-10 tracking-tighter leading-[0.95]">
              Let's Start a <span className="text-gradient">Project</span> together <span className="text-primary">.</span>
            </h2>
            <p className="text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed font-medium">
              Ready to bring your characters to life? I'm currently accepting new commissions. Let's talk!
            </p>

            <div className="flex flex-col gap-4">
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-5 p-5 md:p-6 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-active:scale-95">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Email Me</p>
                  <p className="text-sm md:text-base font-black tracking-tight">{CONTACT_INFO.email}</p>
                </div>
              </a>

              <a 
                href={CONTACT_INFO.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 md:p-6 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-blue-400/30 transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 transition-transform group-active:scale-95">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1" id="discord-label">Discord</p>
                  <p className="text-sm md:text-base font-black tracking-tight">{CONTACT_INFO.discord}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Creative Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 md:p-12 rounded-[2.5rem] glass-premium border border-white/10 shadow-2xl relative"
          >
            <h3 className="text-xl md:text-3xl font-black mb-8 tracking-tighter">My Creative <span className="text-primary">Process</span></h3>
            
            <div className="space-y-8 relative">
              {/* Connecting Line */}
              <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-white/5 mobile-hide-decor" />
              
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 relative group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 z-10 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-black mb-1 uppercase tracking-wider">{step.title}</h4>
                    <p className="text-xs md:text-sm text-white/40 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-5 bg-primary/5 border border-primary/20 rounded-2xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Estimated Delivery: 2-3 Weeks</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
