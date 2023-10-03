import React from "react";
import classes from "./Footer.module.css";
import Image from "next/image";

const Footer = (props) => {
  return (
    <footer className={classes.container}>
      <div className={classes.content}>
        <div className={classes.empty}></div>
        <div className={classes["logo__container"]}>
          <Image
            className={classes.logo}
            src="/assets/svg/logo.svg"
            width={100}
            height={100}
            alt="Logo image"
          />
        </div>
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
