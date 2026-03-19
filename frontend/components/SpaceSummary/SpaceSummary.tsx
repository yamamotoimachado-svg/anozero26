import React from "react";
import Image from "next/image";

type ArtistInfo = {
  img: string;
  artistName: string;
};

type SpaceSummaryProps = {
  index: number;
  name: string;
  address: string;
  schedule: string;
  link: string;
  artists: Array<ArtistInfo>;
};

const SpaceSummary = (props: SpaceSummaryProps) => {
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {props.index} {props.name}
      </h2>
      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {props.address}
        </h3>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {props.schedule}
        </h3>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {props.link}
        </h3>
      </div>
      <div>
        {props.artists.map((artist, index) => (
          <div key={index} className="m-10">
            <Image
              src={artist.img}
              alt={`${artist.artistName} image`}
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {artist.artistName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceSummary;
