import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./Hero.module.css";
import ParallaxOnScroll from "@/components/UI/AnimatedComponents/ParallaxOnScroll";

const Hero = (props) => {
  const containerRef = useRef(null);
  return (
    <motion.section className={classes.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className={classes["image__container"]}
      >
        <Image
          className={classes.image}
          src="/assets/img/academy/academy-hero.webp"
          width={1920}
          height={1280}
          alt="clouds and airplane wing"
        />
      </motion.div>
      <ParallaxOnScroll distance="30vh" ref={containerRef}>
        <motion.div ref={containerRef} className={classes["text__container"]}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.75 }}
            className={classes.text}
          >
            AVIACIÓN SIMPLE ACADEMY
          </motion.h1>
        </motion.div>
      </ParallaxOnScroll>
    </motion.section>
  );
};

export default Hero;
