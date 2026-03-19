import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'curatorialText',
  title: 'Curatorial Text',
  type: 'document',
  fields: [
    defineField({
      name: 'title_pt',
      title: 'Título (PT)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body_pt',
      title: 'Texto (PT)',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body_en',
      title: 'Text (EN)',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
      validation: Rule => Rule.required(),
    }),
  ],
});
