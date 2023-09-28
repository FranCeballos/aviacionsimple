import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const FadeInOnScroll = ({ children, scrollYProgress }) => {
  return (
    <motion.div style={{ opacity: scrollYProgress }}>{children}</motion.div>
  );
};

export default FadeInOnScroll;
