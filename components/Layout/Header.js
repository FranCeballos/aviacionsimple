import React from "react";
import classes from "./Header.module.css";
import Image from "next/image";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <div className={classes.content}>
        <div className={classes["logo__container"]}>
          <Image
            className={classes.logo}
            src="/assets/img/logos/logo.png"
            width={100}
            height={100}
            alt="Logo image"
          />
        </div>
        <p className={classes["logo__text"]}>Aviación Simple</p>
      </div>
    </header>
  );
};

export default Header;
