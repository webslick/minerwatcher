import React from 'react';
import './style.css';

function TitleRig(props) {
  const {total, worked} = props;
    return (
      <div className="titleWraper">
        <div className="title">{`My rigs`}</div>
        <div className="status">{`worked | total`}</div>
        <div className="total">{`${worked} | ${total}`}</div>
      </div>
    );
}

export default TitleRig;
