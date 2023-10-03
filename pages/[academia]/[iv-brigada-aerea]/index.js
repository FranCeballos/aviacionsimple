import React from "react";
import MainLayout from "@/components/Layout/AcademyLayout/MainLayout";
import HeadComponent from "@/components/Head/Head";
import Auth from "@/components/Academy/Platform/Auth/Auth";

const BrigadaAereaHome = (props) => {
  return (
    <>
      <HeadComponent
        title="Aviación Simple Academy"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <Auth />
      </MainLayout>
    </>
  );
};

export default BrigadaAereaHome;
