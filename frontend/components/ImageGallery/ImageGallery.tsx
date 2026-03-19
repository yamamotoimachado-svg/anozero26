import React from "react";
import Image from "next/image";

const ImageGallery = (imageGallery:any, locale?:string) => {
  return (
    <div className="mb-[80px]">
      <div className="overflow-x-auto md:overflow-auto  whitespace-nowrap">
        {imageGallery.map((image:any, index:number) => {
          return (
            <div key={index} className="relative h-[180px] w-[270px] md:h-[40vw] md:w-[70vw] inline-block mr-6">
              <Image
                className="object-cover object-center h-[180px] w-[270px] md:h-[40vw] md:w-[70vw]"
                src={image.asset.url}
                alt={`Gallery image`}
                width={270} // Adjust width as needed
                height={180} // Adjust height as needed
              />
              <p className="text-nightGreen ml-[0.938rem] mt-[0.3rem] text-[1.125rem] leading-[1.35rem]">
                {locale && locale === "pt" ? image.legenda_pt : image.legenda_en}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
