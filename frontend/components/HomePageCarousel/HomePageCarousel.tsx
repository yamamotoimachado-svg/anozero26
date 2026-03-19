"use client";

import React, { useRef, useState } from "react";
import styles from "./HomePageCarousel.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade
} from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type HomePageCarouselProps = {
  desktopImages: string[];
  mobileImages: string[];
  names: string[];
};

export default function HomePageCarousel(props: HomePageCarouselProps) {
  return (
    <div className="relative">
      {/*<PopHover />*/}
      <Swiper
        cssMode={true}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          //TODO missing disabled class
          disabledClass: "swiper-button-disabled",
        }}
        effect={'fade'}
        pagination={true}

        modules={[Navigation, Pagination, Autoplay]}
        className=" relative h-[500px] md:h-[810px]"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {props.desktopImages.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <h2 className="width-full z-2 absolute top-[16px] left-1/2 -translate-x-2/4 text-nowrap text-center uppercase text-black md:bottom-[108px] md:top-auto text-[1.25rem] leading-[1.35rem] md:text-[2.313rem] md:leading-[2.313rem] text-nightGreen">
              {props.names[index]}
            </h2>
            <img src={image} className="hidden h-full w-full md:block object-cover" />
            <img
              src={props.mobileImages[index]}
              className="h-full w-full md:hidden object-cover"
            />
          </SwiperSlide>
        ))}

        <div className="bswiper-button image-swiper-button-prev absolute left-8 top-2/4 z-[2] hidden cursor-pointer text-white md:block rotate-180">
          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9946 27.64L20.4397 26.5367L24.9108 15.3297H0V12.1941H24.8528L20.4397 1.10328L22.9946 0C26.5367 7.78101 30.6595 11.7876 34.9565 12.8329V14.8071C30.6595 15.8524 26.5367 19.859 22.9946 27.64Z" fill="#70CD5A"/>
          </svg>
        </div>
        <div className="swiper-button image-swiper-button-next absolute right-8 top-2/4 z-[2] hidden cursor-pointer text-white md:block ">
          <svg width="35" height="28" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.9946 27.64L20.4397 26.5367L24.9108 15.3297H0V12.1941H24.8528L20.4397 1.10328L22.9946 0C26.5367 7.78101 30.6595 11.7876 34.9565 12.8329V14.8071C30.6595 15.8524 26.5367 19.859 22.9946 27.64Z"
              fill="#70CD5A" />
          </svg>
        </div>
      </Swiper>
    </div>
  );
}

const PopHover = () => {

  const [isvisible, setIsVisible] = useState(true);

  return isvisible && <div className="bg-nightGreen text-nightBlue z-[3] md:absolute right-0 max-w-[420px]">
    <div className="border-b border-nightBlue flex">
      <div className="uppercase  mx-[10px] my-[10px] text-[1.125rem] overflow-ellipsis overflow-hidden text-nowrap subtitle">imaginário da liberdade e as estratégias oferecidas pela arte contemporânea</div>
        <div className="border-l border-nightBlue px-[15px] flex justify-center items-center text-[1.125rem]" onClick={() => setIsVisible(false)}>❌</div>
      </div>
      <div className="pb-[10px]">
        <p className={classNames("mx-[10px] my-[10px] text-[1.125rem]", styles.clampMultiLine)} >Pop-up para destaques vários que queiram fazer: poderá ser para uma notícia, um open call, um formulário, etc. Tem de ter título, umas linhas de texto e ser clicável. tem de ter uma cruz para fechar e só aparece na homepage. foi um pedido concreto da comunicação da bienal.</p>
        <Link href={""} className="uppercase mx-[10px] strong">Ler Mais +</Link>
      </div>
    </div>

}

