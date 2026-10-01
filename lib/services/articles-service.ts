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
    id: 'independence-day-2026',
    title: 'Hey, Amazing Nigerian: A Message of Hope on Independence Day',
    excerpt: 'Wherever you are reading this from, I want you to pause for a moment and think about Nigeria. Not just the country we complain about, but the country we are still capable of building.',
    content: `Hey, Amazing Nigerian,

Yes, you.

Wherever you are reading this from, I want you to pause for a moment and think about Nigeria. Not just the country we complain about, not just the challenges we face, but the country we still believe can become so much more.

Today, as Nigeria marks another year of independence, I find myself thinking about the country we inherited, the country we experience today, and the country we are still capable of building.

Nigeria is not perfect. We know this because we live it.

We have seen difficult days. We have watched dreams get delayed by circumstances, young people leave home in search of opportunities, families make sacrifices, and ordinary Nigerians find extraordinary ways to keep going.

But somehow, we are still here.

Still dreaming.
Still creating.
Still serving.
Still choosing hope.

And that, to me, is one of the most beautiful things about being Nigerian.

As young people, we are often told that we are the leaders of tomorrow. But I believe tomorrow has been calling for us for a long time.

We are already leading.

Every Rotaractor who serves a community, supports a child, advocates for better health, contributes to the fight against polio, or simply chooses to make a difference is contributing to the Nigeria we hope to see.

Our Nigeria will not be built by wishing for a better country alone. It will be built by people who decide that their little corner must become better because they were there.

That is why I am proud to serve alongside high spirited young Nigerians across District 9126.

And maybe sometimes we wonder, “What difference can we really make?”

Maybe we cannot fix everything.

But we can improve something.
We can reach someone.
We can open a door.
We can serve a community.
We can leave things better than we met them.

And perhaps, one day, when we look back at this generation, I hope we will be able to say:

We did not just complain about Nigeria. We contributed to her becoming better.

Today, I celebrate Nigeria, not because everything is perfect, but because I still believe she is worth believing in.

I believe in the Nigerian who wakes up every morning and tries again.
I believe in the young person building something from almost nothing.
I believe in the woman carrying an entire family on her shoulders.
I believe in the teacher, the healthcare worker, the entrepreneur, the farmer, the student, the volunteer and every ordinary citizen quietly doing their part.

And I believe in us.

May we never become so frustrated by what is wrong that we forget our capacity to make something right.

And may our generation be remembered not only for what we inherited, but for what we chose to change.

Nigeria, we are still here.
And we are still believing.

HAPPY INDEPENDENCE DAY! 🇳🇬

Signed:
Rtr. Adaramoye Iyanuoluwa AdukeAdee, PHF
District Rotaract Representative
Rotaract District 9126 🇳🇬
drr9126.2627@gmail.com`,
    category: 'Announcements',
    date: 'Oct 1, 2026',
    readTime: '4 min read',
    author: {
      name: 'Rtr. Adaramoye Iyanuoluwa AdukeAdee, PHF',
      image: '/images/leaders/drr-adaramoye-iyanuoluwa.jpg',
      role: 'District Rotaract Representative',
    },
    image: '/images/blog/independence-day-2026.png',
    tags: ['#IndependenceDay', '#Nigeria', '#Hope', '#District9126'],
    featured: true,
  },
  {
    id: 'district-league-september-2026',
    title: 'District League: Top 3 Clubs of September - Celebrating Excellence, Consistency & Impact',
    excerpt: 'Celebrating our top-performing clubs for the month of September in the Rotaract District 9126 League. Get live updates and see how your club is performing.',
    content: `DISTRICT LEAGUE - TOP 3 CLUBS OF SEPTEMBER
Celebrating Excellence, Consistency & Impact

Here are the top performing clubs in Rotaract District 9126 for the month of September:

01. ROTARACT CLUB OF ILORIN GRA (1st Place)
02. ROTARACT E-CLUB OF HARMONY (2nd Place)
03. ROTARACT E-CLUB OF IBADAN PACESETTER (3rd Place)

Keep Serving! Keep Leading! Keep Winning!

Here’s the link to get live updates and see how your club is performing in the District League:
https://docs.google.com/spreadsheets/d/1JvV_LWH4MkOnkrTUsNf9oGVx9GuYu-cSGmjUA8nUXk0/`,
    category: 'District News',
    date: 'Oct 1, 2026',
    readTime: '2 min read',
    author: {
      name: 'District Evaluation Committee',
      image: '/images/leaders/leader-secretary-faleye.jpg',
      role: 'Rotaract District 9126 Secretariat',
    },
    image: '/images/blog/district-league-september-2026.png',
    tags: ['#DistrictLeague', '#TopClubs', '#September2026', '#Recognition'],
    featured: false,
  },
  {
    id: 'welcome-to-october-2026',
    title: 'Happy New Month: September Milestones, Q2 Kickoff & World Polio Day Charge',
    excerpt: 'In September, we recorded 21 projects, 2,513 beneficiaries reached, ₦799,750 spent, 666.45 volunteer hours, and chartered the Rotaract Club of Ibadan Titans. October marks the beginning of Q2.',
    content: `01.10.2026

ROTARY INTERNATIONAL DISTRICT 9126,
OFFICE OF THE DISTRICT ROTARACT REPRESENTATIVE,
ROTARACT DISTRICT 9126 🇳🇬

HAPPY NEW MONTH, ROTARACT DISTRICT 9126,

As we step into a new month, I find myself reflecting with gratitude on how far we have come.

Every laughter shared, project executed, every hour volunteered, every contribution made, and every life touched in September is a proof that small acts of service can create meaningful change.

I am proud of what our clubs have accomplished, and even more excited about what lies ahead. In September, we recorded:

• 21 PROJECTS EXECUTED
• 2,513 BENEFICIARIES REACHED
• ₦799,750 SPENT ON PROJECTS
• 666.45 MAN-HOURS VOLUNTEERED
• $318 / ₦426,756 DONATED TO THE ROTARY FOUNDATION

And remarkably, the Charter of the third Rotaract Club of the Year, Rotaract Club of Ibadan Titans.

Behind these numbers are Rotaractors who chose to show up, serve, give, lead and make a difference. And most importantly, they chose to document the impact. Thank you for making September count.

Now, October is here and it marks the beginning of the second quarter of the Rotary Year 2026/2027.

We begin this quarter with our District Assembly, creating an opportunity to reset, refire and prepare for greater impact. We will also launch the Rotaract District 9126 website, taking another step towards a more connected, accessible and visible District.

October also brings World Polio Day on 24 October, giving us another opportunity to contribute to Rotary’s effort to End Polio Now. Remember that "no child is safe until every child is safe".

Hence, I am challenging every club in District 9126 to do at least ONE tangible thing for End Polio Now this month. 

One club. One action. One more step towards a polio-free world.

And when you take action, document it and share your impact. Let us fill October with visible Rotaract action for #EndPolioNow.

Beyond polio, I am asking every club and every Rotaractor to step up this quarter. Plan boldly. Serve intentionally. Collaborate actively. Document our impact.

September showed us what we can do. October gives us another opportunity to do even more.

Happy New Month 🥳

Signed:
Rtr. Faleye Ifeoluwa
District Secretary 
rotaractdistrict9126.2026.2027@gmail.com

For:
Rtr. Adaramoye Iyanuoluwa AdukeAdee, PHF
District Rotaract Representative
Rotaract District 9126 🇳🇬
drr9126.2627@gmail.com`,
    category: 'Impact Reports',
    date: 'Oct 1, 2026',
    readTime: '4 min read',
    author: {
      name: 'Rtr. Faleye Ifeoluwa',
      image: '/images/leaders/leader-secretary-faleye.jpg',
      role: 'District Secretary',
    },
    image: '/images/blog/october-new-month-message.png',
    tags: ['#NewMonth', '#ImpactReport', '#EndPolioNow', '#October2026'],
    featured: false,
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
      // If Firestore has old mock data, use the canonical initial articles
      const hasNewArticles = list.some((a) => a.id === 'independence-day-2026');
      if (!hasNewArticles) {
        list = INITIAL_ARTICLES;
      }
    } else {
      list = INITIAL_ARTICLES;
    }

    return list.filter((article) => {
      const matchCat = !filter?.category || filter.category === 'All' || article.category === filter.category;
      const matchSearch =
        !filter?.search ||
        article.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(filter.search.toLowerCase());
      return matchCat && matchSearch;
    });
  } catch (error) {
    console.warn('Failed to load articles from Firestore, using initial fallback dataset:', error);
    let list = INITIAL_ARTICLES;
    if (filter?.category && filter.category !== 'All') {
      list = list.filter((a) => a.category === filter.category);
    }
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(s) || a.excerpt.toLowerCase().includes(s));
    }
    return list;
  }
}

/**
 * Fetch a single blog article by ID
 */
export async function getArticleById(id: string): Promise<ArticleItem | null> {
  try {
    const docRef = doc(db, 'articles', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ArticleItem;
    }
    return INITIAL_ARTICLES.find((a) => a.id === id) || null;
  } catch (error) {
    return INITIAL_ARTICLES.find((a) => a.id === id) || null;
  }
}
