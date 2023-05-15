import {
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAIL,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAIL,
  SET_MESSAGE,
} from "./types";
import GroupService from "services/group.service";

/**
 * A module that sends success and error response action for model-related methods
 * @module actions/group
 */

/**
 * Add group information
 * success and error response action
 *
 *
 * @method addGroup
 *
 * @param {string} groupName - A string for the group name
 * @param {string} groupDescription - A string for the group description
 * @param {string} groupMembers - An object to list down members of the group
 *
 * @return {Promise}
 *
 */
export const addGroup =
  (groupName, groupDescription, groupMembers) => (dispatch) => {
    return GroupService.addGroup(
      groupName,
      groupDescription,
      groupMembers
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: "Group added successfully!",
        });

        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

/**
 * Update group information
 * success and error response action
 *
 *
 * @method updateGroup
 *
 * @param {string} groupID - A string for identifying group
 * @param {string} groupName - A string for the group name
 * @param {string} groupDescription - A string for the group description
 * @param {string} groupMembers - An object to list down members of the group
 *
 * @return {Promise}
 *
 */
export const updateGroup =
  (groupID, groupName, groupDescription, groupMembers) => (dispatch) => {
    return GroupService.updateModel(
      groupID,
      groupName,
      groupDescription,
      groupMembers
    ).then(
      (data) => {
        dispatch({
          type: UPDATE_GROUP_SUCCESS,
          payload: data,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Group updated successfully!",
        });

        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: UPDATE_GROUP_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

/**
 * Remove group information and model file path
 * success and error response action
 *
 *
 * @method removeGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const removeGroup = (id) => (dispatch) => {
  return GroupService.removeGroup(id).then(
    (data) => {
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * Get group information and model file path
 * success and error response action
 *
 *
 * @method getGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const getGroup = (id) => (dispatch) => {
  return GroupService.getGroup(id).then(
    (data) => {
      dispatch({
        type: GET_GROUP_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_GROUP_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * Get all groups information
 * success and error response action
 *
 *
 * @method getAllGroups
 *
 * @return {Promise}
 *
 */
export const getAllGroups = () => (dispatch) => {
  return GroupService.getAllGroups().then(
    (data) => {
      dispatch({
        type: GET_ALL_GROUPS_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_GROUPS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
