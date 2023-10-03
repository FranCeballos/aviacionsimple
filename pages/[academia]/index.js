import React from "react";
import MainLayout from "@/components/Layout/AcademyLayout/MainLayout";
import HeadComponent from "@/components/Head/Head";
import Hero from "@/components/Academy/Home/Hero";

const AcademyHome = (props) => {
  return (
    <>
      <HeadComponent
        title="Aviación Simple Academy"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <Hero />
      </MainLayout>
      ;
    </>
  );
};

export default AcademyHome;
