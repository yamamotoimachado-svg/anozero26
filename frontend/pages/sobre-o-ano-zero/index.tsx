// @ts-nocheck
import React, { useRef } from "react";
import { GetStaticPropsContext } from "next";
import { VenueType } from "@/utils/sanity/types/venue";
import { getVenues } from "@/utils/sanity/queries/venueQueries";
import {
  getAboutAnoZero,
  getFooterIcons,
  getLinkNewsletter,
  getVisitContent
} from "@/utils/sanity/queries/miscQueries";
import PageLayout from "@/components/PageLayout";
import { PartnerType } from "@/utils/sanity/types/common";
import { useRouter } from "next/router";
import CustomPortableText from "@/components/PortableText/PortableText";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useDraggable } from "react-use-draggable-scroll";
import Image from "next/image";

const Visitar = (props: { data: any, partners:Array<PartnerType>, newsletter : string }) => {
  const { locale } = useRouter();
  const t = useTranslations("about");

  const ref = useRef();
  const { events } = useDraggable(ref);

  const handleWheel = (e:any) => {
    e.preventDefault();
  };

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter}>
      <div className="mt-4 text-nightGreen ">
        <h2
          className="text-[2.313rem] leading-[2.313rem] text-center italic uppercase my-[2.5rem] md:text-center">{t("title")}</h2>
      </div>
      <div className="text-nightGreen portable-text mx-[5%] md:mx-[20%] mb-[1rem] text-[1.25rem] leading-[1.5rem] ">
        <CustomPortableText value={locale === "pt" ? props.data.texto_pt : props.data.texto_en} />
      </div>
      <div className="uppercase text-nightGreen flex justify-center text-[1.25rem] leading-[1.5rem]"><Link
        href={props.data.url}> {t("visit")} <span className="text-[1.5rem] relative -top-[0.2rem] ml-[0.5rem]">↗</span>
      </Link></div>
      <div className="text-nightGreen mt-[10rem] ">
        <h2
          className="text-[2.313rem] leading-[2.313rem] text-center italic uppercase md:text-center">{t("organizers")}</h2>
      </div>
      <div className="flex flex-col md:flex-row md:max-w-[770px] justify-center items-center m-auto">
        {props.data.organizadores.map((organizador: any, index: number) => (
          <Link href={organizador.link} key={index} className="flex-grow min-w-[200px]">
            <Image alt={organizador.entidade} src={organizador.logo} width={200} height={200} />
          </Link>
        ))}
      </div>
      <div className="text-nightGreen mt-[10rem] ">
        <h2
          className="text-[2.313rem] leading-[2.313rem] mb-[2.5rem] text-center italic uppercase md:text-center">{t("edition")}</h2>
      </div>
      <div className={"flex overflow-x-scroll mb-[10rem] overflow-auto cursor-grab hideScrollBar"}  onWheel={handleWheel}
           {...events}
           ref={ref}>
        {props.data.edicoes.map((edicao: any, index: number) => (
          <div key={index} className=" uppercase text-center text-nightGreen flex justify-center text-[1.25rem] leading-[1.5rem]  flex-col  min-w-[40rem]">
            <p>{edicao.nome}</p>
            <p>{edicao.tema}</p>
            <p>{edicao.curadoria}</p>
            <Link href={edicao.link} className="flex items-center justify-center ">
              <span>{t("visit")}</span>
              <span className="text-[1.5rem] relative -top-[0.2rem] ml-[0.5rem]">↗</span> </Link>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Visitar;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const data = await getAboutAnoZero();
  const partners = await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default || {},
      data: data,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter
    },
  };
}