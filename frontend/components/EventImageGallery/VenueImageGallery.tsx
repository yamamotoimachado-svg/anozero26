import React, { useState } from "react";
import { HighlightedVenueType, HighlightEventInfo, ShortEventType } from "@/utils/sanity/types/event";
import { useRouter } from "next/router";
import styles from "./EventImageGallery.module.css";
import classNames from "classnames";
import Link from "next/link";
import { parse, format } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { VenueType } from "@/utils/sanity/types/venue";

const findClosestDateIndex = (event: HighlightEventInfo) => {
  const today = new Date();
  return event.datas.reduce((closestIndex, currentData, index) => {
    const currentDataDate = new Date(currentData.dataInicial);
    const closestDataDate = new Date(event.datas[closestIndex].dataInicial);

    if (Math.abs(today.getTime() - currentDataDate.getTime()) < Math.abs(today.getTime() - closestDataDate.getTime())) {
      return index;
    } else {
      return closestIndex;
    }
  }, 0);
}

const convertDateFormat = (dateStr: string, localeStr?: string) => {
  if(!dateStr) return;

  if (!localeStr) {
    localeStr = 'pt';
  }

  const locales = { 'en': enUS, 'pt': ptBR };
  // @ts-ignore
  const locale = locales[localeStr];

  const date = parse(dateStr, "yyyy-MM-dd", new Date());

  const formattedDate = format(date, "dd MMMM", { locale });
  const formattedYear = format(date, "yyyy", { locale });

  return [formattedDate, formattedYear];
}

const VenueImageGallery = (props:{ venues: Array<VenueType>}) => {
  const { locale } = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [overIndex, setOverIndex] = useState<undefined | number>(undefined);

const handleOnHover = (index: number) => {
  setIsHovered(true);
  setOverIndex(index)
}

const handleLeave = () => {
  setIsHovered(false);
  setOverIndex(undefined);
}

  return (
    <div className="md:flex md:flex-wrap">
      {props.venues.map((venue, index) => {

          return <div key={index} className="relative md:basis-[100%] [&:not(:first-child)]:basis-1/2 imageContainer" onMouseEnter={() => handleOnHover(index)}
                      onMouseLeave={() => handleLeave()}>
            <Link href={`/${locale}/espaco/${venue?.slug}`}>
              <div className="relative h-[200px] md:h-[288px]">
                <Image
                  src={venue?.fotoPrincipalDesktop?.asset?.url}
                  layout="fill"
                  objectFit="cover"
                  alt={venue?.nome}
                  className={`object-cover nextImageAd ${isHovered && overIndex === index ? "" : "imageFilter"}`}
                />
              </div>

              <div
                className="absolute flex flex-col gap-[5px] justify-center text-center text-nightGreen text-[2.094rem] leading-[2.094rem] top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 uppercase w-[90%]">
                <p
                  className={classNames("italic")}>{venue?.nome}</p>

              </div>
            </Link>
          </div>
        }
      )}
    </div>
  );
}

export default VenueImageGallery;
