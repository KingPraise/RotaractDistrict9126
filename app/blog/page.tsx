'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, ArrowRight } from 'lucide-react';

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
    tags: ['#Summit', '#Leadership']
  },
  {
    id: '3',
    title: '10,000 Trees in 10 Weeks: The Green Ibadan Initiative Crosses Its Midpoint',
    excerpt: 'What started as an ambitious pledge by six clubs in April has become a district-wide movement, with over 22 clubs now participating in weekend planting drives across the seven states.',
    category: 'Impact Reports',
    date: 'Jul 8, 2026',
    readTime: '5 min read',
    author: {
      name: 'Yetunde Balogun',
      image: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Environment', '#GreenIbadan']
  },
  {
    id: '4',
    title: 'From Iwo Road to Agodi: How One Club Rebuilt a Primary School Library',
    excerpt: 'The Rotaract Club of Ibadan Iwo Road spent eight months fundraising, sourcing books, and training teachers — a story of persistence that district leaders are calling a model for replication.',
    category: 'Community Stories',
    date: 'Jul 3, 2026',
    readTime: '7 min read',
    author: {
      name: 'Kayode Faleye',
      image: 'https://images.unsplash.com/photo-1631824925667-28632e135463?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Education', '#Literacy']
  },
  {
    id: '5',
    title: 'Meet the Class of 2026: 47 New Rotaractors Inducted Across Seven Clubs',
    excerpt: 'Clubs across Oyo, Osun, and Kwara welcome new members into the global Rotary family during simultaneous mid-year induction ceremonies.',
    category: 'District News',
    date: 'Jun 28, 2026',
    readTime: '3 min read',
    author: {
      name: 'Gbemisola Awoyemi',
      image: 'https://images.unsplash.com/photo-1697063882499-f7fca7d2d713?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1652664845183-c6083bc286fc?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Induction', '#Membership']
  },
  {
    id: '6',
    title: 'Health Screening Camp in Ogbomoso Reaches 680 Residents in a Single Weekend',
    excerpt: 'Comprehensive hypertension, blood glucose, and dental screenings provided free to rural families in partnership with university teaching hospitals.',
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
    excerpt: 'Webinars, support spaces, and daily mental well-being guides break stigmas and connect students to professional counselling hotlines.',
    category: 'District News',
    date: 'Jun 9, 2026',
    readTime: '4 min read',
    author: {
      name: 'Omotola Idowu',
      image: 'https://images.unsplash.com/photo-1659422440915-d516c6dc932e?w=80&h=80&fit=crop&auto=format'
    },
    image: 'https://images.unsplash.com/photo-1627931539006-d5c4677e05ea?w=1200&h=800&fit=crop&auto=format',
    tags: ['#MentalHealth', '#Advocacy']
  }
];

