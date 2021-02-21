import React from 'react';
import images from '../../assets/images';
import './style.css';

function StatusNetwork(props) {
  const check = images.check;
  const cross = images.cross;
  const {type} = props;
  switch (type) {
    case 'on':
      return (
        <div className="infoWrapper">
          <img src={check} alt="book" width="16" height="16" />
          <div style={{margin: '0 4px', color: 'rgb(41,170,96)',userSelect: 'none'}}>ONLINE</div>
        </div>
      );
    case 'off':
      return (
        <div className="infoWrapper">
          <img src={cross} alt="book" width="12" height="16" />
          <div style={{margin: '0 4px', color: 'rgb(232,102,127)',userSelect: 'none'}}>OFFLINE</div>
        </div>
      );
    default:
      return false;
  }  
}

export default StatusNetwork;
