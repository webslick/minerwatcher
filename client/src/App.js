/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './App.css'; 
import React from 'react';
import { connect } from 'react-redux';
import store from './redux/store';
import PopapLogin from './components/PopapLogin/index';
import HeaderMenu from './components/HeaderMenu/index';
import ItemCard from './components/ItemCard/index';
import TitleRig from './components/TitleRig/index';
import HeaderTable from './components/HeaderTable/index';
import moment from 'moment';
import {
  appGetUser,
  appPutUser,
  appGetRigs,
  appGetConfig,
  appPutRigs,
  appGetInfo,
  copyDataRig,
  copyDataTemp,
  copyDataInfo,
  appPutRigsArr,
  appPutMail
} from './redux/actions/app';
import { getWorkedRig,proccesingArrTimeToCards } from './helpers';

class App extends React.Component {
  intervalLoop = null;
  updateDBApp = null;
  updateWindowApp = null;
  
  constructor( props ){
    super( props );
    this.getActualDateBD = this.getActualDateBD.bind(this);
  }

  componentDidMount() {
    const {
      // fetchWriteDataTemp,
      sinhronicDataTemp,
      sinhronicDataRig,
      sinhronicDataInfo,
      putTempArr,
    } = this.props;
    this.updateDBApp = setInterval(this.getActualDateBD,61050*2); // Запрашиваем базу данных каждые 10 мин
    // this.processInterval = setInterval(()=>{
    //   putTempArr(
        // proccesingArrTimeToCards(store.getState().rigs.newData.cardsInfoArr,store.getState().config.newData)
    //   );
      // sinhronicDataInfo();
    //   sinhronicDataRig();
    //   console.log('обработали инфу',moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm")))
    // },62400*2); // обробатываем инфу4
    
    this.getActualDateBD()
    .then(() => {
      // putTempArr(
      //   proccesingArrTimeToCards(store.getState().rigs.newData.cardsInfoArr,store.getState().config.newData)
      // );
      // sinhronicDataTemp();
      // sinhronicDataRig();
      sinhronicDataInfo();
    })
  }

  async firstGetActualDateBD() { // DONE!
    const { fetchGetInfo } = this.props;
    // const { fetchGetUser,fetchGetRigs,fetchGetTempRigs } = this.props;
    // await fetchGetRigs(`/api/getRigs?id=1`);
    // await fetchGetUser(`/api/getAdmin?id=1`);
    // await fetchGetTempRigs(`/api/getTempRigs?id=1`);
    // await fetchGetInfo(`/server/getdata`);
  }

  async getActualDateBD() { // DONE!
    const { fetchGetInfo,sinhronicDataInfo,info } = this.props;
    await fetchGetInfo(`/server/getdata`);
    await sinhronicDataInfo();
  }

  componentWillUnmount() {
    clearInterval(this.updateWindowApp);
    clearInterval(this.updateDBApp);
  }
  
  render() {
    const {
      formPassword,
      formLogin,
      email,
      password,
      login,
      cardsInfoArr,
      toogle_total_temp,
      total_temp_max,
      total_temp_min,
      putUser,
      putMail,
      info
    } = this.props;
    const work = getWorkedRig(info.oldData.rigs);
    // const work = getWorkedRig(cardsInfoArr); //!
    // if (true) {
    if (formLogin === info.oldData.login && formPassword === info.oldData.password) {
    // if (formLogin === login && formPassword === password) {
      return (
        <div className="App">
          <HeaderMenu userName={info.oldData.login} onClick={(event) => {
          // <HeaderMenu userName={login} onClick={(event) => {
             putUser(event);
          }} />
          <TitleRig total={work[1]} worked={work[0]}/>
          <div className="titleUpdateInfo">Information updates every ten minutes</div>
          <HeaderTable title={['Name','Status','Details']} />
          {
            info.oldData.rigs.map((obj,i,arr) => <ItemCard
              offtimer={this.props.info} 
              login={info.oldData.email_admin} 
              tempConfig={{
                toogle_total_temp: info.oldData.toogle_total_temp,
                total_temp_max: info.oldData.total_temp_max,
                total_temp_min: info.oldData.total_temp_min
              }} 
              count={i+1} 
              fill={arr[i]}
              arr_temp={obj.temp_arr}
              key={i} 
            />)
           }
          {/* {
            cardsInfoArr.map((obj,i,arr) => <ItemCard
              offtimer={this.props} 
              login={email} 
              tempConfig={{
                toogle_total_temp: toogle_total_temp,
                total_temp_max: total_temp_max,
                total_temp_min: total_temp_min
              }} 
              count={i+1} 
              fill={arr[i]}
              arr_temp={obj.temp_arr}
              key={i} 
            />)
           } */} 
        </div>
      );
    } else {
      return (
        <div className="App">
          <PopapLogin pass={password} log={login} put={(event)=>{putUser(event);}} 
          onClick={(event) => {
            event.fogort ? putMail(event) : putUser(event);
          }} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const {
    user:{
      formLogin,
      formPassword,
      email,
      password,
      login
    },
    config,
    config:{
      oldData: {
        toogle_total_temp,
        total_temp_max,
        total_temp_min
      }
    },
    rigs,
    rigs: {
      oldData: {
        cardsInfoArr
      }
    },
    info
    
  } = state;
  return {
    rigs,
    info,
    config,
    formLogin,
    formPassword,
    email,
    password,
    login,
    toogle_total_temp,
    total_temp_max,
    total_temp_min,
    cardsInfoArr,
  }
}
const mapDispatchToProps = dispatch => {
    return {
      fetchGetTempRigs: async url => Promise.resolve(dispatch(appGetConfig(url))),
      fetchGetRigs: async url => Promise.resolve(dispatch(appGetRigs(url))),
      fetchPutRigs: async arr => Promise.resolve(dispatch(appPutRigs(arr))),
      fetchGetUser: async url => Promise.resolve(dispatch(appGetUser(url))),
      fetchGetInfo: async url => Promise.resolve(dispatch(appGetInfo(url))),
      // fetchWriteDataTemp: async (url,data) => Promise.resolve(dispatch(writeDataTemp(url,data))),
      putUser: async data => Promise.resolve(dispatch(appPutUser(data))),
      putMail: async data => Promise.resolve(dispatch(appPutMail(data))),
      putTempArr: async data => Promise.resolve(dispatch(appPutRigsArr(data))),
      sinhronicDataRig: async () => Promise.resolve(dispatch(copyDataRig())),
      sinhronicDataTemp: async () => Promise.resolve(dispatch(copyDataTemp())),
      sinhronicDataInfo: async () => Promise.resolve(dispatch(copyDataInfo())),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
//zeppeling123