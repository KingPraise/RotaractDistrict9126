import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface NewsletterResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Subscribe an email address to the District 9126 Newsletter.
 * Saves to the `subscribers` collection in Firestore with duplication safeguards.
 */
export async function subscribeNewsletter(email: string): Promise<NewsletterResult> {
  try {
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please provide a valid email format (e.g. name@example.com).' };
    }

    // Sanitize email as a safe document ID
    const subscriberDocId = cleanEmail.replace(/[^a-zA-Z0-9_-]/g, '_');
    const subscriberRef = doc(db, 'subscribers', subscriberDocId);

    const existingDoc = await getDoc(subscriberRef);
    if (existingDoc.exists()) {
      return {
        success: true,
        message: 'You are already subscribed to District 9126 updates!',
      };
    }

    await setDoc(subscriberRef, {
      email: cleanEmail,
      status: 'active',
      source: 'blog_footer',
      createdAt: serverTimestamp(),
      subscribedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Thank you for subscribing! You will receive our bi-weekly impact stories and news.',
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    console.error('Error in subscribeNewsletter:', error);
    return {
      success: false,
      error: `Subscription failed: ${errMsg}`,
    };
  }
}
