import ActionTypes from '../constants';
import axios from 'axios';
import { sortStatusCards } from '../../helpers';

export function appGetUser(url) {
  return async (dispatch) => {
    const admin = await axios.get(url);
      if(admin.status !== 200) {
        throw new Error(admin.statusText)
      }
      dispatch(appGetUserSuccess(admin.data));
  }
}

export function appGetUserSuccess(user) {
  return {
    type: ActionTypes.APP_REQUEST_GET_USER,
    user
  }
}

export function appGetRigs(url) {
  return async (dispatch) => {
    const rigs = await axios.get(url);
      if(rigs.status !== 200) {
        throw new Error(rigs.statusText)
      }
      let arrayCard = {
        cardsInfoArr: rigs.data,
        cardsPowerStatusArr: sortStatusCards(rigs.data)
      }
      dispatch(appGetRigsSucces(arrayCard));
  }
}

export function appGetInfo(url) {
  return async (dispatch) => {
    const info = await axios.get(url);
      if(info.status !== 200) {
        throw new Error(info.statusText)
      }
      dispatch(appGetInfoSucces(info.data));
  }
}

export function appGetConfig(url) {
  return async (dispatch) => {
    const config = await axios.get(url);
      if(config.status !== 200) {
        throw new Error(config.statusText)
      }
      dispatch(appGetConfigSucces(config.data));
  }
}

export function appGetInfoSucces(info) {
  return {
    type: ActionTypes.APP_REQUEST_GET_INFO,
    info
  }
}

export function appGetRigsSucces(rigs) {
  return {
    type: ActionTypes.APP_REQUEST_GET_RIGS,
    rigs
  }
}

export function appGetConfigSucces(config) {
  return {
    type: ActionTypes.APP_REQUEST_GET_CONFIG,
    config
  }
}

export function appPutUser(user) {
  return {
    type: ActionTypes.APP_REQUEST_PUT_USER,
    payload: user
  }
}

export function appPutMailSucces(msg) {
  return {
    type: ActionTypes.APP_REQUEST_PUT_MAIL,
    payload: msg
  }
}

export function appPutMail(msg) {
  return async (dispatch) => {
    const mail = await axios.post('/api/sendMail',{ formForgot: msg.formForgot });
      if(mail.status !== 200) {
        throw new Error(mail.statusText)
      }
      dispatch(appPutMailSucces(msg.formForgot));
  }
}

export function appPutRigs(rig) {
  return {
    type: ActionTypes.APP_REQUEST_PUT_RIGS,
    payload: rig
  }
}

export function appPutRigsArr(arr) {
  return {
    type: ActionTypes.APP_REQUEST_PUT_ARR,
    payload: arr
  }
}

export function copyDataTemp() {
  return {
    type: ActionTypes.COPY_DATA_TEMP,
  }
}

export function copyDataRig() {
  return {
    type: ActionTypes.COPY_DATA_RIG,
  }
}

export function copyDataInfo() {
  return {
    type: ActionTypes.COPY_DATA_INFO,
  }
}

export function copyDataUser(user) {
  return {
    type: ActionTypes.COPY_DATA_USER,
    user
  }
}

export function writeDataTemp(url,data) {
  return async (dispatch) => {
    const config = await axios.post(url, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

      if(config.status !== 200) {
        throw new Error(config.statusText)
      }
      // dispatch(appGetConfigSucces(config.data));
  }
}