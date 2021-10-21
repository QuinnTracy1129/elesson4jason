import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({ token: 'secret token' });

export default function authReducer(state = initState.merge(getToken()), action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return state.set('token', localStorage.getItem('token'));
    case actions.LOGIN_SUCCESS:
      return state.set('token', localStorage.getItem('token'));
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
