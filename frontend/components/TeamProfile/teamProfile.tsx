import React from "react";
import classNames from "classnames";
import CustomPortableText from "@/components/PortableText/PortableText";
import Image from "next/image";

type TeamProfileProps = {
  img: string;
  name: string;
  role: string;
  description: Array<any>;
  twClasses?: string;
};

const TeamProfile = (props: TeamProfileProps) => {
  return (
    <div
      className={classNames(
        "mb-20 flex flex-col items-center",
        props?.twClasses,
      )}
    >
      <div className="imageContainer">
        <Image
          src={props.img}
          className=" w-full max-w-[250px] md:max-w-[300px] imageFilter"
          alt={props.name}
          width={300} // Adjust width as needed
          height={300} // Adjust height as needed
        />
      </div>
      <div className="my-4 px-2 py-2 text-center">
        <p className="az-text-18 md:az-text-20 font-bold uppercase">
          {props.name}
        </p>
        <p className="az-text-18 md:az-text-20 font-bold">{props.role}</p>
      </div>
      <div className="az-text-18 px-2 md:text-[1.25rem] md:leading-[1.5rem]">
        <CustomPortableText value={props.description} />
      </div>
    </div>
  );
};

export default TeamProfile;
