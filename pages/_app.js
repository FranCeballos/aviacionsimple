import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${josefinSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
