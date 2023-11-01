import React, { forwardRef } from "react";
import { motion, useTransform, useSpring, useScroll } from "framer-motion";

const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], ["-" + distance, distance]);
};

const ParallaxOnScroll = forwardRef(
  (
    {
      children,
      springOptions = { stiffness: 450, bounce: 0.1, damping: 90 },
      distance = "50vh",
    },
    ref
  ) => {
    const { scrollYProgress } = useScroll({ target: ref });
    const springScroll = useSpring(scrollYProgress, springOptions);
    const y = useParallax(springScroll, distance);

    return <motion.div style={{ y }}>{children}</motion.div>;
  }
);

export default ParallaxOnScroll;
