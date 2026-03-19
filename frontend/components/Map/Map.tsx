// @ts-nocheck
import React from "react";
import { useTranslations } from "next-intl";
import { MapSvg } from "@/components/Map/MapSvg";
import { MapLocations } from "@/components/Map/MapLocations";
import { venuesList } from "@/utils/venues";
import { useRouter } from "next/router";
import { NewMap } from "@/components/Map/NewMap";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import mapDesk from "@/public/images/mapDesk.png";
import Link from "next/link";
import Image from "next/image";

type MapProps = {
  venues: VenueType[];
  isAnchorFlow?: boolean;
};

const Map = (props: MapProps) => {
  const { locale } = useRouter();
  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  // const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const handleWheel = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className=" relative ">
        {/*<MapSvg />*/}
        {/*<div*/}
        {/*  className="z-2 absolute top-0 w-full"*/}
        {/*  style={{ padding: "4.4% 8.6% 15.68% 10.76%" }}*/}
        {/*>*/}
        {/*  <MapLocations />*/}
        {/*</div>*/}

        <div className="hidden md:block">
          <Image src={"/images/mapDesktopTemp.svg"} alt="Map for desktop" width={800} height={600} />
        </div>
        <div className="block md:hidden">
          <Image src={"/images/mapMobileTemp.svg"} alt="Map for mobile" width={400} height={300} />
        </div>
      </div>
      <div className="m-2 flex gap-2 overflow-x-scroll whitespace-nowrap text-white hideScrollBar">
        {props.venues.map((venue, index: number) => (
          <Link
            href={
              !props?.isAnchorFlow
                ? `/${locale}/espaco/${venue.slug}`
                : `#${venue.slug}`
            }
            className="flex min-w-96 md:min-w-[auto]"
            key={`venue-${index}-${venue.nome}`}
            scroll={props?.isAnchorFlow ? false : true}
          >
            <div>
              <p className="az-text-title bg-nightBlue px-[0.475rem] pt-[0.15rem] text-nightGreen md:bg-nightGreen  md:px-[0.9rem] md:py-[0.375rem] md:text-nightBlue ">
                {index + 1}
              </p>
            </div>
            <div className="w-full ">
              <p className=" az-text-title bg-nightGreen px-[0.475rem] pt-[0.15rem]  uppercase text-nightBlue md:bg-nightBlue md:px-[0.9rem] md:py-[0.375rem] md:text-nightGreen">
                {venue.nome}
              </p>
              <div className="whitespace-pre-wrap py-1 pl-1 text-[1.125rem] font-medium text-nightGreen md:text-nightBlue">
                <p>{venue.endereco1}</p>
                <p className="min-h-4 whitespace-pre-wrap">{venue.endereco2}</p>
                <p className="whitespace-pre-wrap uppercase">
                  {locale === "pt" ? venue.horario_pt : venue.horario_en}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Map;
