import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sobre',
  type: 'document',
  title: 'Sobre o Anozero',
  fieldsets: [{name: 'textoPrincipal', title: 'Texto Principal'}],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
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
      of: [{type: 'block'}],
      fieldset: 'textoPrincipal',
      group: ['en'],
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'ogranizadores',
      title: 'Organizadores',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: BlockElementIcon,
          fields: [
            {
              name: 'logos',
              title: 'Logótipos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'logo',
                      title: 'Logótipo',
                      type: 'image',
                    },
                    {
                      name: 'entidade',
                      title: 'Entidade',
                      type: 'string',
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                      description: "OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            prepare() {
              return {
                title: `Organizadores`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'outrasEdicoes',
      title: 'Outras Edições',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: BlockElementIcon,
          fields: [
            {
              name: 'edicoes',
              title: 'Edições',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'nome',
                      title: 'Nome da Edição',
                      type: 'string',
                    },
                    {
                      name: 'tema',
                      title: 'Tema da Edição',
                      type: 'string',
                    },
                    {
                      name: 'curadoria',
                      title: 'Curadoria da Edição',
                      type: 'string',
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                      description: "OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            prepare() {
              return {
                title: `Edições Anteriores`,
              }
            },
          },
        },
      ],
    }),
  ],
})
