import {
  DELETE_MODEL_SUCCESS,
  GET_MODEL_SUCCESS,
  GET_MODEL_FAIL,
  GET_MODEL_VERSION_SUCCESS,
  GET_MODEL_VERSION_FAIL,
  GET_ALL_MODELS_SUCCESS,
  GET_ALL_MODELS_FAIL,
  GET_ALL_MODELS_VERSIONS_FAIL,
  GET_ALL_MODELS_VERSIONS_SUCCESS,
  UPDATE_MODEL_SUCCESS,
  UPDATE_MODEL_VERSION_SUCCESS,
  GET_ALL_ACCURACY_SUCCESS,
  GET_ALL_ACCURACY_FAIL,
  SUBSCRIBE_MODEL_SUCCESS,
  UNSUBSCRIBE_MODEL_SUCCESS,
  GET_ALL_SUBSCRIBE_MODELS_SUCCESS,
} from "../actions/types";
/**
 * A module that manages model-related state
 * @module reducers/model
 */

const initialState = {
  models: {},
  currentModel: {},
  modelVersions: {},
  modelsAccuracy: {},
  currentModelVersion: {},
  subscribedModels: {},
};

/**
 * Method that take the current state and an action as arguments, and return a new state result
 *
 * @method modelReducer
 *
 * @param {Object} state - An object for the models state { models: <object>, currentModel: <object>}
 * @param {Object} action - An object that contains type and payload
 *
 * @return {Object}
 *
 */
export default function modelReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_MODEL_SUCCESS:
      return {
        ...state,
        currentModel: [payload],
      };
    case UPDATE_MODEL_VERSION_SUCCESS:
      return {
        ...state,
        currentModelVersion: payload,
      };
    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        currentModel: {},
      };
    case GET_MODEL_SUCCESS:
      return {
        ...state,
        currentModel: payload,
      };
    case GET_MODEL_FAIL:
      return {
        ...state,
        currentModel: {},
      };
    case GET_MODEL_VERSION_SUCCESS:
      return {
        ...state,
        currentModelVersion: payload,
      };
    case GET_MODEL_VERSION_FAIL:
      return {
        ...state,
        currentModelVersion: {},
      };
    case GET_ALL_MODELS_SUCCESS:
      return {
        ...state,
        models: payload,
      };
    case GET_ALL_MODELS_FAIL:
      return {
        ...state,
        models: {},
      };
    case GET_ALL_MODELS_VERSIONS_SUCCESS:
      return {
        ...state,
        modelVersions: payload,
      };
    case GET_ALL_MODELS_VERSIONS_FAIL:
      return {
        ...state,
        modelVersions: {},
      };
    case GET_ALL_ACCURACY_SUCCESS:
      return {
        ...state,
        modelsAccuracy: payload,
      };
    case GET_ALL_ACCURACY_FAIL:
      return {
        ...state,
        modelsAccuracy: {},
      };
    case SUBSCRIBE_MODEL_SUCCESS:
      return {
        ...state,
        subscribedModels: [payload],
      };
    case UNSUBSCRIBE_MODEL_SUCCESS:
      return {
        ...state,
        subscribedModels: [payload],
      };
    case GET_ALL_SUBSCRIBE_MODELS_SUCCESS:
      return {
        ...state,
        subscribedModels: payload,
      };
    default:
      return state;
  }
}
