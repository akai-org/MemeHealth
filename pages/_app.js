import { useEffect } from "react";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import OneSignal from "react-onesignal";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APPID,
      safari_web_id: "",
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        actionMessage: "Do you want to receive meme notifications?",
        acceptButtonText: "YES",
        cancelButtonText: "NO",
        slidedown: {
          enabled: true,
        },
      },
    });
    (async () => {
      try {
        const currentPermission = await OneSignal.getNotificationPermission();
        const userId = await OneSignal.getUserId();
        if (currentPermission === "granted" && userId) {
          console.log("userId :>> ", userId);
          navigator.sendBeacon(`/api/notifications?userId=${userId}`);
        }
        return null;
      } catch (err) {
        return err;
      }
    })();
  }, []);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      iconVariant={{
        info: "🥳 ",
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
