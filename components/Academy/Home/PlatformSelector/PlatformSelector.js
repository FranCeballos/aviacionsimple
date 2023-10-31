import React from "react";
import SectionWrapper from "@/components/UI/SectionWrapper/SectionWrapper";
import classes from "./PlatformSelector.module.css";
import Link from "next/link";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";

const PlatformSelector = (props) => {
  return (
    <SectionWrapper>
      <h2 className={classes.title}>Ingresá</h2>
      <ScaleOnHover>
        <Link className={classes.link} href="/academia/iv-brigada-aerea">
          Plataforma Educativa IV Brigada Aérea
        </Link>
      </ScaleOnHover>
    </SectionWrapper>
  );
};

export default PlatformSelector;
