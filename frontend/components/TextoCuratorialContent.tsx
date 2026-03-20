import Partners from "./Partners/Partners";
import { useRouter } from "next/router";
import CustomPortableText from "@/components/PortableText/PortableText";
import curatorialText from "../dummy/curatorialText.json";
import Image from "next/image";
import curadoresImg from "../assets/imgSite/curadores.webp";

export default function TextoCuratorialContent() {
  const { locale } = useRouter();
  const title = locale === "en" ? curatorialText.title_en : curatorialText.title_pt;
  const body = locale === "en" ? curatorialText.body_en : curatorialText.body_pt;
  const curatorsTitle = locale === "en" ? curatorialText.title_curators_en : curatorialText.title_curators_pt;
  // New structured curators fields
  const curators = locale === "en" ? curatorialText.curators_en : curatorialText.curators_pt;
  const assistantCurator = locale === "en" ? curatorialText.assistant_curator_en : curatorialText.assistant_curator_pt;

  return (
    <div className="text-black" style={{ width: 1184, marginLeft: 'auto', paddingRight: 80, paddingTop: 126 }}>
      <div style={{ position: 'absolute', left: 20, top: 166, width: '596px', padding: '80px 0 0 0'}}>
        <h1 className="menu text-left">{title}</h1>
      </div>
          {Array.isArray(body)
            ? body.map((paragraph, idx) => (
                <p className="txtDestaque" key={idx}>{paragraph}</p>
              ))
            : <CustomPortableText value={body} />}
                <div style={{ position: 'relative', height: 120, width: 3000, left:-1000,  borderBottom: '2px solid black', strokeWidth: 5}}></div>
                 <div style={{ height: 120, width: '100%'}}></div>

      
              <div style={{ position: 'relative', left: -500, width: '596px', padding: ' 0 0 0 0' }}>
          <h2 className="menu">{curatorsTitle}</h2>
          </div>
      {/* Curators Section */}
      {Array.isArray(curators) && curators.length > 0 && (
        <>
          <div className="flex justify-center mb-6">
            <Image
              src={curadoresImg}
              alt="Curadores"
              width={1184}
              height={250}
              style={{ objectFit: 'cover'}}
              priority
            />
          </div>
          {curators.map((curator, idx) => (
            <div key={idx} style={{ marginBottom: 32 }}>
              {Array.isArray(curator.bio) && curator.bio.length > 0 ? (
                <>
                  <p className="txtDestaque">
                    <span style={{ fontWeight: 'bold' }}>{curator.name}</span> {curator.bio[0]}
                  </p>
                  {curator.bio.slice(1).map((paragraph, i) => (
                    <p className="txtDestaque" key={i}>{paragraph}</p>
                  ))}
                </>
              ) : (
                <p className="txtDestaque"><span style={{ fontWeight: 'bold' }}>{curator.name}</span> {curator.bio}</p>
              )}
            </div>
          ))}

          
          {assistantCurator && (
            <>
              {/* Curatorial Assistance Label */}
              <div style={{ marginBottom: 8 }}>
                <span className="subtitle" style={{paddingBottom: 8}} >
                  {locale === "en"
                    ? curatorialText.curador_assistente_en?.curatorial_assistance
                    : curatorialText.curador_assistente_pt?.curatorial_assistance}
                </span>
              </div>
              <div style={{ marginBottom: 32 }}>
                {Array.isArray(assistantCurator.bio) && assistantCurator.bio.length > 0 ? (
                  <>
                    <p className="txtDestaque">
                      <span style={{ fontWeight: 'bold' }}>{assistantCurator.name}</span> {assistantCurator.bio[0]}
                    </p>
                    {assistantCurator.bio.slice(1).map((paragraph, i) => (
                      <p className="txtDestaque" key={i}>{paragraph}</p>
                    ))}
                  </>
                ) : (
                  <p className="txtDestaque"><span style={{ fontWeight: 'bold' }}>{assistantCurator.name}</span> {assistantCurator.bio}</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    <div style={{ height: 120, width: '100%'}}></div>

      <div style={{ marginTop: 80 }}>
        <Partners />
      </div>
    </div>
    
  );
}
