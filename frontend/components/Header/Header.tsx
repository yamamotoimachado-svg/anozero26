import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import menuDefaultIcon from "@/assets/imgSite/hamburguermenu-01.svg";
import menuHoverIcon from "@/assets/imgSite/hamburguermenu-02.svg";
import menuClickedIcon from "@/assets/imgSite/hamburguermenu-03.svg";
import menuCloseIcon from "@/assets/imgSite/hamburguermenu-04.svg";
import menuCloseHoverIcon from "@/assets/imgSite/hamburguermenu-05.svg";
import menuCloseClickedIcon from "@/assets/imgSite/hamburguermenu-06.svg";


import styles from "./Header.module.css";

type HeaderProps = {
  isSubMenuOpened: boolean;
  setIsSubMenuOpened: (state: boolean) => void;
  setIsSubscriptionOpened: (state: boolean) => void;
  twClass?: string;
};
export default function Header(props: HeaderProps) {
  const t = useTranslations("header");
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMenuPressed, setIsMenuPressed] = useState(false);
  const toggleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current);
      }
    };
  }, []);

  let menuIcon;
  if (props.isSubMenuOpened) {
    if (isMenuPressed) {
      menuIcon = menuCloseClickedIcon;
    } else if (isMenuHovered) {
      menuIcon = menuCloseHoverIcon;
    } else {
      menuIcon = menuCloseIcon;
    }
  } else if (isMenuPressed) {
    menuIcon = menuClickedIcon;
  } else if (isMenuHovered) {
    menuIcon = menuHoverIcon;
  } else {
    menuIcon = menuDefaultIcon;
  }

  const handleMenuToggle = () => {
    if (isMenuPressed) return;

    setIsMenuPressed(true);

    toggleTimeoutRef.current = setTimeout(() => {
      if (props.isSubMenuOpened) {
        props.setIsSubMenuOpened(false);
        props.setIsSubscriptionOpened(false);
      } else {
        props.setIsSubMenuOpened(true);
      }

      setIsMenuPressed(false);
    }, 250);
  };

  return (
    <>
      <header className={classNames("sticky top-0 z-10", styles.headerBg)}>
        <nav
          className={classNames(
            `w-full flex flex-row items-center text-black ${props.isSubMenuOpened && "border-b"}`,
            props.twClass,
            styles.textVariant,
          )}
        >
          <div className="flex-1 min-w-0">
            <Link
              href="/"
              className="az-text-title block px-5 py-3"
              style={{ lineHeight: 0 }}
            >
              <Image
                src={require("@/assets/imgSite/anoz26_logo_topo.png")}
                alt="Anozero 2026 logo"
                width={286}
                height={90}
                priority
              />
            </Link>
          </div>
          <div className="flex items-center justify-end" style={{minWidth:'0', gap: '60px'}}>
            <LocaleSwitcher
              twClass={classNames(
                "px-1 py-0.5 uppercase underline",
                styles.textVariant,
                styles.bebasLocaleSwitcher,
              )}
            />
            <button
              type="button"
              className={classNames(
                "flex h-full items-center justify-center px-3 py-2",
                styles.textVariant,
              )}
              aria-label={props.isSubMenuOpened ? t("close") : t("menu")}
              onMouseEnter={() => setIsMenuHovered(true)}
              onMouseLeave={() => setIsMenuHovered(false)}
              onClick={handleMenuToggle}
            >
              <Image
                src={menuIcon}
                alt={props.isSubMenuOpened ? t("close") : t("menu")}
                width={60}
                height={60}
                priority
              />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
