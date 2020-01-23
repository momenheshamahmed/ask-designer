import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
// Components
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/index'
// Screens
import Landing from './Landing/index'
import NotFound from './NotFound/index'

// Messenger 
import MessengerCustomerChat from 'react-messenger-customer-chat';

const App: React.FC = () => {
    return (
    <div className="App" >
      <BrowserRouter>
      <MessengerCustomerChat
        pageId="471125470313114"
        appId="414050852835880"
        htmlRef={window.location.pathname}
      />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
