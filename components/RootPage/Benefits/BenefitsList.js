import React from "react";
import { benefitsData } from "@/data/data";
import classes from "./BenefitsList.module.css";
import BenefitsItem from "./BenefitsItem";

const BenefitsList = (props) => {
  return (
    <div className={classes.container}>
      {benefitsData.map((item) => (
        <BenefitsItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          description={item.description}
          whatsappLink={item.whatsappLink}
          imageSrc={item.imageSrc}
          linkTitle={item.linkTitle}
        />
      ))}
    </div>
  );
};

export default BenefitsList;
