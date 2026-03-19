import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'misc',
  type: 'document',
  title: 'Misc',
  fieldsets: [
    // {name: 'x', title: 'Texto x'},
  ],
  groups: [
    {name: 'pt', title: 'Texto PT'},
    {name: 'en', title: 'Texto EN'},
  ],
  fields: [
    defineField({
      name: 'linkGuia',
      title: 'Link do Guia',
      type: 'url',
      description: "OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
    }),
    defineField({
      name: 'linkNewsletter',
      title: 'Link da Newsletter',
      type: 'url',
      description: "OBRIGATÓRIO: Começar com 'http://' ou 'https://'",
    }),
  ],
})
