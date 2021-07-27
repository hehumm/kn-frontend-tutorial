import {
    CREATE_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    DELETE_ALL_USERS,
  } from "./types";

import UserService from "../services/UserService";

export const createUser = (userName, firstName, lastName, email) => async (dispatch) => {
  try {
    const res = await UserService.create({ userName, firstName, lastName, email });

    dispatch({
      type: CREATE_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await UserService.getAll();

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.update(id, data);

    dispatch({
      type: UPDATE_USER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserService.remove(id);

    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllUsers = () => async (dispatch) => {
  try {
    const res = await UserService.removeAll();

    dispatch({
      type: DELETE_ALL_USERS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findUsersByUsername = (userName) => async (dispatch) => {
  try {
    const res = await UserService.findByUsername(userName);

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};