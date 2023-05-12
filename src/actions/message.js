import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

/**
 * A module that manage messages
 * @module actions/message
 */

/**
 * Set message action
 *
 * @method setMessage
 *
 * @param {string} message - A string for the message response
 *
 *
 * @return {Object} {type: string, payload: string}
 *
 */
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

/**
 * Clear message action
 *
 * @method clearMessage
 *
 * @return {Object} {type: string}
 *
 */
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
