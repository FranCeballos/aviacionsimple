import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import HeadComponent from "@/components/Head/Head";
import MainLayout from "@/components/Academy/Platform/Layout/MainLayout";
import StudentDashboard from "@/components/Academy/Platform/StudentDashboard/StudentDashboard";

const PlatformPage = (props) => {
  return (
    <>
      <HeadComponent
        title="Aviación Simple Academy"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <StudentDashboard />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.isAdmin) {
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

export default PlatformPage;
