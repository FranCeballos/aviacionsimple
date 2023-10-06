import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${josefinSans.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
    </>
  );
}
