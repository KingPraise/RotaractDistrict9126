'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/services/newsletter-service';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements';
  date: string;
  readTime: string;
  author: {
    name: string;
    image: string;
  };
  image: string;
  tags: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2,500 Families Vaccinated as District 9126 Launches Largest Health Drive in Its History',
    excerpt: 'A coalition of 14 clubs across seven states converged at six simultaneous sites to administer vaccines and conduct screenings, setting a new district record for single-day outreach participation.',
    category: 'Impact Reports',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Tunde Adeyemi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1621353880071-4752fa42cbc7?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Healthcare', '#Outreach', '#Record'],
    featured: true
  },
  {
    id: '2',
    title: 'District Leadership Summit 2026 Draws 400+ Rotaractors From Across the Region',
    excerpt: 'Three days of high-intensity workshops, panel discussions with global Rotary leaders, and cross-club networking redefined what collaboration looks like for the next generation.',
    category: 'Events',
    date: 'Jul 12, 2026',
    readTime: '4 min read',
    author: {
      name: 'Funmi Olatunde',
      image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Leadership', '#Summit2026']
  },
  {
    id: '3',
    title: 'How One Borehole Transformed a Village of 3,000 in Rural Kwara State',
    excerpt: 'Access to clean potable water reduced waterborne illness rates by 70% in under six months, according to independent data from the local primary health centre.',
    category: 'Community Stories',
    date: 'Jul 05, 2026',
    readTime: '5 min read',
    author: {
      name: 'Bayo Alabi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1611502029437-54521b5e6ada?w=1200&h=800&fit=crop&auto=format',
    tags: ['#WASH', '#KwaraState']
  },
  {
    id: '4',
    title: '70 New Members Inducted Across 12 Campus Clubs in Unprecedented Orientation Drive',
    excerpt: 'Universities and polytechnics across District 9126 witnessed record turnout as student leaders joined the global Rotary family during the annual New Member Induction Month.',
    category: 'District News',
    date: 'Jun 28, 2026',
    readTime: '3 min read',
    author: {
      name: 'Amaka Eze',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Induction', '#CampusClubs']
  },
  {
    id: '5',
    title: 'District 9126 Restores and Re-stocks Central Community Library with 2,000 Books',
    excerpt: 'A 10-week joint project between four clubs delivered freshly painted learning spaces, high-speed internet access points, and modern reference materials for secondary students.',
    category: 'Community Stories',
    date: 'Jun 25, 2026',
    readTime: '4 min read',
    author: {
      name: 'Kunle Adeleke',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Education', '#Library']
  },
  {
    id: '6',
    title: 'Free Cataract Surgeries Restores Sight to 80 Elderly Residents in Ogbomoso',
    excerpt: 'In partnership with specialist ophthalmologists, Rotaract volunteers coordinated pre-screenings, transportation, and post-operative care for beneficiaries across three local governments.',
    category: 'Impact Reports',
    date: 'Jun 22, 2026',
    readTime: '4 min read',
    author: {
      name: 'Seun Adegoke',
      image: 'https://images.unsplash.com/photo-1609371497456-3a55a205d5eb?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1621353880594-70b5fd44ecb3?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Healthcare', '#Ogbomoso']
  },
  {
    id: '7',
    title: 'District 9126 Receives Continental Award for Outstanding Community Service',
    excerpt: 'Rotary International recognizes District 9126 for high-impact youth programs and the successful completion of the multi-state borehole campaign.',
    category: 'Announcements',
    date: 'Jun 18, 2026',
    readTime: '2 min read',
    author: {
      name: 'Sola Adebayo',
      image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1561489396-888724a1543d?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Award', '#Excellence']
  },
  {
    id: '8',
    title: 'After-School STEM Programme Graduates Its First 120 Students',
    excerpt: 'Practical coding, robotics, and design curriculum delivered across three public secondary schools concludes with an exhibition and scholarship grant awards.',
    category: 'Community Stories',
    date: 'Jun 14, 2026',
    readTime: '5 min read',
    author: {
      name: 'Dapo Olawale',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1632932693914-89b90ae3d16d?w=1200&h=800&fit=crop&auto=format',
    tags: ['#STEM', '#Youth']
  },
  {
    id: '9',
    title: 'Rotaract Mental Health Week 2026 Generates 20,000 Impressions Across Social Media',
    excerpt: 'Workshops, live Q&A sessions with clinical psychologists, and peer-support circles provided accessible wellness toolkits to hundreds of young Nigerians.',
    category: 'Events',
    date: 'Jun 08, 2026',
    readTime: '3 min read',
    author: {
      name: 'Zainab Bello',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop&auto=format',
    tags: ['#MentalHealth', '#Wellness']
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<{ success: boolean; message: string } | null>(null);

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
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];
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
