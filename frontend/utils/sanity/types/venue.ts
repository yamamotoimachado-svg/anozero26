import { Image, relatedArtist } from "@/utils/sanity/types/common";
import { ShortEventType } from "@/utils/sanity/types/event";


export type VenueType = {
  _id: string;
  artistasRelacionados: relatedArtist[];
  fotoPrincipalDesktop: {
    asset: {
      url: string;
    };
  };
  fotoPrincipalMobile: {
    asset: {
      url: string;
    };
  };
  galeriaImagens: Array<{
    asset: {
      url: string;
    },
    legenda_en: string;
    legenda_pt: string;
  }>
  eventosRelacionados: Array<ShortEventType>;
  endereco1: string;
  endereco2: string;
  horario1_en: string;
  horario1_pt: string;
  horario2_en: string;
  horario2_pt: string;
  nome: string;
  numero: string;
  slug: string;
  sinopse_en: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      marks: Array<any>;
      text: string;
    }>;
    markDefs: Array<any>;
    style: string;
  }>;
  sinopse_pt: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      marks: Array<any>;
      text: string;
    }>;
    markDefs: Array<any>;
    style: string;
  }>;
};

