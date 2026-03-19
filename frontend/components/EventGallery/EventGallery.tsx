import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ImageCard from "@/components/ImageCard/ImageCard";
import Link from "next/link";
import classNames from "classnames";
import { ShortEventType } from "@/utils/sanity/types/event";
import { router } from "next/client";
import { useRouter } from "next/router";

type EventGalleryProps = {
  title: string;
  guideUrl?: string;
  showFilters: boolean;
  events: Array<ShortEventType>;
  hideCategories?: boolean;
};

enum EventCategory {
  BIENAL = "Bienal Programme",
  CONVERGENTE = "Convergent Programme",
  ARQUITECTURA = "Architecture Programme",
}

const EventGallery = (props: EventGalleryProps) => {
  const { locale } = useRouter();
  const t = useTranslations("events");
  const [filter, setFilter] = useState("");

  const filteredEvents = () => {
    if (!filter) {
      return props.events;
    }

    return props.events.filter(
      (event) => event.categoria_en.toUpperCase() === filter.toUpperCase(),
    );
  };

  const eventsArray = filteredEvents();

  return (
    <div className="mt-[80px]">
      <h2 className="mb-2 text-center text-[2.094rem] uppercase italic leading-[2.094rem] text-nightGreen">
        {props.title}
      </h2>
      {props.showFilters && (
        <div className="flex flex-col items-center justify-center hyphens-auto uppercase text-nightGreen md:flex-row  md:gap-4">
          <p
            className={classNames("cursor-pointer", {
              underline: filter !== "",
            })}
            onClick={() => setFilter("")}
          >
            {" "}
            {t("all")}
          </p>
          <p
            className={classNames("cursor-pointer", {
              underline: filter !== EventCategory.BIENAL,
            })}
            onClick={() => setFilter(EventCategory.BIENAL)}
          >
            {t("bienal")}
          </p>
          <p
            className={classNames("cursor-pointer", {
              underline: filter !== EventCategory.CONVERGENTE,
            })}
            onClick={() => setFilter(EventCategory.CONVERGENTE)}
          >
            {t("convergent")}
          </p>
          <p
            className={classNames("cursor-pointer", {
              underline: filter !== EventCategory.ARQUITECTURA,
            })}
            onClick={() => setFilter(EventCategory.ARQUITECTURA)}
          >
            {t("arquitecture")}
          </p>
        </div>
      )}

      {props.guideUrl && (
        <Link
          download
          href={props.guideUrl}
          className="m-auto mb-6 flex items-center justify-center gap-2 text-center uppercase text-nightGreen"
        >
          {t("guide")}
          <svg
            width="11"
            height="14"
            viewBox="0 0 11 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9.82C4.6 8.3 3.06 6.72 0.5 5.46L0.96 4.46L4.74 5.98V0H5.98V5.98L9.78 4.46L10.22 5.46C7.66 6.72 6.14 8.3 5.74 9.82H5ZM0 13.6V12.36H10.74V13.6H0Z"
              fill="#70CD5A"
            />
          </svg>
        </Link>
      )}
      <div className="mt-6 flex flex-wrap md:justify-center">
        {eventsArray.map((event, index) => {
          return (
            <ImageCard
              key={index}
              event={event}
              hideCategories={props.hideCategories}
            ></ImageCard>
          );
        })}
      </div>
    </div>
  );
};

export default EventGallery;
