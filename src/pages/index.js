import HeadComponent from "@/src/components/Head/Head";
import MainLayout from "@/src/components/Layout/RootLayout/MainLayout";
import Benefits from "@/src/components/RootPage/Benefits/Benefits";
import Gallery from "@/src/components/RootPage/Gallery/Gallery";
import Hero from "@/src/components/RootPage/Hero";
import { imagesURLs } from "@/src/data/data";

export default function Home({ images }) {
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
          imagesURLs={images}
        />
      </MainLayout>
    </>
  );
}

export const getStaticProps = () => {
  return {
    props: {
      images: imagesURLs,
    },
  };
};
