import React from "react";
import { GetStaticPropsContext } from "next";
import { VenueType } from "@/utils/sanity/types/venue";
import { getVenues } from "@/utils/sanity/queries/venueQueries";
import { getFooterIcons, getLinkNewsletter, getVisitContent } from "@/utils/sanity/queries/miscQueries";
import PageLayout from "@/components/PageLayout";
import { PartnerType } from "@/utils/sanity/types/common";
import { useRouter } from "next/router";
import CustomPortableText from "@/components/PortableText/PortableText";

const Visitar = (props: { data: any, partners:Array<PartnerType>, newsletter : string }) => {
  const { locale } = useRouter();

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter}>
      <div className="mt-4  text-nightGreen  ">
        <h2 className="text-[2.094rem] leading-[2.094rem] text-center italic uppercase my-[2.5rem] md:text-center">{locale === "pt" ? props.data.titulo_pt : props.data.titulo_pt}</h2>
      </div>
      <div className="text-nightGreen portable-text mx-[20%] mb-[1rem] ">
        <CustomPortableText   value={locale === "pt" ? props.data.conteudo_pt : props.data.conteudo_en}/>
      </div>
      </PageLayout>
);
};

export default Visitar;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const data: VenueType[] = await getVisitContent();
  const partners =  await getFooterIcons();
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