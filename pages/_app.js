import "@/styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { store } from "@/store/store";
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${josefinSans.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Provider store={store}>
          <NextNProgress />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
      <Analytics />
    </>
  );
}
