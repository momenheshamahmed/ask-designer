import React from 'react'
import '../../screens/App.css';
import Assets  from './../../assets/index'
import TextH1P from './../../components/TextH1P'

const Landing: React.FC = () => {

    return  (
        <div className="container">
            
            <TextH1P 
            text={'Listen to the design world!'}
            paragraph={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod imperdiet eget sed ullamcorper ante. Eros, mattis aliquam nunc sapien justo, aliquam at. Consectetur enim vitae, ac in lacus quisque viverra. Proin nunc risus mi nam elementum, in nec.'}
            img={ Assets.Images.waves }
            button={{text:'Listen Now', url: 'anchor.fm/askdesigner'}}
            />
            <TextH1P 
            text={'Listen to the design world!'}
            paragraph={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod imperdiet eget sed ullamcorper ante. Eros, mattis aliquam nunc sapien justo, aliquam at. Consectetur enim vitae, ac in lacus quisque viverra. Proin nunc risus mi nam elementum, in nec.'}
            img={ Assets.Images.devices }
            button={{text:'', url: ''}}
            />
        </div>
    )
  };
  export default Landing;
