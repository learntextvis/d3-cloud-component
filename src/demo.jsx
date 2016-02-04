import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import WordCloud from './components/d3cloud/d3cloud.jsx';

import './demo.html';
import './demo.css';

// This will render out an an example of wordcloud

import data from '../data/data.json';
import kwikData from '../data/kwik_data.json';
import config from '../data/config.json';

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <WordCloud
      config={config}
      data={data}
      kwikData={kwikData}
    />,
    document.querySelector("#main"));
});
