import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import classNames from "classnames";

export default function HeaderLinks(props: { twClass: string }) {
  const { locale } = useRouter();
  const t = useTranslations("links.header");

  const linkClasses = "py-[1rem] md:py-[0] w-full md:border-0 md:w-auto m-0 ";
  return (
    <div
      className={classNames(
        // Always vertical, evenly spaced
        "flex flex-col justify-evenly h-full az-text-title text-center w-[90%] mx-auto",
        props.twClass,
      )}
    >
            <Link className={classNames("italic menu", linkClasses)} href={`/${locale}/fantasma-da-liberdade`}>{t("freedomGhost")}</Link>

            <Link className={classNames("menu", linkClasses)} href={`/${locale}/sobre-o-ano-zero`}>{t("about")}</Link>
            <Link className={classNames("menu", linkClasses)} href="#">{t("subscribeNewsletter")}</Link>
            <Link className={classNames("menu", linkClasses)} href="#">{t("mediaKit")}</Link>
            <Link className={classNames("menu", linkClasses)} href="#">{t("contacts")}</Link>
            <Link className={classNames("menu", linkClasses)} href="#">{t("endorsements")}</Link>
    </div>
  );
}
