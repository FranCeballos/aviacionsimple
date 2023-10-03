import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";
import classes from "./Auth.module.css";

const Auth = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["image__container"]}>
        <Image
          className={classes.image}
          src="/assets/img/academy/login-img-brigada.webp"
          quality={20}
          width={1920}
          height={2880}
        />
      </div>
      <LoginForm title="Plataforma Educativa" description="IV Brigada Aérea" />
    </div>
  );
};

export default Auth;
