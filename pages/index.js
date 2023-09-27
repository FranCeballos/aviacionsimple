import { Inter } from "next/font/google";
import HeadComponent from "@/components/Head/Head";
import MainLayout from "@/components/Layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeadComponent
        title="Aviación Simple"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>Main</MainLayout>
    </>
  );
}
