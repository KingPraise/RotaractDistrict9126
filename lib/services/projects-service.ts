'use client';

import { db } from '@/lib/firebase/client';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  club: string;
  location: string;
  image: string;
  height?: string;
  description?: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  progress: number;
  statNumber?: string;
  statLabel?: string;
  stats?: Array<{ icon: string; value: string; label: string }>;
  createdAt?: string;
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-smart-school',
    title: 'Smart School Makeover Project',
    category: 'Education',
    year: '2026',
    club: 'District 9126 Executive Initiative',
    location: 'District-wide (7 States)',
    image: '/images/projects/smart-school-makeover.jpg',
    description: 'Transforming secondary schools into modern learning hubs by refurbishing classrooms, providing brand new furniture, and installing a state-of-the-art computer lab with high-speed internet access alongside mentorship and digital literacy programs.',
    status: 'In Progress',
    progress: 65,
    statNumber: '500+',
    statLabel: 'Students Empowered',
    stats: [
      { icon: 'book', value: '500+', label: 'Students Benefiting' },
      { icon: 'zap', value: '₦6.5M', label: 'Total Investment' },
      { icon: 'pin', value: 'Lab + Classrooms', label: 'Facilities Refurbished' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-soft-skills',
    title: 'Acquire a Soft Skill Scholarship',
    category: 'Empowerment',
    year: '2026',
    club: 'District 9126 Human Capital Dev',
    location: 'Virtual / District 9126',
    image: '/images/projects/soft-skills-scholarship.jpg',
    description: 'Sponsoring 100 Rotaractors across 7 states to enroll in paid professional soft skill and tech courses on AQSkill with dedicated mentorship and tracking to enhance youth employability and entrepreneurial capacity.',
    status: 'In Progress',
    progress: 78,
    statNumber: '100',
    statLabel: 'Scholarships Awarded',
    stats: [
      { icon: 'users', value: '100', label: 'Rotaractors Sponsored' },
      { icon: 'zap', value: '₦700K', label: 'Scholarship Fund' },
      { icon: 'book', value: 'AQSkill', label: 'Learning Partner' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-abiamo',
    title: 'ABIAMO Maternal & Child Health Project',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Lead City & District Health Team',
    location: 'Odo Ona Elewe & Adaramagbo PHCs, Oyo State',
    image: '/images/projects/abiamo-maternal-health.jpg',
    description: 'Comprehensive maternal health intervention aimed at reducing maternal and under-5 mortality (SDG 3.1 & 3.2). Distributing delivery packs, providing antenatal supplies, and health education across Primary Health Centres.',
    status: 'In Progress',
    progress: 82,
    statNumber: '170+',
    statLabel: 'Mothers Supported',
    stats: [
      { icon: 'heart', value: '170+', label: 'Pregnant Women' },
      { icon: 'zap', value: '₦500K', label: 'Medical Grant' },
      { icon: 'pin', value: '3 PHCs', label: 'Health Facilities' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-shield',
    title: 'Project Shield: Cervical Cancer Prevention',
    category: 'Healthcare',
    year: '2026',
    club: 'Rotaract Club of Osogbo & District Healthcare Committee',
    location: 'Osogbo & South-West Communities',
    image: '/images/projects/project-shield-cancer.jpg',
    description: 'Combating cervical cancer through grassroots sensitization, HPV immunization for eligible young girls, and routine screening for women across underserved urban and rural communities.',
    status: 'In Progress',
    progress: 70,
    statNumber: '350+',
    statLabel: 'Screened & Vaccinated',
    stats: [
      { icon: 'heart', value: '350+', label: 'Women Screened' },
      { icon: 'zap', value: '₦700K', label: 'Project Outlay' },
      { icon: 'users', value: 'HPV Drive', label: 'Vaccination Campaign' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-enterprise-grant',
    title: 'Rotaract Enterprise Grant Initiative',
    category: 'Economic Development',
    year: '2026',
    club: 'District Vocational & Entrepreneurship Wing',
    location: 'District 9126 (7 States)',
    image: '/images/projects/enterprise-grant.jpg',
    description: 'Competitive business seed grant initiative empowering 8 outstanding Rotaractors (2 per quarter) with non-dilutive financial capital (₦250,000 each) and executive mentoring to launch and scale innovative ventures.',
    status: 'In Progress',
    progress: 50,
    statNumber: '8 Grants',
    statLabel: '₦2M Seed Capital',
    stats: [
      { icon: 'zap', value: '₦2.0M', label: 'Total Capital' },
      { icon: 'users', value: '8 Winners', label: 'Startups Funded' },
      { icon: 'pin', value: 'Quarterly', label: 'Cohort Cycles' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-4-way-test',
    title: "The 4-Way Test: A Compass for Life's Decision",
    category: 'Peacebuilding',
    year: '2026',
    club: 'District Executive Council & DRR Office',
    location: '7 States in District 9126',
    image: '/images/projects/district-strategic-docket-2.jpg',
    description: 'High-level advocacy, peacebuilding, and ethical leadership drive involving executive courtesy visits and the official presentation of Rotary 4-Way Test commemorative frames to all 7 First Ladies across District 9126.',
    status: 'In Progress',
    progress: 45,
    statNumber: '7 States',
    statLabel: 'First Ladies Reached',
    stats: [
      { icon: 'leaf', value: '7 States', label: 'First Ladies' },
      { icon: 'zap', value: '₦350K', label: 'Advocacy Outlay' },
      { icon: 'pin', value: 'Governance', label: 'Civic Alignment' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-100-acts',
    title: '100 Acts of Service Campaign',
    category: 'Community Service',
    year: '2026',
    club: '77 Chartered Clubs of District 9126',
    location: 'Across 77 Clubs',
    image: '/images/projects/100-acts-of-service.jpg',
    description: 'District-wide service mobilization encouraging Rotaractors across 77 clubs to execute and document 100 high-impact community acts — from charity visits to mentorship and cleanups, amplified by the District Media Team.',
    status: 'In Progress',
    progress: 88,
    statNumber: '100',
    statLabel: 'Impact Drives',
    stats: [
      { icon: 'heart', value: '100 Acts', label: 'Documented Impact' },
      { icon: 'users', value: '77 Clubs', label: 'Active Participation' },
      { icon: 'zap', value: '₦100K', label: 'Media Support' }
    ],
    createdAt: new Date().toISOString()
  }
];

const STORAGE_KEY = 'district_9126_projects_db';
const EVENT_NAME = 'district_9126_projects_updated';

// Get current projects from persistent storage or default
export function getStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

// Save a new project with Firestore sync & Local Storage cache
export function saveProject(project: Omit<ProjectItem, 'id' | 'createdAt'>): ProjectItem {
  const current = getStoredProjects();
  const id = `proj-${Date.now()}`;
  const createdAt = new Date().toISOString();

  const newProject: ProjectItem = {
    ...project,
    id,
    createdAt,
    statNumber: project.statNumber || (project.progress === 100 ? '100%' : `${project.progress}%`),
    statLabel: project.statLabel || 'Project Milestone'
  };

  const updated = [newProject, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_NAME));
  }

  // Background Firestore sync
  try {
    const projectRef = doc(db, 'projects', id);
    setDoc(projectRef, {
      ...newProject,
      createdAtServer: serverTimestamp(),
    }).catch((err) => console.warn('Firestore project write warning:', err));
  } catch (err) {
    console.warn('Firestore project write failed:', err);
  }

  return newProject;
}

// Update existing project
export function updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
  const current = getStoredProjects();
  let updatedItem: ProjectItem | null = null;
  const updated = current.map((p) => {
    if (p.id === id) {
      updatedItem = { ...p, ...updates };
      return updatedItem;
    }
    return p;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_NAME));
  }

  // Background Firestore update
  try {
    const projectRef = doc(db, 'projects', id);
    updateDoc(projectRef, {
      ...updates,
      updatedAtServer: serverTimestamp(),
    }).catch(() => {
      if (updatedItem) {
        setDoc(projectRef, updatedItem, { merge: true }).catch(() => {});
      }
    });
  } catch (err) {
    console.warn('Firestore project update warning:', err);
  }

  return updatedItem;
}

// Delete project
export function deleteProject(id: string): boolean {
  const current = getStoredProjects();
  const filtered = current.filter((p) => p.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event(EVENT_NAME));
  }

  // Background Firestore deletion
  try {
    const projectRef = doc(db, 'projects', id);
    deleteDoc(projectRef).catch((err) => console.warn('Firestore delete warning:', err));
  } catch (err) {
    console.warn('Firestore delete failed:', err);
  }

  return true;
}

// Subscribe to real-time project updates across components/tabs & Firestore
export function subscribeToProjects(callback: (projects: ProjectItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback(getStoredProjects());
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);

  // Firestore real-time snapshot subscription
  let unsubFirestore = () => {};
  try {
    const q = query(collection(db, 'projects'));
    unsubFirestore = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteItems = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as ProjectItem[];

          if (remoteItems.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteItems));
            callback(remoteItems);
          }
        }
      },
      (error) => {
        // Fallback to local
        console.info('Firestore project subscription notice:', error);
      }
    );
  } catch (err) {
    console.info('Firestore onSnapshot init notice:', err);
  }

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
    unsubFirestore();
  };
}
