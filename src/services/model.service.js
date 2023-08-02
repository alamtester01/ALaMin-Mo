import axios from "axios";

/**
 * A module that manages group-related service
 * @module services/groupServices
 */

const API_URL = "http://localhost:8000/api/feature/";

/**
 * Add model information service that sends request and receives response data using axios
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
const addModel = (modelName, modelTask, modelDescription, modelGroup) => {
  const params = {
    model_profile_name: modelName,
    model_profile_task: modelTask,
    model_profile_description: modelDescription,
    model_profile_group: modelGroup,
  };

  return axios
    .post(API_URL + "create/model", params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Edit model information service that sends request and receives response data using axios
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
const editModel = (
  modelID,
  modelName,
  modelTask,
  modelDescription,
  modelGroup
) => {
  const params = {
    model_profile_name: modelName,
    model_profile_task: modelTask,
    model_profile_description: modelDescription,
    model_profile_group: modelGroup,
  };

  return axios
    .put(API_URL + "edit/model/" + modelID, params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const editModelVersion = (
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
) => {
  const params = {
    version: modelNumber,
    name: modelVersionName,
    author: modelAuthor,
    contact_information: modelContact,
    description: modelVersionDescription,
    development_date: modelDevelopmentDate,
    developers: modelDevelopers,
    input: modelInput,
    output: modelOutput,
    type: modelType,
    paper: modelPaper,
    license: modelLicense,
    accuracy: modelAccuracy,
    citation_details: modelCitationDetails,
    other_relevant_information: modelOtherRelevantInfo,
    primary_intended_uses: modelPrimaryIntendedUses,
    primary_intended_user: modelPrimaryIntendedUsers,
    out_of_scope_use_cases: modelOutOfScopeUseCases,
    groups: modelGroups,
    instrumentation: modelInstrumentation,
    environment: modelEnvironment,
    performance_measures: modelPerformanceMeasures,
    decision_thresholds: modelDecisionThresholds,
    approaches_to_uncertainty: modelApproachesToUncertainty,
    td_datasets: modelTrainingDataset,
    td_motivation: modelTrainingMotivation,
    td_preprocessing: modelTrainingPreprocessing,
    ed_datasets: modelEvaluationDataset,
    ed_motivation: modelEvaluationMotivation,
    ed_preprocessing: modelEvaluationPreprocessing,
    unitary_result: modelUnitaryResults,
    intersectional_result: modelIntersectionalResults,
    data: modelData,
    human_life: modelHumanLife,
    mitigations: modelMitigations,
    risks_and_harms: modelRisksAndHarms,
    use_cases: modelUseCases,
    details: modelDetails,
  };

  return axios
    .put(API_URL + "edit/model/version/" + modelFileID, params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const addModelVersionSaveDraft = (
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
) => {
  const params = {
    version: modelNumber,
    name: modelVersionName,
    author: modelAuthor,
    contact_information: modelContact,
    description: modelVersionDescription,
    development_date: modelDevelopmentDate,
    developers: modelDevelopers,
    input: modelInput,
    output: modelOutput,
    type: modelType,
    paper: modelPaper,
    license: modelLicense,
    accuracy: modelAccuracy,
    citation_details: modelCitationDetails,
    other_relevant_information: modelOtherRelevantInfo,
    primary_intended_uses: modelPrimaryIntendedUses,
    primary_intended_user: modelPrimaryIntendedUsers,
    out_of_scope_use_cases: modelOutOfScopeUseCases,
    groups: modelGroups,
    instrumentation: modelInstrumentation,
    environment: modelEnvironment,
    performance_measures: modelPerformanceMeasures,
    decision_thresholds: modelDecisionThresholds,
    approaches_to_uncertainty: modelApproachesToUncertainty,
    td_datasets: modelTrainingDataset,
    td_motivation: modelTrainingMotivation,
    td_preprocessing: modelTrainingPreprocessing,
    ed_datasets: modelEvaluationDataset,
    ed_motivation: modelEvaluationMotivation,
    ed_preprocessing: modelEvaluationPreprocessing,
    unitary_result: modelUnitaryResults,
    intersectional_result: modelIntersectionalResults,
    data: modelData,
    human_life: modelHumanLife,
    mitigations: modelMitigations,
    risks_and_harms: modelRisksAndHarms,
    use_cases: modelUseCases,
    details: modelDetails,
  };

  return axios
    .post(
      API_URL + "draft/model/version/" + modelProfileID + "/" + modelFileID,
      params,
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const addModelVersionSaveAndPublish = (
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
) => {
  const params = {
    model_profile: modelProfileID,
    version: modelNumber,
    name: modelVersionName,
    author: modelAuthor,
    contact_information: modelContact,
    description: modelVersionDescription,
    development_date: modelDevelopmentDate,
    developers: modelDevelopers,
    input: modelInput,
    output: modelOutput,
    type: modelType,
    paper: modelPaper,
    license: modelLicense,
    accuracy: modelAccuracy,
    citation_details: modelCitationDetails,
    other_relevant_information: modelOtherRelevantInfo,
    primary_intended_uses: modelPrimaryIntendedUses,
    primary_intended_user: modelPrimaryIntendedUsers,
    out_of_scope_use_cases: modelOutOfScopeUseCases,
    groups: modelGroups,
    instrumentation: modelInstrumentation,
    environment: modelEnvironment,
    performance_measures: modelPerformanceMeasures,
    decision_thresholds: modelDecisionThresholds,
    approaches_to_uncertainty: modelApproachesToUncertainty,
    td_datasets: modelTrainingDataset,
    td_motivation: modelTrainingMotivation,
    td_preprocessing: modelTrainingPreprocessing,
    ed_datasets: modelEvaluationDataset,
    ed_motivation: modelEvaluationMotivation,
    ed_preprocessing: modelEvaluationPreprocessing,
    unitary_result: modelUnitaryResults,
    intersectional_result: modelIntersectionalResults,
    data: modelData,
    human_life: modelHumanLife,
    mitigations: modelMitigations,
    risks_and_harms: modelRisksAndHarms,
    use_cases: modelUseCases,
    details: modelDetails,
  };

  return axios
    .post(API_URL + "add/model/details/" + modelFileID, params, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const uploadModelFile = (
  modelProfileID,
  file,
  onUploadProgress,
  cancelToken
) => {
  var formData = new FormData();
  formData.append("file", file);
  return axios
    .post(API_URL + "upload/model/version/" + modelProfileID, formData, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      onUploadProgress,
      cancelToken: cancelToken,
    })
    .then((response) => {
      return response.data;
    });
};

const editUploadModelFile = (
  modelFileID,
  file,
  onUploadProgress,
  cancelToken
) => {
  var formData = new FormData();
  formData.append("file", file);
  return axios
    .put(API_URL + "edit/file/upload/" + modelFileID, formData, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      onUploadProgress,
      cancelToken: cancelToken,
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Delete model information service that sends request and receives response data using axios
 *
 *
 * @method deleteModel
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
const deleteModel = (id) => {
  return axios
    .delete(API_URL + "delete/model/profile/" + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const publishModelVersion = (modelFileID) => {
  return axios
    .put(API_URL + "publish/model/version/" + modelFileID, null, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const archiveModelVersion = (modelFileID) => {
  return axios
    .put(
      API_URL + "archive/model/" + modelFileID,
      { is_archive: true },
      {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const deleteModelVersion = (modelFileID) => {
  return axios
    .delete(API_URL + "delete/model/version/" + modelFileID, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get model information service that sends request and receives response data using axios
 *
 *
 * @method getModel
 *
 * @param {string} id - A string for identifying model
 *
 * @return {Promise}
 *
 */
