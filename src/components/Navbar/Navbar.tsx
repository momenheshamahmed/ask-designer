import React from "react";
import Assets from "../../assets/index";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">
        <img src={Assets.Images.logo} alt="Ask Designer Logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
