import {defineField, defineType} from 'sanity'

const descriptionNumero = 'Número do espaço no mapa.'
const descriptionNome = 'Nome do espaço.'
const descriptionFoto =
  "Dica: Abrir ferramenta 'Crop' para ajustar a imagem e definir o ponto de interesse."

export default defineType({
  name: 'espaco',
  type: 'document',
  title: 'Espaço',
  fieldsets: [
    {name: 'id', title: 'Identificação', options: {columns: 2}},
    {name: 'fotoPrincipal', title: 'Foto Principal'},
    {name: 'sinopse', title: 'Sinopse'},
    {name: 'endereco', title: 'Endereço'},
    {name: 'horario', title: 'Horário'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'number',
      options: {list: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
      description: descriptionNumero,
      fieldset: 'id',
      validation: (Rule) =>
        Rule.required().error('Certifique-se que atribuiu um número entre 1 e 9 ao espaço.'),
    }),
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      description: descriptionNome,
      fieldset: 'id',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any, context: any): string => doc.nome,
        maxLength: 200,
      },
    }),
    defineField({
      name: 'fotoPrincipalDesktop',
      title: '🖥️ Desktop',
      type: 'image',
      description: descriptionFoto,
      options: {hotspot: true},
      fieldset: 'fotoPrincipal',
    }),
    defineField({
      name: 'fotoPrincipalMobile',
      title: '📱 Mobile',
      type: 'image',
      description: descriptionFoto,
      options: {hotspot: true},
      fieldset: 'fotoPrincipal',
    }),
    defineField({
      name: 'endereco1',
      title: 'Endereço - Linha 1',
      type: 'string',
      fieldset: 'endereco',
    }),
    defineField({
      name: 'endereco2',
      title: 'Endereço - Linha 2',
      type: 'string',
      fieldset: 'endereco',
    }),
    defineField({
      name: 'horario1_pt',
      title: '🇵🇹 PT - Linha 1',
      type: 'text',
      rows: 2,
      fieldset: 'horario',
    }),
    defineField({
      name: 'horario1_en',
      title: '🇬🇧 EN - Linha 1',
      type: 'text',
      rows: 2,
      fieldset: 'horario',
    }),
    defineField({
      name: 'horario2_pt',
      title: '🇵🇹 PT - Linha 2',
      type: 'text',
      rows: 2,
      fieldset: 'horario',
    }),
    defineField({
      name: 'horario2_en',
      title: '🇬🇧 EN - - Linha 2',
      type: 'text',
      rows: 2,
      fieldset: 'horario',
    }),
    defineField({
      name: 'sinopse_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'sinopse',
      group: 'pt',
    }),
    defineField({
      name: 'sinopse_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'sinopse',
      group: 'en',
    }),
    defineField({
      name: 'galeriaImagens',
      title: 'Galeria Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'legenda_pt', title: 'Legenda 🇵🇹 PT', type: 'string'},
            {name: 'legenda_en', title: 'Legenda 🇬🇧 EN', type: 'string'},
          ],
        },
      ],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'artistasRelacionados',
      title: 'Artistas Relacionados',
      type: 'array',
      of: [{type: 'reference', to: {type: 'artista'}}],
    }),
    defineField({
      name: 'eventosRelacionados',
      title: 'Eventos Relacionados',
      type: 'array',
      of: [{type: 'reference', to: {type: 'evento'}}],
    }),
  ],
  preview: {
    select: {
      number: 'numero',
      name: 'nome',
    },
    prepare({number, name}) {
      return {
        title: `${number}. ${name}`,
      }
    },
  },
})
