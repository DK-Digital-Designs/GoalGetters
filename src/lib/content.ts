import {
  fallbackCoaches,
  fallbackFaqs,
  fallbackFixtureEvents,
  fallbackGalleryMoments,
  fallbackPrograms,
  fallbackSiteSettings,
  fallbackSponsors,
  legalPages,
} from './fallback';
import {
  coachesQuery,
  faqsQuery,
  fixtureEventsQuery,
  galleryMomentsQuery,
  legalPageQuery,
  programsQuery,
  siteSettingsQuery,
  sponsorsQuery,
} from './queries';
import { sanityFetch } from './sanity';
import type {
  Coach,
  Faq,
  FixtureEvent,
  GalleryMoment,
  LegalPage,
  Program,
  SiteSettings,
  Sponsor,
} from './types';

export function completeList<T>(items: T[] | undefined): T[] {
  return Array.isArray(items) ? items.filter(Boolean) : [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery, fallbackSiteSettings);
  return {
    ...fallbackSiteSettings,
    ...settings,
    logo: settings.logo || fallbackSiteSettings.logo,
    heroImage: settings.heroImage || fallbackSiteSettings.heroImage,
  };
}

export function getPrograms(): Promise<Program[]> {
  return sanityFetch<Program[]>(programsQuery, fallbackPrograms);
}

export function getFixtureEvents(): Promise<FixtureEvent[]> {
  return sanityFetch<FixtureEvent[]>(fixtureEventsQuery, fallbackFixtureEvents);
}

export function getSponsors(): Promise<Sponsor[]> {
  return sanityFetch<Sponsor[]>(sponsorsQuery, fallbackSponsors);
}

export function getGalleryMoments(): Promise<GalleryMoment[]> {
  return sanityFetch<GalleryMoment[]>(galleryMomentsQuery, fallbackGalleryMoments);
}

export function getCoaches(): Promise<Coach[]> {
  return sanityFetch<Coach[]>(coachesQuery, fallbackCoaches);
}

export function getFaqs(): Promise<Faq[]> {
  return sanityFetch<Faq[]>(faqsQuery, fallbackFaqs);
}

export function getLegalPage(slug: string): Promise<LegalPage> {
  return sanityFetch<LegalPage>(legalPageQuery, legalPages[slug], { slug });
}
