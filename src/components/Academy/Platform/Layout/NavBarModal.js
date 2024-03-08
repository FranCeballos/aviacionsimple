import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import classes from "./NavBarModal.module.css";
import { closeNavbar } from "@/src/store/features/navbarStore";

const NavBarModal = (props) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const closeNavbarHandler = () => {
    dispatch(closeNavbar());
  };

  const submitLogoutHandler = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/academia/iv-brigada-aerea",
    });
    closeNavbarHandler();
    push(data.url);
  };

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ul className={classes.list}>
        <li className={classes.item}>
          <Link
            href="/academia/iv-brigada-aerea/admin?vista=alumnos"
            onClick={closeNavbarHandler}
          >
            <p>Alumnos y Cursos</p>
          </Link>
        </li>
        <li className={classes.item}>
          <Link
            href="/academia/iv-brigada-aerea/admin?vista=materias"
            onClick={closeNavbarHandler}
          >
            <p>Materias</p>
          </Link>
        </li>
        <li className={classes.item}>
          <Link
            href="/academia/iv-brigada-aerea/admin?vista=notificaciones"
            onClick={closeNavbarHandler}
          >
            <p>Notificaciones</p>
          </Link>
        </li>
        <li className={classes.item} onClick={submitLogoutHandler}>
          <p>Logout</p>
        </li>
      </ul>
    </motion.div>
  );
};

export default NavBarModal;
