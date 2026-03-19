import React from "react";
import styles from "./PortableText.module.css";
import { PortableText } from "@portabletext/react";
import classNames from "classnames";

const CustomPortableText = (value: any) => {
  return (
    <div className={classNames(styles.portableText)}>
    <PortableText value{...value} />
    </div>
  );
};

export default CustomPortableText;
