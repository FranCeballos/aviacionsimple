import HeadComponent from "@/components/Head/Head";
import MainLayout from "@/components/Layout/MainLayout";
import Benefits from "@/components/RootPage/Benefits/Benefits";
import Hero from "@/components/RootPage/Hero";

export default function Home() {
  return (
    <>
      <HeadComponent
        title="Aviación Simple"
        description="Entrá al mundo de la aviación aeronautica."
      />
      <MainLayout>
        <Hero />
        <Benefits />
      </MainLayout>
    </>
  );
}
