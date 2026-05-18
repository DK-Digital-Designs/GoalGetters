# Goal Getters FC

Production website for Goal Getters FC, rebuilt with Astro, Sanity, and Vercel.

## Stack

- Astro static site
- Sanity CMS for editable club content
- Vercel deployment target
- WhatsApp-first trial and sponsor enquiries

## Local Development

```bash
npm install
npm run dev
```

## Build Checks

```bash
npm run check
npm run build
```

## Sanity Setup

Create a Sanity project on the Free plan, then set:

```bash
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
```

For Studio commands, the same values can be provided as `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`.

```bash
npm run sanity:dev
```

The site safely falls back to confirmed local launch content when Sanity is not configured.

## Content Rules

- Do not publish unconfirmed fixtures, fees, sponsor names, coach credentials, or testimonials.
- Draft and unpublished Sanity records are hidden from the public site.
- Incomplete fixture records without a confirmed date are hidden.
- WhatsApp remains the primary conversion path.
