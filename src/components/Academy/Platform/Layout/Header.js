import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import LogoutIcon from "@/src/components/UI/Icons/LogoutIcon";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";

import classes from "./Header.module.css";
import Link from "next/link";

const Header = (props) => {
  const { data } = useSession();
  console.log(data);
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
        <nav className={classes.nav}>
          <ul className={classes.list}>
            <li className={classes["item__container"]}>
              <Link href="/academia/iv-brigada-aerea/admin?vista=alumnos">
                Alumnos y Cursos
              </Link>
            </li>
            <li className={classes["item__container"]}>
              <Link href="/academia/iv-brigada-aerea/admin?vista=materias">
                Materias
              </Link>
            </li>
            <li className={classes["item__container"]}>
              <Link href="/academia/iv-brigada-aerea/admin?vista=notificaciones">
                Notificaciones
              </Link>
            </li>
          </ul>
        </nav>
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
