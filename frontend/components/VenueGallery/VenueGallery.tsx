import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ImageCard from "@/components/ImageCard/ImageCard";
import Link from "next/link";
import classNames from "classnames";
import { ShortEventType } from "@/utils/sanity/types/event";
import { router } from "next/client";
import { useRouter } from "next/router";
import { VenueType } from "@/utils/sanity/types/venue";
import Image from "next/image";
import styles from "@/components/ImageCard/ImageCard.module.css";

type VenueGalleryProps = {
  title: string;
  venues: VenueType[]
};

const VenueGallery = (props: VenueGalleryProps) => {
  const { locale } = useRouter();
  const t = useTranslations("events");
  const [isHoveredIndex, setIsHoveredIndex] = useState(-1);

  return (
    <div className="mt-[80px]">
      <h2 className="mb-2 text-center text-[2.094rem] uppercase italic leading-[2.094rem] text-nightGreen">
        {props.title}
      </h2>

      <div className="mt-6 flex flex-wrap md:justify-center">
        {props.venues.map((venue, index) => {
          return (
            <Link
              href={`/${locale}/espaco/${venue.slug}`}
              className="relative mb-6 basis-1/2 md:max-w-[256px] md:flex-grow md:basis-1/5"
              key={index}
              onMouseEnter={() => setIsHoveredIndex(index)}
              onMouseLeave={() => setIsHoveredIndex(-1)}
            >
              <div className="imageContainer relative overflow-hidden">
                <div className="relative h-[256px] md:h-[300px]">
                  <Image
                    src={venue.fotoPrincipalMobile.asset.url}
                    layout="fill"
                    objectFit="cover"
                    alt={venue.nome}
                    className={`object-cover nextImageAd ${isHoveredIndex === index ? "" : "imageFilter"}`}
                  />
                </div>

                {/*<div ref={textRef} className={classNames(styles.charsWrapper, "text-nightGreen", "growText", "imageProgrameText italic uppercase text-wrap")}>*/}
                {/*  {category && category}*/}
                {/*</div>*/}

              </div>
              <div className="mt-2 px-[0.5rem] text-center text-nightGreen">
                <p className=" text-[1.125rem] uppercase italic leading-[1.35rem] text-wrap">
                  {venue.nome}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VenueGallery;
