import React from 'react';
import SVG from 'react-inlinesvg';

import underConstructionSvg from '../assets/image/under-construction.svg';

import './UnderConstruction.scss';

const UnderConstruction = () => {
  return (
    <div id="under-construction">
      <figure>
        <SVG src={underConstructionSvg} />
      </figure>
      <div className="detail">
        <h2>Price Comparison App</h2>
        <p>Under Construction</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
