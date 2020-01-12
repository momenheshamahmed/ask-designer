import React from 'react';
import logo from '../../assets/logo.svg';
import { Link, } from 'react-router-dom';


const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/">
                <img src={logo} alt="Ask Designer Logo" />                
            </Link>
        </nav>
    );
  };

export default Navbar;
  