import React, { forwardRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScaleInView = forwardRef(
  (
    {
      children,
      offset = ["0 1", "1 1"],
      springOptions = { stiffness: 450, bounce: 0.1, damping: 90 },
    },
    ref
  ) => {
    const { scrollYProgress } = useScroll({ target: ref, offset });
    const scale = useSpring(scrollYProgress, springOptions);
    return <motion.div style={{ scale }}>{children}</motion.div>;
  }
);

export default ScaleInView;
