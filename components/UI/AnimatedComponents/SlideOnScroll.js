import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SlideOnScroll = ({
  children,
  scrollYProgress,
  screenWidth,
  springOptions = {},
  fromLeft = true,
}) => {
  const x = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [fromLeft ? -screenWidth : screenWidth, 0]
    ),
    springOptions
  );
  return <motion.div style={{ x }}>{children}</motion.div>;
};

export default SlideOnScroll;
