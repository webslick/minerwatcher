import ActionTypes from '../constants';

const initialState = {
  formLogin: '',
  formPassword: '',
  login: '1',
  password: '1',
  email:'',
  forgot_msg:''
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.COPY_DATA_USER:
      return {
        
        oldData:{
          ...state.newData,
        },
        ...state
      };
    case ActionTypes.APP_REQUEST_GET_USER:
      return {
        ...state,
          login:action.user.login,
          password:action.user.password,
          email:action.user.email,
      };
    case ActionTypes.APP_REQUEST_PUT_USER:
      return {
        ...state,
          formLogin: action.payload === null ? "":action.payload.formLogin,
          formPassword: action.payload === null ? "": action.payload.formPassword,
      };
    case ActionTypes.APP_REQUEST_PUT_MAIL:
      return {
        ...state,
          forgot_msg: action.payload,
      };
    default:
      return state;
  }
}