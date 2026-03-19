// Removed for site simplification
// This file is no longer needed as part of the site structure.
// Please refer to index.tsx for the home page.
// @ts-nocheck
import React from "react";
import { useRouter } from "next/router";
import PageLayout from "@/components/PageLayout";
import { GetStaticPaths, GetStaticPropsContext } from "next";

import {
  artistsSlugsQuery,
  getArtistBySlug,
} from "@/utils/sanity/queries/artistsQueries";
import { ArtistType } from "@/utils/sanity/types/artist";
import Link from "next/link";
import classNames from "classnames";
import styles from "@/components/ImageCard/ImageCard.module.css";
import ImageCard, { LocaleProps } from "@/components/ImageCard/ImageCard";
import { useTranslations } from "next-intl";
import {
  getFooterIcons,
  getLinkNewsletter,
} from "@/utils/sanity/queries/miscQueries";
import { PartnerType } from "@/utils/sanity/types/common";
import CustomPortableText from "@/components/PortableText/PortableText";
import Image from "next/image";

const extractYoutubeVideoId = (url) => {
  let videoId = null;

  if (url.includes("youtu.be")) {
    // Extract videoId for 'youtu.be' format
    videoId = url.split("youtu.be/")[1];
  } else {
    // Extract videoId for 'youtube.com' format
    const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
    const match = url.match(regex);
    videoId = match ? match[1] : null;
  }

  return videoId;
};

const YoutubeEmbed = ({ youtubeLink, title }) => {
  const videoID = extractYoutubeVideoId(youtubeLink);

  let embedlink = "https://www.youtube.com/embed/" + videoID;



  return (
    <div className="relative h-0 overflow-hidden pb-[56.25%]">
      <iframe
        className={"t-0 l-0 absolute h-full w-full"}
        src={`${embedlink}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

const Artista = (props: {
  artist: ArtistType;
  partners: Array<PartnerType>;
  newsletter: string;
}) => {
  const artist = props.artist;
  const { locale } = useRouter();
  const t = useTranslations("common");

  return (
    <PageLayout
      partners={props.partners}
      newsLetterLink={props.newsletter}
      tWClass="pb-[10rem]"
    >
      <div className="relative z-[0] h-[100px] overflow-hidden md:h-[160px]">
        <h2 className="relative top-2/4 z-[1] -translate-y-2/4  hyphens-auto text-wrap pb-2 text-center text-[2.031rem] uppercase leading-[2.031rem] text-nightGreen md:text-[4.063rem] md:leading-[4.063rem]">
          <p>{artist?.primeiroNome}</p>
          <p>{artist?.ultimoNome}</p>
        </h2>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center ">
          <p
            className="scroll-text text-nowrap text-[5.25rem] uppercase italic leading-[5.25rem] text-nightBlue md:top-20  md:text-[10.063rem] md:leading-[8.151rem] ">
            {artist?.primeiroNome} {artist?.ultimoNome}</p>
        </div>
      </div>

      <div className="">
        <div className="imageContainerGreen flex overflow-hidden">
          {new Array(3).fill("").map((_, index) => (
            <Image
              key={index}
              src={artist?.foto?.asset?.url}
              className="imageFilter w-1/3 object-contain"
              alt={`Artist photo ${index}`}
              width={300} // Adjust width as needed
              height={300} // Adjust height as needed
            />
          ))}
        </div>
        <p className="mb-4 mt-8 block text-center text-base font-medium uppercase italic leading-none text-nightBlue md:mx-auto md:w-1/2">
          {artist?.[`nacionalidade_${locale}`]}, {artist?.dataNascimento} {" "}
          {artist?.dataMorte && ` - ${artist?.dataMorte}`}
        </p>
        <div className="portable-text mx-4 mb-[80px] text-wrap text-[1.25rem] leading-[1.5rem] text-nightGreen md:mx-auto md:w-8/12 xl:w-6/12">
          <CustomPortableText value={artist?.[`bioA_${locale}`]} />
          <br />
          <CustomPortableText value={artist?.[`bioB_${locale}`]} />
        </div>
        {artist?.galeriaImagens && (
          <div className="mb-[80px]">
            <div className="overflow-x-auto whitespace-nowrap  md:overflow-auto  hideScrollBar">
              {artist?.galeriaImagens.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="relative mr-6 inline-block max-h-[280px] md:max-h-[640px] max-w-[270px] md:max-w-full align-top"
                  >
                    <Image
                      className="h-[190px] object-contain object-center md:h-[600px] "
                      src={image.asset.url}
                      alt={`${artist.primeiroNome} gallery image`}
                      width={270} // Adjust width as needed
                      height={190} // Adjust height as needed
                    />
                    <p className="ml-[0.938rem] mt-[0.3rem] text-[1.125rem] leading-[1.35rem] text-nightGreen text-wrap">
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

        {artist?.espacosRelacionados?.map((venue, index) => (
          <div
            key={index}
            className="imageContainer relative mx-4 mb-6 md:mx-auto md:w-8/12 xl:w-6/12 [&:not(:first-child)]:basis-1/2"
          >
            <Link href={`/${locale}/espaco/${venue.slug.current}`}>
              <Image
                src={venue.fotoPrincipalDesktop?.asset?.url}
                alt={venue.nome}
                width={800} // Adjust width as needed
                height={600} // Adjust height as needed
              />
              <div
                className="absolute left-2/4 top-2/4 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center
             justify-center text-center text-nightGreen"
              >
                <p className="mx-10 text-[2.313rem] uppercase leading-[2.313rem]">
                  {venue.nome}
                </p>
              </div>
            </Link>
          </div>
        ))}

        <div className="mx-4 mb-6 text-wrap text-[1.25rem] leading-[1.5rem] text-nightGreen md:mx-auto md:w-8/12 xl:w-6/12">
          <CustomPortableText value={artist?.[`bioC_${locale}`]} />
        </div>

        {artist?.video && artist?.video?.videoURL && (
          <div className="mt-[80px]">
            <YoutubeEmbed
              youtubeLink={artist?.video.videoURL}
              title={artist.primeiroNome}
            />
            <p className="ml-[0.938rem] mt-[0.3rem] text-[1.125rem] leading-[1.35rem] text-nightGreen">
              {locale && locale === "pt"
                ? artist.video.legenda_pt
                : artist.video.legenda_en}
            </p>
          </div>
        )}

        {artist?.eventosRelacionados && (
          <div className="mt-[80px]">
            <h2 className="m-auto mb-10 text-center text-[2.094rem] uppercase italic leading-[2.094rem] text-nightGreen">
              {t("events")}
            </h2>
            <div className="flex  overflow-x-auto whitespace-nowrap md:flex-wrap md:justify-center">
              {artist.eventosRelacionados.map((relatedEvent, index) => {
                return (
                <ImageCard
                  key={index}
                  event={relatedEvent}
                  hideCategories={props.hideCategories}
                ></ImageCard>);
              })}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Artista;

export async function getStaticPaths() {
  const artists = await artistsSlugsQuery();

  const slugsWithLocales = artists.map((slug: any) => [
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
  const queryParams = { slug: params };

  const artist = await getArtistBySlug(params?.slug as string);
  const partners = await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();
  // let messages;
  // try {
  //   messages = (await import(`@/i18n/${locale}.json`)).default;
  // } catch (error) {
  //   // console.error(`Failed to load messages for locale "${locale}":`, error);
  //   // Fallback to default locale or empty messages
  //   messages = {};
  // }

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      artist: artist,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter,
    },
  };
}
