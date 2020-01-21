import React from 'react';
import Assets from '../../assets/index';

const Navbar: React.FC = () => {
    return (
        <nav>
            <img src={ Assets.Images.logo } alt="Ask Designer Logo" />                
        </nav>
    );
  };

export default Navbar;
  