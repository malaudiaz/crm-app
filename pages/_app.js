import { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <>
      <Head>
        <title>Simple CRM</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
