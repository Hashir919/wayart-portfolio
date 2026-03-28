import { useState, useEffect, useCallback } from 'react';

export interface Artwork {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  desc: string;
  artworks: Artwork[];
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  quote: string;
  description: string;
  points: string[];
  stats: AboutStat[];
  images: string[];
}

export interface ContactSocials {
  twitter: string;
  instagram: string;
  github: string;
}

export interface ContactData {
  email: string;
  discord: string;
  socials: ContactSocials;
}

export interface PortfolioData {
  categories: Category[];
  about: AboutData;
  contact: ContactData;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to fetch portfolio data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      console.error('[Portfolio Hook] Error:', err);
      setError('Could not connect to CMS');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Default export for backward compatibility (some files import default)
export default usePortfolioData;
