import ActionTypes from '../constants';
const initialState = {
oldData: {
  email_admin: "minerwatcher@mail.ru",
  err: [],
  login: "admin1",
  password: "admin1",
  rigs: [{
    email: "minerwatcher@com.ru",
    id: 1,
    last_offline: "2021-02-15T11:22:00.000Z",
    last_online: "2021-02-15T11:22:00.000Z",
    last_update: "2021-02-24T12:59:00.000Z",
    name_rig: "r8x_4x1C",
    offline_time: "2021-02-24T11:49:00.000Z",
    online_time: "2021-02-24T12:59:00.000Z",
    status: "on",
    temp_arr: [71, 73, 69, 73, 63, 73],
    temp_max: 75,
    temp_min: 60,
    token: "4c9x5C9C1F3F3Z4G5e9j7J3C"
  },
  {
    email: "minerwatcher@com.ru",
    id: 2,
    last_offline: "2021-02-21T11:22:00.000Z",
    last_online: "2021-02-21T11:22:00.000Z",
    last_update: "2021-02-24T12:59:00.000Z",
    name_rig: "r9x_4C8C",
    offline_time: "2021-02-21T11:21:00.000Z",
    online_time: "2021-02-24T12:59:00.000Z",
    status: "on",
    temp_arr: [62, 61, 70, 70, 70, 70],
    temp_max: 75,
    temp_min: 60,
    token: "5c8z6E8d0X4J7a4c2Z8E8B7B"
  },
  {
    email: "minerwatcher@com.ru",
    id: 3,
    last_offline: "2021-02-21T11:22:00.000Z",
    last_online: "2021-02-21T11:22:00.000Z",
    last_update: "2021-02-24T12:59:00.000Z",
    name_rig: "r4x_9j8X",
    offline_time: "2021-02-21T11:21:00.000Z",
    online_time: "2021-02-24T12:59:00.000Z",
    status: "on",
    temp_arr: [70, 60, 63, 65, 66, 60],
    temp_max: 75,
    temp_min: 60,
    token: "6a1X5F5z3E9Z5d1x6X3a1e6B"
  }],
    toogle_total_temp: "false",
    total_temp_max: 20,
    total_temp_min: 10,
    site_status_has_block: '5'
},
newData: {}
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.APP_REQUEST_GET_INFO:
      return {
        ...state,
        newData: {
          ...action.info
        }
      };
    case ActionTypes.COPY_DATA_INFO:
      return {
        ...state,
        oldData: {...state.newData}
      };
    default:
      return state;
  }
}
