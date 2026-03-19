import React from "react";
import Link from "next/link";
import { ArtistCardProps } from "@/types/Artists";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { relatedArtist } from "@/utils/sanity/types/common";
import { useRouter } from "next/router";
import { ArtistType } from "@/utils/sanity/types/artist";


type VenueProps = {
  index: string;
  name: string;
  address: string;
  schedule: string;
  schedule2: string;
  link?: string;
  artists: relatedArtist[];
  slug: string;
  id?:string;
};

const VenueSummary = (props: VenueProps) => {
  const t = useTranslations("common");
  const { locale } = useRouter();

  return (
    <div className="relative mt-20 text-center uppercase text-nightGreen az-text-18" id={props?.slug}>

      <div className="relative mx-4">
        <h2
          className="md:top-10 z-[0] italic text-[2.094rem] leading-[2.094rem] text-nightBlue md:absolute md:left-2/4 md:-translate-x-1/2 md:text-[9rem] ">
          {props.index}
        </h2>
        <h2
          className="scroll-m-20 italic tracking-tight z-[1] relative text-[2.094rem] leading-[2.094rem] md:text-[2.313rem] md:leading-[2.313rem] ">{props.name}</h2>
        <h3
          className=" scroll-m-20 tracking-tight z-[1] relative text-[2.094rem] leading-[2.094rem] md:text-[2.313rem] md:leading-[2.313rem] ">{props.address}</h3>
        <h3
          className="m-auto  max-w-96 md:max-w-[98%] scroll-m-20 whitespace-pre-wrap tracking-tight z-[1] relative text-[2.094rem] leading-[2.094rem] md:text-[2.313rem] md:leading-[2.313rem]">
          {props.schedule}
        </h3>
        <h3
          className="m-auto  max-w-96 md:max-w-[98%] scroll-m-20 whitespace-pre-wrap tracking-tight z-[1] text-nightBlue relative hidden md:block text-[1.25rem] leading-[1.5rem]">
          {props.schedule2}
        </h3>
        <h2
          className="hidden md:block md:top-10 z-[1] opacity-30 italic text-[2.094rem] leading-[2.094rem] text-nightBlue md:absolute md:left-2/4 md:-translate-x-1/2 md:text-[9rem] ">
          {props.index}
        </h2>
        <h3 className="mb-[2rem] mt-[1.25rem] scroll-m-20 tracking-tight">
          <Link href={`/${locale}/espaco/${props.slug}`}>{t("knowMore")} </Link>
        </h3>

      </div>

      <div className="flex flex-wrap justify-center">
        {props.artists.map((artist: relatedArtist, index: number) => {
          return (
            <ArtistCard
              key={index}
              id={artist.id}
              foto={artist.foto}
              primeiroNome={artist.primeiroNome}
              ultimoNome={artist.ultimoNome}
              slug={artist.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
    },
  };
}

export default VenueSummary;
