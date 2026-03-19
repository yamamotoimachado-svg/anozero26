import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export default defineType({
  name: 'destaqueEventos',
  type: 'document',
  title: 'Eventos em Destaque',
  fields: [
    defineField({
      name: 'eventos',
      title: 'Eventos a destacar',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: BlockElementIcon,
          fields: [
            {
              name: 'posicao',
              title: 'Posição na Grelha',
              type: 'number',
              description: 'De 1 a X, sendo 1 o primeiro que fica mais destacado em cima.',
              validation: (Rule) => Rule.required().integer().min(1),
            },
            {
              name: 'evento',
              title: 'Evento',
              type: 'reference',
              to: [{type: 'evento'}],
            },
          ],
          preview: {
            select: {
              posicao: 'posicao',
              tituloEvento: 'evento.titulo_pt',
              media: 'evento.imagemDestaque',
            },
            prepare({posicao, tituloEvento, media}) {
              return {
                title: `${posicao}. ${tituloEvento}`,
                media: media,
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
            return 'Não podem existir eventos com posições repetidas.'
          }
          return true
        }),
    }),
  ],
})
