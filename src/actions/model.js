import {
  UPDATE_MODEL_SUCCESS,
  DELETE_MODEL_SUCCESS,
  GET_MODEL_SUCCESS,
  GET_MODEL_FAIL,
  GET_MODEL_VERSION_SUCCESS,
  GET_MODEL_VERSION_FAIL,
  GET_ALL_MODELS_SUCCESS,
  GET_ALL_MODELS_FAIL,
  SET_MESSAGE,
  GET_ALL_MODELS_VERSIONS_SUCCESS,
  GET_ALL_MODELS_VERSIONS_FAIL,
  GET_ALL_ACCURACY_FAIL,
  GET_ALL_ACCURACY_SUCCESS,
} from "./types";
import ModelService from "services/model.service";

/**
 * A module that sends success and error response action for model-related methods
 * @module actions/model
 */

/**
 * Add model information
 * success and error response action
 *
 *
 * @method addModel
 *
 * @param {string} modelName - A string for the model name
 * @param {string} modelTask - A string for the model name
 * @param {string} modelDescription - A string for the model description
 * @param {string} modelGroup - An object to list down group of the model
 *
 * @return {Promise}
 *
 */
export const addModel =
  (modelName, modelTask, modelDescription, modelGroup) => (dispatch) => {
    return ModelService.addModel(
      modelName,
      modelTask,
      modelDescription,
      modelGroup
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Model created!",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data.message ||
              (error.response.data?.model_profile_name &&
                error.response.data?.model_profile_name[0]) ||
              (error.response.data?.model_profile_task &&
                error.response.data?.model_profile_task[0]) ||
              (error.response.data?.model_profile_description &&
                error.response.data?.model_profile_description[0]) ||
              (error.response.data?.model_profile_group &&
                error.response.data?.model_profile_group[0]))) ||
          error.message ||
          error.toString();

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject("error");
      }
    );
  };

/**
 * Edit model information
 * success and error response action
 *
 *
 * @method editModel
 *
 * @param {string} modelName - A string for the model name
 * @param {string} modelTask - A string for the model name
 * @param {string} modelDescription - A string for the model description
 * @param {string} modelGroup - An object to list down group of the model
 *
 * @return {Promise}
 *
 */
