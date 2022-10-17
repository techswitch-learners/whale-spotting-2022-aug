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
      <Link to="/browse-sightings">
        <h1>Sightings</h1>
      </Link>
      <Link to="/whaleopedia">
        <h1>Whaleopedia</h1>
      </Link>
      <Link to="/news">
        <h1>Videos</h1>
      </Link>

      <div className="admin-links">
        {!loginContext.isLoggedIn ? (
          <Link to="/login">
            <h1>Log On</h1>
          </Link>
        ) : (
          <div className="admin-only-links">
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
