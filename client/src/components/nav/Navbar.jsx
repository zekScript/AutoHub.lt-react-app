import { getCurrentUser } from "../../getCurrentUser/getCurrentUser";
import Cookies from "js-cookie";
import "../styles/headers.css";

const Navbar = () => {
  const user = getCurrentUser();
  const isLoggedIn = !!user;

  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a href="/" className="nav-link link-body-emphasis px-2 active" aria-current="page">
                Pagrindas
              </a>
            </li>
            <li className="nav-item">
              <a href="/my-wishlist" className="nav-link link-body-emphasis px-2">
                Norai
              </a>
            </li>
            <li className="nav-item">
              <a href="/faqs" className="nav-link link-body-emphasis px-2">
                FAQs
              </a>
            </li>
          </ul>
          <ul className="nav">
            {isLoggedIn ? (
               <div className="dropdown text-end">
          <a
            href="#"
            className="d-block link-light text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="./profilepic.jpg"
              alt="Profile"
              width="42"
              height="42"
              className="rounded-circle border"
            />
          </a>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li className="dropdown-header fw-bold">{user.name}</li>
            <li><hr className="dropdown-divider" /></li>

            <li><a className="dropdown-item" href="/make-ticket">Padaryti tiketa</a></li>
            <li><a className="dropdown-item" href={`/${user.id}/tickets`}>Tavo tiketai</a></li>

            {user.role === "ADMIN" && (
              <>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-header text-muted">Admin Panel</li>
                <li><a className="dropdown-item" href="/admin/tickets">View All Tickets</a></li>
                <li><a className="dropdown-item" href="/admin/users">View All Users</a></li>
              </>
            )}
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href={`/${user.id}/posts`}>Tavo skelbimai</a></li>
                        <li><a className="dropdown-item" href={`/add_skelbima`}>Pridėti skelbima</a></li>
                                    <li><a className="dropdown-item" href={`/${user.id}/wishlist`}>Norai</a></li>




            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={logout}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
            ) : (
              <>
                <li className="nav-item">
                  <a href="/login" className="nav-link link-body-emphasis px-2">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/signin" className="nav-link link-body-emphasis px-2">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none cursor-pointer"
          >
            <span className="fs-4">AutoHub.lt</span>
          </a>
          <a href="/add_skelbima" type="button" className="btn btn-success me-2">
            + Pridėti skelbimą
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;