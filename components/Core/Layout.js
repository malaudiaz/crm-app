import { useEffect } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import NProgress from "nprogress";
import nProgress from "nprogress";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LogoutForm from "../Users/LogoutForm";

import axios from "axios";

export default function Layout({ children, user }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    NProgress.start();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    router.events.on("routeChangeComplete", () => NProgress.done());

    router.events.on("routeChangeError", () => nProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const logout = async () => {
      try {
        await axios.get("/api/auth/logout");
      } catch (error) {
        console.error(error.message);
      }
      router.push("/users/login");
  };    


  return (
    <>
      <Topbar user={user} />

      <Sidebar />

      <main id="main" className="main">
        {children}

        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
      </main>

      <Footer />

      <LogoutForm
        title={"Desconectarse"}
        message={"¿ Estas seguro que deseas desconectarte ?"}
        secondatyText={"No"}
        primaryText={"Sí"}
        onPrimaryClick={logout}
      />

    </>
  );
}

Layout.proptypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  footer: PropTypes.bool,
};
