import React from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-link ${location.pathname==="/"?"active":""}`}>
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className={`nav-link ${location.pathname==="/about"?"active":""}`}>
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')? <form className="d-flex" role="search">
              <Link className="btn btn-primary" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary ms-2" to="/signup" role="button">Signup</Link>
            </form>: <Link className="btn btn-primary" onClick={handleLogout} to={"/login"} role="button">Logout</Link>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;