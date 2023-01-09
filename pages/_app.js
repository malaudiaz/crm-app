import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css";
import "../styles/globals.css";
import Head from "next/head";
import StateWrapper from "../components/Core/StateWrapper";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Head>
        <title>Simple CRM</title>
      </Head>
      <StateWrapper>
        <Component {...pageProps} />
      </StateWrapper>
    </>
  );
}

export default MyApp;
