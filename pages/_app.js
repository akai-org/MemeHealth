import Head from "next/head";
import { SnackbarProvider } from "notistack";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      iconVariant={{
        info: '🥳 ',
    }}
    >
      <Head>
        <title>MemeHealth</title>
      </Head>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
