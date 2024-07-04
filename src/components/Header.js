import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") ?? {}));
    if (Object.keys(user).length > 0) {
      setIsLogin(true);
    }
  }, [user]);
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          LinkUp
        </Link>
        {!isLogin ? (
          <div className="navbar-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/profile" className="nav-link profile_button">
              {user?.username ?? ""}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
