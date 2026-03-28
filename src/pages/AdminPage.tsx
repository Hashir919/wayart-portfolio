import React, { useState, useRef, useEffect } from "react";
import { Upload, Trash2, LogIn, Image as ImageIcon, CheckCircle, AlertCircle, Plus, Edit2, Save, X, RefreshCw, LayoutDashboard, User, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

// Types
interface Artwork {
  id: string;
  url: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  desc: string;
  artworks: Artwork[];
}

interface AboutStat {
  value: string;
  label: string;
}

interface AboutData {
  title: string;
  quote: string;
  description: string;
  points: string[];
  stats: AboutStat[];
  images: string[];
}

interface ContactSocials {
  twitter: string;
  instagram: string;
  github: string;
}

interface ContactData {
  email: string;
  discord: string;
  socials: ContactSocials;
}

interface PortfolioData {
  categories: Category[];
  about: AboutData;
  contact: ContactData;
}

type Tab = 'portfolio' | 'about' | 'contact';

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAboutIndex, setUploadingAboutIndex] = useState<number | null>(null);

  // Edit category state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const artworkInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const aboutImageInputRef = useRef<HTMLInputElement>(null);

  // Constants
  const CLOUD_NAME = "dib3jrmql";
  const UPLOAD_PRESET = "wayart_upload";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  useEffect(() => {
    const stored = sessionStorage.getItem("adminAuth");
    if (stored) {
      setPassword(stored);
      verifyOld(stored);
    }
  }, []);

  const verifyOld = async (pwd: string) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        setIsAuth(true);
        loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuth(true);
        sessionStorage.setItem("adminAuth", password);
        loadData();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        if (json.categories?.length > 0 && !activeCategoryId) {
          setActiveCategoryId(json.categories[0].id);
        }
      }
    } catch (e) {
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const saveData = async (newData: PortfolioData | null = data) => {
    if (!newData) return;
    setError("");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}` 
        },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        showSuccess("Changes saved successfully!");
      } else {
        setError("Failed to save data");
      }
    } catch (e) {
      setError("Failed to save data");
    }
  };

  // --- Cloudinary Upload Logic ---
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }
    const json = await res.json();
    return {
      id: json.public_id,
      url: json.secure_url
    };
  };

  const handleArtworkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeCategoryId || !data) return;
    
    setUploading(true);
    setError("");
    
    try {
      const files = Array.from(e.target.files) as File[];
      const uploadedArtworks = await Promise.all(
        files.map(file => uploadToCloudinary(file))
      );
      
      const newData = { ...data };
      const category = newData.categories.find(c => c.id === activeCategoryId);
      if (category) {
        category.artworks = [...category.artworks, ...uploadedArtworks];
        setData(newData);
        await saveData(newData);
      }
    } catch (err) {
      setError("Failed to upload artwork to Cloudinary");
    } finally {
      setUploading(false);
      if (artworkInputRef.current) artworkInputRef.current.value = "";
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>, catId: string) => {
    if (!e.target.files || e.target.files.length === 0 || !data) return;
    setUploading(true);
    try {
      const result = await uploadToCloudinary(e.target.files[0]);
      const newData = { ...data };
      const category = newData.categories.find(c => c.id === catId);
      if (category) {
        category.coverImage = result.url;
        setData(newData);
        await saveData(newData);
      }
    } catch (err) {
      setError("Failed to upload cover image");
    } finally {
      setUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !data || uploadingAboutIndex === null) return;
    setUploading(true);
    try {
      const result = await uploadToCloudinary(e.target.files[0]);
      const newData = { ...data };
      newData.about.images[uploadingAboutIndex] = result.url;
      setData(newData);
      await saveData(newData);
    } catch (err) {
      setError("Failed to upload story image");
    } finally {
      setUploading(false);
      setUploadingAboutIndex(null);
      if (aboutImageInputRef.current) aboutImageInputRef.current.value = "";
    }
  };

  // --- Category Management ---
  const handleCreateCategory = () => {
    const newId = `cat-${Date.now()}`;
    setEditingCategory({
      id: newId,
      slug: `category-${Date.now()}`,
      name: "New Category",
      coverImage: "",
      desc: "Category description",
      artworks: []
    });
  };

  const saveEditedCategory = () => {
    if (!editingCategory || !data) return;
    const newData = { ...data };
    const idx = newData.categories.findIndex(c => c.id === editingCategory.id);
    
    if (idx >= 0) {
      newData.categories[idx] = editingCategory;
    } else {
      newData.categories.push(editingCategory);
      setActiveCategoryId(editingCategory.id);
    }
    setData(newData);
    saveData(newData);
    setEditingCategory(null);
  };

  const deleteCategory = (catId: string) => {
    if (!data || !confirm("Delete this category completely? This removes it from the JSON. (Cloudinary images remain)")) return;
    const newData = { ...data };
    newData.categories = newData.categories.filter(c => c.id !== catId);
    if (activeCategoryId === catId) {
      setActiveCategoryId(newData.categories[0]?.id || "");
    }
    setData(newData);
    saveData(newData);
  };

  const deleteArtwork = (catId: string, artworkId: string) => {
    if (!data || !confirm("Remove this artwork? Note: It remains on Cloudinary but will be removed from your site.")) return;
    const newData = { ...data };
    const category = newData.categories.find(c => c.id === catId);
    if (category) {
      category.artworks = category.artworks.filter(a => a.id !== artworkId);
      setData(newData);
      saveData(newData);
    }
  };

  // --- State Changers ---
  const updateAbout = (field: keyof AboutData, value: any) => {
    if (!data) return;
    setData({ ...data, about: { ...data.about, [field]: value } });
  };
  
  const updateAboutPoint = (index: number, value: string) => {
    if (!data) return;
    const newPoints = [...data.about.points];
    newPoints[index] = value;
    setData({ ...data, about: { ...data.about, points: newPoints } });
  };

  const updateAboutStat = (index: number, field: keyof AboutStat, value: string) => {
    if (!data) return;
    const newStats = [...data.about.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({ ...data, about: { ...data.about, stats: newStats } });
  };

  const updateContact = (field: keyof ContactData, value: any) => {
    if (!data) return;
    setData({ ...data, contact: { ...data.contact, [field]: value } });
  };

  const updateSocial = (network: keyof ContactSocials, value: string) => {
    if (!data) return;
    setData({ ...data, contact: { ...data.contact, socials: { ...data.contact.socials, [network]: value } } });
  };

  if (!isAuth) {
    return (
      <div className="py-40 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-bg-deep rounded-full blur-[160px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-auto p-12 glass-premium rounded-3xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2 text-white/90">CMS Vault</h1>
            <p className="text-white/40 text-sm">Powered by Cloudinary</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle size={14}/> {error}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-bg-deep font-black py-3 rounded-xl transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              {loading ? "Verifying..." : <><LogIn size={16}/> Enter Vault</>}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (!data) return <div className="py-40 text-center">Loading...</div>;

  const activeCategory = data.categories.find(c => c.id === activeCategoryId);

  return (
    <div className="py-32 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] -z-10" />
      
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-primary/60 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Site Management</span>
            <h1 className="text-4xl md:text-5xl font-black text-white">Fullstack CMS</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => saveData()}
              className="bg-primary/20 hover:bg-primary/40 text-primary px-6 py-3 rounded-xl text-sm font-black transition-colors flex items-center gap-2"
            >
              <Save size={16} /> Save Master Data
            </button>
            <button 
              onClick={() => { sessionStorage.removeItem("adminAuth"); setIsAuth(false); }}
              className="text-white/40 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest px-4 border border-white/10 py-3 rounded-xl bg-white/5"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3 font-semibold">
            <AlertCircle size={18} /> {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 font-semibold">
            <CheckCircle size={18} /> {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Main Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-4">Dashboard</h3>
            
            <button onClick={() => setActiveTab('portfolio')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'portfolio' ? 'bg-primary text-bg-deep shadow-[0_10px_30px_rgba(255,133,161,0.2)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
               <LayoutDashboard size={18} /> Portfolio
            </button>
            <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'about' ? 'bg-primary text-bg-deep shadow-[0_10px_30px_rgba(255,133,161,0.2)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
               <User size={18} /> Story / About
            </button>
            <button onClick={() => setActiveTab('contact')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'contact' ? 'bg-primary text-bg-deep shadow-[0_10px_30px_rgba(255,133,161,0.2)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
               <MessageCircle size={18} /> Contact
            </button>
          </div>

          {/* Editors */}
          <div className="lg:col-span-4">
            
            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Category Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Categories</h3>
                    <button onClick={handleCreateCategory} className="p-1.5 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg transition-colors" title="Add new category"><Plus size={16} /></button>
                  </div>
                  
                  <div className="space-y-2">
                    {data.categories.map(cat => (
                      <div key={cat.id} className="group relative">
                        <button
                          onClick={() => setActiveCategoryId(cat.id)}
                          className={`w-full text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 pr-10 ${
                            activeCategoryId === cat.id 
                              ? 'bg-primary/20 text-primary border border-primary/30' 
                              : 'bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          {cat.name}
                        </button>
                        <button 
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/30 hover:text-white bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); setEditingCategory(cat); }}
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {activeCategory && (
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-4">Cover Image</h3>
                      <div className="relative aspect-video rounded-xl bg-black/40 overflow-hidden border border-white/10 group">
                          {activeCategory.coverImage ? (
                            <img src={activeCategory.coverImage} alt="Cover" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon size={32} className="text-white/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                            <button onClick={() => coverInputRef.current?.click()} className="text-xs bg-primary text-bg-deep font-bold px-3 py-1.5 rounded-lg mb-2">
                              {uploading ? "Uploading..." : "Upload Cover"}
                            </button>
                          </div>
                      </div>
                      <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleCoverUpload(e, activeCategory.id)}/>
                    </div>
                  )}
                </div>

                {/* Portfolio Gallery Manager */}
                {activeCategory && (
                  <div className="lg:col-span-3 glass-premium rounded-3xl p-8 border border-white/5 relative">
                    {/* Category Editor Modal */}
                    {editingCategory && (
                      <div className="absolute inset-0 z-20 bg-bg-deep/95 backdrop-blur-xl rounded-3xl p-8 overflow-y-auto border border-white/10 text-left">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-black text-white">{editingCategory.id.startsWith("cat-") ? "New Category" : "Edit Category"}</h2>
                          <button onClick={() => setEditingCategory(null)} className="p-2 text-white/40 hover:text-white"><X size={20}/></button>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Display Name</label>
                            <input type="text" value={editingCategory.name} onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                          </div>
                          <div>
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">URL Slug</label>
                            <input type="text" value={editingCategory.slug} onChange={(e) => setEditingCategory({...editingCategory, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                          </div>
                          <div>
                            <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Description</label>
                            <textarea value={editingCategory.desc} onChange={(e) => setEditingCategory({...editingCategory, desc: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 h-32" />
                          </div>
                          
                          <div className="flex gap-4 pt-4 border-t border-white/10">
                            <button onClick={saveEditedCategory} className="bg-primary hover:bg-primary/80 text-bg-deep font-black px-6 py-3 rounded-xl transition-colors">Save Category</button>
                            {!editingCategory.id.startsWith("cat-") && (
                              <button onClick={() => { deleteCategory(editingCategory.id); setEditingCategory(null); }} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-6 py-3 rounded-xl transition-colors ml-auto">Delete Globally</button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <ImageIcon size={20} className="text-primary"/> 
                        {activeCategory.name} Artworks
                        <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-white/60">{activeCategory.artworks.length}</span>
                      </h2>
                      
                      <button 
                        onClick={() => artworkInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {uploading ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />} 
                        {uploading ? 'Uploading...' : 'Add Images'}
                      </button>
                      <input type="file" ref={artworkInputRef} className="hidden" multiple accept="image/*" onChange={handleArtworkUpload}/>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {activeCategory.artworks.map((art, i) => (
                        <div key={art.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-black/50 border border-white/10">
                          <img src={art.url} alt="Artwork" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                              <button onClick={() => deleteArtwork(activeCategory.id, art.id)} className="p-3 bg-red-500/20 hover:bg-red-500/80 text-white rounded-full transition-colors backdrop-blur-md" title="Unlink Image">
                                <Trash2 size={20} />
                              </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-premium rounded-3xl p-8 border border-white/5 space-y-6">
                   <h2 className="text-2xl font-black text-white mb-4">Story Content</h2>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Section Title</label>
                     <input type="text" value={data.about.title} onChange={e => updateAbout('title', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Highlight Quote</label>
                     <input type="text" value={data.about.quote} onChange={e => updateAbout('quote', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Main Description (Use **text** for bolding)</label>
                     <textarea value={data.about.description} onChange={e => updateAbout('description', e.target.value)} rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none" />
                   </div>
                   
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Bullet Points</label>
                     <div className="space-y-3">
                       {data.about.points.map((pt, i) => (
                         <input key={i} type="text" value={pt} onChange={e => updateAboutPoint(i, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                       ))}
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     {data.about.stats.map((stat, i) => (
                       <div key={i} className="space-y-2 p-4 border border-white/10 rounded-2xl bg-white/5">
                         <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Stat {i+1} Value / Label</label>
                         <input type="text" value={stat.value} onChange={e => updateAboutStat(i, 'value', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                         <input type="text" value={stat.label} onChange={e => updateAboutStat(i, 'label', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                       </div>
                     ))}
                   </div>
                </div>

                <div className="glass-premium rounded-3xl p-8 border border-white/5">
                   <h2 className="text-2xl font-black text-white mb-6">Story Images</h2>
                   <p className="text-sm text-white/40 mb-6">These images appear in the dynamic grid layout in the About section. Click an image to replace it via Cloudinary.</p>
                   
                   <div className="grid grid-cols-2 gap-4">
                     {data.about.images.map((img, i) => (
                       <div key={i} className={`group relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 ${i === 0 || i === 3 ? 'aspect-[5/7]' : 'aspect-square'}`}>
                          <img src={img} alt={`Story Image ${i}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button 
                              onClick={() => { setUploadingAboutIndex(i); aboutImageInputRef.current?.click(); }}
                              className="px-4 py-2 bg-primary text-bg-deep font-bold rounded-xl text-xs uppercase tracking-widest"
                            >
                              {uploading && uploadingAboutIndex === i ? "Uploading..." : "Replace"}
                            </button>
                          </div>
                       </div>
                     ))}
                   </div>
                   <input type="file" ref={aboutImageInputRef} className="hidden" accept="image/*" onChange={handleAboutImageUpload}/>
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl">
                <div className="glass-premium rounded-3xl p-8 border border-white/5 space-y-6">
                   <h2 className="text-2xl font-black text-white mb-2">Contact Integrations</h2>
                   <p className="text-white/40 text-sm mb-6">This controls where user inquiries are sent and your social links.</p>
                   
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Primary Email (Receives Contact Form)</label>
                     <input type="email" value={data.contact.email} onChange={e => updateContact('email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Discord Username / Tag</label>
                     <input type="text" value={data.contact.discord} onChange={e => updateContact('discord', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>

                   <hr className="border-white/10 my-8"/>
                   <h3 className="text-lg font-black text-white">Social Media Links</h3>
                   
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Twitter / X URL</label>
                     <input type="text" value={data.contact.socials.twitter} onChange={e => updateSocial('twitter', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Instagram URL</label>
                     <input type="text" value={data.contact.socials.instagram} onChange={e => updateSocial('instagram', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>
                   <div>
                     <label className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">GitHub / ArtStation URL</label>
                     <input type="text" value={data.contact.socials.github} onChange={e => updateSocial('github', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50" />
                   </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
