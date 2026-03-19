export type Asset = {
  url: string;
};

export type Image = {
  asset: Asset;
};

export type relatedArtist ={
    foto: {
      asset: {
        url: string;
      };
    };
    id: string;
    primeiroNome: string;
    ultimoNome: string;
    slug: string;
};

export type PartnerType = {
  posicao: number;
  descricao_pt: string;
  descricao_en: string;
  logos: {
    link: string;
    logo: string;
    entidade: string;
  }[]
}