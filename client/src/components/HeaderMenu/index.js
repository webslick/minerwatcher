import React from 'react';
import images from '../../assets/images';
import './style.css';

function HeaderMenu(props) {
  const { profile, exit, qr }= images;
  const { onClick, userName} = props;
    return (
      <div className="headerWrapper">
        <div className="logo">Minerwatcher</div>
        <div className="borderLink">
          <a download href="https://disk.yandex.ru/d/ZU5gyNL5Zafeng" title="Download exe. file" className="linkDowload">Download Minerwatcher</a>
        </div>
        <img style={{position: 'absolute',top: '23px',left: '370px'}} src={qr} alt="profile" width="40" height="40" />
        <div className="profile">
          <img src={profile} alt="profile" width="25" height="25" />
          <div style={{marginRight: '13px', fontWeight: '300'}}>{userName}</div>
          <img onClick={()=>onClick({formLogin: 'd',formPassword: 'd',})} style={{cursor:'pointer'}} src={exit} alt="exit" width="23" height="23" />
        </div>
      </div>
    );
}

export default HeaderMenu;
