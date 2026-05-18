# Goal Getters FC CMS Setup Guide

This site uses **Astro** for the public website, **Sanity** for editable content, and **Vercel** for production deployment.

The public site can build without Sanity configured because it has confirmed local fallback content in `src/lib/fallback.ts`. Once Sanity is connected, published CMS content replaces those fallbacks.

## How The CMS Works

- Sanity Studio is the editing interface. Run it locally with `npm run sanity:dev`, or deploy it with `npm run sanity:deploy`.
- The website reads Sanity during build/render through `src/lib/sanity.ts` and `src/lib/content.ts`.
- Public content is queried with GROQ in `src/lib/queries.ts`.
- The editable CMS models live in `src/sanity/schemaTypes/`.
- Draft documents are hidden from the public website.
- Records with `published: false` are hidden.
- Sponsors only show when `active: true`.
- Fixtures only show when they have a confirmed `dateTime`.
- No public write API exists in v1. Editing happens inside Sanity Studio only.

## CMS Content Types

### Site Settings

Controls the global club details:

- Site title
- Site description
- Logo
- Hero image
- Location
- WhatsApp number
- Email
- Instagram URL

Create **one** Site Settings document.

### Program

Used for training options on Home and Programs.

Required:

- Title
- Description

Optional:

- Age group/audience
- Confirmed schedule
- Confirmed fee
- CTA type
- Image

Only add schedule or fees when Kyle confirms them.

### Fixture or Event

Used on Fixtures and Home.

Required to show publicly:

- Title
- Confirmed date/time

Optional:

- Team
- Opponent
- Venue
- Result
- Poster/image

If the date/time is not confirmed, leave the record unpublished or do not create it yet.

### Sponsor

Used on Sponsors and Home.

Required:

- Name
- Active enabled

Optional:

- Logo
- Website
- Description
- Display order

Do not add sponsor names or logos until the relationship is confirmed.

### Gallery Moment

Used for club media.

Required:

- Caption
- Image

Optional:

- Date
- Tags

### Coach

Used for About and Home.

Required:

- Name
- Role
- Bio

Optional:

- Confirmed credentials
- Image
- Display order

Only add qualifications and playing history once confirmed.

### FAQ

Used on Contact.

Required:

- Question
- Answer

### Legal Page

Used for Privacy, Cookies, and Terms.

Required:

- Title
- Slug
- Description
- Sections

Use these slugs:

- `privacy`
- `cookies`
- `terms`

## Step 1: Create The Sanity Project

1. Go to Sanity and create/log into the account.
2. Create a new project for **Goal Getters FC**.
3. Use dataset name `production`.
4. Use a **public dataset** for v1, because the website only reads published marketing content.
5. Copy the Sanity **Project ID**.

Useful official docs:

- Sanity CLI and project commands: https://www.sanity.io/docs/cli-reference
- Sanity project creation command reference: https://www.sanity.io/docs/cli-reference/projects
- Sanity Studio configuration: https://www.sanity.io/docs/studio/configuration

## Step 2: Configure Local Environment

Create a local `.env` file from `.env.example`.

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

For Studio commands, you may also set:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Notes:

- `.env` is ignored by Git and must not be committed.
- `PUBLIC_SANITY_PROJECT_ID` is not a secret.
- No read token is needed while the dataset is public.

Useful official docs:

- Sanity environment variables: https://www.sanity.io/docs/studio-environment-variables
- Astro env variables use `import.meta.env.PUBLIC_*`: https://docs.astro.build/en/guides/environment-variables/

## Step 3: Run The Website And Studio Locally

Install dependencies:

```bash
npm install
```

Run the public website:

```bash
npm run dev
```

Run Sanity Studio:

```bash
npm run sanity:dev
```

Then open the Studio URL printed in the terminal. Sanity may ask you to log in.

## Step 4: Add Initial CMS Content

Recommended first content pass:

