import { db } from '@/lib/firebase/client';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'Impact Reports' | 'Events' | 'Community Stories' | 'District News' | 'Announcements';
  date: string;
  readTime: string;
  author: {
    name: string;
    image: string;
    role?: string;
  };
  image: string;
  tags: string[];
  featured?: boolean;
  viewsCount?: number;
  createdAt?: string;
}

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: '2,500 Families Vaccinated as District 9126 Launches Largest Health Drive in Its History',
    excerpt: 'A coalition of 14 clubs across seven states converged at six simultaneous sites to administer vaccines and conduct screenings, setting a new district record for single-day outreach participation.',
    category: 'Impact Reports',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Tunde Adeyemi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
      role: 'District Public Image Committee'
    },
    image: 'https://images.unsplash.com/photo-1621353880071-4752fa42cbc7?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Healthcare', '#Outreach', '#Record'],
    featured: true,
  },
  {
    id: 'art-2',
    title: 'District Leadership Summit 2026 Draws 400+ Rotaractors From Across the Region',
    excerpt: 'Three days of high-intensity workshops, panel discussions with global Rotary leaders, and cross-club networking redefined what collaboration looks like for the next generation.',
    category: 'Events',
    date: 'Jul 12, 2026',
    readTime: '4 min read',
    author: {
      name: 'Funmi Olatunde',
      image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format',
      role: 'Summit Chair'
    },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Summit', '#Leadership'],
  },
  {
    id: 'art-3',
    title: '10,000 Trees in 10 Weeks: The Green Ibadan Initiative Crosses Its Midpoint',
    excerpt: 'What started as an ambitious pledge by six clubs in April has become a district-wide movement, with over 22 clubs now participating in weekend planting drives across the seven states.',
    category: 'Impact Reports',
    date: 'Jul 8, 2026',
    readTime: '5 min read',
    author: {
      name: 'Yetunde Balogun',
      image: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&h=80&fit=crop&auto=format',
      role: 'Environment Lead'
    },
    image: 'https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Environment', '#GreenIbadan'],
  },
  {
    id: 'art-4',
    title: 'From Iwo Road to Agodi: How One Club Rebuilt a Primary School Library',
    excerpt: 'The Rotaract Club of Ibadan Iwo Road spent eight months fundraising, sourcing books, and training teachers — a story of persistence that district leaders are calling a model for replication.',
    category: 'Community Stories',
    date: 'Jul 3, 2026',
    readTime: '7 min read',
    author: {
      name: 'Kayode Faleye',
      image: 'https://images.unsplash.com/photo-1631824925667-28632e135463?w=80&h=80&fit=crop&auto=format',
      role: 'Literacy Director'
    },
    image: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Education', '#Literacy'],
  },
  {
    id: 'art-5',
    title: 'Meet the Class of 2026: 47 New Rotaractors Inducted Across Seven Clubs',
    excerpt: 'Clubs across Oyo, Osun, and Kwara welcome new members into the global Rotary family during simultaneous mid-year induction ceremonies.',
    category: 'District News',
    date: 'Jun 28, 2026',
    readTime: '3 min read',
    author: {
      name: 'Gbemisola Awoyemi',
      image: 'https://images.unsplash.com/photo-1697063882499-f7fca7d2d713?w=80&h=80&fit=crop&auto=format',
      role: 'Membership Chair'
    },
    image: 'https://images.unsplash.com/photo-1652664845183-c6083bc286fc?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Induction', '#Membership'],
  },
  {
    id: 'art-6',
    title: 'District 9126 Receives Continental Award for Outstanding Community Service',
    excerpt: 'Rotary International recognizes District 9126 for high-impact youth programs and the successful completion of the multi-state borehole campaign.',
    category: 'Announcements',
    date: 'Jun 18, 2026',
    readTime: '2 min read',
    author: {
      name: 'Sola Adebayo',
      image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=80&h=80&fit=crop&auto=format',
      role: 'District Executive Secretary'
    },
    image: 'https://images.unsplash.com/photo-1561489396-888724a1543d?w=1200&h=800&fit=crop&auto=format',
    tags: ['#Award', '#Excellence'],
  },
];

/**
 * Fetch articles from Firestore or default dataset with category and keyword search
 */
export async function getBlogArticles(filter?: {
  category?: string;
  search?: string;
}): Promise<ArticleItem[]> {
  try {
    const articlesRef = collection(db, 'articles');
    const snapshot = await getDocs(articlesRef);

    let list: ArticleItem[] = [];
    if (!snapshot.empty) {
      list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as ArticleItem[];
    } else {
      list = INITIAL_ARTICLES;
    }

    return list.filter((article) => {
      const matchCat = !filter?.category || filter.category === 'All' || article.category === filter.category;
      const matchSearch =
        !filter?.search ||
        article.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(filter.search.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(filter.search!.toLowerCase()));

      return matchCat && matchSearch;
    });
  } catch (err) {
    console.warn('Fallback to local articles dataset:', err);
    return INITIAL_ARTICLES;
  }
}

/**
 * Fetch a single blog article by its ID
 */
export async function getArticleById(id: string): Promise<ArticleItem | null> {
  try {
    const docRef = doc(db, 'articles', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ArticleItem;
    }
  } catch {
    // Fallback search
  }
  return INITIAL_ARTICLES.find((a) => a.id === id) || null;
}
