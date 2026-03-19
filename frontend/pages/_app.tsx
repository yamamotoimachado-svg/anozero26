import "@/styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { GetStaticPropsContext } from "next";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Vienna"
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}