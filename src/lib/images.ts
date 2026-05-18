import type { ImageSource } from './types';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function imageSrc(image: ImageSource, width = 1400): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (builder && image.asset) {
    try {
      return builder.image(image).width(width).fit('max').auto('format').url();
    } catch {
      return image.asset.url;
    }
  }
  return image.asset?.url;
}

export function imageAlt(image: ImageSource, fallback: string): string {
  if (!image || typeof image === 'string') return fallback;
  return image.alt || fallback;
}
