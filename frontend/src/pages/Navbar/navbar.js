import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { UserContext } from "../user/userContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <div>
      {user ? (
        <div>
          <nav className="navbar">
            <button className="navbar-logo">
              <h1 className="navbar-title" onClick={() => navigate("/main")}>
                Blog
              </h1>
            </button>

            <div className="navbar-buttons">
              <button onClick={() => navigate("/user-profile")}>
                <h1>{user.username}</h1>
              </button>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <nav className="navbar">
            <button className="navbar-logo" onClick={() => navigate("/main")}>
              <h1 className="navbar-title">Blog</h1>
            </button>

            <div className="navbar-buttons">
              <button
                className="navbar-button"
                onClick={() => navigate("/registration")}
              >
                Registration
              </button>
              <button
                className="navbar-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
