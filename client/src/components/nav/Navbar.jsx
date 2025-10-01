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
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom  px-4 shadow-sm z-3">
      {/* Logo / Brand */}
      <a href="/" className="d-flex align-items-center mb-2 mb-md-0  text-decoration-none link-light">
        <h3 className="fw-bold m-0">Help desk</h3>
      </a>

      {/* Navigation Links */}
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-3 link-light">Home</a></li>
        <li><a href="/make-ticket" className="nav-link px-3 link-light">Contact</a></li>
        <li><a href="#" className="nav-link px-3 link-light">FAQs</a></li>
      </ul>

      {/* Right side: User or Login */}
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

            <li><a className="dropdown-item" href="/make-ticket">Make a Ticket</a></li>
            <li><a className="dropdown-item" href="/">Your Tickets</a></li>

            {user.role === "ADMIN" && (
              <>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-header text-muted">Admin Panel</li>
                <li><a className="dropdown-item" href="/admin/tickets">View All Tickets</a></li>
                <li><a className="dropdown-item" href="/admin/users">View All Users</a></li>
              </>
            )}

            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={logout}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-end">
          <a href="/login" className="btn btn-outline-primary me-2">Login</a>
          <a href="/signin" className="btn btn-primary">Sign-up</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
