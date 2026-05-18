import { defineField, defineType } from 'sanity';

export const fixtureEvent = defineType({
  name: 'fixtureEvent',
  title: 'Fixture or Event',
  type: 'document',
  fields: [
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'dateTime', title: 'Confirmed date and time', type: 'datetime' }),
    defineField({ name: 'team', title: 'Team', type: 'string' }),
    defineField({ name: 'opponent', title: 'Opponent', type: 'string' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'result', title: 'Result', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Poster or image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
  ],
});
