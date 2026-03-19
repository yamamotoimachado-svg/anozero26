import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export const artistsSlugsQuery = () =>
  client.fetch(
    groq`*[_type == "artista" && defined(slug.current)][].slug.current`
  );
export async function getArtistByName(name: string) {
  return client.fetch(
    groq`*[_type == "artista" && lower(nome) == lower($name)]{
      id: _id,
      bioA_en,
      bioA_pt,
      dataNascimento,
      espacosRelacionados{
        _ref,
        _type,
        _weak
      },
      foto{
        asset->{
          url
        },
      },
      linkExterno,
      nacionalidade_en,
      nacionalidade_pt,
      nome
    }`,
    { name }
  );
}

export async function getArtistBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "artista" && slug.current == $slug]{
      primeiroNome,
      ultimoNome,
      bioA_en,
      bioA_pt,
      bioC_en,
      bioC_pt,
      bioB_pt,
      bioB_en,
      dataNascimento,
      dataMorte,
      espacosRelacionados[]->{
        slug,
        nome,
        fotoPrincipalDesktop{
          asset->{
            url
          },
        }
      },
      foto{
        asset->{
          url
        },
      },
      linkExterno,
      nacionalidade_en,
      nacionalidade_pt,
      video{
        legenda_pt,
        videoURL,
        legenda_en
      },
      galeriaImagens[]{
          legenda_en,
          legenda_pt,
          asset->{
            url
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
    }
    }[0]`,
    { slug }
  );
}