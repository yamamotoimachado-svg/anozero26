import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { getFooterIcons } from "@/utils/sanity/queries/miscQueries";
import { VenueType } from "@/utils/sanity/types/venue";
import { PartnerType } from "@/utils/sanity/types/common";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function Partners(props: { partners: Array<PartnerType>| undefined, isSingleColumn?: boolean }) {
  const { locale } = useRouter();

  if(!props.partners) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap items-start justify-start">
      {props.partners.map(p => {
        if (!p.logos) {
          return null;
        }
        const description = locale === 'en' ? p.descricao_en : p.descricao_pt;
        return (
          <div key={p.posicao} className={classNames("flex flex-col items-center justify-center py-3 px-3 ",
            {"md:basis-1/2 md:items-start": !props.isSingleColumn},
          )}>
            <h3
              className="text-black uppercase text-center my-1 md:text-left footerPartnersReg">
              {description}
            </h3>
            <div className={classNames("flex flex-wrap justify-start ", {"md:justify-start": !props.isSingleColumn},
            )}>
              {p.logos.map((logo, index) => (
                <Link href={logo.link || ""} key={index}>
                  <img
                    src={logo.logo}
                    alt={logo.entidade}
                    className="h-16 md:h-16"
                  />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

