import {
  DELETE_GROUP_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAIL,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
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
          payload: data?.error || "Group created!",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        console.log(error);
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data.message ||
              (error.response.data?.group_description &&
                error.response.data?.group_description[0]) ||
              (error.response.data?.group_members &&
                error.response.data?.group_members[0]))) ||
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
    return GroupService.updateGroup(
      groupID,
      groupName,
      groupDescription,
      groupMembers
    ).then(
      (data) => {
        if (!data?.error) {
          dispatch({
            type: UPDATE_GROUP_SUCCESS,
            payload: data,
          });
        }

        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Group updated successfully!",
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
 * Delete group information and model file path
 * success and error response action
 *
 *
 * @method deleteGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const deleteGroup = (id) => (dispatch) => {
  return GroupService.deleteGroup(id).then(
    (data) => {
      dispatch({
        type: DELETE_GROUP_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: data?.error || "Group deleted.",
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
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * Get group information
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
          error.response.data.messages[0].message) ||
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

/**
 * Get all users information
 * success and error response action
 *
 *
 * @method getAllUsers
 *
 * @return {Promise}
 *
 */
export const getAllUsers = () => (dispatch) => {
  return GroupService.getAllUsers().then(
    (data) => {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.error ||
            error.response.data.messages[0].message)) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_ALL_USERS_FAIL,
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
 * Add group members information
 * success and error response action
 *
 *
 * @method addMembers
 *
 * @param {string} groupID - A string for identifying group
 * @param {string} groupMembers - An object to list down members of the group
 *
 * @return {Promise}
 *
 */
export const addMembers = (groupID, groupMembers) => (dispatch) => {
  return GroupService.addMembers(groupID, groupMembers).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Member added.",
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
 * Add group members information
 * success and error response action
 *
 *
 * @method removeMember
 *
 * @param {string} groupID - A string for identifying group
 * @param {string} email - An email of the member to remove
 *
 * @return {Promise}
 *
 */
export const removeMember = (groupID, email) => (dispatch) => {
  return GroupService.removeMember(groupID, email).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: "Member removed.",
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
