import React from "react";
import SectionWrapper from "@/src/components/UI/SectionWrapper/SectionWrapper";
import classes from "./PlatformSelector.module.css";
import Link from "next/link";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";

const PlatformSelector = (props) => {
  return (
    <SectionWrapper>
      <h2 className={classes.title}>Plataformas</h2>
      <ScaleOnHover>
        <Link className={classes.link} href="/academia/iv-brigada-aerea">
          IV Brigada Aérea
        </Link>
      </ScaleOnHover>
    </SectionWrapper>
  );
};

export default PlatformSelector;
