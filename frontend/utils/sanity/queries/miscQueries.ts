import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export const getLinkGuia = () =>
  client.fetch(
    groq`*[_type == "misc"] {
    linkGuia
    }[0]`
  );

export const getFooterIcons = () =>
  client.fetch(
    groq`*[_type == "apoios"] {
      sections[]{
        posicao,
          descricao_pt,
          descricao_en,
          logos[]{
            entidade,
            link,
            "logo": logo.asset->url
        }
      }
    }[0]`
  );

export const getVisitContent = () =>
  client.fetch(
    groq`*[_type == "simples" && lower(titulo_pt) == lower("visitar")][0]`
  );

export const getLinkNewsletter = () =>
  client.fetch(
    groq`*[_type == "misc"] {
    linkNewsletter
    }[0]`
  );

export const getAboutAnoZero = () =>
  client.fetch(
    groq`*[_type == "sobre"] {
    "organizadores": ogranizadores[0].logos[]{
      entidade,
      link,
      "logo":logo.asset->url
    },
    "edicoes" : outrasEdicoes[0].edicoes,
    texto_pt,
    texto_en,
    url
}[0]`
  );

