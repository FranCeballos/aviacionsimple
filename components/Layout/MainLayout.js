import React from "react";
import classes from "./MainLayout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
