import React from "react";
import Link from "./Link";
import "../scss/Header.scss";
const Header = ({ islogin }) => {
  return (
    <div className="header">
      <Link href="/" className="header-brand">
        Welcome !
      </Link>
      <nav className="header-nav">
        <div>
          <Link href="/login" className="nav-item">
            Login
          </Link>
          <Link href="/signup" className="nav-item">
            SignUp
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Header;
