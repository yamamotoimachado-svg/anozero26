import Head from "next/head";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import HeaderLinks from "@/components/HeaderLinks/HeaderLinks";
import LocaleSwitcher from "@/components/LocaleSwitcher";

import FooterLinks from "@/components/FooterLinks/FooterLinks";
import classNames from "classnames";

import { PartnerType } from "@/utils/sanity/types/common";
import { searchIcon } from "@/assets/svg/searchIcon";

type Props = {
  children?: ReactNode;
  title?: string;
  tWClass?: string;
  triggerNotFound?: boolean;
  partners?: Array<PartnerType>;
  newsLetterLink?: string;
};

export default function PageLayout({
  children,
  title,
  tWClass,
  triggerNotFound,
  partners,
  newsLetterLink,
}: Props) {
  const t = useTranslations("pageLayout");
  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
  const [isSubscriptionOpened, setIsSubscriptionOpened] = useState(false);

  if (triggerNotFound) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white text-black">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-2xl font-medium">Oops</p>
      </div>
    );
  }

  return (
    <div className={classNames("relative flex min-h-full flex-col bg-white")}>
      <Head>
        {/* <title>{[title, t("pageTitle")].join(" - ")}</title> */}
        <title>Anozero&apos;26 Bienal de Coimbra</title>
      </Head>
      <Header
        isSubMenuOpened={isSubMenuOpened}
        setIsSubMenuOpened={setIsSubMenuOpened}
        setIsSubscriptionOpened={setIsSubscriptionOpened}
      />
      {isSubMenuOpened && !isSubscriptionOpened ? (
        <section
          id="mobileHeaderLinks"
          className="fixed bottom-0 left-0 right-0 top-[100px] flex flex-col items-center justify-center bg-white text-black"
        >
          <HeaderLinks twClass="flex flex-col items-center flex-1 justify-center uppercase" />
        
        </section>
      ) : (
        <>
          <div
            className={classNames("flex-grow scroll-auto bg-white", tWClass)}
          >
            <h1>{title}</h1>
            {children}
          </div>
          <Footer
            setIsSubMenuOpened={setIsSubMenuOpened}
            isSubscriptionOpened={isSubscriptionOpened}
            setIsSubscriptionOpened={setIsSubscriptionOpened}
            partners={partners}
            newsLetterLink={newsLetterLink}
          />
        </>
      )}
    </div>
  );
}
