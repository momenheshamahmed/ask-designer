import React from 'react'
import '../../screens/App.css';
import { Link } from 'react-router-dom';
import { Props } from './types';
import { getCurrentLanguage } from './../../utils/translation/index';

const EpisodeThumnial: React.FC<Props> = (props) => {
    const currentLanguage = getCurrentLanguage();
    return (
      <div className="episodesList">
      {
        props.Episodes.map((episode, index) => (

          <div className='EpisodeThumnial'  key={episode.id}>

            <Link to={'/' + episode.id}>
                <img src={ episode.content[currentLanguage].imgURL } alt={ episode.content[currentLanguage].title } className="thumbnial"/>
            </Link>
            <h1> { episode.content[currentLanguage].title } </h1>   
           </div>
        ))
      }
    </div>
    
    );
  };

export default EpisodeThumnial;
  