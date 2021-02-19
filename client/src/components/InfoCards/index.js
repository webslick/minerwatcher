import React from 'react';
import images from '../../assets/images';
import './style.css';

function InfoCards() {
  const info = images.info;
    return (
      <div className="infoWrapper">
        <img src={info} alt="book" width="16" height="16" />
        <div style={{margin: '0 4px', color: 'rgb(184,185,185)', userSelect: 'none'}}>PowerColor 580 8GB</div>
      </div>
    );
}

export default InfoCards;
