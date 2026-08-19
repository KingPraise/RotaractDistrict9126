'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/services/newsletter-service';
import { getBlogArticles, INITIAL_ARTICLES, ArticleItem } from '@/lib/services/articles-service';

const categoryBadgeStyles: Record<string, { bg: string; text: string }> = {
  'Impact Reports': { bg: 'rgba(152, 17, 50, 0.1)', text: 'rgb(152, 17, 50)' },
  Events: { bg: 'rgba(37, 99, 235, 0.1)', text: 'rgb(29, 78, 216)' },
  'Community Stories': { bg: 'rgba(109, 40, 217, 0.1)', text: 'rgb(109, 40, 217)' },
  'District News': { bg: 'rgba(152, 17, 50, 0.1)', text: 'rgb(152, 17, 50)' },
  Announcements: { bg: 'rgba(5, 150, 105, 0.1)', text: 'rgb(5, 150, 105)' }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    getBlogArticles().then((fetched) => {
      if (fetched && fetched.length > 0) {
        setPosts(fetched);
      }
    });
  }, []);

  const categories = ['All', 'Impact Reports', 'Events', 'Community Stories', 'District News', 'Announcements'];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    setNewsletterStatus(null);

    const result = await subscribeNewsletter(newsletterEmail);
    setIsSubscribing(false);

    if (result.success) {
      setNewsletterStatus({
        success: true,
        message: result.message || 'Thank you for subscribing!',
      });
      setNewsletterEmail('');
    } else {
      setNewsletterStatus({
        success: false,
        message: result.error || 'Failed to subscribe. Please try again.',
      });
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const secondaryPosts = filteredPosts.filter(p => p.id !== featuredPost.id).slice(0, 2);
  const remainingPosts = filteredPosts.filter(p => p.id !== featuredPost.id).slice(2);

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#111111]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <main className="min-h-screen pt-[140px] sm:pt-[160px] pb-20">
        
        {/* HEADER & SEARCH */}
        <section className="px-6 lg:px-10 pb-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-1 h-8 rounded-full" 
                  style={{ background: 'linear-gradient(rgb(217, 27, 92), rgba(217, 27, 92, 0.3))' }} 
                />
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#D91B5C]">
                  District 9126 · News & Impact
                </span>
              </div>

              <h1 className="font-black tracking-tighter leading-none font-sans">
                <span className="block text-[clamp(2rem,4vw,3rem)] text-[#111111] leading-[1.1]">
                  Impact Blog &
                </span>
                <span 
                  className="block text-[clamp(1.2rem,2.4vw,1.85rem)] text-[#D4A520] leading-[1.2]"
                  style={{ textShadow: 'rgba(212, 165, 32, 0.25) 0px 0px 30px' }}
                >
                  News Hub
                </span>
              </h1>
            </motion.div>

            {/* Search Input */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative max-w-xs w-full"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm bg-white border border-black/10 text-[#1C1C1E] placeholder-gray-400 outline-none focus:border-[#981132] transition-colors font-sans"
              />
            </motion.div>

          </div>
        </section>

        {/* CATEGORY FILTER PILLS WITH SPRING ANIMATION */}
        <section className="px-6 lg:px-10 pb-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap uppercase tracking-wider text-xs transition-all font-sans cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'bg-white/80 border border-black/10 text-gray-700 hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="blogActiveCategoryPill"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D91B5C] to-[#A70C43] shadow-[0_0_16px_rgba(217,27,92,0.35)] -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}

            <div className="shrink-0 h-6 w-px bg-black/10 mx-1" />
            <span className="shrink-0 text-[10px] text-gray-500 font-medium font-sans">
              {filteredPosts.length} stories
            </span>
          </div>
        </section>

        <div className="px-6 lg:px-10 max-w-7xl mx-auto flex flex-col gap-12 pb-20">
          
          {/* STATS SUMMARY BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-sm"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-6 py-7 border-r border-black/[0.07]">
              <span className="text-3xl font-black text-[#D4A520] tracking-tight font-sans">180+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center font-semibold font-sans">
                Articles Published
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-6 py-7 border-r border-black/[0.07]">
              <span className="text-3xl font-black text-[#D4A520] tracking-tight font-sans">47</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center font-semibold font-sans">
                Club Spotlights
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-6 py-7 border-r border-black/[0.07]">
              <span className="text-3xl font-black text-[#D4A520] tracking-tight font-sans">23K+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center font-semibold font-sans">
                Monthly Readers
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-6 py-7">
              <span className="text-3xl font-black text-[#D4A520] tracking-tight font-sans">9</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center font-semibold font-sans">
                Categories
              </span>
            </div>
          </motion.div>

          {/* EDITORIAL HERO STORY */}
          {featuredPost && (
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-white border border-black/[0.08] shadow-lg cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Cover */}
                <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                </div>

                {/* Narrative Details */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white z-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#981132]/10 text-[#981132] border border-[#981132]/20 font-sans">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-gray-400 font-sans">{featuredPost.date}</span>
                      <span className="text-xs text-gray-400 font-sans">· {featuredPost.readTime}</span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#111111] leading-tight font-sans group-hover:text-[#981132] transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex gap-2 flex-wrap pt-2">
                      {featuredPost.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-400 font-sans font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-black/[0.06] mt-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.image}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#111111] font-sans">
                          {featuredPost.author.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-sans">Author</span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#981132] text-white flex items-center justify-center shadow-md transition-transform group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* 2-COLUMN HIGHLIGHT GRID */}
          {secondaryPosts.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {secondaryPosts.map((post, idx) => (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  key={post.id}
                  className="rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-md flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#981132] shadow-sm font-sans">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#111111] leading-snug font-sans group-hover:text-[#981132] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-3 flex items-center justify-between border-t border-black/[0.05]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-gray-800 font-sans">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#981132] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans">
                      Read Story <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </section>
          )}

          {/* 3-COLUMN MASONRY STORY GRID */}
          {remainingPosts.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#D91B5C] font-sans font-semibold">
                  Latest Dispatches
                </span>
                <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-[#D91B5C] to-transparent" />
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {remainingPosts.map((post, idx) => (
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      key={post.id}
                      className="rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#981132] font-sans">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col gap-2.5">
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h4 className="text-base font-bold text-[#111111] leading-snug font-sans group-hover:text-[#981132] transition-colors">
                            {post.title}
                          </h4>

                          <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-black/[0.05]">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-[11px] font-medium text-gray-700 font-sans">
                            {post.author.name}
                          </span>
                        </div>

                        <ArrowRight size={14} className="text-gray-400 group-hover:text-[#981132] group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {/* FORTNIGHTLY NEWSLETTER CTA */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-12 bg-gradient-to-r from-[#981132] via-[#A70C43] to-[#8B3A7A] text-white relative overflow-hidden shadow-xl"
          >
            <div className="max-w-2xl relative z-10 flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-rose-200 font-sans">
                Stay In The Loop
              </span>

              <h3 className="text-2xl lg:text-3xl font-black font-sans leading-tight">
                Subscribe to the District 9126 Fortnightly Impact Digest
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                Get project milestones, president spotlights, training registrations, and district events delivered directly to your inbox every two weeks.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-white/15 border border-white/25 text-white placeholder-white/60 text-xs sm:text-sm outline-none focus:bg-white/20 focus:border-white transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-7 py-3 rounded-full bg-white text-[#981132] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 font-sans cursor-pointer disabled:opacity-75"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>

              {newsletterStatus && (
                <p className={`text-xs mt-2 font-sans ${newsletterStatus.success ? 'text-green-200 font-semibold' : 'text-rose-200'}`}>
                  {newsletterStatus.message}
                </p>
              )}
            </div>

            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </motion.section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
