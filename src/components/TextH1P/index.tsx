import React from 'react'
import '../../screens/App.css';
import { Props } from './types'


const TextH1P: React.FC<Props> = (props) => {
    
    return  (
        <div className="section">
            <div className="sectionText">
                <h1>{ props.text }</h1>
                <p>{ props.paragraph }</p>
            </div>
            <div className="sectionImg">
                <img src={ props.img } alt={ props.text }/>
                {
                    (props.button.text !== '' && props.button.url !== '') 
                    ? 
                    <a className="sectionBtn" target="_blank" href={props.button.url} rel="noopener noreferrer"> 
                        { props.button.text }
                    </a>
                    :
                    null
                }
            </div>
        </div>
    )
  };
  export default TextH1P;
