import {defineField, defineType} from 'sanity'

const descriptionFoto =
  "Dica: Abrir ferramenta 'Crop' para ajustar a imagem e definir o ponto de interesse."
const descriptionNascimento = 'Ano de nascimento do/a artista.'
const descriptionMorte = 'Deixar em branco se N/A.'

export default defineType({
  name: 'artista',
  type: 'document',
  title: 'Artista',
  fieldsets: [
    {name: 'nome', title: 'Nome'},
    {name: 'datas', title: 'Datas', options: {columns: 2}},
    {name: 'nacionalidade', title: 'Nacionalidade', options: {columns: 2}},
    {name: 'bioA', title: 'Bio A'},
    {name: 'bioB', title: 'Bio B'},
    {name: 'bioC', title: 'Bio C'},
    {name: 'video', title: 'Vídeo'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({name: 'primeiroNome', title: 'Primeiro Nome', type: 'string', fieldset: 'nome'}),
    defineField({name: 'ultimoNome', title: 'Último Nome', type: 'string', fieldset: 'nome'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any, context: any): string =>
          doc.ultimoNome ? `${doc.primeiroNome}-${doc.ultimoNome}` : doc.primeiroNome,
        maxLength: 200,
      },
    }),
    defineField({
      name: 'foto',
      title: 'Foto Artista',
      type: 'image',
      description: descriptionFoto,
      options: {hotspot: true},
    }),
    defineField({
      name: 'dataNascimento',
      title: 'Nascimento',
      type: 'number',
      description: descriptionNascimento,
      fieldset: 'datas',
    }),
    defineField({
      name: 'dataMorte',
      title: 'Morte',
      type: 'number',
      description: descriptionMorte,
      fieldset: 'datas',
    }),
    defineField({
      name: 'nacionalidade_pt',
      title: '🇵🇹 PT',
      type: 'text',
      rows: 1,
      fieldset: 'nacionalidade',
      group: ['pt'],
    }),
    defineField({
      name: 'nacionalidade_en',
      title: '🇬🇧 EN',
      type: 'text',
      rows: 1,
      fieldset: 'nacionalidade',
      group: ['en'],
    }),
    defineField({
      name: 'bioA_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioA',
      group: ['pt'],
    }),
    defineField({
      name: 'bioA_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioA',
      group: ['en'],
    }),
    defineField({
      name: 'linkExterno',
      title: 'Link Externo',
      type: 'url',
      description: "OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
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
      name: 'bioB_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioB',
      group: ['pt'],
    }),
    defineField({
      name: 'bioB_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioB',
      group: ['en'],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        defineField({
          name: 'videoURL',
          title: 'Link Vídeo',
          type: 'url',
          description: "Link para vídeo YouTube. OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
        }),
        defineField({
          name: 'legenda_pt',
          title: 'Legenda 🇵🇹 PT',
          type: 'string',
        }),
        defineField({
          name: 'legenda_en',
          title: 'Legenda 🇬🇧 EN',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'bioC_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioC',
      group: ['pt'],
    }),
    defineField({
      name: 'bioC_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bioC',
      group: ['en'],
    }),
    defineField({
      name: 'espacosRelacionados',
      title: 'Espaços Relacionados',
      type: 'array',
      of: [{type: 'reference', to: {type: 'espaco'}}],
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
      firstName: 'primeiroNome',
      lastName: 'ultimoNome',
      media: 'foto',
    },
    prepare({firstName, lastName, media}) {
      return {
        title: `${firstName} ${lastName ? lastName : ''}`,
        subtitle: 'Artista',
        media: media,
      }
    },
  },
})
