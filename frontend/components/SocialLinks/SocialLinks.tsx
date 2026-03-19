import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="my-4 flex flex-col gap-1">
      <Link
        className="flex items-center justify-center"
        href="https://www.instagram.com/anozerocoimbra/"
      >
        Instagram
      </Link>
      <Link
        className="flex items-center justify-center"
        href="https://www.facebook.com/anozerocoimbra"
      >
        Facebook
      </Link>
      <Link
        className="flex items-center justify-center"
        href="https://pt.linkedin.com/company/anozero-bienal-de-coimbra"
      >
        LinkedIn
      </Link>
      <Link
        className="flex items-center justify-center"
        href="https://open.spotify.com/playlist/0bLld4QqVzfQtrTnJ6W0dc?si=Kfn4lVmGTFmVFxicG0nxiw&pi=e-hVjjHQRFRQaC"
      >
        Spotify
      </Link>
    </div>
  );
}
