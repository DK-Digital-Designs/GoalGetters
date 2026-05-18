import { defineField, defineType } from 'sanity';

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'ageGroup', title: 'Age group or audience', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'schedule', title: 'Confirmed schedule', type: 'string' }),
    defineField({ name: 'fee', title: 'Confirmed fee', type: 'string' }),
    defineField({
      name: 'ctaType',
      title: 'CTA type',
      type: 'string',
      options: {
        list: [
          { title: 'Trial', value: 'trial' },
          { title: 'Contact', value: 'contact' },
          { title: 'Sponsor', value: 'sponsor' },
        ],
      },
      initialValue: 'trial',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
  ],
});
