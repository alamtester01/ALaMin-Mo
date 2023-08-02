import { combineReducers } from "redux";
import auth from "reducers/auth";
import message from "reducers/message";
import group from "reducers/group";
import model from "reducers/model";

/**
 * A module that manages all state
 * @module reducers/index
 */

/**
 * Method that takes the current state and an action as arguments, and return a new state result
 *
 * @method combineReducers
 *
 * @param {ReducersMapObject<Object>} auth - A reducer that contains auth state
 * @param {ReducersMapObject<Object>} message - A reducer that contains message state
 *
 * @return {Reducer}
 *
 */
export default combineReducers({
  auth,
  message,
  group,
  model
});
