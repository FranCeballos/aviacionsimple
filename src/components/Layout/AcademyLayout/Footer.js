import React from "react";
import classes from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = (props) => {
  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        <div className={classes.empty}></div>
        <Link href="/" className={classes["logo__container"]}>
          <Image
            className={classes.logo}
            src="/assets/img/logos/logo.webp"
            alt="Logo image"
            width={2149}
            height={1648}
            quality={10}
          />
        </Link>
        <a
          className={classes["developer__link"]}
          href="https://franciscoceballos.dev"
          target="_blank"
        >
          Diseño y programación por <br />
          Francisco Ceballos
        </a>
      </div>
    </footer>
  );
};

export default Footer;
