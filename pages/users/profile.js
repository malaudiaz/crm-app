import Layout from "../../components/Core/Layout";
import Image from "next/image";
import { jwtVerify } from "jose";
import PageTitle from "../../components/Core/Pagetitle";

export default function Profile( { user } ) {
  return (
    <Layout user={user}>
      <PageTitle title={"Pérfil del Usuario"} except={"Usuarios"} />
      <section className="section profile">
        <div className="row">

          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <Image
                  src="/profile-img.jpg"
                  alt="Perfil"
                  width="100%"
                  height="100%"
                  className="rounded-circle"
                />
                <h2>Kevin Anderson</h2>
                <h3>Web Designer</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">

                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Vista General
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Editar Pérfil
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Cambio de Contraseña
                    </button>
                  </li>
                </ul>

                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">Detalles del Pérfil</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Nombre</div>
                      <div className="col-lg-9 col-md-8">Kevin Anderson</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Empresa</div>
                      <div className="col-lg-9 col-md-8">
                        Lueilwitz, Wisoky and Leuschke
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Cargo</div>
                      <div className="col-lg-9 col-md-8">Web Designer</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">País</div>
                      <div className="col-lg-9 col-md-8">USA</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Dirección</div>
                      <div className="col-lg-9 col-md-8">
                        A108 Adam Street, New York, NY 535022
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Teléfono</div>
                      <div className="col-lg-9 col-md-8">
                        (436) 486-3538 x29071
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Correo</div>
                      <div className="col-lg-9 col-md-8">
                        k.anderson@example.com
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade profile-edit pt-3"
                    id="profile-edit"
                  >
                    <form>
                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Foto del Pérfil
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <Image
                            src="/profile-img.jpg"
                            alt="Perfil"
                            width="100%"
                            height="100%"
                          />                          
                          <div className="pt-2">
                            <a
                              href="#"
                              className="btn btn-primary btn-sm"
                              title="Cargar nueva foto de pérfil"
                            >
                              <i className="bi bi-upload"></i>
                            </a>
                            <a
                              href="#"
                              className="btn btn-danger btn-sm"
                              title="Eliminar mí foto de perfil"
                            >
                              <i className="bi bi-trash"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Nombre
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="fullName"
                            type="text"
                            className="form-control"
                            id="fullName"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Empresa
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="company"
                            type="text"
                            className="form-control"
                            id="company"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Cargo
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="job"
                            type="text"
                            className="form-control"
                            id="Job"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          País
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="country"
                            type="text"
                            className="form-control"
                            id="Country"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Dirección
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="address"
                            type="text"
                            className="form-control"
                            id="Address"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Teléfono
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="phone"
                            type="text"
                            className="form-control"
                            id="Phone"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">
                          Correo
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="Email"
                          />
                        </div>
                      </div>


                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    <form>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">Contraseña Actual</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="password" type="password" className="form-control" id="currentPassword"/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">Nueva Contraseña</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="newpassword" type="password" className="form-control" id="newPassword"/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label className="col-md-4 col-lg-3 col-form-label">Confirmar Contraseña</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="renewpassword" type="password" className="form-control" id="renewPassword"/>
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                      </div>
                    </form>

                  </div>

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { crmToken } = req.cookies;
  try {
    const { payload } = await jwtVerify(
      crmToken,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
    return {
      props: {
        user: {
          username: payload.username,
          fullname: payload.fullname,
          job: payload.job,
        },
      },
    };
  } catch (error) {
    return {
      props: { user: { username: "", fullname: "", job: payload.job } },
    };
  }
}