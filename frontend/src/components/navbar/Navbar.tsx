import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleMenu() {
    setIsExpanded((current) => !current);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <Link to="/">
        <img
          className="navbar__logo"
          src="/logo.png"
          alt="Whale Spotting logo"
        />
      </Link>
      <Link to="/">
        <h1>WHALESPOTTING</h1>
      </Link>
      <Link to="/brose-sightings">
        <h1>BROWSE SIGHTINGS</h1>
      </Link>
      <Link to="/whaleopedia">
        <h1>WHALEOPEDIA</h1>
      </Link>
      <Link to="/news">
        <h1>VIDEOS</h1>
      </Link>

      <div className="admin-links">
        {!loginContext.isLoggedIn ? (
          <Link to="/login">
            <h1>LOG IN</h1>
          </Link>
        ) : (
          <div className="admin-only-links">
            <Link to="/approve-sightings">
              <h1>APPROVE SIGHTINGS</h1>
            </Link>
            <Link to="/create-user">
              <h1>CREATE USER</h1>
            </Link>
            <Link to="/">
              <a className="button is-primary" onClick={loginContext.logOut}>
                <strong>LOG OUT</strong>
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
