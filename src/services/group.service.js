import axios from "axios";

/**
 * A module that manages group-related service
 * @module services/groupServices
 */

const API_URL = "http://192.168.14.177:8000/user/";

/**
 * Add group information service that sends request and receives response data using axios
 *
 *
 * @method addModel
 *
 * @param {string} groupName - A string for the group name
 * @param {string} groupDescription - A string for the group description
 * @param {string} groupMembers - An object to list down members of the group
 *
 * @return {Promise}
 *
 */
const addGroup = (groupName, groupDescription, groupMembers) => {
  const params = {
    group_name: groupName,
    group_description: groupDescription,
    group_members: groupMembers,
  };

  return axios
    .post(API_URL + "group/add", params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Update group information service that sends request and receives response data using axios
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
const updateGroup = (groupID, groupName, groupDescription, groupMembers) => {
  const params = {
    group_name: groupName,
    group_description: groupDescription,
    group_members: groupMembers,
  };

  return axios
    .put(API_URL + "group/edit/" + groupID, params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Delete group information service that sends request and receives response data using axios
 *
 *
 * @method deleteGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
const deleteGroup = (id) => {
  return axios
    .delete(API_URL + "group/delete/" + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get group information service that sends request and receives response data using axios
 *
 *
 * @method getGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
const getGroup = (id) => {
  return axios
    .get(API_URL + "group/view/" + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get all group information service that sends request and receives response data using axios
 *
 *
 * @method getAllGroups
 *
 * @return {Promise}
 *
 */
const getAllGroups = () => {
  return axios
    .get(API_URL + "group", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get all user information service that sends request and receives response data using axios
 *
 *
 * @method getAllGroups
 *
 * @return {Promise}
 *
 */
const getAllUsers = () => {
  return axios
    .get(API_URL + "email", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Add group members information service that sends request and receives response data using axios
 *
 *
 * @method updateGroup
 *
 * @param {string} groupID - A string for identifying group
 *
 * @return {Promise}
 *
 */
const addMembers = (groupID, groupMembers) => {
  const params = {
    group_members: groupMembers,
  };

  return axios
    .put(API_URL + "group/member/add/" + groupID, params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const removeMember = (groupID, email) => {
  return axios
    .delete(API_URL + "group/member/delete/" + groupID + "/" + email, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const groupServices = {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroup,
  getAllGroups,
  getAllUsers,
  addMembers,
  removeMember,
};

export default groupServices;
