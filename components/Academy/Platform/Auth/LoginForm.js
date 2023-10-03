import React from "react";
import classes from "./LoginForm.module.css";
import SectionWrapper from "@/components/UI/SectionWrapper/SectionWrapper";
import Input from "@/components/UI/Forms/Inputs/Input";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";

const LoginForm = ({ title, description }) => {
  return (
    <div className={classes.content}>
      <h3 className={classes.title}>{title}</h3>
      <h4 className={classes.description}>{description}</h4>
      <div className={classes["form__container"]}>
        <Input placeholder="Email" />
        <Input placeholder="Contraseña" />
        <ConfirmButton title="Ingresar" onClick={() => {}} />
      </div>
    </div>
  );
};

export default LoginForm;
