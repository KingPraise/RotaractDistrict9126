'use server';

import crypto from 'crypto';
import { ActionResult, CloudinarySignaturePayload } from '@/types';

/**
 * Generate secure Cloudinary upload parameters and signature.
 * Enables the frontend UI to upload high-res images directly to Cloudinary CDN
 * without routing heavy image payloads through the Next.js server.
 *
 * @param folder - Cloudinary folder target (e.g. 'rotaract_9126/avatars', 'rotaract_9126/projects')
 */
export async function getCloudinaryUploadSignature(
  folder: string = 'rotaract_9126/general'
): Promise<ActionResult<CloudinarySignaturePayload>> {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return {
        success: false,
        error: 'Cloudinary credentials are not configured in environment variables.',
      };
    }

    const timestamp = Math.round(new Date().getTime() / 1000);

    // Alphabetical parameter string required by Cloudinary signing algorithm
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

    // Generate SHA-1 or SHA-256 hash (Cloudinary standard uses SHA-1)
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    return {
      success: true,
      data: {
        signature,
        timestamp,
        apiKey,
        cloudName,
        folder,
      },
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Error generating Cloudinary signature:', error);
    return {
      success: false,
      error: `Failed to generate upload signature: ${errMessage}`,
    };
  }
}
