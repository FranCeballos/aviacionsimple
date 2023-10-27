import React, { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Input from "@/components/UI/Forms/Inputs/Input";
import ConfirmButton from "@/components/UI/Buttons/ConfirmButton";

import classes from "./LoginForm.module.css";

const LoginForm = ({ title, description }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { push } = useRouter();
  const { data } = useSession();

  const signInHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoginIsLoading(true);
    if (!email || !password) {
      setLoginError("Ingresá los datos necesarios.");
      setLoginIsLoading(false);
      return;
    }
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!login.ok) {
      setLoginError(login.error);
      setLoginIsLoading(false);
      return;
    }

    setLoginError("");
    setLoginIsLoading(false);

    const isAdmin = data?.user?.isAdmin;
    push(`${login.url}/${isAdmin ? "admin" : "plataforma"}`);
  };

  return (
    <div className={classes.content}>
      <h3 className={classes.title}>{title}</h3>
      <h4 className={classes.description}>{description}</h4>
      <div className={classes["form__container"]}>
        <Input
          type="email"
          ref={emailRef}
          placeholder="Email"
          isColumnStyle={true}
        />
        <Input
          type="password"
          ref={passwordRef}
          placeholder="Contraseña"
          isColumnStyle={true}
        />
        <p className={classes.error}>{loginError}</p>
        <ConfirmButton
          style={
            loginIsLoading
              ? { backgroundColor: "grey", cursor: "not-allowed" }
              : {}
          }
          title={loginIsLoading ? "Ingresando..." : "Ingresar"}
          onClick={loginIsLoading ? () => {} : signInHandler}
        />
      </div>
    </div>
  );
};

export default LoginForm;
