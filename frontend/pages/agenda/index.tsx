import React from "react";
import EventGallery from "@/components/EventGallery/EventGallery";
import { GetStaticPropsContext } from "next";
import PageLayout from "@/components/PageLayout";
import VenueImageGallery from "@/components/EventImageGallery/VenueImageGallery";
import { getEventBySlug, getEvents, getHighlightedEvents } from "@/utils/sanity/queries/eventQueries";
import { HighlightedVenueType, ShortEventType } from "@/utils/sanity/types/event";
import { getPastEvents, getUpcomingEvents } from "@/utils/agendaUtils";

import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { getFooterIcons, getLinkGuia, getLinkNewsletter } from "@/utils/sanity/queries/miscQueries";
import { PartnerType } from "@/utils/sanity/types/common";
import { VenueType } from "@/utils/sanity/types/venue";
import { getVenues } from "@/utils/sanity/queries/venueQueries";

const Agenda = (props: { events: Array<ShortEventType>, venues:Array<VenueType>, guideUrl: string,  newsletter : string, partners:Array<PartnerType>}) => {
  const router = useRouter();
  const t = useTranslations("events");
  const pastEvents = getPastEvents(props.events);
  const upcomingEvents = getUpcomingEvents(props.events);

  console.log("props", props.venues)

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter} tWClass="pb-[8.25rem]">
      <VenueImageGallery venues={props.venues} />
      <EventGallery title={t("agenda")} guideUrl={props.guideUrl} events={upcomingEvents} showFilters />
      <EventGallery title={t("pastEvents")} events={pastEvents} showFilters />
      </PageLayout>
  );
};


export async function getStaticProps({locale}: GetStaticPropsContext) {
    const events = await getEvents();
    const highlights = await getHighlightedEvents();
    const guideUrl = await getLinkGuia();
    const newsletterlink = await getLinkNewsletter();
    const partners =  await getFooterIcons();
    const data: VenueType[] = await getVenues();
   const orderedVenues = data.sort((a, b) => Number(a.numero) - Number(b.numero));

  events.forEach( (event: ShortEventType) => {
    event?.datas?.sort((a, b) => new Date(a.dataInicial).getTime() - new Date(b.dataInicial).getTime());
  });

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      events: events,
      highlights: highlights,
      guideUrl : guideUrl.linkGuia,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter,
      venues: orderedVenues,
    },
  };
}

export default Agenda;
