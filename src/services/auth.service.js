import axios from "axios";

/**
 * A module that manages auth-related service
 * @module services/authServices
 */

const API_URL = "http://localhost:8000/auth/";

/**
 * User registration service that sends request and receives response data using axios
 *
 *
 * @method register
 *
 * @param {string} firstname - A string for the user first name
 * @param {string} middlename - A string for the user middle name
 * @param {string} lastname - A string for the user last name
 * @param {string} designation - A string for the user designation or position
 * @param {string} email - A string for the user email address
 * @param {string} organization - A string for the user organization name
 * @param {string} division - A string for the user division, section, or unit name in the organization
 * @param {string} orgAddressBuilding - A string for the user building address of the organization
 * @param {string} orgAddressStreet - A string for the user street address of the organization
 * @param {string} orgAddressSubdivision - A string for the user subdivision address of the organization
 * @param {string} orgAddressBarangay - A string for the user barangay address of the organization
 * @param {string} orgAddressMunicipality -A string for the user municipality address of the organization
 * @param {string} orgAddressProvince - A string for the user province address of the organization
 * @param {string} orgAddressZipCode - A string for the user zip code address of the organization
 * @param {string} password - A string for the user password
 * @param {string} confirmPassword - A string for the user confirm password for matching and checking
 *
 *
 * @return {Promise}
 *
 */
const register = (
  firstname,
  middlename,
  lastname,
  designation,
  email,
  organization,
  division,
  orgAddressBuilding,
  orgAddressStreet,
  orgAddressSubdivision,
  orgAddressBarangay,
  orgAddressMunicipality,
  orgAddressProvince,
  orgAddressZipCode,
  password,
  confirmPassword
) => {
  return axios
    .post(
      API_URL + "users/",
      {
        first_name: firstname,
        middle_name: middlename,
        last_name: lastname,
        official_designation: designation,
        email: email,
        organization: organization,
        division_section_unit: division,
        address_building: orgAddressBuilding,
        address_street: orgAddressStreet,
        address_subdivision: orgAddressSubdivision,
        address_barangay: orgAddressBarangay,
        address_municipality: orgAddressMunicipality,
        address_province: orgAddressProvince,
        address_zipcode: orgAddressZipCode,
        password: password,
        re_password: confirmPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response.data;
    });
};

/**
 * Account activation service that sends request and receives response data using axios
 *
 *
 * @method activate
 *
 * @param {string} uid - A string for the user ID
 * @param {string} token - A string for JWT token
 *
 *
 * @return {Promise}
 *
 */
const activate = (uid, token) => {
  return axios
    .post(
      API_URL + "users/activation/",
      {
        uid,
        token,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response;
    });
};

/**
 * User login service that sends request and receives response data using axios
 *
 *
 * @method login
 *
 * @param {string} email - A string for the user ID
 * @param {string} password - A string for JWT token
 *
 * @return {Promise}
 *
 */
const login = (email, password) => {
  return axios
    .post(
      API_URL + "jwt/token/",
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response.data;
    });
};

/**
 * User logout service that removes user and access items in the localStorage
 *
 *
 * @method logout
 *
 * @return {Promise}
 *
 */
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access");
};

/**
 * Get user profile data service that sends request and receives response data using axios
 *
 *
 * @method getProfile
 *
 * @return {Promise}
 *
 */
const getProfile = () => {
  return axios
    .get(API_URL + "users/me/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Update user profile data service that sends request and receives response data using axios
 *
 *
 * @method updateProfile
 *
 * @param {Object} params - An object that contains all the user profile data
 *
 * @return {Promise}
 *
 */
const updateProfile = (params) => {
  return axios
    .put(API_URL + "users/me/", params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const forgotPassword = (email) => {
  return axios
    .post(
      API_URL + "users/reset_password/",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response;
    });
};

const resetPassword = (uid, token, new_password, re_new_password) => {
  return axios
    .post(
      API_URL + "users/reset_password_confirm/",
      { uid, token, new_password, re_new_password },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response;
    });
};

const changePassword = (current_password, new_password, re_new_password) => {
  return axios
    .post(
      API_URL + "users/set_password/",
      { current_password, new_password, re_new_password },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      }
    )
    .then((response) => {
      return response;
    });
};

const authServices = {
  register,
  activate,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
};

export default authServices;
