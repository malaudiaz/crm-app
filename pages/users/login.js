import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtVerify } from "jose";

import LoginForm from "../../components/Users/LoginForm";

export default function Login({ authorized }) {
  const router = useRouter();

  useEffect(() => {
    if (authorized) {
      router.push("/");
    }
  }, [authorized, router]);

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
                      
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <Image src="/logo.png" alt="" width="100%" height="100%" />
                    <span
                      className="d-none d-lg-block"
                      style={{ paddingLeft: "10px" }}
                    >
                      Simple CRM
                    </span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Autentificarse
                      </h5>
                      <p className="text-center small">
                        Entre nombre de usuario y contraseña para autentificarse
                      </p>
                    </div>

                    <LoginForm />
                  </div>
                </div>

                <div className="credits">
                  &copy; Copyright{" "}
                  <strong>
                    <span>Simple CRM</span>
                  </strong>
                  . All Rights Reserved

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export async function getServerSideProps({ req, res }) {
  const { crmToken } = req.cookies;
  if (!crmToken) return { props: { authorized: false } };

  try {
    const { payload } = await jwtVerify(
      crmToken,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
    return { props: { authorized: true } };
  } catch (error) {
    return { props: { authorized: false } };
  }
}
