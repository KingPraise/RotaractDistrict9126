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
    id: 'proj-1',
    title: 'Operation Vaccinate 500',
    category: 'Healthcare',
    year: '2026',
    club: 'Rotaract Club of LAUTECH',
    location: 'Ogbomoso, Oyo State',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=700&fit=crop&auto=format',
    description: 'Comprehensive mass immunization campaign targeting underserved pediatric communities across Ogbomoso and surrounding farm settlements.',
    status: 'Completed',
    progress: 100,
    statNumber: '500',
    statLabel: 'Children Vaccinated',
    stats: [
      { icon: 'heart', value: '500', label: 'Children Vaccinated' },
      { icon: 'users', value: '12', label: 'Medical Volunteers' },
      { icon: 'pin', value: '3', label: 'Communities Reached' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Clean Water for Offa',
    category: 'WASH',
    year: '2026',
    club: 'Rotaract Club of Offa',
    location: 'Offa, Kwara State',
    image: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?w=900&h=600&fit=crop&auto=format',
    description: 'Solar-powered borehole construction and water hygiene training providing clean potable water to over 1,200 rural households.',
    status: 'Completed',
    progress: 100,
    statNumber: '2',
    statLabel: 'Boreholes Constructed',
    stats: [
      { icon: 'droplets', value: '2', label: 'Boreholes Constructed' },
      { icon: 'users', value: '1,200', label: 'Beneficiaries' },
      { icon: 'zap', value: '₦480K', label: 'Community Investment' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'Digital Skills Academy',
    category: 'Education',
    year: '2026',
    club: 'Rotaract Club of Ibadan Central',
    location: 'Ibadan, Oyo State',
    image: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=900&h=700&fit=crop&auto=format',
    description: 'Intensive digital literacy, frontend coding, and product design bootcamps for underprivileged youth in Ibadan municipal hubs.',
    status: 'In Progress',
    progress: 68,
    statNumber: '2,400',
    statLabel: 'Youth Trained',
    stats: [
      { icon: 'users', value: '2,400', label: 'Youth Trained' },
      { icon: 'book', value: '8', label: 'Training Centres' },
      { icon: 'zap', value: '94%', label: 'Placement Rate' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-4',
    title: 'Green Ibadan Initiative',
    category: 'Environment',
    year: '2026',
    club: 'Rotaract Club of University of Ibadan',
    location: 'Ibadan, Oyo State',
    image: 'https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=900&h=600&fit=crop&auto=format',
    description: 'Afforestation and urban tree-planting exercise combating erosion and promoting environmental biodiversity across urban and campus zones.',
    status: 'In Progress',
    progress: 44,
    statNumber: '5,000',
    statLabel: 'Trees Planted',
    stats: [
      { icon: 'leaf', value: '5,000', label: 'Trees Planted' },
      { icon: 'users', value: '340', label: 'Volunteers' },
      { icon: 'pin', value: '7', label: 'Forest Zones' }
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
