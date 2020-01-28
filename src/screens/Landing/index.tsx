import React from 'react'
import '../../screens/App.css';
import Assets  from './../../assets/index'
import TextH1P from './../../components/TextH1P'

const Landing: React.FC = () => {

    return  (
        <div className="container">
            
            <TextH1P 
            text={'Listen To The Design World!'}
            paragraph={'We are a team of two designers, trying to present something of a benefit to the Design field in the middle east. We record interviews with talented and experienced designers and other design-related positions to transfer their experience to others. Our goal is to help designers by giving them exposure to different aspects in the design field, such as branding, visual design, etc., so whatever you are interested in or specialized in, we promise you will benefit and enjoy.'}
            img={ Assets.Images.waves }
            button={{text:'Listen Now', url: 'https://anchor.fm/askdesigner'}}
            />
            <TextH1P 
            text={'Ask Designer App!'}
            paragraph={'We are working on creating an application for our audience so that they can reach episodes easily. We will also add new features that will help them learn more in the design field.'}
            img={ Assets.Images.devices }
            button={{text:'', url: ''}}
            />
        </div>
    )
  };
  export default Landing;
