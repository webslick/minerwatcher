import ActionTypes from '../constants';
import { generationTempArr } from '../../helpers';
const initialState = {
oldData: {
  cardsInfoArr: [   {
    email: "minerwatcher@com.ru",
    id: 1,
    last_update: "2021-02-09T21:23:00.000Z",
    name_rig: "r4x_1F6D",
    offline_time: "2021-02-09T21:23:00.000Z",
    online_time: "2021-02-09T21:23:00.000Z",
    status: "on",
    temp_max: 75,
    temp_min: 60,
    temp_arr: generationTempArr(false),
    token: '7x0B0E2x5G7g2f4D1j8D2j8D',
  },
  {
    email: "minerwatcher@com.ru",
    id: 2,
    last_update: "2021-02-09T21:23:00.000Z",
    name_rig: "r4x_1F6D",
    offline_time: "2021-02-09T21:23:00.000Z",
    online_time: "2021-02-09T21:23:00.000Z",
    status: "on",
    temp_max: 75,
    temp_min: 60,
    temp_arr: generationTempArr(false),
    token: '7D3a3c4b6X9d1D3b5D9c7Z5F',
  },
  {
    email: "minerwatcher@com.ru",
    id: 3,
    last_update: "2021-02-09T21:23:00.000Z",
    name_rig: "r4x_1F6D",
    offline_time: "2021-02-09T21:23:00.000Z",
    online_time: "2021-02-09T21:23:00.000Z",
    status: "off",
    temp_max: 75,
    temp_min: 60,
    temp_arr: generationTempArr(false),
    token: '5J4z0a6b5j0X2z3j9b5B8c1F',
  },
  {
    email: "minerwatcher@com.ru",
    id: 4,
    last_update: "2021-02-09T21:23:00.000Z",
    name_rig: "r4x_1F6D",
    offline_time: "2021-02-09T21:23:00.000Z",
    online_time: "2021-02-09T21:23:00.000Z",
    status: "off",
    temp_max: 75,
    temp_min: 60,
    temp_arr: generationTempArr(false),
    token: '1B8g1f3J2d3j1G7D2G8d1e9b',
  },
  {
    email: "minerwatcher@com.ru",
    id: 5,
    last_update: "2021-02-09T21:23:00.000Z",
    name_rig: "r4x_1F6D",
    offline_time: "2021-02-09T21:23:00.000Z",
    online_time: "2021-02-09T21:23:00.000Z",
    status: "on",
    temp_max: 75,
    temp_min: 60,
    temp_arr: generationTempArr(false),
    token: "6a1x2a4C4g6b7A7z1g5A7F1J",
  }],
  cardsPowerStatusArr: {
    offCardsArray: [
      {
        id: 3,
        offline_time: "2021-02-09T21:23:00.000Z",
        last_update: "2021-02-09T21:23:00.000Z",
        online_time: "2021-02-09T21:23:00.000Z",
      },
      {
        id: 4,
        offline_time: "2021-02-09T21:23:00.000Z",
        last_update: "2021-02-09T21:23:00.000Z",
        online_time: "2021-02-09T21:23:00.000Z",
      },
    ],
    onCardsArray: [
      {
        id: 1,
        offline_time: "2021-02-09T21:23:00.000Z",
        last_update: "2021-02-09T21:23:00.000Z",
        online_time: "2021-02-09T21:23:00.000Z",
      },
      {
        id: 2,
        offline_time: "2021-02-09T21:23:00.000Z",
        last_update: "2021-02-09T21:23:00.000Z",
        online_time: "2021-02-09T21:23:00.000Z",
      },
      {
        id: 5,
        offline_time: "2021-02-09T21:23:00.000Z",
        last_update: "2021-02-09T21:23:00.000Z",
        online_time: "2021-02-09T21:23:00.000Z",
      },
    ]
  }
},
newData: {}
};

export default function rigs(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.APP_REQUEST_GET_RIGS:
      return {
        ...state,
        newData: {
          ...action.rigs
        }
      };
    case ActionTypes.APP_REQUEST_PUT_RIGS:
      return {
        ...state,
        newData: {
          cardsPowerStatusArr: action.payload.cardsPowerStatusArr
        }
      };
    case ActionTypes.APP_REQUEST_PUT_ARR:
      return {
        ...state,
        newData: {
          ...state.newData,
          cardsInfoArr: action.payload
        }
      };
    case ActionTypes.COPY_DATA_RIG:
      return {
        ...state,
        oldData: {...state.newData}
      };
    default:
      return state;
  }
}
