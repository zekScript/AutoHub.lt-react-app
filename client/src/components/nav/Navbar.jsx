import { getCurrentUser } from "../../getCurrentUser/getCurrentUser"
import Cookies from "js-cookie"
// import { getCurrentUser } from "../../../../server/getCurrentUser/getCurrentUser"
const Navbar = () => {
  
  const user = getCurrentUser()
  const isLoggedIn = getCurrentUser() ? true : false

  const logout = () => {
    Cookies.remove("token")
    window.location.reload()
  }

  return (
    
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div className="d-flex ">
      {!isLoggedIn ? (
            <div className='mb-4 mt-3 '>
              <a href='/signin'>Sign in</a>
              <a href='/login'>Log in</a>
            </div>
          ) : (
            <div className='mb-4 mt-3 '>
              {user.name}
              <a className="pointer" onClick={logout}>Logout</a>
            </div>
          )}

      </div>
      

    </div>
  </div>
</nav>





  )
}

export default Navbar