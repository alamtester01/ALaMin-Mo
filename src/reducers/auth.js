import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
  } from "../actions/types";
  
  /**
   * A module that manages auth-related state
   * @module reducers/auth
   */
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  /**
   * Method that take the current state and an action as arguments, and return a new state result
   *
   * @method authReducer
   *
   * @param {Object} state - An object for the user data state { isLoggedIn: <boolean>, user: <object>}
   * @param {Object} action - An object that contains type and payload
   *
   * @return {Object}
   *
   */
  export default function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case ACTIVATE_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case ACTIVATE_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      default:
        return state;
    }
  }
  