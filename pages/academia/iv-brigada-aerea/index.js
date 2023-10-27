import React from "react";
import MainLayout from "@/components/Layout/AcademyLayout/MainLayout";
import HeadComponent from "@/components/Head/Head";
import Auth from "@/components/Academy/Platform/Auth/Auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isAdmin = session?.user?.isAdmin;

  if (session && isAdmin) {
    return {
      redirect: {
        destination: "/academia/iv-brigada-aerea/admin",
        permanent: false,
      },
    };
  }
  if (session && !isAdmin) {
    return {
      redirect: {
        destination: "/academia/iv-brigada-aerea/plataforma",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default BrigadaAereaHome;
