import { ShortEventType } from "@/utils/sanity/types/event";

export type ArtistType = {
  _id: string;
  primeiroNome: string;
  ultimoNome: string;
  bioA_en: string;
  bioA_pt: string;
  bioC_en: string;
  bioC_pt: string;
  bioB_pt: string;
  bioB_en: string;
  dataNascimento: string;
  dataMorte: string;
  foto: {
    asset: {
      url: string;
    };
  };
  espacosRelacionados: Array<{
    slug: string;
    nome: string;
    fotoPrincipalDesktop: {
      asset: {
        url: string;
      };
    };
  }>
  linkExterno: string;
  nacionalidade_en: string;
  nacionalidade_pt: string;
  video: {
    legenda_pt: string;
    videoURL: string;
    legenda_en: string;

  };
  galeriaImagens: {
    legenda_en: string;
    legenda_pt: string;
    asset: {
      url: string;
    };
  }[];
  eventosRelacionados: Array<ShortEventType>;
  slug: string;
};
