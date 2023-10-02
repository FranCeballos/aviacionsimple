import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./BenefitsItem.module.css";
import ScaleInView from "@/components/UI/AnimatedComponents/ScaleInView";
import ScaleOnHover from "@/components/UI/AnimatedComponents/ScaleOnHover";

const BenefitsItem = ({
  icon,
  title,
  description,
  imageSrc,
  linkTitle,
  whatsappLink,
}) => {
  const ref = useRef(null);
  return (
    <ScaleInView ref={ref}>
      <motion.div ref={ref} className={classes.container}>
        {/* <div className={classes["image__container"]}>
        <Image
          className={classes.image}
          src={`/assets/img/backgrounds/${imageSrc}`}
          width={300}
          height={300}
          alt={title}
        />
      </div> */}
        <div className={classes.content}>
          <div className={classes.icon}>{icon}</div>
          <h3 className={classes.title}>{title}</h3>
          <ScaleOnHover className={classes["link__container"]}>
            <a className={classes.link} href={whatsappLink}>
              {linkTitle}
            </a>
          </ScaleOnHover>
        </div>
      </motion.div>
    </ScaleInView>
  );
};

export default BenefitsItem;
