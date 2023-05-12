import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    GET_PROFILE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
  } from "./types";
  
  import AuthService from "services/auth.service";
  
  /**
   * A module that sends success and error response action for auth-related methods
   * @module actions/auth
   */
  
  /**
   * User registration
   * success and error response action
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
  export const register =
    (
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
    ) =>
    (dispatch) => {
      return AuthService.register(
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
      ).then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
  
          response.message = "User successfully registered";
  
          dispatch({
            type: SET_MESSAGE,
            payload: response.message,
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
  
          const data =
            (error.response && error.response.data) ||
            error.data ||
            error.toString();
  
          dispatch({
            type: REGISTER_FAIL,
          });
  
          if (data.email) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.email[0],
            });
          } else {
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
          }
  
          return Promise.reject();
        }
      );
    };
  
  /**
   * Account activation
   * success and error response action
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
  export const activate = (uid, token) => (dispatch) => {
    return AuthService.activate(uid, token).then(
      (response) => {
        dispatch({
          type: ACTIVATE_SUCCESS,
        });
        response.message = "User successfully activated";
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
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
  
        const data =
          (error.response && error.response.data) ||
          error.data ||
          error.toString();
  
        dispatch({
          type: ACTIVATE_FAIL,
        });
  
        if (data.detail) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.detail,
          });
          data.message = data.detail;
        } else if (data.uid) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.uid,
          });
          data.message = data.uid;
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }
  
        return Promise.reject(data);
      }
    );
  };
  
  /**
   * User login
   * success and error response action
   *
   *
   * @method login
   *
   * @param {string} email - A string for the user ID
   * @param {string} password - A string for JWT token
   *
   *
   * @return {Promise}
   *
   */
  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
          if (data.access) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("access", data.access);
          }
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
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
  
        const data =
          (error.response && error.response.data) ||
          error.data ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        if (data.detail) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.detail,
          });
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }
  
        return Promise.reject();
      }
    );
  };
  
  /**
   * User logout action
   *
   *
   * @method logout
   *
   * @return {Promise}
   *
   */
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
  
  /**
   * Get user profile data
   * success and error response action
   *
   *
   * @method getProfile
   *
   * @return {Promise}
   *
   */
  export const getProfile = () => (dispatch) => {
    return AuthService.getProfile().then(
      (data) => {
        dispatch({
          type: GET_PROFILE_SUCCESS,
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
  
        const data =
          (error.response && error.response.data) ||
          error.data ||
          error.toString();
  
        if (data.detail) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.detail,
          });
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }
  
        return Promise.reject();
      }
    );
  };
  
  /**
   * Update user profile data
   * success and error response action
   *
   *
   * @method updateProfile
   *
   * @param {string} first_name - A string for the user first name
   * @param {string} last_name - A string for the user last name
   * @param {string} middle_name - A string for the user middle name
   * @param {string} official_designation - A string for the user designation or position
   * @param {string} organization - A string for the user organization name
   * @param {string} division_section_unit - A string for the user division, section, or unit name in the organization
   * @param {string} address_building - A string for the user building address of the organization
   * @param {string} address_barangay - A string for the user barangay address of the organization
   * @param {string} address_street - A string for the user street address of the organization
   * @param {string} address_municipality -A string for the user municipality address of the organization
   * @param {string} address_province - A string for the user province address of the organization
   * @param {string} address_zipcode - A string for the user zip code address of the organization
   * @param {string} address_subdivision - A string for the user subdivision address of the organization
   *
   *
   * @return {Promise}
   *
   */
  export const updateProfile =
    ({
      first_name,
      last_name,
      middle_name,
      official_designation,
      organization,
      division_section_unit,
      address_building,
      address_barangay,
      address_street,
      address_municipality,
      address_province,
      address_zipcode,
      address_subdivision,
    }) =>
    (dispatch) => {
      return AuthService.updateProfile({
        first_name,
        last_name,
        middle_name,
        official_designation,
        organization,
        division_section_unit,
        address_building,
        address_barangay,
        address_street,
        address_municipality,
        address_province,
        address_zipcode,
        address_subdivision,
      }).then(
        (data) => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data,
          });
  
          dispatch({
            type: SET_MESSAGE,
            payload: "Profile updated successfully!",
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
  
          const data =
            (error.response && error.response.data) ||
            error.data ||
            error.toString();
  
          if (data.detail) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.detail,
            });
          } else {
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
          }
  
          return Promise.reject();
        }
      );
    };
  
  /**
   * Request to send reset password link in email
   * success and error response action
   *
   *
   * @method forgotPassword
   *
   * @param {string} email - A string for the user email
   *
   *
   * @return {Promise}
   *
   */
  export const forgotPassword = (email) => (dispatch) => {
    return AuthService.forgotPassword(email).then(
      () => {
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        const data =
          (error.response && error.response.data) ||
          error.data ||
          error.toString();
  
        dispatch({
          type: ACTIVATE_FAIL,
        });
  
        if (data.detail) {
          dispatch({
            type: SET_MESSAGE,
            payload: data.detail,
          });
          data.message = data.detail;
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }
  
        return Promise.reject(data);
      }
    );
  };
  
  /**
   * Request to send reset password link in email
   * success and error response action
   *
   *
   * @method resetPassword
   *
   * @param {string} uid - A string for the user ID
   * @param {string} token - A string for password reset token
   * @param {string} new_password - A string for the user new password
   * @param {string} re_new_password - A string for the user confirm new password for matching and checking
   *
   * @return {Promise}
   *
   */
  export const resetPassword =
    (uid, token, new_password, re_new_password) => (dispatch) => {
      return AuthService.resetPassword(
        uid,
        token,
        new_password,
        re_new_password
      ).then(
        (response) => {
          response.message = "Password successfully updated";
  
          dispatch({
            type: SET_MESSAGE,
            payload: response.message,
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
  
          const data =
            (error.response && error.response.data) ||
            error.data ||
            error.toString();
  
          dispatch({
            type: ACTIVATE_FAIL,
          });
  
          if (data.detail) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.detail,
            });
            data.message = data.detail;
          } else if (data.uid) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.uid,
            });
            data.message = data.uid;
          } else if (data.token) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.token,
            });
            data.message = data.token;
          } else {
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
          }
  
          return Promise.reject(data);
        }
      );
    };
  
  /**
   * Request to change password
   * success and error response action
   *
   *
   * @method changePassword
   *
   * @param {string} current_password - A string for the user current password
   * @param {string} new_password - A string for the user new password
   * @param {string} re_new_password - A string for the user confirm new password for matching and checking
   *
   * @return {Promise}
   *
   */
  export const changePassword =
    (current_password, new_password, re_new_password) => (dispatch) => {
      return AuthService.changePassword(
        current_password,
        new_password,
        re_new_password
      ).then(
        (response) => {
          response.message = "Password successfully updated";
  
          dispatch({
            type: SET_MESSAGE,
            payload: response.message,
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
  
          const data =
            (error.response && error.response.data) ||
            error.data ||
            error.toString();
  
          dispatch({
            type: ACTIVATE_FAIL,
          });
  
          if (data.current_password) {
            dispatch({
              type: SET_MESSAGE,
              payload: data.current_password,
            });
            data.message = data.current_password;
          } else {
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
          }
  
          return Promise.reject(data);
        }
      );
    };
  