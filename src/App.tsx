import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Loader2 } from "lucide-react";

// Premium Loading Fallback
function PageLoader() {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-bg-deep z-[200]">
      <Loader2 className="animate-spin text-primary mb-4" size={40} />
      <span className="text-white/20 uppercase tracking-[0.4em] text-[10px] font-black animate-pulse">
        Initializing Creative Space
      </span>
    </div>
  );
}

// Global Scroll Handler
function ScrollHandler() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Catch-all for sub-paths in static mode */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

