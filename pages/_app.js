import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { MusicNFTProvider } from "../context/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MusicNFTProvider>
        <Component {...pageProps} />
        <Toaster />
      </MusicNFTProvider>

      </>
  );
}
