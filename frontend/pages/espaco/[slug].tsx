import React from "react";
import { useRouter } from "next/router";
import PageLayout from "@/components/PageLayout";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { VenueType } from "@/utils/sanity/types/venue";
import {
  getVenueBySlug,
  getVenuesSlugsQuery,
} from "@/utils/sanity/queries/venueQueries";
import Link from "next/link";
import classNames from "classnames";
import styles from "@/components/ImageCard/ImageCard.module.css";
import ImageCard, { LocaleProps } from "@/components/ImageCard/ImageCard";
import { PartnerType } from "@/utils/sanity/types/common";
import {
  getFooterIcons,
  getLinkNewsletter,
} from "@/utils/sanity/queries/miscQueries";
import CustomPortableText from "@/components/PortableText/PortableText";
import Image from "next/image";

const Venue = (props: {
  data: VenueType;
  locale: string;
  partners: Array<PartnerType>;
  newsletter: string;
}) => {
  const venue = props.data;
  const locale = useRouter().locale;
  const t = useTranslations("venueDetails");
  
  return (
    <PageLayout
      partners={props.partners}
      newsLetterLink={props.newsletter}
      tWClass="pb-[8.25rem]"
    >
      <div className="relative z-[0] h-[100px] overflow-hidden md:h-[160px]">
        <h2 className="relative top-2/4 z-[1] -translate-y-2/4  text-wrap pb-2 text-center text-[2.031rem] uppercase leading-[2.031rem] text-nightGreen md:text-[4.063rem] md:leading-[4.063rem] ">
          {venue?.nome}
        </h2>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center ">
          <p
            className="scroll-text text-nowrap text-[5.25rem] uppercase italic leading-[5.25rem] text-nightBlue md:top-20  md:text-[10.063rem] md:leading-[8.151rem] ">
            {venue?.nome}</p>
        </div>
      </div>

      <div className="my-[16px] text-center  uppercase leading-[1.5rem] text-[1.25rem] text-nightBlue">
        <div>
          {venue?.endereco1}, {venue?.endereco2}
        </div>
        <div>
          <p>
            {locale && locale === "pt"
              ? venue?.horario1_pt
              : venue?.horario1_en}
          </p>
          <p>
            {locale && locale === "pt"
              ? venue?.horario2_pt
              : venue?.horario2_en}
          </p>
        </div>
      </div>
      <div className="mx-4 mb-[80px] mt-4 text-wrap text-[1.25rem] leading-[1.5rem] text-nightGreen md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText
          value={
            locale && locale === "pt" ? venue?.sinopse_pt : venue?.sinopse_en
          }
        />
      </div>

      {venue?.galeriaImagens && (
        <div className="mb-[80px]">
          <div className="overflow-x-auto whitespace-nowrap  md:overflow-auto">
            {venue.galeriaImagens.map((image, index) => {
              return (
                <div
                  key={index}
                  className="relative mr-6 inline-block h-[180px] w-[270px] md:h-[40vw] md:w-[70vw]"
                >
                  <Image
                    className="h-[180px] w-[270px] object-cover object-center md:h-[40vw] md:w-[70vw]"
                    src={image.asset.url}
                    alt={`${venue.nome} gallery image`}
                    width={270} // Adjust width as needed
                    height={180} // Adjust height as needed
                  />
                  <p className="ml-[0.938rem] mt-[0.3rem] text-[1.125rem] leading-[1.35rem] text-nightGreen">
                    {locale && locale === "pt"
                      ? image.legenda_pt
                      : image.legenda_en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {venue?.artistasRelacionados && (
        <div className="mb-[80px]">
          <h2 className="m-auto mb-10 text-center text-[2.094rem] uppercase italic leading-[2.094rem] text-nightGreen ">
            {t("artists")}
          </h2>
          <div className="overflow-x-auto whitespace-nowrap  md:flex md:flex-wrap md:justify-center md:overflow-auto md:whitespace-normal">
            {venue.artistasRelacionados.map((artist, index) => {
              return (
                <Link
                  key={artist.slug}
                  href={`/${locale}/artista/${artist.slug}`}
                  className="imageContainer relative inline-block h-[200px] w-[170px] md:h-[300px] md:w-[256px]"
                >
                  {artist.foto && (
                    <Image
                      className="imageFilter h-[200px] w-[170px] object-cover md:h-[300px] md:w-[256px]"
                      src={artist.foto.asset.url}
                      alt={`${artist.primeiroNome} ${artist.ultimoNome} foto`}
                      width={170} // Adjust width as needed
                      height={200} // Adjust height as needed
                    />
                  )}
                  <div className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 text-wrap text-center text-[1.125rem] uppercase leading-[1.35rem] text-nightGreen">
                    <p>{artist.primeiroNome}</p>
                    <p>{artist.ultimoNome}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {venue?.eventosRelacionados && (
        <div className="mb-[80px]">
          <h2 className="m-auto mb-10 text-center text-[2.094rem] uppercase leading-[2.094rem] text-nightGreen ">
            {t("events")}
          </h2>
          <div className="flex  overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center">
            {venue.eventosRelacionados.map((relatedEvent, index) => {
              return (
                <ImageCard
                  key={index}
                  event={relatedEvent}
                ></ImageCard>);
            })}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Venue;

export async function getStaticPaths() {
  const venues = await getVenuesSlugsQuery();

  const slugsWithLocales = venues.map((venue: VenueType) => [
    { params: { slug: venue }, locale: "pt" },
    { params: { slug: venue }, locale: "en" },
  ]);

  return {
    paths: slugsWithLocales.flat() || [],
    fallback: true,
  };
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const data = await getVenueBySlug(params?.slug as string);
  const partners = await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      data: data,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter,
    },
  };
}
