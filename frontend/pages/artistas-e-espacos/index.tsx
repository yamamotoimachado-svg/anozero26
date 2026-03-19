import { GetStaticPropsContext } from "next";
import VenueSummary from "@/components/VenueSummary/VenueSummary";
import PageLayout from "@/components/PageLayout";
import Map from "@/components/Map/Map";
import { useRouter } from "next/router";
import { VenueType } from "@/utils/sanity/types/venue";
import { getVenues } from "@/utils/sanity/queries/venueQueries";
import { PartnerType } from "@/utils/sanity/types/common";
import { getFooterIcons, getLinkNewsletter } from "@/utils/sanity/queries/miscQueries";

export default function ArtistasEspacos(props: { venues: VenueType[], partners:Array<PartnerType>, newsletter : string  }) {
  const { locale } = useRouter();

  const orderedVenues = props.venues.sort((a, b) => Number(a.numero) - Number(b.numero));

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter} tWClass="pb-[8.25rem]">
      <Map venues={orderedVenues} isAnchorFlow={true} />
      {orderedVenues.map((venue) => (
        <VenueSummary
          key={`venue-info-${venue.numero}-${venue}`}
          index={venue.numero}
          name={venue.nome}
          address={`${venue.endereco1}, ${venue.endereco2}`}
          schedule={venue[locale === "pt" ? "horario1_pt" : "horario1_en"]}
          schedule2={venue[locale === "pt" ? "horario2_pt" : "horario2_en"]}
          artists={venue.artistasRelacionados}
          slug={venue.slug}
        />
      ))}
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const data: VenueType[] = await getVenues();
  const partners =  await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      venues: data,
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter
    },
  };
}
