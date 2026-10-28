import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AvisoDemo from "@/Components/AvisoDemo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AvisoDemo />
      <Component {...pageProps} />
    </>
  );
}


