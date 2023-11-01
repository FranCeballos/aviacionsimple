import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import LogoutIcon from "@/src/components/UI/Icons/LogoutIcon";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";

import classes from "./Header.module.css";

const Header = (props) => {
  const { push } = useRouter();
  const submitLogoutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/academia/iv-brigada-aerea",
    });
    push(data.url);
  };

  return (
    <motion.header
      initial={{ y: "-60px" }}
      animate={{ y: 0 }}
      transition={{
        duration: 1,
        type: "spring",
        springOptions: { stiffness: 450, bounce: 0.1, damping: 90 },
      }}
      className={classes.container}
    >
      <div className={classes.content}>
        <div className={classes["empty__container"]}></div>
        <div className={classes["logo__container"]}>
          <Image
            className={classes.logo}
            src="/assets/img/logos/logo.webp"
            alt="Logo image"
            width={2149}
            height={1648}
            quality={10}
          />
          <p className={classes["logo__text"]}>Aviación Simple Academy</p>
        </div>
        <div className={classes["logout__container"]}>
          <ScaleOnHover>
            <button onClick={submitLogoutHandler} className={classes.button}>
              <LogoutIcon />
            </button>
          </ScaleOnHover>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
