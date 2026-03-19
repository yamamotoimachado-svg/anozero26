import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export const getEventsSlugsQuery = () =>
  client.fetch(
    groq`*[_type == "evento" && defined(slug.current)][].slug.current`
  );

export async function getEventBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "evento" && slug.current == $slug]{
      _id,
    artistasRelacionados[]->{
        "id": _id,
        primeiroNome,
        ultimoNome,
        "slug": slug.current,
        foto{
          asset->{
            url
          },
        }
      },
    eventosRelacionados[]-> {
     categoria_en,
      categoria_pt,
      datas{
          dataInicial,
          dataFinal,
      }[],
      horarioCurto_en,
      horarioCurto_pt,
      horarioLongo_en,
      horarioLongo_pt,
      localNome,
      imagemDestaque{
        asset->{
          url
        },
      },
      localNome,
      "slug": slug.current,
      textoDatas_en,
      textoDatas_pt,
      titulo_en,
      titulo_pt,
    },
    imagemDestaque{
      asset->{url},
    },
    categoria_en,
    categoria_pt,
    datas{
      dataInicial,
      dataFinal,
    }[],
    horarioCurto_en,
    horarioCurto_pt,
    horarioLongo_en,
    horarioLongo_pt,
    linksExtra[]{
      linkExtraTexto_pt,
      linkExtraTexto_en,
      linkExtraURL
    },
    listaArtistasManual,
    localMorada,
    localNome,
    localURLInterno,
    localURLExterno,
    outroDetalhe1_en,
    outroDetalhe1_pt,
    outroDetalhe2_en,
    outroDetalhe2_pt,
    outroDetalhe3_en,
    outroDetalhe3_pt,
    "slug": slug.current,
    textoDatas_en,
    textoDatas_pt,
    texto_en,
    texto_pt,
    tipo_en,
    tipo_pt,
    titulo_en,
    titulo_pt
}[0]`,
    { slug }
  );
}

export async function getEvents() {
  return client.fetch(
    groq`*[_type == "evento"]{
      imagemDestaque{
        asset->{url},
      },
      categoria_en,
      categoria_pt,
      datas[]{
        dataInicial,
        dataFinal,
      },
      horarioCurto_en,
      horarioCurto_pt,
      horarioLongo_en,
      horarioLongo_pt,
      localNome,
      "slug": slug.current,
      textoDatas_en,
      textoDatas_pt,
      titulo_en,
      titulo_pt,
      tipo_en,
      tipo_pt
    }
  `
  )
}export const getHighlightedEvents = () =>  client.fetch(    groq`*[_type == "destaqueEventos"] {      eventos    }[0].eventos[]{      posicao,      evento->{          categoria_en,          categoria_pt,          localNome,          titulo_pt,          titulo_en,          "slug": slug.current,          datas[]{            dataInicial,            dataFinal,          },          imagemDestaque{            asset->{              url            }          },          horarioCurto_pt,          horarioLongo_en,          horarioCurto_en,          horarioLongo_pt,          textoDatas_en,          textoDatas_pt,      }    }`  );