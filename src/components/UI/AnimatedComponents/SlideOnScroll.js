import React, { forwardRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import useDimension from "@/src/hooks/use-dimension";

const SlideOnScroll = forwardRef(
  (
    {
      children,
      springOptions = { stiffness: 450, bounce: 0.1, damping: 90 },
      fromLeft = true,
      style = {},
    },
    ref
  ) => {
    const { width } = useDimension();
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0 1", "0.9 0.9"],
    });
    const x = useSpring(
      useTransform(scrollYProgress, [0, 1], [fromLeft ? -width : width, 0]),
      springOptions
    );
    return <motion.div style={{ x, ...style }}>{children}</motion.div>;
  }
);

export default SlideOnScroll;
