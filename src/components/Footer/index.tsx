import React from 'react'
import '../../screens/App.css';

import Assets from '../../assets/index';

const Footer: React.FC = () => {
    return  (
        <div id="myFooter">
            <ul className="footerList">
                <li> <a href="anchor.fm/askdesigner" target="_blank" rel="noopener noreferrer"> <img alt="facebook" src={ Assets.Images.facebook } /> </a> </li>
                <li> <a href="anchor.fm/askdesigner" target="_blank" rel="noopener noreferrer"> <img alt="twitter" src={ Assets.Images.twitter } /> </a> </li>
                <li> <a href="anchor.fm/askdesigner" target="_blank" rel="noopener noreferrer"> <img alt="instgram" src={ Assets.Images.instgram } /> </a> </li>
                <li> <a href="anchor.fm/askdesigner" target="_blank" rel="noopener noreferrer"> <img alt="linkedin" src={ Assets.Images.linkedin } /> </a> </li>
                <li> <a href="anchor.fm/askdesigner" target="_blank" rel="noopener noreferrer"> <img alt="email" src={ Assets.Images.email } /> </a> </li>
            </ul>
        </div>
    )
  };
  export default Footer;
