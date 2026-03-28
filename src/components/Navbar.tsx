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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ease-soft ${
        scrolled ? "py-2 md:py-3" : "py-4 md:py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between gap-4 transition-all duration-500 rounded-2xl md:rounded-full px-4 md:px-10 py-2 md:py-3 navbar-glass`}>
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <Heart className="fill-primary text-primary transition-transform duration-500 group-hover:scale-110 md:w-[24px]" size={20} />
                <Sparkles className="absolute -top-1.5 -right-1.5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse mobile-hide-decor" size={12} />
              </div>
              <span className="text-base md:text-2xl font-bold text-white tracking-tighter group-hover:text-primary transition-colors duration-500 flex items-center">
                WAY<span className="text-gradient font-black ml-0.5 glow-text">ART</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group ${
                  location.pathname === link.href ? "text-primary" : "text-white/40 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="hidden md:inline-block px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-bg-deep font-black rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105"
            >
              Let's Talk
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 glass-premium rounded-xl flex items-center justify-center text-white z-[110]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-bg-deep/90 backdrop-blur-md z-[95]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed inset-x-4 top-24 z-[100]"
            >
              <div className="glass-premium rounded-[2rem] p-6 flex flex-col gap-3 shadow-2xl border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -z-10" />
                
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-xl transition-colors font-black tracking-tight text-xl ${
                        location.pathname === link.href 
                          ? "text-primary bg-primary/5" 
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-[1px] bg-white/5 my-2" />
                
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-primary text-bg-deep font-black rounded-2xl text-lg tracking-tight shadow-xl shadow-primary/20 text-center block"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
