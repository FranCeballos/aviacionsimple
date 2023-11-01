import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import SectionWrapper from "../../UI/SectionWrapper/SectionWrapper";
import classes from "./Benefits.module.css";
import PaperAirplaneIcon from "../../UI/Icons/PaperAirplaneIcon";
import SlideOnScroll from "../../UI/AnimatedComponents/SlideOnScroll";
import BenefitsList from "./BenefitsList";

const Benefits = (props) => {
  const iconRef = useRef(null);
  return (
    <SectionWrapper style={{ backgroundColor: "#f9f7f7" }}>
      <SlideOnScroll ref={iconRef} style={{ placeSelf: "start" }}>
        <motion.div ref={iconRef} className={classes["airplane__container"]}>
          <PaperAirplaneIcon fill="#112d4e" />
        </motion.div>
      </SlideOnScroll>
      <h2 className={classes.title}>Nunca has estado tan cerca como ahora</h2>
      <BenefitsList />
    </SectionWrapper>
  );
};

export default Benefits;
