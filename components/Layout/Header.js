import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <motion.header
      initial={{ y: "-60px" }}
      animate={{ y: 0 }}
      transition={{
        duration: 1,
        delay: 1,
        type: "spring",
        springOptions: { stiffness: 450, bounce: 0.1, damping: 90 },
      }}
      className={classes.container}
    >
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
    </motion.header>
  );
};

export default Header;
