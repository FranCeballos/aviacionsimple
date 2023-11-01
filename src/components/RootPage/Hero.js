import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./Hero.module.css";
import ParallaxOnScroll from "../UI/AnimatedComponents/ParallaxOnScroll";
import useDimension from "@/src/hooks/use-dimension";

const Hero = (props) => {
  const { width } = useDimension();
  const containerRef = useRef(null);
  return (
    <motion.section className={classes.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className={classes["video__container"]}
      >
        {width > 425 ? (
          <video
            className={classes.video}
            poster="/assets/videos/mainhero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/videos/mainhero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/assets/videos/mainhero-poster.webp"
            width={1920}
            height={1080}
            alt="clouds and airplane wing"
          />
        )}
      </motion.div>
      <ParallaxOnScroll distance="30vh" ref={containerRef}>
        <motion.div ref={containerRef} className={classes["text__container"]}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.75 }}
            className={classes.text}
          >
            EXPERIMENTÁ EL MUNDO DE LA AVIACIÓN
          </motion.h1>
        </motion.div>
      </ParallaxOnScroll>
    </motion.section>
  );
};

export default Hero;
