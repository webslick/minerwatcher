import React from 'react';
import './style.css';

function HeaderTable(props) {
  const {title} = props;
  
    return (
      <div className="headerTable">
        {
          title.map( (e, i) => <div key={i} className="itemTable">{e}</div> )
        }
      </div>
    );
}

export default HeaderTable;
