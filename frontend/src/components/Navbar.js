import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Bookmark Manager</Link>
        <div>
          {token ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
