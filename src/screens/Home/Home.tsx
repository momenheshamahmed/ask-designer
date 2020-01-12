import React from 'react'
import EpisodeThumnial from '../../components/EpisodeThumbnial/EpisodeThumnial';
import '../../screens/App.css';

import { useObserver } from 'mobx-react';

import testImg from '../../assets/testImg.svg';

import { EpisodeStore } from '../../stores';

const Home: React.FC = () => {
    const episodestore = EpisodeStore;
 
    return useObserver(() => (
        <div>
            <EpisodeThumnial Episodes={episodestore.Episodes} />
        </div>
    ))
  };
  export default Home;
