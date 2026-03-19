import { useTranslations } from "next-intl";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { GetStaticPropsContext } from "next";
import { VenueType } from "@/utils/sanity/types/venue";
import { getVenues } from "@/utils/sanity/queries/venueQueries";
import Partners from "@/components/Partners/Partners";
import { PartnerType } from "@/utils/sanity/types/common";

type FooterProps = {
  setIsSubMenuOpened: (state: boolean) => void;
  isSubscriptionOpened: boolean;
  setIsSubscriptionOpened: (state: boolean) => void;
  partners?:Array<PartnerType>
  newsLetterLink?: string;
};

export default function Footer(props: FooterProps) {
  const { locale } = useRouter();
  const t = useTranslations("footer");

  return (
    <footer className="flex flex-col bg-white pb-4 align-middle text-black">
      {/*{props.isSubscriptionOpened && (*/}
      {/*  <>*/}
      {/*    <div className="flex flex-col bg-nightGreen text-nightBlue az-text-title ">*/}
      {/*      <input*/}
      {/*        type="email"*/}
      {/*        className="border-b border-nightBlue bg-transparent p-2 md:p-3 text-center uppercase text-nightBlue placeholder-nightBlue leading-[1.35rem] md:text[2.313rem] md:leading-[2.313rem]  "*/}
      {/*        placeholder={t("emailInputPlaceholder")}*/}
      {/*      ></input>*/}
      {/*      <div className="flex  flex-col">*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          className="border-b border-nightBlue bg-transparent p-2 md:p-3 text-center uppercase text-nightBlue placeholder-nightBlue"*/}
      {/*          placeholder={t("nameInputPlaceholder")}*/}
      {/*        ></input>*/}
      {/*        <div className=" space-x-2 px-6 py-4 whitespace-pre-wrap md:text-[1.25rem]">*/}
      {/*          <p className="block text-center">*/}
      {/*            {t("emailSubscriptionTerms")}*/}
      {/*          </p>*/}
      {/*          <div className="mt-4 flex justify-center md:gap-2 md:items-center">*/}
      {/*            <Checkbox id="terms" />*/}
      {/*            <label*/}
      {/*              htmlFor="terms"*/}
      {/*              className="font-medium text-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "*/}
      {/*            >*/}
      {/*              {t("subscriptionInfo")}*/}
      {/*            </label>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <button*/}
      {/*          type="submit"*/}
      {/*          className="text border-t border-nightBlue bg-transparent p-2 md:p-4 uppercase underline "*/}
      {/*          onClick={() => {*/}
      {/*            console.log("subscribed");*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <span>{t("subscribe")}</span>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}

      <hr className="border-black/20 w-full mb-5" />
      <div className="w-full border-b border-black/20 text-[0.95rem]">

        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-2 px-2 py-5 h-[89px]">
          <div className="flex flex-row w-full justify-between items-center md:text-left gap-2 md:gap-0 ">
            <span className="uppercase text-left footerTxtReg">ANOZERO’26 BIENAL COIMBRA</span>
            <div className="flex">
            <span className="font-bold uppercase text-center px-2 footerTxt">SEGURAR, DAR, RECEBER</span>
            <span className="uppercase text-right footerTxtReg">TO HOLD, TO GIVE, TO RECEIVE</span>
            </div>
            <span className="text-right min-w-fit text-nowrap font-normal tracking-wide footerTxtReg">11 ABR – 5 JUL 2026</span>
          </div>
        </div>
        
        <hr className="border-black/20 my-0" />
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-2 py-5 footerTxtReg h-[89px]">
          <div className="flex w-full flex-row justify-between items-center text-center">
            <Link href="https://www.instagram.com/anozerocoimbra/" className="flex-1 hover:underline text-center">Instagram</Link>
            <Link href="https://www.facebook.com/anozerocoimbra" className="flex-1 hover:underline text-center">Facebook</Link>
            <Link href="https://pt.linkedin.com/company/anozero-bienal-de-coimbra" className="flex-1 hover:underline text-center">LinkedIn</Link>
          </div>
        </div>
        
        <hr className="border-black/20 my-0" />
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-2 py-5 text-[0.93rem] foooterTxtReg h-[89px]">
          <div className="flex w-full flex-row items-center footerTxtReg">
            <span className="flex-1 text-left">T: +351 910 787 255</span>
            <span className="flex-1 text-left">INFO@ANOZERO-BIENALCOIMBRA.PT</span>
            <span className="flex-1 text-right">HORÁRIO DE FUNCIONAMENTO: QUARTA A DOMINGO, 11:00 ÀS 19:00</span>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <Partners partners={props.partners} />
      </div>

      <br/>
      <div className="flex items-center justify-center gap-1">
        {/*<div>*/}
        {/*<Link href={`/${locale}/visitar`}>{t("privacyPolicy")}</Link>*/}
        {/*<Link href={`/${locale}/visitar`}>{t("accessibility")}</Link>*/}
        {/*</div>*/}
        {/*<Link href={`/${locale}/copyright`}>{t("copyright")}</Link>*/}
      </div>
    </footer>
  );
}

