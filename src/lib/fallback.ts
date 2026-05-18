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

export const fallbackSiteSettings: SiteSettings = {
  title: 'Goal Getters FC',
  description:
    'Goal Getters FC is a home-grown football club in Johannesburg built around discipline, development, and opportunity.',
  logo: '/assets/images/cropped-GGLOGO.png',
  heroImage: '/assets/images/hero_bg.png',
  location: 'Bonaero Park, Johannesburg',
  email: 'goalgetterscontact@mail.com',
  whatsappNumber: '27824656428',
  instagramUrl: 'https://www.instagram.com/goal_getters_fc/',
};

export const fallbackPrograms: Program[] = [
  {
    title: 'Elite Training',
    ageGroup: 'Individual players',
    description:
      'Focused technical sessions for players who want extra detail, accountability, and sharper habits.',
    ctaType: 'trial',
    image: '/assets/images/service-elite.jpg',
  },
  {
    title: 'Team Coaching',
    ageGroup: 'Groups and squads',
    description:
      'Structured sessions for teams that need sharper tactical detail, intensity, and shared standards.',
    ctaType: 'contact',
    image: '/assets/images/service-team.jpg',
  },
  {
    title: 'Skill Development',
    ageGroup: 'Developing players',
    description:
      'Ball mastery, first touch, passing detail, finishing, and decision-making under pressure.',
    ctaType: 'trial',
    image: '/assets/images/service-skill.jpg',
  },
];

export const fallbackFixtureEvents: FixtureEvent[] = [];

export const fallbackSponsors: Sponsor[] = [];

export const fallbackGalleryMoments: GalleryMoment[] = [
  {
    caption: 'Player signing moment',
    image: '/assets/moments/PlayerSigning.jpg',
  },
  {
    caption: 'Goal Getters club moment',
    image: '/assets/moments/WhatsApp-Image-2025-02-28-at-20.54.40_ddbe9377.jpg',
  },
];

export const fallbackCoaches: Coach[] = [
  {
    name: 'Kyle Coimbra',
    role: 'Founder and coaching lead',
    bio:
      'Founder-led coaching with a focus on discipline, integrity, technique, and player accountability.',
    image: '/assets/images/team-kyle.jpg',
  },
];

export const fallbackFaqs: Faq[] = [
  {
    question: 'How do I enquire about a trial?',
    answer:
      'Use the WhatsApp trial button and send the player name, age, current level, and preferred contact details.',
  },
  {
    question: 'Where is the club based?',
    answer:
      'Goal Getters FC is based around Bonaero Park, Johannesburg. Session details are confirmed directly by the club.',
  },
  {
    question: 'Are fees and schedules listed online?',
    answer:
      'Fees and schedules are only published when confirmed. The club will confirm current details directly on enquiry.',
  },
];

export const legalPages: Record<string, LegalPage> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How Goal Getters FC handles enquiry and contact information.',
    sections: [
      {
        heading: 'Information We Collect',
        body:
          'When you contact the club, we may receive your name, contact details, player age, enquiry type, and any information you choose to send through WhatsApp or email.',
      },
      {
        heading: 'How We Use Information',
        body:
          'Information is used to respond to enquiries, arrange trials, confirm training details, and manage club communication.',
      },
      {
        heading: 'Data Sharing',
        body:
          'Goal Getters FC does not sell personal information. Information is shared only when needed to respond to a club enquiry or meet a lawful requirement.',
      },
      {
        heading: 'Contact',
        body:
          'For privacy questions, contact the club using the details listed on the Contact page.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'Cookie and tracking information for the Goal Getters FC website.',
    sections: [
      {
        heading: 'Essential Cookies',
        body:
          'The website may use essential browser storage required for normal site operation and security.',
      },
      {
        heading: 'Analytics',
        body:
          'Analytics will only be enabled when a real measurement ID and consent approach are configured for production.',
      },
      {
        heading: 'Third-Party Links',
        body:
          'External services such as WhatsApp, Instagram, and email providers may apply their own cookies or privacy terms when you leave this website.',
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    description: 'Website terms for Goal Getters FC visitors.',
    sections: [
      {
        heading: 'Website Use',
        body:
          'This website provides club information, enquiry routes, and published updates. Details may change as club schedules and operations change.',
      },
      {
        heading: 'Club Enquiries',
        body:
          'Trial, training, event, and sponsorship enquiries are only confirmed once the club responds directly through an official contact channel.',
      },
      {
        heading: 'Media and Content',
        body:
          'Images, club marks, and website content may not be reused without permission from Goal Getters FC.',
      },
    ],
  },
};
