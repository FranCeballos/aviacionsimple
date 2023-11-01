import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";

import HeadComponent from "@/src/components/Head/Head";
import MainLayout from "@/src/components/Academy/Platform/Layout/MainLayout";
import Dashboard from "@/src/components/Academy/Platform/Admin/Dashboard/Dashboard";

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

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/academia/iv-brigada-aerea",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AdminHome;
