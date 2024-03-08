import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useDimension from "@/src/hooks/use-dimension";
import { useDispatch, useSelector } from "react-redux";
import { closeNavbar, openNavbar } from "@/src/store/features/navbarStore";

import LogoutIcon from "@/src/components/UI/Icons/LogoutIcon";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const navbarIsOpen = useSelector((state) => state.navbarStore.navbarIsOpen);
  const { data: userData } = useSession();
  const { push } = useRouter();
  const { width } = useDimension();

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
            {userData?.user?.isAdmin && width > 768 ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        {width > 768 && (
          <div className={classes["logout__container"]}>
            <ScaleOnHover>
              <button onClick={submitLogoutHandler} className={classes.button}>
                <LogoutIcon />
              </button>
            </ScaleOnHover>
          </div>
        )}
        {width <= 768 && (
          <div className={classes["mobile__container"]}>
            <ScaleOnHover>
              <AnimatePresence mode="wait">
                {navbarIsOpen ? (
                  <motion.button
                    key="open"
                    variants={variant}
                    initial="hide"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                    onClick={() => dispatch(closeNavbar())}
                    className={classes.button}
                  >
                    <IoClose size={25} />
                  </motion.button>
                ) : (
                  <motion.button
                    key="close"
                    variants={variant}
                    initial="hide"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                    onClick={() => dispatch(openNavbar())}
                    className={classes.button}
                  >
                    <HiMenuAlt4 size={25} />
                  </motion.button>
                )}
              </AnimatePresence>
            </ScaleOnHover>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

const variant = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
