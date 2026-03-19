import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function LocaleSwitcher(props: { twClass?: string }) {
  const t = useTranslations("LocaleSwitcher");

  const { locale, locales, route, query } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  return (
    <Link
      href={{
        pathname: route,
        query: { ...query }
      }}
      locale={otherLocale}
      className={props.twClass}
      style={{ fontSize: '0.7rem', lineHeight: 1, margin: 0, padding: 0 }}
    >
      {t("switchLocale", { locale: otherLocale })}
    </Link>
  );
}