
import { ADD, BROWSE, CLEAR, DESTROY, EDIT, KEY, LIST, LOOK, READ } from "./types";
const initialState = {
  key: '',
  list: [],
  models: [],
  model: undefined
};

const reducer = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BROWSE:
      return {
        ...state,
        models: [...payload]
      };
    case READ:
      return {
        ...state,
        model: payload
      };
    case LOOK:
      return {
        ...state,
        model: payload
      };
    case EDIT:
      const updatedModels = state.models.map(model => {
        if (model.id === payload.id) {
          return payload;
        }
        return model;
      })
      return {
        ...state,
        models: updatedModels
      };
    case ADD:
      return {
        ...state,
        models: [payload, ...state.models]
      };
    case DESTROY:
      return {
        ...state,
        models: state.models.filter(model => model.id !== payload)
      };
    case KEY:
      return {
        ...state,
        key: payload
      };
    case CLEAR:
      return {
        ...state,
        key: ''
      };
    case LIST:
      return {
        ...state,
        list: [...payload]
      };
    default:
      return state;
  }
}

export default reducer;
