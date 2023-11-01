import React, { useRef } from "react";
import { motion } from "framer-motion";
import classes from "./BenefitsItem.module.css";
import ScaleInView from "@/src/components/UI/AnimatedComponents/ScaleInView";
import ScaleOnHover from "@/src/components/UI/AnimatedComponents/ScaleOnHover";
import Link from "next/link";

const BenefitsItem = ({ icon, title, linkTitle, whatsappLink }) => {
  const ref = useRef(null);
  return (
    <ScaleInView ref={ref}>
      <motion.div ref={ref} className={classes.container}>
        <div className={classes.content}>
          <div className={classes.icon}>{icon}</div>
          <h3 className={classes.title}>{title}</h3>
          <ScaleOnHover className={classes["link__container"]}>
            <Link className={classes.link} href={whatsappLink}>
              {linkTitle}
            </Link>
          </ScaleOnHover>
        </div>
      </motion.div>
    </ScaleInView>
  );
};

export default BenefitsItem;
