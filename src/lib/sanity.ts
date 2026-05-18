import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-05-18',
      useCdn: true,
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, string> = {},
): Promise<T> {
  if (!sanityClient) return fallback;

  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data || fallback;
  } catch (error) {
    console.warn('Sanity fetch failed. Falling back to local confirmed content.', error);
    return fallback;
  }
}