const categoryBadgeStyles: Record<string, { bg: string; text: string }> = {
  'Impact Reports': { bg: 'rgba(152, 17, 50, 0.1)', text: 'rgb(152, 17, 50)' },
  Events: { bg: 'rgba(37, 99, 235, 0.1)', text: 'rgb(29, 78, 216)' },
  'Community Stories': { bg: 'rgba(109, 40, 217, 0.1)', text: 'rgb(109, 40, 217)' },
  'District News': { bg: 'rgba(152, 17, 50, 0.1)', text: 'rgb(152, 17, 50)' },
  Announcements: { bg: 'rgba(5, 150, 105, 0.1)', text: 'rgb(5, 150, 105)' }
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Impact Reports', 'Events', 'Community Stories', 'District News', 'Announcements'];

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

      <main className="min-h-screen pt-[100px] pb-20">
        
        {/* HEADER & SEARCH */}
        <section className="px-6 lg:px-10 pb-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            <div className="flex flex-col gap-3">
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
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm bg-white border border-black/10 text-[#1C1C1E] placeholder-gray-400 outline-none focus:border-[#981132] transition-colors font-sans"
              />
            </div>

          </div>
        </section>

        {/* CATEGORY FILTER PILLS */}
        <section className="px-6 lg:px-10 pb-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap uppercase tracking-wider text-xs transition-all font-sans ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#D91B5C] to-[#A70C43] text-white shadow-[0_0_16px_rgba(217,27,92,0.35)]'
                    : 'bg-white/80 border border-black/10 text-gray-700 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="shrink-0 h-6 w-px bg-black/10 mx-1" />
            <span className="shrink-0 text-[10px] text-gray-500 font-medium font-sans">
              {filteredPosts.length} stories
            </span>
          </div>
        </section>

        <div className="px-6 lg:px-10 max-w-7xl mx-auto flex flex-col gap-12 pb-20">
          
          {/* STATS SUMMARY BAR */}
          <div 
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
          </div>

          {/* FEATURED EDITORIAL HERO STORY */}
          {selectedCategory === 'All' && !searchQuery && (
            <article className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-[#0A111E] shadow-xl border border-white/10 group">
              <div className="flex flex-col lg:flex-row h-full min-h-[480px]">
                
                {/* Image Section */}
                <div className="relative overflow-hidden lg:w-[60%] h-64 lg:h-auto shrink-0">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#080C14]/40 to-transparent" />
                </div>

                {/* Content Section */}
                <div 
                  className="flex flex-col justify-between p-7 lg:p-10 flex-1"
                  style={{ background: 'linear-gradient(135deg, rgb(10, 17, 30) 0%, rgb(8, 12, 20) 100%)' }}
                >
                  <div className="flex flex-col gap-5">
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase self-start font-sans"
                      style={{ background: categoryBadgeStyles[featuredPost.category]?.bg, color: categoryBadgeStyles[featuredPost.category]?.text }}
                    >
                      {featuredPost.category}
                    </span>

                    <h2 className="text-white font-extrabold text-xl lg:text-2xl leading-tight tracking-tight font-sans">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wide bg-white/5 text-white/40 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Read Time Footer */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredPost.author.image} 
                        alt={featuredPost.author.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#981132]/30"
                      />
                      <div className="flex flex-col leading-none gap-0.5">
                        <span className="text-[11px] font-semibold text-[#D91B5C] font-sans">
                          {featuredPost.author.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-sans">
                          <span>{featuredPost.date}</span>
                          <span>·</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#D91B5C] font-bold text-xs group-hover:translate-x-1 transition-transform font-sans">
                      <span>Read Story</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                </div>

              </div>
            </article>
          )}

          {/* 2-COLUMN HIGHLIGHT GRID */}
          {secondaryPosts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {secondaryPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group bg-white border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden shrink-0 pb-[58%]">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-4">
                      <span 
                        className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md font-sans"
                        style={{ background: categoryBadgeStyles[post.category]?.bg, color: categoryBadgeStyles[post.category]?.text }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-sans">
                      <span className="text-[#981132] font-semibold">{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-base text-[#111111] leading-snug group-hover:text-[#981132] transition-colors font-sans">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 font-sans">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.07]">
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.author.image} 
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#981132]/30"
                        />
                        <span className="text-[10px] text-gray-700 font-medium font-sans">
                          {post.author.name}
                        </span>
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-[#981132] transition-all" size={13} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* DIVIDER */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/[0.08]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D91B5C] font-semibold font-sans">
              More Stories
            </span>
            <div className="h-px flex-1 bg-black/[0.08]" />
          </div>

          {/* 3-COLUMN MASONRY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <article 
                key={post.id} 
                className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group bg-white border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative overflow-hidden shrink-0 pb-[58%]">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-4">
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md font-sans"
                      style={{ background: categoryBadgeStyles[post.category]?.bg, color: categoryBadgeStyles[post.category]?.text }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-sans">
                    <span className="text-[#981132] font-semibold">{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-sm text-[#111111] leading-snug group-hover:text-[#981132] transition-colors font-sans">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.07]">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.author.image} 
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#981132]/30"
                      />
                      <span className="text-[10px] text-gray-700 font-medium font-sans">
                        {post.author.name}
                      </span>
                    </div>
                    <ArrowRight className="text-gray-400 group-hover:text-[#981132] transition-all" size={13} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* NEWSLETTER SUBSCRIPTION CTA */}
          <div 
            className="relative rounded-2xl overflow-hidden px-8 py-12 text-center text-white"
            style={{ background: 'rgb(152, 17, 50)' }}
          >
            <div className="relative max-w-md mx-auto">
              <h3 className="text-2xl font-black mb-2 font-sans">
                Stay in the Loop
              </h3>
              <p className="text-xs text-white/80 mb-6 leading-relaxed font-sans">
                Get the latest impact reports, club spotlights, and district news delivered to your inbox every fortnight.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl outline-none text-sm bg-white/15 border border-white/30 text-white placeholder-white/50 font-sans"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-[#981132] whitespace-nowrap transition-transform hover:scale-105 active:scale-95 font-sans"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
