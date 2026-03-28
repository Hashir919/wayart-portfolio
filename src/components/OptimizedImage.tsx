import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  aspectRatio = "aspect-auto"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Helper to inject Cloudinary optimization params
  const getOptimizedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("cloudinary.com") && !url.includes("f_auto,q_auto")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_1000/"); // Default max width for safety
    }
    return url;
  };

  const optimizedSrc = getOptimizedUrl(src);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton / Shimmer Loader */}
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/5 shimmer z-10"
          />
        )}
      </AnimatePresence>

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-deep/50 text-white/20 text-[10px] uppercase tracking-widest font-black">
          Image Failed
        </div>
      )}
    </div>
  );
}
