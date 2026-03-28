import { motion } from "motion/react";
import { Check, Star, Sparkles } from "lucide-react";

const pricingPlans = [
  {
    id: 1,
    title: "Bust Shot",
    price: "$45",
    desc: "Detailed portrait from the chest up. Perfect for profile pictures.",
    features: [
      "High-res PNG/JPG",
      "Simple background",
      "Soft lighting",
      "2 Revisions",
    ],
    popular: false,
    color: "text-secondary",
  },
  {
    id: 2,
    title: "Half Body",
    price: "$75",
    desc: "Character illustration from the waist up. Great for dynamic poses.",
    features: [
      "High-res PNG/JPG",
      "Detailed background",
      "Complex lighting",
      "3 Revisions",
      "Source PSD file",
    ],
    popular: true,
    color: "text-primary",
  },
  {
    id: 3,
    title: "Full Body",
    price: "$120",
    desc: "Complete character design with full background and effects.",
    features: [
      "High-res PNG/JPG",
      "Full scenic background",
      "Cinematic lighting",
      "Unlimited revisions",
      "Source PSD file",
      "Commercial use",
    ],
    popular: false,
    color: "text-accent",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="responsive-section relative overflow-hidden bg-bg-deep/50">
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
            Invest in Art
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
            Pricing <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
            Choose the package that best fits your vision. All plans include high-resolution final files and collaborative feedback.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative glass-premium p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/5 flex flex-col glow-hover transition-all duration-700 ${
                plan.popular ? "border-primary/30 shadow-[0_30px_60px_-15px_rgba(255,133,161,0.2)] md:scale-105 z-10 shimmer" : ""
              } ${i === 2 && "md:col-span-2 lg:col-span-1"}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 md:px-6 py-2 bg-primary text-bg-deep text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-xl">
                  <Star size={12} className="fill-bg-deep" />
                  Most Popular
                </div>
              )}

              <div className="mb-8 md:mb-10 text-center md:text-left">
                <h3 className={`text-2xl md:text-3xl font-black mb-1 tracking-tight ${plan.color}`}>
                   {plan.title}
                </h3>
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-6">
                   <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                   <span className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-widest">USD</span>
                </div>
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">
                   {plan.desc}
                </p>
              </div>

              <div className="space-y-4 md:space-y-5 mb-10 md:mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 md:gap-4 group/feature">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/feature:bg-primary group-hover/feature:text-bg-deep transition-colors duration-500">
                      <Check size={12} className="md:w-[14px]" />
                    </div>
                    <span className="text-xs md:text-sm text-white/70 font-bold tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 ${
                  plan.popular
                    ? "bg-primary text-bg-deep shadow-[0_20px_40px_rgba(255,133,161,0.3)] hover:shadow-[0_20px_40px_rgba(255,133,161,0.5)]"
                    : "glass-premium text-white hover:bg-white/10"
                }`}
              >
                Select {plan.title}
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        {/* Bulk Order Discount */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 md:mt-20 text-center p-6 md:p-8 glass-premium rounded-[2rem] md:rounded-[2.5rem] border-primary/10 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 text-secondary mb-2">
            <Sparkles size={18} className="md:w-5 md:h-5" />
            <h4 className="text-base md:text-lg font-black tracking-tight">Need multiple characters?</h4>
          </div>
          <p className="text-[10px] md:text-sm font-medium text-white/50">Contact me for bulk order discounts and large scale project estimates.</p>
        </motion.div>
      </div>
    </section>
  );
}
