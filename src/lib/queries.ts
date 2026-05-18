const imageFields = `image{alt, asset->{_id, url}}`;
export const siteSettingsQuery = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
  title,
  description,
  "logo": coalesce(logo.asset->url, logoUrl),
  "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
  location,
  email,
  whatsappNumber,
  instagramUrl
}`;

export const programsQuery = `*[
  _type == "program" &&
  !(_id in path("drafts.**")) &&
  published != false &&
  defined(title) &&
  defined(description)
] | order(order asc, title asc) {
  title,
  ageGroup,
  description,
  schedule,
  fee,
  ctaType,
  ${imageFields}
}`;

export const fixtureEventsQuery = `*[
  _type == "fixtureEvent" &&
  !(_id in path("drafts.**")) &&
  published != false &&
  defined(title) &&
  defined(dateTime)
] | order(dateTime asc) {
  title,
  dateTime,
  team,
  opponent,
  venue,
  result,
  ${imageFields}
}`;

export const sponsorsQuery = `*[
  _type == "sponsor" &&
  !(_id in path("drafts.**")) &&
  active == true &&
  defined(name)
] | order(order asc, name asc) {
  name,
  website,
  description,
  "logo": logo{alt, asset->{_id, url}}
}`;

export const galleryMomentsQuery = `*[
  _type == "galleryMoment" &&
  !(_id in path("drafts.**")) &&
  published != false &&
  defined(caption) &&
  defined(image)
] | order(date desc, _createdAt desc) {
  caption,
  date,
  tags,
  ${imageFields}
}`;

export const coachesQuery = `*[
  _type == "coach" &&
  !(_id in path("drafts.**")) &&
  published != false &&
  defined(name) &&
  defined(role) &&
  defined(bio)
] | order(order asc, name asc) {
  name,
  role,
  bio,
  credentials,
  ${imageFields}
}`;

export const faqsQuery = `*[
  _type == "faq" &&
  !(_id in path("drafts.**")) &&
  published != false &&
  defined(question) &&
  defined(answer)
] | order(order asc, question asc) {
  question,
  answer
}`;

export const legalPageQuery = `*[
  _type == "legalPage" &&
  !(_id in path("drafts.**")) &&
  slug.current == $slug &&
  published != false
][0] {
  title,
  description,
  sections[]{heading, body}
}`;
