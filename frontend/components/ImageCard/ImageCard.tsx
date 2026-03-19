import React, { useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./ImageCard.module.css";
import classNames from "classnames";
import { GetStaticPropsContext } from "next";
import { ShortEventType } from "@/utils/sanity/types/event";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from 'react';

export interface LocaleProps {
  categoria_pt: string;
  categoria_en: string;
  [key: string]: any; // for other properties
}

type ImageCardType = {
  event: ShortEventType;
  hideCategories?: boolean;
};

function getWordBasedOnLocale(locale?: string, event?: any) {
  if (locale === "pt") {
    const words = event.categoria_pt?.split(" ");
    return words?.pop()?.toUpperCase();
  } else {
    // Split the string into words and return the first word
    return event.categoria_en?.split(" ")[0];
  }
}

const ImageCard = (props: ImageCardType) => {
  const { locale } = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("common");
  const imageChipsClassnames = "uppercase leading-none text-[1rem] text-wrap";

  let category = getWordBasedOnLocale(locale, props.event);
  if (category.toUpperCase() === "BIENAL"){
    category=undefined;
  }

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const textElement = textRef.current;

    function adjustFontSize() {
      if(!textElement) return;
      const parentWidth = textElement?.parentElement?.offsetWidth;
      const fontSize = parentWidth && parentWidth * 0.145; // Adjust the multiplier as needed
      textElement.style.fontSize = `${fontSize}px`;
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, []);


  // @ts-ignore
  return (
    <Link
      href={`/${locale}/evento/${props.event.slug}`}
      className="relative mb-6 basis-1/2 md:max-w-[256px] md:flex-grow md:basis-1/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="imageContainer relative overflow-hidden">
        <div className="relative h-[256px] md:h-[300px]">
          <Image
            src={props.event.imagemDestaque?.asset.url}
            layout="fill"
            objectFit="cover"
            alt={locale === "pt" ? props.event.titulo_pt : props.event.titulo_en}
            className={`object-cover nextImageAd ${isHovered ? "" : "imageFilter"}`}
          />
        </div>
        {/*<img*/}
        {/*  src={props.event.imagemDestaque?.asset.url}*/}
        {/*  className={` w-full object-cover  md:w-full ${isHovered ? "" : "imageFilter"}`}*/}
        {/*/>*/}
        <div ref={textRef} className={classNames(styles.charsWrapper, "text-nightGreen", "growText", "imageProgrameText italic uppercase text-wrap")}>
          {category && category}
        </div>
        
      </div>
      {!props.hideCategories && (
        <div
          className="absolute left-2/4 top-4 flex w-[90%] -translate-x-1/2 flex-col justify-center gap-[5px] text-center text-nightGreen">
          {/*<small className={imageChipsClassnames}>*/}
          {/*  {(props.event as LocaleProps)[`categoria_${locale}`]}*/}
          {/*</small>*/}
          <small className={imageChipsClassnames}>
            {locale === "pt"
              ? props.event?.tipo_pt && props.event?.tipo_pt[0]
              : props.event?.tipo_en && props.event?.tipo_en[0]}
          </small>
          <small className={imageChipsClassnames}>
            {props.event.localNome}
          </small>

        </div>
      )}

      <div className="mt-2 px-[0.5rem] text-center text-nightGreen">
      <p className=" text-[1.125rem] uppercase italic leading-[1.35rem] text-wrap">
          {locale === "pt" ? props.event.titulo_pt : props.event.titulo_en}
        </p>
        {/*<p className="text-[1.125rem] leading-[1.35rem] uppercase">{props.event.datas[0].dataInicial}</p>*/}
        <p className="text-[1.125rem] uppercase leading-[1.35rem] text-wrap">
          {`${locale === "pt" ? props.event?.textoDatas_pt
            : props.event?.textoDatas_en}, ${locale === "pt" ? props.event.horarioCurto_pt : props.event.horarioCurto_en}`}
        </p>

      </div>
    </Link>
);
};

export default ImageCard;
