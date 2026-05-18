export type SanityImage = {
  alt?: string;
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
  };
};

export type ImageSource = string | SanityImage | undefined;

export type SiteSettings = {
  title: string;
  description: string;
  logo: string;
  heroImage: string;
  location: string;
  email?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
};

export type Program = {
  title: string;
  ageGroup?: string;
  description: string;
  schedule?: string;
  fee?: string;
  ctaType?: 'trial' | 'contact' | 'sponsor';
  image?: ImageSource;
};

export type FixtureEvent = {
  title: string;
  dateTime?: string;
  team?: string;
  opponent?: string;
  venue?: string;
  result?: string;
  image?: ImageSource;
};

export type Sponsor = {
  name: string;
  website?: string;
  description?: string;
  logo?: ImageSource;
};

export type GalleryMoment = {
  caption: string;
  date?: string;
  tags?: string[];
  image: ImageSource;
};

export type Coach = {
  name: string;
  role: string;
  bio: string;
  credentials?: string[];
  image?: ImageSource;
};

export type Faq = {
  question: string;
  answer: string;
};

export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalPage = {
  title: string;
  description: string;
  sections: LegalSection[];
};
