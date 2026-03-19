import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'simples',
  type: 'document',
  title: 'Páginas Simples',
  fieldsets: [
    {name: 'conteudo', title: 'Conteúdo da Página'},
    {name: 'titulo', title: 'Título da Página'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({
      name: 'titulo_pt',
      title: '🇵🇹 PT',
      type: 'string',
      description: 'Máximo de 170 caracteres.',
      validation: (Rule) => Rule.max(170),
      fieldset: 'titulo',
      group: ['pt'],
    }),
    defineField({
      name: 'titulo_en',
      title: '🇬🇧 EN',
      type: 'string',
      description: 'Máximo de 170 caracteres.',
      validation: (Rule) => Rule.max(170),
      fieldset: 'titulo',
      group: ['en'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any, context: any): string => doc.titulo_pt,
        maxLength: 200,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'conteudo_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'conteudo',
      group: ['pt'],
    }),
    defineField({
      name: 'conteudo_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'conteudo',
      group: ['en'],
    }),
  ],
})
