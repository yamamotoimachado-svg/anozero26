import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'apoios',
  type: 'document',
  title: 'Apoios',
  fields: [
    defineField({
      name: 'sections',
      title: 'Secções de Apoios',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: BlockElementIcon,
          fieldsets: [{name: 'desc', title: 'Descrição da Secção'}],
          fields: [
            {
              name: 'posicao',
              title: 'Posição na Página',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(1),
            },
            {
              name: 'descricao_pt',
              title: '🇵🇹 PT',
              type: 'string',
              fieldset: 'desc',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'descricao_en',
              title: '🇬🇧 EN',
              type: 'string',
              fieldset: 'desc',
              validation: (Rule) => Rule.required(),
            },
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
            select: {
              posicao: 'posicao',
              nomeSeccao: 'descricao_pt',
            },
            prepare({posicao, nomeSeccao}) {
              return {
                title: `${posicao}. ${nomeSeccao}`,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          const positions = (value as {posicao: number}[]).map((item) => item.posicao)
          const uniquePositions = [...new Set(positions)]
          if (positions.length !== uniquePositions.length) {
            return 'Não podem existir apoios com posições repetidas.'
          }
          return true
        }),
    }),
  ],
})
