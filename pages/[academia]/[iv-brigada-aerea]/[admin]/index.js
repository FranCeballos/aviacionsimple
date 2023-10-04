import React from "react";
import HeadComponent from "@/components/Head/Head";
import MainLayout from "@/components/Layout/AcademyLayout/Admin/MainLayout";
import Dashboard from "@/components/Academy/Platform/Admin/Dashboard/Dashboard";

const AdminHome = (props) => {
  return (
    <>
      <HeadComponent
        title="Aviación Simple Academy"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
};

export default AdminHome;
