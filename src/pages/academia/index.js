import React from "react";
import MainLayout from "@/src/components/Layout/AcademyLayout/MainLayout";
import HeadComponent from "@/src/components/Head/Head";
import Hero from "@/src/components/Academy/Home/Hero";
import PlatformSelector from "@/src/components/Academy/Home/PlatformSelector/PlatformSelector";

const AcademyHome = (props) => {
  return (
    <>
      <HeadComponent
        title="Aviación Simple Academy"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <Hero />
        <PlatformSelector />
      </MainLayout>
      ;
    </>
  );
};

export default AcademyHome;
