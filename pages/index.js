import Layout from "../components/Core/Layout";
import { jwtVerify } from "jose";
import PageTitle from "../components/Core/Pagetitle";
import Infocard from "../components/Dashboard/Infocard";

export default function Home({ user }) {
  return (
    <Layout user={user}>
      <PageTitle title={"Panel Informativo"} />
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <Infocard
                name={"sales"}
                title={"Ventas"}
                clsIcon={"bi bi-cart"}
                value={"145"}
                percent={"12%"}
                status={"Aumenta"}
              />
              <Infocard
                name={"revenue"}
                title={"Ingresos"}
                clsIcon={"bi bi-currency-dollar"}
                value={"$3,264"}
                percent={"8%"}
                status={"Aumenta"}
              />
              <Infocard
                name={"customers"}
                title={"Clientes"}
                clsIcon={"bi bi-people"}
                value={"1244"}
                percent={"12%"}
                status={"Disminuye"}
              />
            </div>
          </div>
          <div className="col-lg-4">           
            <div className="card">
                <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                    </li>

                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
                </div>

                <div className="card-body">
                <h5 className="card-title">Recent Activity <span>| Today</span></h5>

                <div className="activity">

                    <div className="activity-item d-flex">
                    <div className="activite-label">32 min</div>
                    <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                    <div className="activity-content">
                        Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                    </div>
                    </div>

                    <div className="activity-item d-flex">
                    <div className="activite-label">56 min</div>
                    <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                    <div className="activity-content">
                        Voluptatem blanditiis blanditiis eveniet
                    </div>
                    </div>

                    <div className="activity-item d-flex">
                    <div className="activite-label">2 hrs</div>
                    <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                    <div className="activity-content">
                        Voluptates corrupti molestias voluptatem
                    </div>
                    </div>

                    <div className="activity-item d-flex">
                    <div className="activite-label">1 day</div>
                    <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                    <div className="activity-content">
                        Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                    </div>
                    </div>

                    <div className="activity-item d-flex">
                    <div className="activite-label">2 days</div>
                    <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                    <div className="activity-content">
                        Est sit eum reiciendis exercitationem
                    </div>
                    </div>

                    <div className="activity-item d-flex">
                    <div className="activite-label">4 weeks</div>
                    <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                    <div className="activity-content">
                        Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                    </div>
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
