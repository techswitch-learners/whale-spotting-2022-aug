import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import Hamburger from "hamburger-react";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleMenu() {
    setIsExpanded((current) => !current);
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
      <Link
        to="/"
        className={`${isExpanded ? "desktop-menu--expanded" : "desktop-menu"}`}
      >
        <h1>WHALESPOTTING</h1>
      </Link>
      <Link
        to="/browse-sightings"
        className={`${isExpanded ? "desktop-menu--expanded" : "desktop-menu"}`}
      >
        <h1>Sightings</h1>
      </Link>
      <Link
        to="/whaleopedia"
        className={`${isExpanded ? "desktop-menu--expanded" : "desktop-menu"}`}
      >
        <h1>Whaleopedia</h1>
      </Link>
      <Link
        to="/videos"
        className={`${isExpanded ? "desktop-menu--expanded" : "desktop-menu"}`}
      >
        <h1>Videos</h1>
      </Link>

      <div
        className={`admin-links ${
          isExpanded ? "desktop-menu--expanded" : "desktop-menu"
        }`}
      >
        {!loginContext.isLoggedIn ? (
          <Link to="/login">
            <h1>Log On</h1>
          </Link>
        ) : (
          <div
            className={`admin-only-links ${
              isExpanded ? "desktop-menu--expanded" : "desktop-menu"
            }`}
          >
            <Link to="/sightings/pending">
              <h1>Pending</h1>
            </Link>
            <Link to="/create-user">
              <h1>User+</h1>
            </Link>
            <Link to="/">
              <a className="button is-primary" onClick={loginContext.logOut}>
                <strong>Log Out</strong>
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
