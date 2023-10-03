import HeadComponent from "@/components/Head/Head";
import MainLayout from "@/components/Layout/RootLayout/MainLayout";
import Benefits from "@/components/RootPage/Benefits/Benefits";
import Gallery from "@/components/RootPage/Gallery/Gallery";
import Hero from "@/components/RootPage/Hero";
import { imagesURLs } from "@/data/data";

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
        <Gallery
          title="Marcelino Ceballos. Más de 30 años en la aviación."
          imagesURLs={imagesURLs}
        />
      </MainLayout>
    </>
  );
}
