import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Loader2 } from "lucide-react";

// Code splitting for non-critical pages
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const PortfolioCategoryPage = lazy(() => import("./pages/PortfolioCategoryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:categoryId" element={<PortfolioCategoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

