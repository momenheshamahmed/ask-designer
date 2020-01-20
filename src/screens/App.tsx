import React, { useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

// Screens
import Home from './Home/Home';
import Navbar from '../components/Navbar/Navbar';
import AdminRoot from './admin/root';

import Landing from './Landing/index'

import { EpisodeStore } from '../stores';

import { getCurrentLanguage, Languages, setCurrentLanguage } from '../utils/translation';

const App: React.FC = () => {
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    EpisodeStore.watchEpisodes();
  }, []);
    return (
    <div className="App"  dir={direction}>
      <BrowserRouter>
      <Navbar />
      <Switch>
      <Route
          path="/admin"
        >
          <AdminRoot />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
