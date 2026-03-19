import React, { useState } from "react";
import { ArtistCardProps } from "@/types/Artists";
import styles from "./ArtistCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { relatedArtist } from "@/utils/sanity/types/common";
import Image from "next/image";



const ArtistCard = (props: relatedArtist) => {
  const { locale } = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/${locale}/artista/${props.slug}`}
      className="relative basis-1/2 md:w-[256px] md:basis-auto imageContainer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.foto && (
        <Image
          src={props.foto.asset.url}
          layout="fill"
          objectFit="cover"
          alt={`${props.primeiroNome} ${props.ultimoNome} foto`}
          className={`nextImageAd ${isHovered ? "" : "imageFilter"}`}
        />
        // <img
        //   className={`${isHovered ? "" : "imageFilter"}`}
        //   src={props.foto.asset.url}
        //   alt={`${props.primeiroNome} ${props.ultimoNome} foto`}
        // />
      )}
      <div className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 text-nightGreen text-[1.125rem] leading-[1.35rem] uppercase text-center">
        <p>{props.primeiroNome}</p>
        <p>{props.ultimoNome}</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
