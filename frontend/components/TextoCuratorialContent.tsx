import { useRouter } from "next/router";
import React from "react";
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
    <div
      className="text-black texto-curatorial-main"
      style={{ width: 1184, marginLeft: 'auto', paddingRight: 80, paddingTop: 126 }}
    >
            <style jsx>{`
              @media (max-width: 1800px) {
                .texto-curatorial-main {
                  width: 70% !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                  padding-right: 0 !important;
                  position: relative !important;
                  padding-top: 8px !important;
                }
                .texto-curatorial-main > div[style*='position: absolute'] {
                  position: relative !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  padding: 40px 0 0 0 !important;
                  
                }
                .curators-title-container {
                  left: 0 !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                  position: relative !important;
                  width: 100% !important;
                  text-align: left !important;
                  paddingBottom: 8px !important;
                }
                .curatorial-spacing {
                  height: 90px !important;
                }
                .titleCuratorial{
                  position: relative !important;
                  top: 0 !important;
                  left: 0 !important;
                  paddingBottom: 30px !important;
                  
                
              }
            `}</style>
      <div className="titleCuratorial" style={{ position: 'absolute', left: 20, top: 166, width: '596px', padding: '80px 0 0 0'}}>
        <h1 className="menu text-leftl" style={{paddingBottom: '30px'}}>{title}</h1>
      </div>
          {Array.isArray(body)
            ? body.map((paragraph, idx) => (
                <p className="txtDestaque" key={idx}>{paragraph}</p>
              ))
            : <CustomPortableText value={body} />}
                <div className="curatorial-spacing" style={{ position: 'relative', height: 120, width: 3000, left:-1000,  borderBottom: '2px solid black', strokeWidth: 5}}></div>
                <div className="curatorial-spacing" style={{ height: 120, width: '100%'}}></div>

      
              <div className="curators-title-container" style={{ position: 'relative', left: -500, width: '596px', padding: ' 0 0 0 0' }}>
                <h2 className="menu" style={{paddingBottom: '30px'}}>{curatorsTitle}</h2>
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
                <span className="subtitle" style={{paddingBottom: '16px'}} >
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
    <div className="curatorial-spacing" style={{ height: 120, width: '100%'}}></div>

    {/* Lista Artistas Image */}
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
      <Image
        src="/images/Anozero26_listaArtistas.png"
        alt="Anozero'26 Lista Artistas"
        width={900}
        height={600}
        style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
        priority={false}
      />
    </div>
     <div className="curatorial-spacing" style={{ height: 120, width: '100%'}}></div>


    </div>
    
  );
}
