import { baguhin, hanapin, itago, itala, listahan, tanong, tignan } from './../talaan';
import { ADD, BROWSE, CLEAR, DESTROY, EDIT, KEY, LIST, LOOK, READ } from "./types";

export const browse = (url, key = '') => async (dispatch) => {
  await tanong(url, key)
    .then(data => {
      dispatch({
        type: BROWSE,
        payload: data
      });
    });
};
export const read = (url, model) => async (dispatch) => {
  await hanapin(url, model)
    .then(data => {
      dispatch({
        type: READ,
        payload: data
      });
    });
  // return Promise.resolve(data);
};
export const look = (url, id) => async (dispatch) => {
  await tignan(url, id)
    .then(data => {
      dispatch({
        type: LOOK,
        payload: data
      });
    });
  // return Promise.resolve(data);
};
// Update or Create
export const updateOrCreate = (url, model) => async (dispatch) => {
  let type = model.id ? EDIT : ADD;
  if (model.id) {
    await baguhin(url, model.id, model)
  } else {
    const data = await itala(url, model);
    model['id'] = data.id
  }
  dispatch({ type: type, payload: model });
};
export const add = (url, model) => async (dispatch) => {
  const data = await itala(url, model);
  dispatch({
    type: ADD,
    payload: data,
  });
  return Promise.resolve(data);
};
export const edit = (url, model) => async (dispatch) => {
  await baguhin(url, model.id, model)
    .then(data => dispatch({ type: EDIT, payload: data }));
};
export const destroy = (url, pk) => async (dispatch) => {
  const res = await itago(url, pk)
  if (res)
    dispatch({
      type: DESTROY,
      payload: pk
    });
};
export const searchKey = (value) => dispatch => dispatch({ type: KEY, payload: value });
export const clearKey = () => dispatch => dispatch({ type: CLEAR });;
export const getlist = (url, key = '') => async (dispatch) => {
  await listahan(url, key)
    .then(data => {
      dispatch({
        type: LIST,
        payload: data
      });
    });
};