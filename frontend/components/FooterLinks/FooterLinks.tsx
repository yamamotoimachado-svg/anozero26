import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import styles from "./FooterLinks.module.css";

const FooterLinks = (props: { twClass?: string; isOnMobile?: boolean }) => {
  const { locale } = useRouter();
  const t = useTranslations("links");
  const linkClass =
    "md:basis-1/2  md:border-nightGreen p-[0.395rem] text-center";
  return (
    <nav className={classNames(props.twClass, {"w-[90%]": props.isOnMobile})}>
      <ul
        className={classNames(
          "flex  md:text-[2.313rem] uppercase md:gap-0.5 md:border-b md:border-nightGreen ",
          {
            "flex-col gap-0": props.isOnMobile,
            [styles.linkWrapper]: props.isOnMobile
          },
        )}
      >
        <Link
          href={`/${locale}/sobre-o-ano-zero`}
          aria-disabled
          className={classNames(linkClass, "md:border-r-[1px] border-nightGreen")}
        >
          {t("footer.about")}
        </Link>
        {/*<Link*/}
        {/*  href={`/${locale}/visitar`}*/}
        {/*  aria-disabled*/}
        {/*  className={classNames(linkClass, "pointer-events-none line-through md:border-l-[1px] md:border-r-[1px]")}*/}
        {/*>*/}
        {/*  {t("footer.news")}*/}
        {/*</Link>*/}
        <Link
          href={`https://drive.google.com/drive/folders/1Qe9hiOQsaimxDOStYwlZNzLrDXWxZh5O`}
          className={classNames(linkClass)}
        >
          {t("footer.mediaKit")}
        </Link>
      </ul>
    </nav>
  );
};

export default FooterLinks;
