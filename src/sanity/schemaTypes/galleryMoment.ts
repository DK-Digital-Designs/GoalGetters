import { defineField, defineType } from 'sanity';

export const galleryMoment = defineType({
  name: 'galleryMoment',
  title: 'Gallery Moment',
  type: 'document',
  fields: [
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
      validation: (rule) => rule.required(),
    }),
  ],
});
