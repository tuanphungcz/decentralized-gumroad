import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { ModalProvider, AppProvider } from "contexts";

const MyApp = ({ Component, pageProps }) => (
  <AppProvider>
    <ModalProvider>
      <Toaster />
      <Component {...pageProps} />
    </ModalProvider>
  </AppProvider>
);

export default MyApp;
