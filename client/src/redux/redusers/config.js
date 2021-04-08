import ActionTypes from '../constants';

const initialState = {
  oldData: {
    toogle_total_temp: "false",
    total_temp_max: 60,
    total_temp_min: 75,
    site_status_has_block: 'false',
  },
  newData: {}
};

export default function config(state = initialState, action = {}) {
  const {
    config
  } = action;
  switch (action.type) {
    case ActionTypes.APP_REQUEST_GET_CONFIG:
      return {
        ...state,
        newData: {
        toogle_total_temp: config.toogle_total_temp,
        total_temp_max: config.total_temp_max,
        total_temp_min: config.total_temp_min,
        site_status_has_block: config.site_status_has_block
        }
      };
    case ActionTypes.COPY_DATA_TEMP:
      return {
        ...state,
        oldData: {...state.newData}
      };
    default:
      return state;
  }
}