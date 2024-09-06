import React from "react";
import classes from "./BenefitsItem.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import ScaleOnHover from "../../UI/AnimatedComponents/ScaleOnHover";

const BenefitsItem = ({ icon, title, whatsappLink }) => {
  return (
    <ScaleOnHover className={classes.container}>
      <Link href={whatsappLink}>
        <motion.div whileHover={{}} className={classes.content}>
          <div className={classes.icon}>{icon}</div>
          <h3 className={classes.title}>{title}</h3>
        </motion.div>
      </Link>
    </ScaleOnHover>
  );
};

export default BenefitsItem;
