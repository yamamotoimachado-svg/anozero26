import { relatedArtist } from "@/utils/sanity/types/common";
import { VenueType } from "@/utils/sanity/types/venue";

export type EventType = {
  artistasRelacionados: relatedArtist[];
  categoria_en: string;
  categoria_pt: string;
  datas: Array<{
    dataInicial: string;
    dataFinal: string;
  }>;
  eventosRelacionados: Array<ShortEventType>;
  horarioCurto_en: string;
  horarioCurto_pt: string;
  horarioLongo_en: string;
  horarioLongo_pt: string;
  imagemDestaque: {
    asset: {
      url: string;
    };
  };
  linksExtra: Array<{
    linkExtraTexto_en: string;
    linkExtraTexto_pt: string;
    linkExtraURL?: string;
  }>;
  listaArtistasManual: Array<{
    _key: string;
    linkListaArtistasManual: string;
    nomeListaArtistasManual_pt: string;
  }>;
  localNome: string;
  localMorada: string;
  outroDetalhe1_en: string;
  outroDetalhe1_pt: string;
  outroDetalhe2_en: string;
  outroDetalhe2_pt: string;
  outroDetalhe3_en: string;
  outroDetalhe3_pt: string;
  slug: string;
  localURLExterno?: string;
  textoDatas_en: string;
  textoDatas_pt: string;
  texto_en: Array<{
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
  texto_pt: Array<{
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
  tipo_en: Array<string>;
  tipo_pt: Array<string>;
  titulo_en: string;
  titulo_pt: string;
  _id: string;
}

export type ShortEventType = {
  categoria_en: string;
  categoria_pt: string;
  datas: Array<{
    dataInicial: string;
    dataFinal: string;
  }>;
  horarioCurto_en: string;
  horarioCurto_pt: string;
  horarioLongo_en: string;
  horarioLongo_pt: string;
  imagemDestaque: {
    asset: {
      url: string;
    };
  };
  localNome: string;
  slug: string;
  textoDatas_en: string;
  textoDatas_pt: string;
  tipo_en: Array<string>;
  tipo_pt: Array<string>;
  titulo_en: string;
  titulo_pt: string;
}

export type HighlightedVenueType = {
  posicao:string;
  venue: VenueType;
};

export type HighlightEventInfo = {
  categoria_en:string;
  categoria_pt:string;
  localNome:string;
  titulo_pt:string;
  titulo_en:string;
  slug:string;
  datas: {
    dataInicial: string;
    dataFinal: string;
  }[];
  imagemDestaque: {
    asset: {
      url: string;
    };
  };
}