import React from "react";
import { useRouter } from "next/router";
import PageLayout from "@/components/PageLayout";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import {
  getEventBySlug,
  getEventsSlugsQuery,
} from "@/utils/sanity/queries/eventQueries";
import { EventType } from "@/utils/sanity/types/event";
import Link from "next/link";
import ImageCard, { LocaleProps } from "@/components/ImageCard/ImageCard";
import classNames from "classnames";
import styles from "@/components/ImageCard/ImageCard.module.css";
import { PartnerType } from "@/utils/sanity/types/common";
import {
  getFooterIcons,
  getLinkNewsletter,
} from "@/utils/sanity/queries/miscQueries";
import CustomPortableText from "@/components/PortableText/PortableText";
import Image from "next/image";

const Event = (props: {
  event: EventType;
  partners: Array<PartnerType>;
  newsletter: string;
}) => {
  const event = props.event;
  const locale = useRouter().locale;
  const t = useTranslations("eventDetails");

  const eventTypes = locale && locale === "pt"
    ? event?.tipo_pt
    : event?.tipo_en

  return (
    <PageLayout
      partners={props.partners}
      newsLetterLink={props.newsletter}
      tWClass="pb-[8.25rem]"
    >
      <div className=" relative flex items-center justify-center overflow-hidden">
        <div className="imageContainer mb-4 w-full">
          <Image
            src={event?.imagemDestaque?.asset.url}
            className="imageFilter h-full w-full object-cover md:h-[288px]"
            alt={locale === "pt" ? event?.titulo_pt : event?.titulo_en || "Event image"}
            width={1920} // Adjust width as needed
            height={1080} // Adjust height as needed
          />
        </div>
        <div className="absolute top-3 gap-1 flex md:block flex-col">
          <div className="flex flex-wrap gap-1 md:gap-4 justify-center mx-4 flex-col md:flex-row">
            <small className="block text-center text-[1rem] uppercase leading-[1.2rem] text-nightGreen">
              {locale && locale === "pt"
                ? event?.outroDetalhe3_pt
                : event?.outroDetalhe3_en}
            </small>
            <small className="block text-center  text-[1rem] uppercase leading-[1.2rem] text-nightGreen">
              {locale && locale === "pt"
                ? event?.categoria_pt
                : event?.categoria_en}
            </small>
            {eventTypes && eventTypes.map((type, index) => {
              return (
                <small key={index} className="block text-center  text-[1rem] uppercase leading-[1.2rem] text-nightGreen">
                  {type}
                </small>
              )})}
          </div>
          <small className="block text-center  text-[1rem] uppercase leading-[1.2rem] text-nightGreen">
            {event?.localNome}
          </small>
        </div>
      </div>
      <div className="relative z-[0] h-[200px] overflow-hidden md:h-[300px]">
        <h2 className="relative top-2/4 z-[1] -translate-y-2/4 text-wrap text-center text-[2.031rem] uppercase leading-[2.031rem] text-nightGreen md:text-[4.063rem] md:leading-[4.063rem] ">
          {locale && locale === "pt" ? event?.titulo_pt : event?.titulo_en}
        </h2>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center ">
          <p className="scroll-text text-nowrap text-[5.25rem] uppercase italic leading-[5.25rem] text-nightBlue md:top-20  md:text-[10.063rem] md:leading-[8.151rem] ">{locale && locale === "pt" ? event?.titulo_pt : event?.titulo_en}</p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row">
        <div className="hidden md:block basis-3/12"></div>
        <div className="md:grow-[2]">
          <div className="text-center text-[1.25rem] leading-[1.5rem] text-nightGreen mx-4 md:mx-auto">
            <div className="uppercase">
              <p>{locale && locale === "pt"
                ? event?.textoDatas_pt
                : event?.textoDatas_en}, {locale && locale === "pt"
                ? event?.horarioLongo_pt
                : event?.horarioLongo_en}</p>

            </div>
            <div>
              {event?.localURLExterno
                ? <Link href={event.localURLExterno}
                        className="text-[1.25rem] uppercase leading-[1.5rem]"> {event?.localNome} </Link>
                : <p className="text-[1.25rem] uppercase leading-[1.5rem]">
                  {event?.localNome}
                </p>}
              {event?.localMorada}
            </div>
            <div className="flex justify-center gap-4 text-[1.25rem] leading-[1.5rem]">
              {event?.outroDetalhe1_pt && (
                <span>
              {locale && locale === "pt"
                ? event?.outroDetalhe1_pt
                : event?.outroDetalhe1_en}
            </span>
              )}
              {event?.outroDetalhe2_pt && (
                <span>
              {locale && locale === "pt"
                ? event?.outroDetalhe2_pt
                : event?.outroDetalhe2_en}
            </span>
              )}
              {event?.outroDetalhe3_pt && (
                <span>
              {locale && locale === "pt"
                ? event?.outroDetalhe3_pt
                : event?.outroDetalhe3_en}
            </span>
              )}
            </div>
          </div>
        </div>
        <div className="basis-3/12 flex flex-col mb-8 md:mb-0">
          {props.event?.linksExtra && props.event?.linksExtra.map((link, index) => {
            if(!link?.linkExtraURL) {
              return
            }

            return (
              <div key={index} className="text-[1.25rem] leading-[1.5rem] text-nightGreen mx-4 md:mx-auto uppercase pr-[10px]">
                <Link href={link?.linkExtraURL} target="_blank" >
                  {locale && locale === "pt"
                    ? link.linkExtraTexto_pt
                    : link.linkExtraTexto_en}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className=" portable-text mx-4 mb-6 mt-4 text-wrap text-[1.25rem] leading-[1.5rem] text-nightGreen md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText
          value={locale && locale === "pt" ? event?.texto_pt : event?.texto_en}
        />
      </div>

      {event?.listaArtistasManual && (
        <div className="mb-[80px] text-center text-[1.25rem] leading-[1.5rem] text-nightGreen">
          <p>{t("artistsList")}</p>
          {event?.listaArtistasManual?.map((artista) => {
            return (
              <div
                key={artista._key}
                className="text-[1.25rem] uppercase leading-[1.5rem]"
              >
                <a href={artista.linkListaArtistasManual} target="_blank" rel="noopener noreferrer">
                  {artista.nomeListaArtistasManual_pt}
                </a>
              </div>
            );
          })}
        </div>
      )}

      {event?.artistasRelacionados && (
        <div className="mb-[80px]">
          <h2 className="m-auto mb-10 text-center text-[2.094rem] uppercase leading-[2.094rem] text-nightGreen ">
            {t("relatedArtists")}
          </h2>
          <div
            className="overflow-x-auto whitespace-nowrap  md:flex md:flex-wrap md:justify-center md:overflow-auto md:whitespace-normal">
            {event.artistasRelacionados.map((artist, index) => {
              return (
                <Link
                  key={artist.slug}
                  href={`/${locale}/artista/${artist.slug}`}
                  className="imageContainer relative inline-block h-[200px] w-[170px] md:h-[300px] md:w-[256px]"
                >
                  {artist.foto && (
                    <img
                      className="imageFilter h-[200px] w-[170px] object-cover md:h-[300px] md:w-[256px]"
                      src={artist.foto.asset.url}
                      alt={`${artist.primeiroNome} ${artist.ultimoNome} foto`}
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

      {event?.eventosRelacionados && (
        <div className="mb-[80px]">
          <h2 className="m-auto mb-10 text-center text-[2.094rem] uppercase leading-[2.094rem] text-nightGreen ">
            {t("relatedEvents")}
          </h2>
          <div className="flex  overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center">
            {event.eventosRelacionados.map((relatedEvent, index) => {
              
              return (
                <ImageCard  key={index} event={relatedEvent} />
              );
            })}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Event;

export async function getStaticPaths() {
  const events = await getEventsSlugsQuery();

  const slugsWithLocales = events.map((slug: string) => [
    { params: { slug: slug }, locale: "pt" },
    { params: { slug: slug }, locale: "en" },
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
  const data = await getEventBySlug(params?.slug as string);
  const partners = await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      event: data,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter,
    },
  };
}
