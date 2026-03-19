import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export async function getFantasma() {
  return client.fetch(
    groq`*[_type == "fantasma"]{
      _id,
      tituloPopup_pt,
      tituloPopup_en,
      texto_en,
      texto_pt,
      educativa_pt,
      educativa_en,
      convergente_en,
      convergente_pt,
      arquitetura_en,
      arquitetura_pt,
      excerto_pt,
      excerto_en
    }[0]`
  );
}

export async function getTeam() {
  return client.fetch(
    groq`*[_type == "curadoria"]{
        nome,
        tipo,
        bio_en,
        bio_pt,
        outros_pt,
        outros_en,
        foto{
          asset->{
            url
          },
        }
        }`
  );
}