import React from 'react'
import '../../screens/App.css';
import { Link } from 'react-router-dom'
import Assets  from './../../assets/index'

const NotFound: React.FC = () => {

    return  (
        <div className="NotFound">
            <img src={ Assets.Images.NotFound } alt="This Page Doesn't Exist!"/>
            <Link to="/">Back To Home</Link>
        </div>
    )
  };
  export default NotFound;
