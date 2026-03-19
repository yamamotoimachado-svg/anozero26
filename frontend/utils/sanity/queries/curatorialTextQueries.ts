import { client } from "@/utils/sanity/client";
import { groq } from "next-sanity";

export const getCuratorialText = async () => {
  return client.fetch(
    groq`*[_type == "curatorialText"][0]{title_pt, title_en, body_pt, body_en}`
  );
};
