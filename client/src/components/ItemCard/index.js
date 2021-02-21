import React from 'react';
import images from '../../assets/images';
import ColorTable from '../ColorTable/index';
import InfoCards from '../InfoCards/index';
import StatusNetwork from '../StatusNetwork/index';
import Moment from 'react-moment';
import { convertTimeBd, differentsTimeOff } from '../../helpers';
import style from './style.css';

class ItemCard extends React.Component {

    render(){
      const {
        fill,
        count,
        arr_temp,
        login,
      } = this.props;
      const objDiff = differentsTimeOff(convertTimeBd(fill.status === 'on' ? fill.last_online : fill.last_offline,fill.status === 'on' ? fill.online_time : fill.offline_time));
      const lock = images.lock;
      const mess = images.mess;
      return (
        <div className="itemWrapper" style={{backgroundColor: fill.status === 'on' ? '' : `rgb(241,241,241)`}}>
          <div className="rowItemRig">
            <div className="titleRig">{`${fill.name_rig}_${count}`}</div>
            <div className="infoRig">token <img style={{ marginTop: '5px'}} src={lock} width={14} /> {fill.token}</div>
            <div className="infoRig">owner <img style={{ marginTop: '5px'}} src={mess} width={14} /> {login}</div>
            <div className="wrapperVersion">
            <div className="table" style={{backgroundColor:'rgb(42,101,166)',userSelect: 'none'}}>Config ver: 2</div>
              <div style={{width: '10px', height: '10px'}} />
            <div className="table" style={{backgroundColor:'rgb(42,101,166)',userSelect: 'none'}}>Exe ver: 2</div>
            </div>
            <InfoCards name={fill.nameCards} />
          </div>
          <div className="rowItemRig">
            <div className="onlineWrapper">
              <StatusNetwork type={fill.status} />
            </div>
            <div className="statusWrapper">
              <div className="titleOnline">{fill.status === 'on' ? `Online:` : `Offline`}</div>
              <div className="timeOnline">{`${objDiff.days} Days ${objDiff.hours} hours. ${objDiff.minutes} min. ${objDiff.seconds} sec. `}</div>
            </div>
            <div className="updateWrapper">
              <div className="titileUpdate">Last update: </div>
              <Moment format="YYYY-MM-DD HH:mm" className="timeUpdate" date={convertTimeBd(fill.last_update)} />
              <Moment className="timeUpdate" fromNow>{convertTimeBd(fill.last_update)}</Moment>
            </div>
          </div>
          <div className="rowItemRig">
              <div className="colorWrapper">
                {
                  arr_temp.map((item,i) => (
                    <div key={i} style={{display: 'flex', flexDirection: 'row', marginBottom: '2px'}}>
                      <div
                        className="table"
                        style={{
                          backgroundColor: fill.status === 'on' ? item <= 74 ? 'rgb(83,171,83)' : (item >= 75 && item < 80) ? 'rgb(230,161,60)':'rgb(210,60,60)' : 'rgb(165,158,147)',
                          userSelect: 'none'
                          }}>
                        {'GPU'} {fill.status === 'on' ? item : `?-?-?-?`} C°
                      </div>
                      <div style={{width: '10px', height: '10px'}} />
                      <ColorTable status={fill.status} count={fill.status === 'on' ? (item+7) : `?-?-?-?`} type="FANS" />
                     </div>
                  ))
                }
              </div>
          </div>
        </div>
      );
    }
}
export default ItemCard;