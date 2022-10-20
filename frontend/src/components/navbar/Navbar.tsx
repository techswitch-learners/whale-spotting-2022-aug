import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";
import Hamburger from "hamburger-react";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);
  const [isExpanded, setIsExpanded] = useState(false);

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
        <Link to="/" onClick={() => setIsExpanded(false)}>
          Home
        </Link>
        <Link to="/sightings" onClick={() => setIsExpanded(false)}>
          Sightings
        </Link>
        <Link to="/whaleopedia" onClick={() => setIsExpanded(false)}>
          Whaleopedia
        </Link>
        <Link to="/videos" onClick={() => setIsExpanded(false)}>
          Videos
        </Link>

        <div className="admin-links">
          {!loginContext.isLoggedIn ? (
            <Link to="/login" onClick={() => setIsExpanded(false)}>
              Log In
            </Link>
          ) : (
            <div className="logged-in-links">
              <Link
                to="/sightings/pending"
                onClick={() => setIsExpanded(false)}
              >
                Pending
              </Link>
              <Link to="/users/create" onClick={() => setIsExpanded(false)}>
                User +
              </Link>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  loginContext.logOut();
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};
