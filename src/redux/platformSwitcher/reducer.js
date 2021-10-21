import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
  isActivated: false,
  selectedPlatform: '',
});

export default function (state = initState, action) {
  switch (action.type) {
    case actions.SWITCH_ACTIVATION:
      return state.set('isActivated', !state.get('isActivated'));
    case actions.CHANGE_PLATFORM:
      return state.set('selectedPlatform', action.selectedPlatform);
    default:
      return state;
  }
}
