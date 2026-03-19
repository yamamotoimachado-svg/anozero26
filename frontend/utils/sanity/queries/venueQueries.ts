import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export const getVenuesSlugsQuery = () =>
  client.fetch(
    groq`*[_type == "espaco" && defined(slug.current)][].slug.current`
  );

export const getVenues = () =>
  client.fetch(groq`*[_type == "espaco"]{
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
      fotoPrincipalDesktop{
        asset->{
          url
        },
      },
    fotoPrincipalMobile{
        asset->{
          url
        },
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
      }
        },
      endereco1,
      endereco2,
      horario1_en,
      horario1_pt,
      horario2_en,
      horario2_pt,
      nome,
      numero,
      sinopse_en,
      sinopse_pt,
      "slug" : slug.current
    }`);

export const getVenueBySlug = (slug: string) =>
  client.fetch(groq`*[_type == "espaco" && slug.current == $slug]{
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
     fotoPrincipalDesktop{
        asset->{
          url
        },
      },
      fotoPrincipalMobile{
        asset->{
          url
        },
      },
      eventosRelacionados[]->{
        categoria_en,
        "slug": slug.current,
        titulo_en,
        titulo_pt,
        categoria_pt,
        datas{
            dataInicial,
            dataFinal,
        }[],
        textoDatas_en,
        textoDatas_pt,
        horarioCurto_en,
        horarioCurto_pt,
        horarioLongo_en,
        horarioLongo_pt,
        localNome,
        imagemDestaque{
          asset->{
            url
          },
        }
      },
      endereco1,
      endereco2,
      horario1_en,
      horario1_pt,
      horario2_en,
      horario2_pt,
      nome,
      numero,
      sinopse_en,
      sinopse_pt,
      galeriaImagens[] {
        legenda_pt,
        legenda_en,
        asset->{
          url
        },
      }
    }[0]`,
    { slug }
  );

