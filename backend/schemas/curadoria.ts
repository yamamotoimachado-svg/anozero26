import {defineField, defineType} from 'sanity'

const descriptionFoto =
  "Dica: Abrir ferramenta 'Crop' para ajustar a imagem e definir o ponto de interesse."
const descriptionNascimento = 'Ano de nascimento do/a artista.'
const descriptionMorte = 'Deixar em branco se N/A.'

export default defineType({
  name: 'curadoria',
  type: 'document',
  title: 'Curadoria',
  fieldsets: [
    {name: 'bio', title: 'Bio'},
    {name: 'cargo', title: 'Cargo'},
    {name: 'outros', title: 'Outros'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({name: 'nome', title: 'Nome', type: 'string'}),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {list: ['Curadoria', 'Conselho Curatorial', 'Assistência de Curadoria', 'Outros']},
    }),
    defineField({
      name: 'cargo_pt',
      title: '🇵🇹 PT',
      type: 'string',
      fieldset: 'cargo',
      group: ['pt'],
    }),
    defineField({
      name: 'cargo_en',
      title: '🇬🇧 EN',
      type: 'string',
      fieldset: 'cargo',
      group: ['en'],
    }),
    defineField({
      name: 'foto',
      title: 'Foto Curadoria',
      type: 'image',
      description: descriptionFoto,
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bio',
      group: ['pt'],
    }),
    defineField({
      name: 'bio_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'bio',
      group: ['en'],
    }),
    defineField({
      name: 'outros_pt',
      title: '🇵🇹 PT',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'outros',
      group: ['pt'],
    }),
    defineField({
      name: 'outros_en',
      title: '🇬🇧 EN',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'outros',
      group: ['en'],
    }),
  ],
})
