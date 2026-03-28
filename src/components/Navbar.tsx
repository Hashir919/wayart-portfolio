import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-700 ease-soft ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-2 md:grid-cols-3 items-center transition-all duration-700 rounded-2xl md:rounded-full px-5 md:px-10 py-3 navbar-glass`}>
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Heart className="fill-primary text-primary transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_10px_rgba(255,133,161,0.5)]" size={26} />
                <Sparkles className="absolute -top-2 -right-2 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" size={14} />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tighter group-hover:text-primary transition-colors duration-500 flex items-center">
                WAY<span className="text-gradient font-black ml-0.5 glow-text">ART</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <Link
                  to={link.href}
                  className={`relative text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 group ${
                    location.pathname === link.href ? "text-primary" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-500 ${
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA / Mobile Toggle - Right */}
          <div className="flex items-center justify-end gap-4 text-nowrap">
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-bg-deep font-black rounded-full text-[10px] uppercase tracking-widest transition-all duration-500 shadow-[0_0_20px_rgba(255,133,161,0.3)] hover:shadow-[0_0_30px_rgba(255,133,161,0.5)] hover:brightness-110 inline-block"
              >
                Let's Talk
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-10 h-10 glass-premium rounded-xl flex items-center justify-center text-white hover:text-primary transition-all duration-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden fixed inset-x-4 top-24 z-[100]"
          >
            <div className="glass-premium rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl backdrop-blur-3xl border-primary/20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-black tracking-tighter transition-all duration-500 ${
                      location.pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="h-[1px] bg-white/10 my-2" />
              <Link 
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-primary text-bg-deep font-black rounded-[1.5rem] text-lg tracking-tighter shadow-2xl text-center"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
