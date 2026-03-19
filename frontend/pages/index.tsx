import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/PageLayout";
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

export default function Index(props: {
  partners: Array<PartnerType>;
  newsletter: string;
  phantomText: string;
  curTitle: string;
  curTitleEn: string;
}) {
  const t = useTranslations("homeScreen");
  const { locale } = useRouter();

  const buttonClass =
    "flex items-center justify-center w-[13rem] h-[13rem] text-black font-bold text-[1.15rem] uppercase text-center leading-snug px-4 border border-black/20 hover:opacity-90 transition-opacity";

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter}>
      {/* Hero */}
      <div className="relative mx-4 w-auto aspect-[16/7] bg-white overflow-hidden md:mx-6">
        <Image
          src={heroCompleto}
          alt="Anozero 26"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Curatorial text section */}
      <div className="pt-[119px] px-6 text-center">
        <h2 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold uppercase leading-tigh title">
          {props.curTitle}
        </h2>
        {props.curTitleEn && (
          <p className="text-black uppercase text-sm md:text-base mt-2 subtitle">
            {props.curTitleEn}
          </p>
        )}
        <p className="mt-10 text-black max-w-[1000px] mx-auto text-center txtDestaque">
          {props.phantomText}
        </p>
        <Link
          href="/textoCuratorial"
          className="mt-8 inline-block text-black uppercase underline underline-offset-4 transition-colors bebasReadMore"
        >
          {t("readMore")}
        </Link>
        <div className="mt-8 flex flex-wrap justify-center gap-4 mb-[119px]">
          <HomeActionButton
            href={`/${locale}/sobre-o-ano-zero`}
            hoverBgImage={require("@/assets/imgSite/botaohover.webp")}
            pressBgImage={require("@/assets/imgSite/botaopress.webp")}
          >
            {t("about")}
          </HomeActionButton>
          <HomeActionButton
            href={props.newsletter || "#"}
            external
            hoverBgImage={require("@/assets/imgSite/botaohover2.webp")}
            pressBgImage={require("@/assets/imgSite/botaopress2.webp")}
          >
            {t("newsletter")}
          </HomeActionButton>
          <HomeActionButton
            href="#"
            hoverBgImage={require("@/assets/imgSite/botaohover3.webp")}
            pressBgImage={require("@/assets/imgSite/botaopress3.webp")}
          >
            {t("mediaKit")}
          </HomeActionButton>
        </div>
      </div>
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