const getModel = (id) => {
  return axios
    .get(API_URL + "view/model/profile/" + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get model version information service that sends request and receives response data using axios
 *
 *
 * @method getModelVersion
 *
 * @param {string} id - A string for identifying model version
 *
 * @return {Promise}
 *
 */
const getModelVersion = (id) => {
  return axios
    .get(API_URL + "view/model/version/details/" + id, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get all model information service that sends request and receives response data using axios
 *
 *
 * @method getAllModels
 *
 * @return {Promise}
 *
 */
const getAllModels = () => {
  return axios
    .get(API_URL + "view/all/model", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get all model information service that sends request and receives response data using axios
 *
 *
 * @method getAllModelVersions
 *
 * @return {Promise}
 *
 */
const getAllModelVersions = (modelProfileID) => {
  return axios
    .get(API_URL + "view/model/version/" + modelProfileID, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get all accuracy information service that sends request and receives response data using axios
 *
 *
 * @method getAllAccuracy
 *
 * @return {Promise}
 *
 */
const getAllAccuracy = (modelProfileID) => {
  return axios
    .get(API_URL + "get/model/accuracy/" + modelProfileID, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Download model version file and pdf service that sends request and receives response data using axios
 *
 *
 * @method downloadModelVersion
 *
 * @param {string} id - A string for identifying model version
 *
 * @return {Promise}
 *
 */
const downloadModelVersion = (modelFileID, onDownloadProgress, cancelToken) => {
  return axios
    .get(API_URL + "download/model/version/" + modelFileID, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
      onDownloadProgress,
      cancelToken: cancelToken,
      responseType: "blob",
    })
    .then((response) => {
      return response.data;
    });
};

const modelServices = {
  addModel,
  editModel,
  editModelVersion,
  publishModelVersion,
  archiveModelVersion,
  deleteModelVersion,
  addModelVersionSaveDraft,
  addModelVersionSaveAndPublish,
  editUploadModelFile,
  uploadModelFile,
  deleteModel,
  getModel,
  getModelVersion,
  getAllModels,
  getAllModelVersions,
  getAllAccuracy,
  downloadModelVersion,
};

export default modelServices;
