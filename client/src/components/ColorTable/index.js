import React from 'react';
import './style.css';

function colorTable(props) {
  const { count, type, status} = props;
  switch (type) {
    case 'FANS':
        return (
            <div className="table" style={{backgroundColor: status === 'on' ?'rgb(83,171,83)': 'rgb(165,158,147)',userSelect: 'none'}}>{type}: {count}%</div>
        );
    default:
      return false;
  }
}
export default colorTable;