export const editModel =
  (modelID, modelName, modelTask, modelDescription, modelGroup) =>
  (dispatch) => {
    return ModelService.editModel(
      modelID,
      modelName,
      modelTask,
      modelDescription,
      modelGroup
    ).then(
      (data) => {
        if (!data?.error) {
          dispatch({
            type: UPDATE_MODEL_SUCCESS,
            payload: data,
          });
        }

        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Model profile updated.",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            (error.response.data.message ||
              (error.response.data?.model_profile_name &&
                error.response.data?.model_profile_name[0]) ||
              (error.response.data?.model_profile_task &&
                error.response.data?.model_profile_task[0]) ||
              (error.response.data?.model_profile_description &&
                error.response.data?.model_profile_description[0]) ||
              (error.response.data?.model_profile_group &&
                error.response.data?.model_profile_group[0]))) ||
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

export const editModelVersion =
  (
    modelFileID,
    modelProfileID,
    modelNumber,
    modelVersionName,
    modelVersionDescription,
    modelAuthor,
    modelContact,
    modelDevelopmentDate,
    modelDevelopers,
    modelAccuracy,
    modelInput,
    modelOutput,
    modelType,
    modelPaper,
    modelCitationDetails,
    modelLicense,
    modelOtherRelevantInfo,
    modelPrimaryIntendedUses,
    modelPrimaryIntendedUsers,
    modelOutOfScopeUseCases,
    modelGroups,
    modelInstrumentation,
    modelEnvironment,
    modelPerformanceMeasures,
    modelDecisionThresholds,
    modelApproachesToUncertainty,
    modelTrainingDataset,
    modelTrainingMotivation,
    modelTrainingPreprocessing,
    modelEvaluationDataset,
    modelEvaluationMotivation,
    modelEvaluationPreprocessing,
    modelUnitaryResults,
    modelIntersectionalResults,
    modelData,
    modelHumanLife,
    modelMitigations,
    modelRisksAndHarms,
    modelUseCases,
    modelDetails
  ) =>
  (dispatch) => {
    return ModelService.editModelVersion(
      modelFileID,
      modelProfileID,
      modelNumber,
      modelVersionName,
      modelVersionDescription,
      modelAuthor,
      modelContact,
      modelDevelopmentDate,
      modelDevelopers,
      modelAccuracy,
      modelInput,
      modelOutput,
      modelType,
      modelPaper,
      modelCitationDetails,
      modelLicense,
      modelOtherRelevantInfo,
      modelPrimaryIntendedUses,
      modelPrimaryIntendedUsers,
      modelOutOfScopeUseCases,
      modelGroups,
      modelInstrumentation,
      modelEnvironment,
      modelPerformanceMeasures,
      modelDecisionThresholds,
      modelApproachesToUncertainty,
      modelTrainingDataset,
      modelTrainingMotivation,
      modelTrainingPreprocessing,
      modelEvaluationDataset,
      modelEvaluationMotivation,
      modelEvaluationPreprocessing,
      modelUnitaryResults,
      modelIntersectionalResults,
      modelData,
      modelHumanLife,
      modelMitigations,
      modelRisksAndHarms,
      modelUseCases,
      modelDetails
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Version updated.",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        console.log(error);
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

export const addModelVersionSaveDraft =
  (
    modelFileID,
    modelProfileID,
    modelNumber,
    modelVersionName,
    modelVersionDescription,
    modelAuthor,
    modelContact,
    modelDevelopmentDate,
    modelDevelopers,
    modelAccuracy,
    modelInput,
    modelOutput,
    modelType,
    modelPaper,
    modelCitationDetails,
    modelLicense,
    modelOtherRelevantInfo,
    modelPrimaryIntendedUses,
    modelPrimaryIntendedUsers,
    modelOutOfScopeUseCases,
    modelGroups,
    modelInstrumentation,
    modelEnvironment,
    modelPerformanceMeasures,
    modelDecisionThresholds,
    modelApproachesToUncertainty,
    modelTrainingDataset,
    modelTrainingMotivation,
    modelTrainingPreprocessing,
    modelEvaluationDataset,
    modelEvaluationMotivation,
    modelEvaluationPreprocessing,
    modelUnitaryResults,
    modelIntersectionalResults,
    modelData,
    modelHumanLife,
    modelMitigations,
    modelRisksAndHarms,
    modelUseCases,
    modelDetails
  ) =>
  (dispatch) => {
    return ModelService.addModelVersionSaveDraft(
      modelFileID,
      modelProfileID,
      modelNumber,
      modelVersionName,
      modelVersionDescription,
      modelAuthor,
      modelContact,
      modelDevelopmentDate,
      modelDevelopers,
      modelAccuracy,
      modelInput,
      modelOutput,
      modelType,
      modelPaper,
      modelCitationDetails,
      modelLicense,
      modelOtherRelevantInfo,
      modelPrimaryIntendedUses,
      modelPrimaryIntendedUsers,
      modelOutOfScopeUseCases,
      modelGroups,
      modelInstrumentation,
      modelEnvironment,
      modelPerformanceMeasures,
      modelDecisionThresholds,
      modelApproachesToUncertainty,
      modelTrainingDataset,
      modelTrainingMotivation,
      modelTrainingPreprocessing,
      modelEvaluationDataset,
      modelEvaluationMotivation,
      modelEvaluationPreprocessing,
      modelUnitaryResults,
      modelIntersectionalResults,
      modelData,
      modelHumanLife,
      modelMitigations,
      modelRisksAndHarms,
      modelUseCases,
      modelDetails
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Version saved as draft.",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        console.log(error);
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

export const addModelVersionSaveAndPublish =
  (
    modelFileID,
    modelProfileID,
    modelNumber,
    modelVersionName,
    modelVersionDescription,
    modelAuthor,
    modelContact,
    modelDevelopmentDate,
    modelDevelopers,
    modelAccuracy,
    modelInput,
    modelOutput,
    modelType,
    modelPaper,
    modelCitationDetails,
    modelLicense,
    modelOtherRelevantInfo,
    modelPrimaryIntendedUses,
    modelPrimaryIntendedUsers,
    modelOutOfScopeUseCases,
    modelGroups,
    modelInstrumentation,
    modelEnvironment,
    modelPerformanceMeasures,
    modelDecisionThresholds,
    modelApproachesToUncertainty,
    modelTrainingDataset,
    modelTrainingMotivation,
    modelTrainingPreprocessing,
    modelEvaluationDataset,
    modelEvaluationMotivation,
    modelEvaluationPreprocessing,
    modelUnitaryResults,
    modelIntersectionalResults,
    modelData,
    modelHumanLife,
    modelMitigations,
    modelRisksAndHarms,
    modelUseCases,
    modelDetails
  ) =>
  (dispatch) => {
    return ModelService.addModelVersionSaveAndPublish(
      modelFileID,
      modelProfileID,
      modelNumber,
      modelVersionName,
      modelVersionDescription,
      modelAuthor,
      modelContact,
      modelDevelopmentDate,
      modelDevelopers,
      modelAccuracy,
      modelInput,
      modelOutput,
      modelType,
      modelPaper,
      modelCitationDetails,
      modelLicense,
      modelOtherRelevantInfo,
      modelPrimaryIntendedUses,
      modelPrimaryIntendedUsers,
      modelOutOfScopeUseCases,
      modelGroups,
      modelInstrumentation,
      modelEnvironment,
      modelPerformanceMeasures,
      modelDecisionThresholds,
      modelApproachesToUncertainty,
      modelTrainingDataset,
      modelTrainingMotivation,
      modelTrainingPreprocessing,
      modelEvaluationDataset,
      modelEvaluationMotivation,
      modelEvaluationPreprocessing,
      modelUnitaryResults,
      modelIntersectionalResults,
      modelData,
      modelHumanLife,
      modelMitigations,
      modelRisksAndHarms,
      modelUseCases,
      modelDetails
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error || "Version is now published.",
        });

        return Promise.resolve(data?.error ? "error" : "success");
      },
      (error) => {
        console.log(error);
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

export const uploadModelFile =
  (modelProfileID, file, onUploadProgress, cancelToken) => (dispatch) => {
    return ModelService.uploadModelFile(
      modelProfileID,
      file,
      onUploadProgress,
      cancelToken
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error,
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

export const editUploadModelFile =
  (modelFileID, file, onUploadProgress, cancelToken) => (dispatch) => {
    return ModelService.editUploadModelFile(
      modelFileID,
      file,
      onUploadProgress,
      cancelToken
    ).then(
      (data) => {
        dispatch({
          type: SET_MESSAGE,
          payload: data?.error,
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

export const publishModelVersion = (modelFileID) => (dispatch) => {
  return ModelService.publishModelVersion(modelFileID).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: data?.error || "Version is now published",
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

export const archiveModelVersion = (modelFileID) => (dispatch) => {
  return ModelService.archiveModelVersion(modelFileID).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: data?.error || "Version archived",
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

export const deleteModelVersion = (modelFileID) => (dispatch) => {
  return ModelService.deleteModelVersion(modelFileID).then(
    (data) => {
      console.log(data);
      dispatch({
        type: SET_MESSAGE,
        payload: data?.error || "Version deleted",
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
 * Delete model information and model file path
 * success and error response action
 *
 *
 * @method deleteModel
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const deleteModel = (id) => (dispatch) => {
  return ModelService.deleteModel(id).then(
    (data) => {
      dispatch({
        type: DELETE_MODEL_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: data?.error || "Model deleted.",
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
 * Get model information
 * success and error response action
 *
 *
 * @method getModel
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const getModel = (id) => (dispatch) => {
  return ModelService.getModel(id).then(
    (data) => {
      dispatch({
        type: GET_MODEL_SUCCESS,
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
        type: GET_MODEL_FAIL,
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
 * Get model version information
 * success and error response action
 *
 *
 * @method getModelVersion
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const getModelVersion = (id) => (dispatch) => {
  return ModelService.getModelVersion(id).then(
    (data) => {
      dispatch({
        type: GET_MODEL_VERSION_SUCCESS,
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
        type: GET_MODEL_VERSION_FAIL,
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
 * Get all models information
 * success and error response action
 *
 *
 * @method getAllModels
 *
 * @return {Promise}
 *
 */
export const getAllModels = () => (dispatch) => {
  return ModelService.getAllModels().then(
    (data) => {
      dispatch({
        type: GET_ALL_MODELS_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_MODELS_FAIL,
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
 * Get all model versions information
 * success and error response action
 *
 *
 * @method getAllModelVersions
 *
 * @return {Promise}
 *
 */
export const getAllModelVersions = (modelProfileID) => (dispatch) => {
  return ModelService.getAllModelVersions(modelProfileID).then(
    (data) => {
      dispatch({
        type: GET_ALL_MODELS_VERSIONS_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_MODELS_VERSIONS_FAIL,
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
 * Get all accuracy information
 * success and error response action
 *
 *
 * @method getAllModelVersions
 *
 * @return {Promise}
 *
 */
export const getAllAccuracy = (modelProfileID) => (dispatch) => {
  return ModelService.getAllAccuracy(modelProfileID).then(
    (data) => {
      dispatch({
        type: GET_ALL_ACCURACY_SUCCESS,
        payload: data,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_ACCURACY_FAIL,
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
 * Download model version information
 * success and error response action
 *
 *
 * @method downloadModelVersion
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
export const downloadModelVersion =
  (modelFileID, onDownloadProgress, cancelToken) => (dispatch) => {
    return ModelService.downloadModelVersion(
      modelFileID,
      onDownloadProgress,
      cancelToken
    ).then(
      (data) => {
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.messages[0].message) ||
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
