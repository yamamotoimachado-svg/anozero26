export const myStructure = (S) =>
  S.list()
    .title('Conteúdos Site')
    .items([
      S.listItem()
        .title('Dar, Segurar e Receber')
        .child(
          S.document()
            .title('Dar, Segurar e Receber')
            .schemaType('fantasma')
            .documentId('fantasma'),
        ),
      S.listItem()
        .title('Eventos em Destaque')
        .child(
          S.document()
            .title('Eventos em Destaque')
            .schemaType('destaqueEventos')
            .documentId('destaqueEventos'),
        ),
      S.listItem()
        .title('Apoios')
        .child(S.document().title('Apoios').schemaType('apoios').documentId('apoios')),
      S.listItem()
        .title('Sobre')
        .child(S.document().title('Sobre o Anozero').schemaType('sobre').documentId('sobre')),
      S.listItem()
        .title('Misc')
        .child(S.document().title('Info/Configs Variadas').schemaType('misc').documentId('misc')),
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['fantasma', 'destaqueEventos', 'apoios', 'sobre', 'misc'].includes(listItem.getId()),
      ),
    ])
