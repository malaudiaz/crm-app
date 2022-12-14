import Link from "next/link";
import Image from "next/image";
import {notifications, messages} from "../../data";

function Notifications() {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link nav-icon"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">{notifications.length}</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">You have {notifications.length} new notifications
            <a href="#">
              <span className="badge rounded-pill bg-primary p-2 ms-2">
                View all
              </span>
            </a>
        </li>

        {
          notifications.map( ({severity, title, notification, timeElapsed}, index) => (
            <div key={index}>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className={"bi bi-exclamation-circle text-"+severity}></i>
                <div>
                  <h4>{title}</h4>
                  <p>{notification}</p>
                  <p>{timeElapsed}</p>
                </div>
              </li>
            </div>
          ))
        }

        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>
      </ul>
    </li>
  )
}

function Messages() {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link nav-icon"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-chat-left-text"></i>
        <span className="badge bg-success badge-number">{messages.length}</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li className="dropdown-header" key="viewall">
          You have {messages.length} new messages
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>

        {

          messages.map( ( {from, message, timeElapsed, photo }, index) => (
              <div key={index}>
                <li key="divider">
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                <a href="#">
                  <Image
                    src={photo}
                    alt=""
                    width="100%"
                    height="0%"
                    className="rounded-circle"
                  />                  
                  <div>
                    <h4>{from}</h4>
                    <p>
                      {message}
                    </p>
                    <p>{timeElapsed}</p>
                  </div>
                </a>
                </li>
              </div>
          ))

        }

        <li key="divider">
          <hr className="dropdown-divider" />
        </li>

        <li className="dropdown-footer" key="footer">
          <a href="#">Show all messages</a>
        </li>
      </ul>
    </li>
  )
}

export default function Topbar({user}) {

  const toggle = () => {
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
    select('body').classList.toggle('toggle-sidebar');
  };    

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="#" className="logo d-flex align-items-center">
          <Image src="/logo.png" alt=""  width="50%" height="50%" />
          <span className="d-none d-lg-block" style={{paddingLeft: "10px"}}>Simple CRM</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" onClick={toggle}></i>
      </div>

      {/* <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          {/* <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li> */}

          <Notifications />

          <Messages />

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <Image
                src="/profile-img.jpg"
                alt="Perfil"
                width="100%"
                height="100%"
                className="rounded-circle"
              />              
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user.fullname}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.fullname}</h6>
                <span>{user.job}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                  <Link href="/users/profile">
                    <a className="dropdown-item d-flex align-items-center">
                      <i className="bi bi-person"></i>
                      <span>Mi Perfil</span>
                    </a>
                  </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li data-bs-toggle="modal" data-bs-target="#verticalycentered">
                  <a href="#" className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Desconectarse</span>
                  </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
