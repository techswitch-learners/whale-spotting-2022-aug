import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import Hamburger from "hamburger-react";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleMenu() {
    if (isExpanded) {
      setIsExpanded(false);
    }
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="mobile-menu">
        <Hamburger toggled={isExpanded} toggle={setIsExpanded} />
      </div>
      <Link to="/">
        <img
          className="navbar__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        />
      </Link>
      <ul className={`menu-items ${isExpanded ? "expanded" : ""}`}>
        <Link to="/" onClick={() => toggleMenu()}>
          <h1>WHALESPOTTING</h1>
        </Link>
        <Link to="/browse-sightings" onClick={() => toggleMenu()}>
          <h1>Sightings</h1>
        </Link>
        <Link to="/whaleopedia" onClick={() => toggleMenu()}>
          <h1>Whaleopedia</h1>
        </Link>
        <Link to="/videos" onClick={() => toggleMenu()}>
          <h1>Videos</h1>
        </Link>

        <div className="admin-links">
          {!loginContext.isLoggedIn ? (
            <Link to="/login" onClick={() => toggleMenu()}>
              <h1>Log On</h1>
            </Link>
          ) : (
            <div className="admin-only-links">
              <Link to="/sightings/pending" onClick={() => toggleMenu()}>
                <h1>Pending</h1>
              </Link>
              <Link to="/create-user" onClick={() => toggleMenu()}>
                <h1>User+</h1>
              </Link>
              <Link to="/" onClick={() => toggleMenu()}>
                <a className="button is-primary" onClick={loginContext.logOut}>
                  <h1>Log Out</h1>
                </a>
              </Link>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};
