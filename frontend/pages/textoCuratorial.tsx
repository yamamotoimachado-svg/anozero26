import PageLayout from "@/components/PageLayout";
import  TextoCuratorialContent  from "@/components/TextoCuratorialContent";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

import heroCompleto from "@/assets/imgSite/hero_completo.webp";
import Link from "next/link";
import HomeActionButton from "@/components/HomeActionButton";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getFooterIcons,
  getLinkNewsletter,
} from "@/utils/sanity/queries/miscQueries";
import { PartnerType } from "@/utils/sanity/types/common";
import { getFantasma } from "@/utils/sanity/queries/textPagesQueries";

export default function TextoCuratorial(props: { 
   partners: Array<PartnerType>; }) {
  
  
  return (
    <PageLayout partners={props.partners}>
      <TextoCuratorialContent />
    </PageLayout>
  );
  }


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const dummyPartnersFile = await import("@/dummy/partners.json").then(
    (m) => m.default,
  );

  const partners = await getFooterIcons().catch(() => undefined);
  const newsletterlink = await getLinkNewsletter().catch(() => ({
    linkNewsletter: "",
  }));
  const phantomInfo = await getFantasma().catch(() => undefined);

  const fallbackPartners = [
    {
      posicao: 1,
      descricao_pt: "Parceiros",
      descricao_en: "Partners",
      logos: (dummyPartnersFile?.partners || []).map((p: any) => ({
        link: "",
        logo: p.img,
        entidade: p.name,
      })),
    },
  ];

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default || {},
      partners: partners?.sections || fallbackPartners,
      newsletter: newsletterlink?.linkNewsletter || "",
      phantomText:
        phantomInfo?.[`excerto_${locale}`] ||
        "Com curadoria de Hans Ibelings e John Zeppetelli, e curadoria assistente de Daniel Madeira, a bienal parte do termo proto-indo-europeu *ghabh — origem da palavra «habitat» — para explorar as ideias de segurar, dar e receber como gestos fundamentais da experiência artística e social.",
      curTitle: phantomInfo?.tituloPopup_pt || "Segurar, Dar, Receber",
      curTitleEn: phantomInfo?.tituloPopup_en || "To Hold, To Give, To Receive",
    },
  };
}

