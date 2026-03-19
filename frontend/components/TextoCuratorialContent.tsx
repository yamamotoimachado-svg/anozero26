import { useRouter } from "next/router";
import CustomPortableText from "@/components/PortableText/PortableText";
import curatorialText from "../dummy/curatorialText.json";

export default function TextoCuratorialContent() {
  const { locale } = useRouter();
  const title = locale === "en" ? curatorialText.title_en : curatorialText.title_pt;
  const body = locale === "en" ? curatorialText.body_en : curatorialText.body_pt;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-black">
      <h1 className="title text-center mb-8">{title}</h1>
      {Array.isArray(body)
        ? body.map((paragraph, idx) => (
            <p className="mb-4 text-lg leading-relaxed" key={idx}>{paragraph}</p>
          ))
        : <CustomPortableText value={body} />}
    </div>
  );
}
