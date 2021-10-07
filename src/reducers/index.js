export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE';
export const CONNECT_STREAMELEMENTS_REQUEST = 'CONNECT_STREAMELEMENTS_REQUEST';
export const CONNECT_STREAMELEMENTS_SUCCESS = 'CONNECT_STREAMELEMENTS_SUCCESS';
export const CONNECT_STREAMELEMENTS_FAILURE = 'CONNECT_STREAMELEMENTS_FAILURE';
export const CHANGE_VOLUME_REQUEST = 'CHANGE_VOLUME_REQUEST';
export const CHANGE_VOLUME_SUCCESS = 'CHANGE_VOLUME_SUCCESS';
export const CHANGE_VOLUME_FAILURE = 'CHANGE_VOLUME_FAILURE';
export const DESTROY_SESSION = 'DESTROY_SESSION';

export function userReducer(state = { account: null }, action) {
  switch (action.type) {
    case GET_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_ACCOUNT_SUCCESS:
      console.log(action.payload);
      return { loading: false, account: action.payload };
    case GET_ACCOUNT_FAILURE:
      return { loading: false, error: action.payload };
    case DESTROY_SESSION:
      return (state = null);
    default:
      return state;
  }
}
