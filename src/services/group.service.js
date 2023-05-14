import axios from "axios";

/**
 * A module that manages group-related service
 * @module services/groupServices
 */

const API_URL = "http://192.168.6.109:8000/api/";

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
    groupName,
    groupDescription,
    groupMembers,
  };

  return axios
    .post(API_URL + "add-model/", params, {
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
  let formData = new FormData();

  formData.append("groupID", groupID);
  formData.append("groupName", groupName);
  formData.append("groupDescription", groupDescription);
  formData.append("groupMembers", groupMembers);

  return axios
    .put(API_URL + "models/" + id + "/update", formData, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Remove group information service that sends request and receives response data using axios
 *
 *
 * @method removeGroup
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
const removeGroup = (id) => {
  return axios
    .post(API_URL + "groups/" + id, {
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
    .get(API_URL + "groups/" + id, {
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
    .get(API_URL + "groups/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const modelServices = {
  addGroup,
  updateGroup,
  removeGroup,
  getGroup,
  getAllGroups,
};

export default modelServices;