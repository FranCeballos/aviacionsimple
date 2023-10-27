import React from "react";
import MainLayout from "@/components/Layout/AcademyLayout/MainLayout";
import HeadComponent from "@/components/Head/Head";
import Hero from "@/components/Academy/Home/Hero";
import PlatformSelector from "@/components/Academy/Home/PlatformSelector/PlatformSelector";

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