1. Create the Site Settings document.
2. Add confirmed Programs.
3. Add Kyle’s coach profile with only confirmed details.
4. Add confirmed Gallery Moments.
5. Add FAQs.
6. Add Legal Pages for `privacy`, `cookies`, and `terms`.
7. Leave Fixtures empty until dates are confirmed.
8. Leave Sponsors empty until partners are confirmed.

After adding content, run:

```bash
npm run build
```

The build should pass and the site should render the CMS content.

## Step 5: Deploy The Public Site To Vercel

1. In Vercel, import the GitHub repository `DK-Digital-Designs/GoalGetters`.
2. Framework should be detected as Astro.
3. Build command:

```bash
npm run build
```

4. Output directory:

```bash
dist
```

5. Add these Vercel environment variables for Production and Preview:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

6. Deploy.
7. Add the custom domain `goalgettersfc.co.za`.
8. Redeploy after changing environment variables.

Useful official docs:

- Vercel environment variables: https://vercel.com/docs/environment-variables
- Vercel project environment variables: https://vercel.com/docs/projects/environment-variables

## Step 6: Deploy Sanity Studio

You have two options.

### Option A: Keep Studio Local

Use this if only you are editing content at first.

```bash
npm run sanity:dev
```

### Option B: Deploy Studio To Sanity Hosting

Use this when Kyle or another editor needs browser access.

```bash
npm run sanity:deploy
```

Choose a Studio hostname such as:

```text
goal-getters-fc
```

Sanity will host it at a `sanity.studio` URL.

Useful official docs:

- Sanity Studio deployment: https://www.sanity.io/docs/deployment

## Editing Workflow After Launch

For normal content updates:

1. Open Sanity Studio.
2. Edit or create content.
3. Keep incomplete content as draft or set `published` to false.
4. Publish only confirmed records.
5. Trigger a new Vercel deployment if the site is fully static and content does not update immediately.

For urgent match-day updates:

1. Create a Fixture/Event only after the date/time is confirmed.
2. Add opponent, venue, and image only if confirmed.
3. Publish.
4. Redeploy the site if needed.

For sponsor updates:

1. Create Sponsor.
2. Add confirmed name/logo/website.
3. Set `active: true`.
4. Publish.
5. Redeploy the site if needed.

## Production Guardrails

Before launch or major updates, run:

```bash
npm run build
```

Then check that these do not appear in source or built output:

```bash
rg "example\\.com|G-XXXXXXXXXX|WIP|Coming soon|TBC|/pages/|github\\.io/GoalGetters|Randburg" src public dist
```

Rules:

- No invented sponsors.
- No placeholder fixtures.
- No fake analytics ID.
- No fake credentials.
- No “Coming soon” cards.
- No unconfirmed fees.
- No outdated venue details.

## Troubleshooting

### The website shows fallback content

Check:

- `.env` exists locally.
- `PUBLIC_SANITY_PROJECT_ID` is correct.
- `PUBLIC_SANITY_DATASET=production`.
- Vercel has the same environment variables.
- The Sanity dataset is public.

### A CMS record is not showing

Check:

- It is published.
- `published` is not false.
- For sponsors, `active` is true.
- For fixtures, `dateTime` is set.
- Required fields are filled.

### Vercel still shows old content

Redeploy the Vercel project. Environment variable changes only apply to new deployments.

### The Studio cannot find the project

Check:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `sanity.config.ts`
- `sanity.cli.ts`

## Files To Know

- `sanity.config.ts`: Studio config and schema registration.
- `sanity.cli.ts`: Sanity CLI project/dataset config.
- `src/sanity/schemaTypes/`: CMS content models.
- `src/lib/sanity.ts`: Sanity read client.
- `src/lib/queries.ts`: GROQ queries and public filtering rules.
- `src/lib/content.ts`: CMS fetch helpers and fallback wiring.
- `src/lib/fallback.ts`: confirmed fallback launch content.
- `src/pages/`: public website routes.
- `src/styles/global.css`: black/gold visual system.
- `.env.example`: required local environment variable names.
