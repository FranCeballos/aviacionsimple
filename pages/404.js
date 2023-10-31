import React from "react";
import MainLayout from "@/components/Layout/AcademyLayout/MainLayout";
import Link from "next/link";

const NotFoundPage = (props) => {
  return (
    <MainLayout>
      <div className="not-found__container">
        <h1>
          Upps! No hemos encontrado la página. Comprueba que la URL sea
          correcta.
        </h1>
        <Link href="/" className="not-found__link">
          Volvé al inicio
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
