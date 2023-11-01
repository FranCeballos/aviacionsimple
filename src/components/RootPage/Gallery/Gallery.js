import React from "react";
import SectionWrapper from "@/src/components/UI/SectionWrapper/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./Gallery.module.css";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 400,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    y: 400,
    transition: {
      duration: 0.05,
    },
  },
};

const itemVariant = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.05,
    },
  },
};

const Gallery = ({ imagesURLs, title }) => {
  return (
    <SectionWrapper>
      <h2 className={classes.title}>{title}</h2>
      <motion.div
        className={classes.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        exit="exit"
      >
        {imagesURLs.map((img) => (
          <motion.div
            key={img}
            className={classes["image__container"]}
            variants={itemVariant}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Image
              className={classes.image}
              src={img}
              width={300}
              height={300}
              alt={`gallery image`}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Gallery;
