import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fantasma',
  type: 'document',
  title: 'Dar, Segurar e Receber',
  fieldsets: [
    {name: 'tituloPopup', title: 'Título Pop-up'},
    {name: 'excerto', title: 'Excerto (Ex: Pop-up)'},
    {name: 'textoPrincipal', title: 'Texto Principal'},
    {name: 'educativa', title: 'Proposta Educativa'},
    {name: 'convergente', title: 'Programa Convergente'},
    {name: 'arquitetura', title: 'Programa Arquitetura'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({
      name: 'tituloPopup_pt',
      title: '🇵🇹 PT',
      type: 'string',
      fieldset: 'tituloPopup',
      group: ['pt'],
    }),
    defineField({
      name: 'tituloPopup_en',
      title: '🇬🇧 EN',
      type: 'string',
      fieldset: 'tituloPopup',
      group: ['en'],
    }),
    defineField({
      name: 'excerto_pt',
      title: '🇵🇹 PT',
      type: 'string',
      description: 'Máximo de 170 caracteres.',
      validation: (Rule) => Rule.max(170),
      fieldset: 'excerto',
      group: ['pt'],
    }),
    defineField({
      name: 'excerto_en',
      title: '🇬🇧 EN',
      type: 'string',
      description: 'Máximo de 170 caracteres.',
      validation: (Rule) => Rule.max(170),
      fieldset: 'excerto',
      group: ['en'],
    }),
    defineField({
      name: 'texto_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'textoPrincipal',
      group: ['pt'],
    }),
    defineField({
      name: 'texto_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'textoPrincipal',
      group: ['en'],
    }),
    defineField({
      name: 'educativa_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'educativa',
      group: ['pt'],
    }),
    defineField({
      name: 'educativa_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'educativa',
      group: ['en'],
    }),
    defineField({
      name: 'convergente_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'convergente',
      group: ['pt'],
    }),
    defineField({
      name: 'convergente_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'convergente',
      group: ['en'],
    }),
    defineField({
      name: 'arquitetura_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      fieldset: 'arquitetura',
      group: ['pt'],
    }),
    defineField({
      name: 'arquitetura_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'arquitetura',
      group: ['en'],
    }),
  ],
})
