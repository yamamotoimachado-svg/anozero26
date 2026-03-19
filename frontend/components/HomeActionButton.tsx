import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

export type HomeActionButtonProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  hoverBgImage?: string;
  pressBgImage?: string;
};

export default function HomeActionButton({
  href,
  children,
  external = false,
  className = "",
  hoverBgImage,
  pressBgImage,
}: HomeActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonClass =
    "relative flex items-center justify-center w-[300px] h-[300px] text-black font-bold text-[1.15rem] uppercase text-center leading-snug px-4 border border-black/20 transition-opacity overflow-hidden";

  const content = (
    <>
      {pressBgImage && isPressed && (
        <Image
          src={pressBgImage}
          alt="pressed background"
          fill
          className="object-cover absolute inset-0 z-0 pointer-events-none"
        />
      )}
      {!isPressed && hoverBgImage && isHovered && (
        <Image
          src={hoverBgImage}
          alt="hover background"
          fill
          className="object-cover absolute inset-0 z-0 pointer-events-none"
        />
      )}
      <span className="relative z-10 bebasHomeButton">{children}</span>
    </>
  );

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(buttonClass, className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseOut={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {content}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={classNames(buttonClass, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseOut={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {content}
    </Link>
  );
}
