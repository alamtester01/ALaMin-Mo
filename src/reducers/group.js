import {
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAIL,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
} from "../actions/types";

/**
 * A module that manages group-related state
 * @module reducers/group
 */

const initialState = { groups: {}, currentGroup: {}, users: {} };

/**
 * Method that take the current state and an action as arguments, and return a new state result
 *
 * @method groupReducer
 *
 * @param {Object} state - An object for the groups state { groups: <object>, currentModel: <object> }
 * @param {Object} action - An object that contains type and payload
 *
 * @return {Object}
 *
 */
export default function groupReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        currentGroup: payload,
      };
    case UPDATE_GROUP_FAIL:
      return {
        ...state,
        currentGroup: {},
      };
    case GET_GROUP_SUCCESS:
      return {
        ...state,
        currentGroup: payload,
      };
    case GET_GROUP_FAIL:
      return {
        ...state,
        currentGroup: {},
      };
    case GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        groups: payload,
      };
    case GET_ALL_GROUPS_FAIL:
      return {
        ...state,
        groups: {},
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        users: {},
      };
    default:
      return state;
  }
}
