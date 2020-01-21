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

const App: React.FC = () => {
    return (
    <div className="App" >
      <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
