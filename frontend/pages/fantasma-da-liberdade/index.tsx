import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeamProfile from "@/components/TeamProfile/teamProfile";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VenueType } from "@/utils/sanity/types/venue";
import { getFantasma, getTeam } from "@/utils/sanity/queries/textPagesQueries";
import { getVenues } from "@/utils/sanity/queries/venueQueries";
import { useRouter } from "next/router";
import {
  getFooterIcons,
  getLinkNewsletter,
} from "@/utils/sanity/queries/miscQueries";
import { PartnerType } from "@/utils/sanity/types/common";
import CustomPortableText from "@/components/PortableText/PortableText";
import Partners from "@/components/Partners/Partners";
import { isMobileDevice } from "@/utils/isMobile";

const tabKeys = {
  intro: "intro",
  team: "team",
  datasheet: "datasheet",
  educationProposal: "educationProposal",
  convergentProgram: "convergentProgram",
  architectureProgram: "architectureProgram",
  endorsement: "endorsement",
  acknowledgments: "acknowledgments"
};

export default function Index(props: {
  data: any;
  partners: Array<PartnerType>;
  newsletter: string;
}) {
  const t = useTranslations("fantasmaDaLiberdade");
  const router = useRouter();
  const locale = router.locale;
  const [openTab, setOpenTab] = useState<string | string[]>("");

  useEffect(() => {
    const { tab } = router.query;
    setOpenTab(tab || "");
  }, [router.query]);

  useEffect(() => {
    setOpenTab("intro");
  }, []);

  const titleClassnames =
    "mb-10 scroll-m-20 text-6xl italic text-center tracking-tight ";

  const toggleState = (tabId: string) => {
    if (openTab === tabId) {
      setOpenTab("");
      router.push(router.pathname);
    } else {
      setOpenTab(tabId);
      router.push(`${router.pathname}?tab=${tabId}`);
    }
  };

  const mobileTitleClasses =
    "px-2 uppercase justify-center text-[1.125rem] leading-[1.35rem] border-nightGreen ";

  return (
    <PageLayout partners={props.partners} newsLetterLink={props.newsletter}>
      <Accordion
        type="single"
        collapsible
        className="childrenBorderGreen text-nightGreen md:hidden"
      >
        <AccordionItem value={tabKeys.intro}>
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.intro")}
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <PhantomOfFreedom
              title={t("title")}
              text={props.data.phantomText}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.team")}
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <TeamInfo
              locale={router.locale}
              team={props.data.team}
              curationTeamTitle={t("team.curation")}
              curationCouncilTitle={t("team.curatorialCouncil")}
              curationAssistanceTitle={t("team.curatorialAssistance")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.convergentProgram")}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <ConvergentProgram
              text={props.data.convergentProgram}
              title={t("sections.convergentProgram")}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.educationProposal")}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <EducationalProposal
              title={t("sections.educationProposal")}
              text={props.data.educationProposal}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.architectureProgram")}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <ArchitectureProgram
              text={props.data.architectureProgram}
              title={t("sections.architectureProgram")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.datasheet")}
          </AccordionTrigger>
          <AccordionContent className="whitespace-pre px-3">
            <DataSheet
              info={props.data.datasheet[`bio_${locale}`]}
              title={t("sections.datasheet")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.acknowledgments")}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <Acknowledgments
              title={t("sections.acknowledgments")}
              text={props.data.datasheet[`outros_${locale}`]}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger className={mobileTitleClasses}>
            {t("sections.endorsements")}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <Endorsments
              text={props.data.convergentProgram}
              partners={props.partners}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section className="hidden text-nightGreen md:block">
        <div className="flex gap-4">
          <CustomTabButton
            isActive={openTab === tabKeys.intro}
            toggleState={toggleState}
            resource={t("sections.intro")}
            tabId={tabKeys.intro}
          />
          <CustomTabButton
            isActive={openTab === tabKeys.team}
            toggleState={toggleState}
            resource={t("sections.team")}
            tabId={tabKeys.team}
          />
        </div>
        {openTab === tabKeys.intro && (
          <PhantomOfFreedom title={t("title")} text={props.data.phantomText} />
        )}
        {openTab === tabKeys.team && (
          <TeamInfo
            locale={router.locale}
            team={props.data.team}
            curationTeamTitle={t("team.curation")}
            curationCouncilTitle={t("team.curatorialCouncil")}
            curationAssistanceTitle={t("team.curatorialAssistance")}
          />
        )}



        <div className="flex gap-4">
          <CustomTabButton
            isActive={openTab === tabKeys.convergentProgram}
            toggleState={toggleState}
            resource={t("sections.convergentProgram")}
            tabId={tabKeys.convergentProgram}
          />

          <CustomTabButton
            isActive={openTab === tabKeys.educationProposal}
            toggleState={toggleState}
            resource={t("sections.educationProposal")}
            tabId={tabKeys.educationProposal}
          />
        </div>
        {openTab === tabKeys.convergentProgram && (
          <ConvergentProgram
            text={props.data.convergentProgram}
            title={t("sections.convergentProgram")}
          />
        )}

        {openTab === tabKeys.educationProposal && (
          <EducationalProposal
            title={t("sections.educationProposal")}
            text={props.data.educationProposal}
          />
        )}

        <div className="flex gap-4">

          <CustomTabButton
            isActive={openTab === tabKeys.architectureProgram}
            toggleState={toggleState}
            resource={t("sections.architectureProgram")}
            tabId={tabKeys.architectureProgram}
          />
          <CustomTabButton
            isActive={openTab === tabKeys.datasheet}
            toggleState={toggleState}
            resource={t("sections.datasheet")}
            tabId={tabKeys.datasheet}
          />
        </div>

        {openTab === tabKeys.architectureProgram && (
          <ArchitectureProgram
            text={props.data.architectureProgram}
            title={t("sections.architectureProgram")}
          />
        )}
        {openTab === tabKeys.datasheet && (
          <DataSheet
            info={props.data.datasheet[`bio_${locale}`]}
            title={t("sections.datasheet")}
          />
        )}
        <div className="flex gap-4">
          <CustomTabButton
            isActive={openTab === tabKeys.acknowledgments}
            toggleState={toggleState}
            resource={t("sections.acknowledgments")}
            tabId={tabKeys.acknowledgments}
          />
          <CustomTabButton
            isActive={openTab === tabKeys.endorsement}
            toggleState={toggleState}
            resource={t("sections.endorsements")}
            tabId={tabKeys.endorsement}
          />

        </div>
        {openTab === tabKeys.acknowledgments && (
          <Acknowledgments
            title={t("sections.acknowledgments")}
            text={props.data.datasheet[`outros_${locale}`]}
          />
        )}
        {openTab === tabKeys.endorsement && (
          <Endorsments
            title={t("sections.endorsements")}
            partners={props.partners}
          />
        )}

      </section>
    </PageLayout>
  );
}

const containerClassnames = "m-auto mt-10 w-2/4";

type CustomTabButtonProps = {
  tabId: string;
  toggleState: (tabId: string) => void;
  resource: string;
  isActive: boolean;
  disabled?: boolean;
  customClasses?: string;
};

const CustomTabButton = ({
  tabId,
  toggleState,
  resource,
  isActive,
  disabled,
  customClasses,
}: CustomTabButtonProps) => (
  <button
    className={classNames(
      "az-text-title flex basis-1/2 justify-center border-b-[1px] border-nightGreen py-4 uppercase",
      { "line-through": disabled },
      customClasses
    )}
    onClick={() => {
      toggleState(tabId);
    }}
    disabled={disabled}
  >
    {resource}{" "}
    {!disabled && (
      <div
        className={classNames(
          "ml-4 text-[3rem] ",
          { "rotate-90": !isActive },
          { "-rotate-90": isActive },
        )}
      >
        →
      </div>
    )}
  </button>
);

type SectionProps = {
  title: string;
  text: Array<any>;
};

const PhantomOfFreedom = ({ title, text }: SectionProps) => (
  <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 m-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={text} />
      </div>
    </div>
  </div>
);

const EducationalProposal = ({ title, text }: SectionProps) => (
  <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 m-4 mx-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={text} />
      </div>
    </div>
  </div>
);

const ConvergentProgram = ({ title, text }: SectionProps) => (
  <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 m-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={text} />
      </div>
    </div>
  </div>
);

const ArchitectureProgram = ({ title, text }: SectionProps) => (
  <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 m-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={text} />
      </div>
    </div>
  </div>
);

const Acknowledgments = ({ title, text }: SectionProps) => (
  <div className="border-nightGreen pb-[8.25rem] text-center md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 portable-text m-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={text} />
      </div>
    </div>
  </div>
);

const Endorsments = ({ title, partners }: any) => (
  <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 mx-[1rem] text-wrap text-base md:m-4">
        <Partners partners={partners} isSingleColumn={true} />
      </div>
    </div>
  </div>
);

type TeamInfoProps = {
  locale?: string;
  team: Array<any>;
  curationTeamTitle: string;
  curationAssistanceTitle: string;
  curationCouncilTitle: string;
};

const TeamInfo = ({
  team,
  curationTeamTitle,
  curationAssistanceTitle,
  curationCouncilTitle,
  locale,
}: TeamInfoProps) => {
  const curationTeam: any[] = [];
  const curationAssistance: any[] = [];
  const curationCouncil: any[] = [];

  team.forEach((teamMember: any) => {
    if (teamMember.tipo === "Curadoria") {
      curationTeam.push(teamMember);
    } else if (teamMember.tipo === "Assistência de Curadoria") {
      curationAssistance.push(teamMember);
    } else if (teamMember.tipo === "Conselho Curatorial") {
      curationCouncil.push(teamMember);
    }
  });

  return (
    <div className="border-nightGreen pb-[8.25rem] md:border-b-[1px]">
      <div className="m-auto mt-4 md:w-3/4">
        <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10">
          {curationTeamTitle}
        </h1>
        <div className="flex flex-col gap-2 md:flex-row">
          {curationTeam.map((teamMember: any, index: number) => (
            <TeamProfile
              key={`curationTeam-${index}`}
              img={teamMember.foto.asset.url}
              name={teamMember.nome}
              role={teamMember.tipo}
              description={teamMember[`bio_${locale}`]}
              twClasses="basis-1/2"
            />
          ))}
        </div>
      </div>
      <div className="m-auto mt-4 md:w-3/4">
        <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10">
          {curationCouncilTitle}
        </h1>
        <div className="flex flex-col gap-2 md:flex-row">
          {curationCouncil.map((teamMember: any, index: number) => (
            <TeamProfile
              key={`curationTeam-${index}`}
              img={teamMember.foto.asset.url}
              name={teamMember.nome}
              role={teamMember.tipo}
              description={teamMember[`bio_${locale}`]}
              twClasses="basis-1/2"
            />
          ))}
        </div>
      </div>
      <div className="m-auto mt-4 md:w-3/4">
        <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10">
          {curationAssistanceTitle}
        </h1>
        <div className="flex flex-col gap-2 md:flex-row">
          {curationAssistance.map((teamMember: any, index: number) => (
            <TeamProfile
              key={`curationTeam-${index}`}
              img={teamMember.foto.asset.url}
              name={teamMember.nome}
              role={teamMember.tipo}
              description={teamMember[`bio_${locale}`]}
              twClasses="basis-1/2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type DatasheetProps = {
  title?: string;
  info: Array<any>;
};
const DataSheet = ({ title, info }: DatasheetProps) => (
  <div className="border-nightGreen pb-[8.25rem] text-center md:border-b-[1px]">
    <div className="m-auto mt-4 md:w-3/4">
      <h1 className="az-text-large az-x-large-text mb-4 text-center uppercase italic tracking-tight md:mb-10 ">
        {title}
      </h1>
      <div className="az-text-18 md:az-text-20 portable-text m-4 text-wrap text-base md:mx-auto md:w-8/12 xl:w-6/12">
        <CustomPortableText value={info} />
      </div>
    </div>
  </div>
);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const phantomInfo = await getFantasma();
  const teamInfo = await getTeam();
  const datasheet = teamInfo.filter(
    (teamMember: any) => teamMember.tipo === "Outros",
  )[0];
  const partners = await getFooterIcons();
  const newsletterlink = await getLinkNewsletter();

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      data: {
        phantomText: phantomInfo[`texto_${locale}`],
        educationProposal: phantomInfo[`educativa_${locale}`],
        convergentProgram: phantomInfo[`convergente_${locale}`],
        architectureProgram: phantomInfo[`arquitetura_${locale}`],
        team: teamInfo,
        datasheet: datasheet,
      },
      partners: partners?.sections,
      newsletter: newsletterlink.linkNewsletter,
    },
  };
}
