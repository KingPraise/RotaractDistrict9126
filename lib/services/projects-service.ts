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
    id: 'proj-osogbo-maternal-wellness',
    title: 'Maternal Wellness Outreach & PHC Support',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Osogbo (with Rotary Club of Osogbo Central)',
    location: 'Primary Health Center, Gbonmi, Oke-Baale, Osogbo, Osun State',
    image: '/images/projects/osogbo-maternal-wellness.jpg',
    description: 'Strengthening maternal care through prenatal health education, donation of Maternal Wellness Kits to pregnant women, and provision of essential medical diagnostic equipment to Primary Health Centres.',
    status: 'Completed',
    progress: 100,
    statNumber: '150+',
    statLabel: 'Maternal Kits Distributed',
    stats: [
      { icon: 'heart', value: '150+', label: 'Mothers Supported' },
      { icon: 'zap', value: 'PHC Gbonmi', label: 'Health Centre Reached' },
      { icon: 'pin', value: 'Osogbo', label: 'Osun State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-lead-city-phc-survey',
    title: 'Primary Health Centres (PHC) Assessment & Outreach',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract Club of Lead City University',
    location: 'Foko PHC (UCH), Odo Ona Elewe PHC & Adaramagbo PHC, Oyo State',
    image: '/images/projects/lead-city-phc-team.jpg',
    description: 'Comprehensive baseline survey and medical outreach assessment across 3 Primary Health Centres to supply delivery packs, prenatal support, and health education to over 170 pregnant women attending antenatal clinics weekly.',
    status: 'Completed',
    progress: 100,
    statNumber: '3 PHCs',
    statLabel: 'Centres Surveyed',
    stats: [
      { icon: 'heart', value: '170+', label: 'Antenatal Mothers' },
      { icon: 'book', value: '3 Centres', label: 'PHCs Assessed' },
      { icon: 'pin', value: 'Oluyole LG', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-agbale-ede-execution',
    title: 'Maternal Delivery Care & Baby Supplies Outreach',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract & Rotary Club of Agbale Ede',
    location: 'Platinum Embassy Hospital, Owode Road, Ede, Osun State',
    image: '/images/projects/agbale-ede-maternal-execution.jpg',
    description: 'Direct humanitarian project execution providing newborn baby delivery supply packs, maternal hygiene kits, and financial care assistance to nursing mothers and families in Ede community.',
    status: 'Completed',
    progress: 100,
    statNumber: '80+',
    statLabel: 'Mothers & Infants',
    stats: [
      { icon: 'heart', value: '80+', label: 'Families Benefiting' },
      { icon: 'zap', value: 'Delivery Kits', label: 'Supplies Donated' },
      { icon: 'pin', value: 'Ede', label: 'Osun State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-atiba-virtual-health',
    title: 'Healthy Beginnings: Virtual Maternal & Child Health Session',
    category: 'Healthcare',
    year: '2026',
    club: 'Rotaract Club of Atiba University Oyo',
    location: 'Atiba University / Virtual Outreach',
    image: '/images/projects/atiba-virtual-health.jpg',
    description: 'Specialized health awareness session featuring nursing professionals covering antenatal care, exclusive breastfeeding, maternal nutrition, danger signs in pregnancy, and childhood immunization myths.',
    status: 'Completed',
    progress: 100,
    statNumber: '250+',
    statLabel: 'Attendees & Learners',
    stats: [
      { icon: 'book', value: '250+', label: 'Session Attendees' },
      { icon: 'zap', value: 'Google Meet', label: 'Virtual Platform' },
      { icon: 'pin', value: 'Atiba Uni', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-new-dawn-maternal',
    title: 'Maternal & Child Health Awareness & Relief Drive',
    category: 'Maternal & Child Health',
    year: '2026',
    club: 'Rotaract E-Club of Nigeria New Dawn',
    location: 'ABUAD PTS Premises, Afe Babalola University',
    image: '/images/projects/new-dawn-maternal-health.jpg',
    description: 'Community health education, sanitary pad distribution, and long-lasting insecticidal mosquito net distribution for mothers and children to combat malaria and promote maternal wellness.',
    status: 'Completed',
    progress: 100,
    statNumber: '300+',
    statLabel: 'Pads & Nets Distributed',
    stats: [
      { icon: 'heart', value: '300+', label: 'Pads & Nets' },
      { icon: 'zap', value: 'Health Talk', label: 'Clinical Guidance' },
      { icon: 'pin', value: 'ABUAD PTS', label: 'Ekiti State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-oyo-central-phc',
    title: 'Primary Health Community Sensitization & Vitals Screening',
    category: 'Community Service',
    year: '2026',
    club: 'Rotaract Club of Oyo Central',
    location: 'Oyo Town, Oyo State',
    image: '/images/projects/oyo-central-phc-outreach.jpg',
    description: 'Grassroots community mobilization and healthcare assistance outreach with nursing students and Rotaractors conducting blood pressure, sugar level screenings, and maternal education in local town centres.',
    status: 'Completed',
    progress: 100,
    statNumber: '200+',
    statLabel: 'Residents Screened',
    stats: [
      { icon: 'users', value: '200+', label: 'Citizens Reached' },
      { icon: 'heart', value: 'Free Vitals', label: 'Clinical Checks' },
      { icon: 'pin', value: 'Oyo Central', label: 'Oyo State' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-ilorin-gra-four-way-test',
    title: 'The 4-Way Test Presentation & Maternal Health Outreach',
    category: 'Peacebuilding',
    year: '2026',
    club: 'Rotaract Club of Ilorin GRA',
    location: 'Ilorin, Kwara State',
    image: '/images/projects/ilorin-gra-four-way-test.jpg',
    description: 'High-level peacebuilding and ethical leadership outreach promoting the Rotary 4-Way Test alongside maternal wellness packs and healthcare supplies distribution to local community healthcare beneficiaries.',
    status: 'Completed',
    progress: 100,
    statNumber: '120+',
    statLabel: 'Community Members Reached',
    stats: [
      { icon: 'leaf', value: '4-Way Test', label: 'Ethical Leadership' },
      { icon: 'heart', value: '120+', label: 'Beneficiaries' },
      { icon: 'pin', value: 'Ilorin GRA', label: 'Kwara State' }
    ],
    createdAt: new Date().toISOString()
  }
];

const STORAGE_KEY = 'district_9126_projects_db_v3';
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
    const parsed = JSON.parse(raw);
    // If cache has old initial project IDs or mismatched titles, refresh with latest official INITIAL_PROJECTS
    const hasOldData = Array.isArray(parsed) && (
      parsed.some((p: any) => p.id === 'proj-1' || p.id === 'proj-smart-school' || p.id === 'proj-soft-skills' || p.id === 'proj-abiamo')
    );
    if (hasOldData || !Array.isArray(parsed) || parsed.length < INITIAL_PROJECTS.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return parsed;
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
