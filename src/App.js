import { useState, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Toast, ToastContainer } from "react-bootstrap";
import { CancelToken } from "axios";
import Home from "components/Home";
import SignIn from "components/users/SignIn";
import SignUp from "components/users/SignUp";
import RequireAuth from "components/users/RequireAuth";
import PageNotFound from "components/PageNotFound";
import ForgotPassword from "components/users/ForgotPassword";
import Header from "components/layout/Header";
import Sidebar from "components/layout/Sidebar";

import "./App.css";
import "react-quill/dist/quill.snow.css";

/**Bootstrap Imports*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import GroupList from "components/groups/GroupList";
import GroupProfile from "components/groups/GroupProfile";
import AccountActivate from "components/users/AccountActivate";
import ModelList from "components/models/ModelList";
import ModelProfile from "components/models/ModelProfile";
import AddModelVersion from "components/models/AddModelVersion";
import CustomProgressBar from "components/layout/CustomProgressBar";
import {
  addModelVersionSaveAndPublish,
  addModelVersionSaveDraft,
  archiveModelVersion,
  deleteModelVersion,
  downloadModelVersion,
  editModelVersion,
  editUploadModelFile,
  publishModelVersion,
  uploadModelFile,
} from "actions/model";
import ViewModelVersion from "components/models/ViewModelVersion";
import EditModelVersion from "components/models/EditModelVersion";

/**
 * A module for App main component
 * @module App
 */

/**
 * App main component that list all routes to redirect to their corresponding components
 * @method App
 *
 * @return {JSX.Element}
 *
 */
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);
  const { currentModel, currentModelVersion } = useSelector(
    (state) => state.model
  );

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [showToast, setShowToast] = useState(null);
  const [toastStatus, setToastStatus] = useState(null);
  const [toastImage, setToastImage] = useState(null);

  // Function to handle toast dismissal
  const handleDismiss = () => {
    setShowToast(false);
  };

  // Overview
  const [modelNumber, setModelNumber] = useState("");
  const [modelVersionName, setModelVersionName] = useState("");
  const [modelAuthor, setModelAuthor] = useState("");
  const [modelContact, setModelContact] = useState("");
  const [modelVersionDescription, setModelVersionDescription] = useState("");

  // Details
  const [modelDevelopmentDate, setModelDevelopmentDate] = useState("");
  const [modelDevelopers, setModelDevelopers] = useState("");
  const [modelAccuracy, setModelAccuracy] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [modelOutput, setModelOutput] = useState("");
  const [modelType, setModelType] = useState("");
  const [modelPaper, setModelPaper] = useState("");
  const [modelCitationDetails, setModelCitationDetails] = useState("");
  const [modelLicense, setModelLicense] = useState("");
  const [modelOtherRelevantInfo, setModelOtherRelevantInfo] = useState("");

  // Intended use
  const [modelPrimaryIntendedUses, setModelPrimaryIntendedUses] = useState("");
  const [modelPrimaryIntendedUsers, setModelPrimaryIntendedUsers] =
    useState("");
  const [modelOutOfScopeUseCases, setModelOutOfScopeUseCases] = useState("");

  // Factors
  const [modelGroups, setModelGroups] = useState("");
  const [modelInstrumentation, setModelInstrumentation] = useState("");
  const [modelEnvironment, setModelEnvironment] = useState("");

  // Metrics
  const [modelPerformanceMeasures, setModelPerformanceMeasures] = useState("");
  const [modelDecisionThresholds, setModelDecisionThresholds] = useState("");
  const [modelApproachesToUncertainty, setModelApproachesToUncertainty] =
    useState("");

  // Datasets
  const [modelTrainingDataset, setModelTrainingDataset] = useState("");
  const [modelTrainingMotivation, setModelTrainingMotivation] = useState("");
  const [modelTrainingPreprocessing, setModelTrainingPreprocessing] =
    useState("");
  const [modelEvaluationDataset, setModelEvaluationDataset] = useState("");
  const [modelEvaluationMotivation, setModelEvaluationMotivation] =
    useState("");
  const [modelEvaluationPreprocessing, setModelEvaluationPreprocessing] =
    useState("");

  // Analyses
  const [modelUnitaryResults, setModelUnitaryResults] = useState("");
  const [modelIntersectionalResults, setModelIntersectionalResults] =
    useState("");

  // Considerations and Biases
  const [modelData, setModelData] = useState("");
  const [modelHumanLife, setModelHumanLife] = useState("");
  const [modelMitigations, setModelMitigations] = useState("");
  const [modelRisksAndHarms, setModelRisksAndHarms] = useState("");
  const [modelUseCases, setModelUseCases] = useState("");

  // Recommendations
  const [modelDetails, setModelDetails] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressBarPercentage, setProgressBarPercentage] = useState(0);
  const [cancelFileUpload, setCancelFileUpload] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const cancelAction = useRef(null);

  const [refreshModelVersionsCount, setRefreshModelVersionsCount] = useState(0);

  const cancelProgressBar = () => {
    if (cancelAction.current) {
      cancelAction.current("User has canceled the action.");
      setCancelFileUpload(true);
      setProgressBarPercentage(0);
    }
  };

  const handleOnCloseProgressBar = () => {
    setShowProgressBar(false);
    cancelProgressBar();
  };

  const handleUploadFile = (clickedPublishBtn) => {
    navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
    if (selectedFile) {
      setShowProgressBar(true);
      setCancelFileUpload(false);
      dispatch(
        uploadModelFile(
          currentModel[0]?.id,
          selectedFile,
          (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressBarPercentage(percentage);
          },
          new CancelToken((cancel) => (cancelAction.current = cancel))
        )
      )
        .then((res) => {
          setShowProgressBar(false);
          if (isPublish || clickedPublishBtn) {
            handleSaveAndPublish(res.id);
          } else {
            saveDraft(res.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = () => {
    setIsPublish(false);
    if (selectedFile) {
      handleUploadFile(false);
    } else {
      saveDraft(0);
      navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
    }
  };

  const saveDraft = (modelFileID) => {
    dispatch(
      addModelVersionSaveDraft(
        modelFileID,
        currentModel[0]?.id,
        modelNumber,
        modelVersionName,
        modelVersionDescription,
        modelAuthor,
        modelContact,
        modelDevelopmentDate === "" ? null : modelDevelopmentDate,
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
      )
    )
      .then((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage("/images/add-version-draft-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const handleSaveAndPublish = (modelFileID) => {
    dispatch(
      addModelVersionSaveAndPublish(
        modelFileID,
        currentModel[0]?.id,
        modelNumber,
        modelVersionName,
        modelVersionDescription,
        modelAuthor,
        modelContact,
        modelDevelopmentDate === "" ? null : modelDevelopmentDate,
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
      )
    )
      .then((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage("/images/add-version-publish-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const [showToast_E, setShowToast_E] = useState(true);
  const [toastStatus_E, setToastStatus_E] = useState(null);

  // Overview
  const [modelNumber_E, setModelNumber_E] = useState("");
  const [modelVersionName_E, setModelVersionName_E] = useState("");
  const [modelAuthor_E, setModelAuthor_E] = useState("");
  const [modelContact_E, setModelContact_E] = useState("");
  const [modelVersionDescription_E, setModelVersionDescription_E] =
    useState("");

  // Details
  const [modelDevelopmentDate_E, setModelDevelopmentDate_E] = useState("");
  const [modelDevelopers_E, setModelDevelopers_E] = useState("");
  const [modelAccuracy_E, setModelAccuracy_E] = useState("");
  const [modelInput_E, setModelInput_E] = useState("");
  const [modelOutput_E, setModelOutput_E] = useState("");
  const [modelType_E, setModelType_E] = useState("");
  const [modelPaper_E, setModelPaper_E] = useState("");
  const [modelCitationDetails_E, setModelCitationDetails_E] = useState("");
  const [modelLicense_E, setModelLicense_E] = useState("");
  const [modelOtherRelevantInfo_E, setModelOtherRelevantInfo_E] = useState("");

  // Intended use
  const [modelPrimaryIntendedUses_E, setModelPrimaryIntendedUses_E] =
    useState("");
  const [modelPrimaryIntendedUsers_E, setModelPrimaryIntendedUsers_E] =
    useState("");
  const [modelOutOfScopeUseCases_E, setModelOutOfScopeUseCases_E] =
    useState("");

  // Factors
  const [modelGroups_E, setModelGroups_E] = useState("");
  const [modelInstrumentation_E, setModelInstrumentation_E] = useState("");
  const [modelEnvironment_E, setModelEnvironment_E] = useState("");

  // Metrics
  const [modelPerformanceMeasures_E, setModelPerformanceMeasures_E] =
    useState("");
  const [modelDecisionThresholds_E, setModelDecisionThresholds_E] =
    useState("");
  const [modelApproachesToUncertainty_E, setModelApproachesToUncertainty_E] =
    useState("");

  // Datasets
  const [modelTrainingDataset_E, setModelTrainingDataset_E] = useState("");
  const [modelTrainingMotivation_E, setModelTrainingMotivation_E] =
    useState("");
  const [modelTrainingPreprocessing_E, setModelTrainingPreprocessing_E] =
    useState("");
  const [modelEvaluationDataset_E, setModelEvaluationDataset_E] = useState("");
  const [modelEvaluationMotivation_E, setModelEvaluationMotivation_E] =
    useState("");
  const [modelEvaluationPreprocessing_E, setModelEvaluationPreprocessing_E] =
    useState("");

  // Analyses
  const [modelUnitaryResults_E, setModelUnitaryResults_E] = useState("");
  const [modelIntersectionalResults_E, setModelIntersectionalResults_E] =
    useState("");

  // Considerations and Biases
  const [modelData_E, setModelData_E] = useState("");
  const [modelHumanLife_E, setModelHumanLife_E] = useState("");
  const [modelMitigations_E, setModelMitigations_E] = useState("");
  const [modelRisksAndHarms_E, setModelRisksAndHarms_E] = useState("");
  const [modelUseCases_E, setModelUseCases_E] = useState("");

  // Recommendations
  const [modelDetails_E, setModelDetails_E] = useState("");

  const [selectedFile_E, setSelectedFile_E] = useState(null);
  const [showProgressBar_E, setShowProgressBar_E] = useState(false);
  const [progressBarPercentage_E, setProgressBarPercentage_E] = useState(0);
  const [cancelFileUpload_E, setCancelFileUpload_E] = useState(false);
  const [isPublish_E, setIsPublish_E] = useState(false);
  const cancelAction_E = useRef(null);

  const cancelProgressBar_E = () => {
    if (cancelAction_E.current) {
      cancelAction_E.current("User has canceled the action.");
      setCancelFileUpload_E(true);
      setProgressBarPercentage_E(0);
    }
  };

  const handleOnCloseProgressBar_E = () => {
    setShowProgressBar_E(false);
    cancelProgressBar_E();
  };

  const handleUploadFile_E = (clickedPublishBtn) => {
    navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
    if (selectedFile_E) {
      setShowProgressBar_E(true);
      setCancelFileUpload_E(false);
      dispatch(
        editUploadModelFile(
          currentModelVersion?.model_file[0]?.id,
          selectedFile_E,
          (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressBarPercentage_E(percentage);
          },
          new CancelToken((cancel) => (cancelAction_E.current = cancel))
        )
      )
        .then((res) => {
          setShowProgressBar_E(false);
          if (isPublish_E || clickedPublishBtn) {
            handleSaveAndPublish_E(res.id);
          } else {
            saveDraft_E(res.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft_E = () => {
    setIsPublish_E(false);
    if (selectedFile_E) {
      handleUploadFile_E(false);
    } else {
      saveDraft_E(currentModelVersion?.model_file[0]?.id);
      navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
    }
  };

  const saveDraft_E = (modelFileID) => {
    dispatch(
      editModelVersion(
        modelFileID,
        currentModel[0]?.id,
        modelNumber_E,
        modelVersionName_E,
        modelVersionDescription_E,
        modelAuthor_E,
        modelContact_E,
        modelDevelopmentDate_E === "" ? null : modelDevelopmentDate_E,
        modelDevelopers_E,
        modelAccuracy_E,
        modelInput_E,
        modelOutput_E,
        modelType_E,
        modelPaper_E,
        modelCitationDetails_E,
        modelLicense_E,
        modelOtherRelevantInfo_E,
        modelPrimaryIntendedUses_E,
        modelPrimaryIntendedUsers_E,
        modelOutOfScopeUseCases_E,
        modelGroups_E,
        modelInstrumentation_E,
        modelEnvironment_E,
        modelPerformanceMeasures_E,
        modelDecisionThresholds_E,
        modelApproachesToUncertainty_E,
        modelTrainingDataset_E,
        modelTrainingMotivation_E,
        modelTrainingPreprocessing_E,
        modelEvaluationDataset_E,
        modelEvaluationMotivation_E,
        modelEvaluationPreprocessing_E,
        modelUnitaryResults_E,
        modelIntersectionalResults_E,
        modelData_E,
        modelHumanLife_E,
        modelMitigations_E,
        modelRisksAndHarms_E,
        modelUseCases_E,
        modelDetails_E
      )
    )
      .then((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage("/images/edit-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const handleSaveAndPublish_E = (modelFileID) => {
    saveDraft_E(modelFileID);
    saveAndPublish(modelFileID);
  };

  const saveAndPublish = (modelFileID) => {
    dispatch(publishModelVersion(modelFileID))
      .then((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage("/images/publish-version-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
        navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const archive = (modelFileID) => {
    dispatch(archiveModelVersion(modelFileID))
      .then((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage("/images/archive-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
        navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const deleteVersion = (modelFileID) => {
    dispatch(deleteModelVersion(modelFileID))
      .then((status) => {
        setShowToast(true);
        setToastStatus("error");
        setToastImage("/images/remove-success.svg");
        setRefreshModelVersionsCount(refreshModelVersionsCount + 1);
        navigate("/models/view/" + currentModel[0]?.id + "?tab=2");
      })
      .catch((status) => {
        setShowToast(true);
        setToastStatus(status);
        setToastImage(null);
      });
  };

  const [showProgressBar_D, setShowProgressBar_D] = useState(false);
  const cancelAction_D = useRef(null);
  const [progressBarPercentage_D, setProgressBarPercentage_D] = useState(0);
  const [selectedFile_D, setSelectedFile_D] = useState(null);
  const [cancelFileUpload_D, setCancelFileUpload_D] = useState(false);

  const cancelProgressBar_D = () => {
    if (cancelAction_D.current) {
      cancelAction_D.current("User has canceled the action.");
      setCancelFileUpload_D(true);
      setProgressBarPercentage_D(0);
    }
  };

  const handleOnCloseProgressBar_D = () => {
    setShowProgressBar_D(false);
    cancelProgressBar_D();
  };

  const downloadVersion = (modelFileID) => {
    setShowProgressBar_D(true);
    setCancelFileUpload_D(false);
    setSelectedFile_D(
      currentModelVersion?.model_file[0]?.file.replace("/media/", "")
    );
    dispatch(
      downloadModelVersion(
        modelFileID,
        (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgressBarPercentage_D(percentage);
        },
        new CancelToken((cancel) => (cancelAction_D.current = cancel))
      )
    )
      .then((content) => {
        setShowToast(true);
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(content);
        a.href = url;
        a.download =
          currentModelVersion?.model_file[0]?.file.replace("/media/", "") +
          ".zip";
        a.click();
        setShowProgressBar_D(false);
        setProgressBarPercentage_D(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="layout">
        <Header isLoggedIn={isLoggedIn} />
        <div className="main">
          {isLoggedIn && (
            <Sidebar
              setShowToast={setShowToast}
              setToastStatus={setToastStatus}
              setToastImage={setToastImage}
            />
          )}
          <Col id="page-content-wrapper">
            <Routes>
              {/* PROTECTED ROUTES */}
              <Route element={<RequireAuth />}>
                <Route path="/groups" element={<GroupList />} />
                <Route
                  path="/models"
                  element={
                    <ModelList
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                    />
                  }
                />
                <Route
                  path="/groups/view/:id"
                  element={
                    <GroupProfile
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                    />
                  }
                />
                <Route
                  path="/models/view/:id"
                  element={
                    <ModelProfile
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                      refreshModelVersionsCount={refreshModelVersionsCount}
                    />
                  }
                />
                <Route
                  path="/models/view/version/:id"
                  element={
                    <ViewModelVersion
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                      refreshModelVersionsCount={refreshModelVersionsCount}
                      saveAndPublish={saveAndPublish}
                      archive={archive}
                      deleteModelVersion={deleteVersion}
                      downloadModelVersion={downloadVersion}
                    />
                  }
                />
                <Route
                  path="/models/version/add/:id"
                  element={
                    <AddModelVersion
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                      handleSaveDraft={handleSaveDraft}
                      handleUploadFile={handleUploadFile}
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                      modelNumber={modelNumber}
                      modelVersionName={modelVersionName}
                      modelVersionDescription={modelVersionDescription}
                      modelAuthor={modelAuthor}
                      modelContact={modelContact}
                      setModelNumber={setModelNumber}
                      setModelVersionName={setModelVersionName}
                      setModelVersionDescription={setModelVersionDescription}
                      setModelAuthor={setModelAuthor}
                      setModelContact={setModelContact}
                      modelDevelopmentDate={modelDevelopmentDate}
                      modelDevelopers={modelDevelopers}
                      modelAccuracy={modelAccuracy}
                      modelInput={modelInput}
                      modelOutput={modelOutput}
                      modelType={modelType}
                      modelPaper={modelPaper}
                      modelCitationDetails={modelCitationDetails}
                      modelLicense={modelLicense}
                      modelOtherRelevantInfo={modelOtherRelevantInfo}
                      setModelDevelopmentDate={setModelDevelopmentDate}
                      setModelDevelopers={setModelDevelopers}
                      setModelAccuracy={setModelAccuracy}
                      setModelInput={setModelInput}
                      setModelOutput={setModelOutput}
                      setModelType={setModelType}
                      setModelPaper={setModelPaper}
                      setModelCitationDetails={setModelCitationDetails}
                      setModelLicense={setModelLicense}
                      setModelOtherRelevantInfo={setModelOtherRelevantInfo}
                      modelPrimaryIntendedUses={modelPrimaryIntendedUses}
                      modelPrimaryIntendedUsers={modelPrimaryIntendedUsers}
                      modelOutOfScopeUseCases={modelOutOfScopeUseCases}
                      setModelPrimaryIntendedUses={setModelPrimaryIntendedUses}
                      setModelPrimaryIntendedUsers={
                        setModelPrimaryIntendedUsers
                      }
                      setModelOutOfScopeUseCases={setModelOutOfScopeUseCases}
                      modelGroups={modelGroups}
                      modelInstrumentation={modelInstrumentation}
                      modelEnvironment={modelEnvironment}
                      setModelGroups={setModelGroups}
                      setModelInstrumentation={setModelInstrumentation}
                      setModelEnvironment={setModelEnvironment}
                      modelPerformanceMeasures={modelPerformanceMeasures}
                      modelDecisionThresholds={modelDecisionThresholds}
                      modelApproachesToUncertainty={
                        modelApproachesToUncertainty
                      }
                      setModelPerformanceMeasures={setModelPerformanceMeasures}
                      setModelDecisionThresholds={setModelDecisionThresholds}
                      setModelApproachesToUncertainty={
                        setModelApproachesToUncertainty
                      }
                      modelTrainingDataset={modelTrainingDataset}
                      modelTrainingMotivation={modelTrainingMotivation}
                      modelTrainingPreprocessing={modelTrainingPreprocessing}
                      modelEvaluationDataset={modelEvaluationDataset}
                      modelEvaluationMotivation={modelEvaluationMotivation}
                      modelEvaluationPreprocessing={
                        modelEvaluationPreprocessing
                      }
                      setModelTrainingDataset={setModelTrainingDataset}
                      setModelTrainingMotivation={setModelTrainingMotivation}
                      setModelTrainingPreprocessing={
                        setModelTrainingPreprocessing
                      }
                      setModelEvaluationDataset={setModelEvaluationDataset}
                      setModelEvaluationMotivation={
                        setModelEvaluationMotivation
                      }
                      setModelEvaluationPreprocessing={
                        setModelEvaluationPreprocessing
                      }
                      modelUnitaryResults={modelUnitaryResults}
                      modelIntersectionalResults={modelIntersectionalResults}
                      setModelUnitaryResults={setModelUnitaryResults}
                      setModelIntersectionalResults={
                        setModelIntersectionalResults
                      }
                      modelData={modelData}
                      modelHumanLife={modelHumanLife}
                      modelMitigations={modelMitigations}
                      modelRisksAndHarms={modelRisksAndHarms}
                      modelUseCases={modelUseCases}
                      setModelData={setModelData}
                      setModelHumanLife={setModelHumanLife}
                      setModelMitigations={setModelMitigations}
                      setModelRisksAndHarms={setModelRisksAndHarms}
                      setModelUseCases={setModelUseCases}
                      modelDetails={modelDetails}
                      setModelDetails={setModelDetails}
                    />
                  }
                />
                <Route
                  path="/models/version/edit/:id"
                  element={
                    <EditModelVersion
                      selectedFile={selectedFile_E}
                      setSelectedFile={setSelectedFile_E}
                      handleSaveDraft={handleSaveDraft_E}
                      handleUploadFile={handleUploadFile_E}
                      handleSaveAndPublish={handleSaveAndPublish_E}
                      setShowToast={setShowToast}
                      setToastStatus={setToastStatus}
                      setToastImage={setToastImage}
                      modelNumber={modelNumber_E}
                      modelVersionName={modelVersionName_E}
                      modelVersionDescription={modelVersionDescription_E}
                      modelAuthor={modelAuthor_E}
                      modelContact={modelContact_E}
                      setModelNumber={setModelNumber_E}
                      setModelVersionName={setModelVersionName_E}
                      setModelVersionDescription={setModelVersionDescription_E}
                      setModelAuthor={setModelAuthor_E}
                      setModelContact={setModelContact_E}
                      modelDevelopmentDate={modelDevelopmentDate_E}
                      modelDevelopers={modelDevelopers_E}
                      modelAccuracy={modelAccuracy_E}
                      modelInput={modelInput_E}
                      modelOutput={modelOutput_E}
                      modelType={modelType_E}
                      modelPaper={modelPaper_E}
                      modelCitationDetails={modelCitationDetails_E}
                      modelLicense={modelLicense_E}
                      modelOtherRelevantInfo={modelOtherRelevantInfo_E}
                      setModelDevelopmentDate={setModelDevelopmentDate_E}
                      setModelDevelopers={setModelDevelopers_E}
                      setModelAccuracy={setModelAccuracy_E}
                      setModelInput={setModelInput_E}
                      setModelOutput={setModelOutput_E}
                      setModelType={setModelType_E}
                      setModelPaper={setModelPaper_E}
                      setModelCitationDetails={setModelCitationDetails_E}
                      setModelLicense={setModelLicense_E}
                      setModelOtherRelevantInfo={setModelOtherRelevantInfo_E}
                      modelPrimaryIntendedUses={modelPrimaryIntendedUses_E}
                      modelPrimaryIntendedUsers={modelPrimaryIntendedUsers_E}
                      modelOutOfScopeUseCases={modelOutOfScopeUseCases_E}
                      setModelPrimaryIntendedUses={
                        setModelPrimaryIntendedUses_E
                      }
                      setModelPrimaryIntendedUsers={
                        setModelPrimaryIntendedUsers_E
                      }
                      setModelOutOfScopeUseCases={setModelOutOfScopeUseCases_E}
                      modelGroups={modelGroups_E}
                      modelInstrumentation={modelInstrumentation_E}
                      modelEnvironment={modelEnvironment_E}
                      setModelGroups={setModelGroups_E}
                      setModelInstrumentation={setModelInstrumentation_E}
                      setModelEnvironment={setModelEnvironment_E}
                      modelPerformanceMeasures={modelPerformanceMeasures_E}
                      modelDecisionThresholds={modelDecisionThresholds_E}
                      modelApproachesToUncertainty={
                        modelApproachesToUncertainty_E
                      }
                      setModelPerformanceMeasures={
                        setModelPerformanceMeasures_E
                      }
                      setModelDecisionThresholds={setModelDecisionThresholds_E}
                      setModelApproachesToUncertainty={
                        setModelApproachesToUncertainty_E
                      }
                      modelTrainingDataset={modelTrainingDataset_E}
                      modelTrainingMotivation={modelTrainingMotivation_E}
                      modelTrainingPreprocessing={modelTrainingPreprocessing_E}
                      modelEvaluationDataset={modelEvaluationDataset_E}
                      modelEvaluationMotivation={modelEvaluationMotivation_E}
                      modelEvaluationPreprocessing={
                        modelEvaluationPreprocessing_E
                      }
                      setModelTrainingDataset={setModelTrainingDataset_E}
                      setModelTrainingMotivation={setModelTrainingMotivation_E}
                      setModelTrainingPreprocessing={
                        setModelTrainingPreprocessing_E
                      }
                      setModelEvaluationDataset={setModelEvaluationDataset_E}
                      setModelEvaluationMotivation={
                        setModelEvaluationMotivation_E
                      }
                      setModelEvaluationPreprocessing={
                        setModelEvaluationPreprocessing_E
                      }
                      modelUnitaryResults={modelUnitaryResults_E}
                      modelIntersectionalResults={modelIntersectionalResults_E}
                      setModelUnitaryResults={setModelUnitaryResults_E}
                      setModelIntersectionalResults={
                        setModelIntersectionalResults_E
                      }
                      modelData={modelData_E}
                      modelHumanLife={modelHumanLife_E}
                      modelMitigations={modelMitigations_E}
                      modelRisksAndHarms={modelRisksAndHarms_E}
                      modelUseCases={modelUseCases_E}
                      setModelData={setModelData_E}
                      setModelHumanLife={setModelHumanLife_E}
                      setModelMitigations={setModelMitigations_E}
                      setModelRisksAndHarms={setModelRisksAndHarms_E}
                      setModelUseCases={setModelUseCases_E}
                      modelDetails={modelDetails_E}
                      setModelDetails={setModelDetails_E}
                    />
                  }
                />
              </Route>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/activate/:uid/:token"
                element={<AccountActivate />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Col>
        </div>
        {showProgressBar && (
          <CustomProgressBar
            upload={true}
            handleOnCloseProgressBar={handleOnCloseProgressBar}
            handleUploadFile={handleUploadFile}
            cancelFileUpload={cancelFileUpload}
            cancelProgressBar={cancelProgressBar}
            progressBarPercentage={progressBarPercentage}
            filename={selectedFile?.name}
          />
        )}
        {showProgressBar_D && (
          <CustomProgressBar
            upload={false}
            handleOnCloseProgressBar={handleOnCloseProgressBar_D}
            downloadVersion={downloadVersion}
            cancelFileUpload={cancelFileUpload_D}
            cancelProgressBar={cancelProgressBar_D}
            progressBarPercentage={progressBarPercentage_D}
            filename={selectedFile_D}
          />
        )}
        {showProgressBar_E && (
          <CustomProgressBar
            upload={true}
            handleOnCloseProgressBar={handleOnCloseProgressBar_E}
            handleUploadFile={handleUploadFile_E}
            cancelFileUpload={cancelFileUpload_E}
            cancelProgressBar={cancelProgressBar_E}
            progressBarPercentage={progressBarPercentage_E}
            filename={selectedFile_E?.name}
          />
        )}
        {message && (
          <ToastContainer
            className="p-3 position-fixed bottom-0 start-0"
            style={{ zIndex: 9999 }}
          >
            <Toast
              show={showToast}
              onClose={handleDismiss}
              delay={3000}
              autohide
              className={`message d-flex justify-content-between align-items-center p-3 ${
                toastStatus === "success" ? "success" : "error"
              }`}
            >
              <span>
                {toastImage && (
                  <img src={toastImage} className="me-3 img-fluid" alt="logo" />
                )}
                <span>{message}</span>
              </span>
              {/* <span><span className="bold">Model profile</span> created.</span> */}
              <img
                onClick={() => setShowToast(false)}
                src="/images/close-toast.svg"
                className="img-fluid"
                alt="logo"
              />
            </Toast>
          </ToastContainer>
        )}
      </div>
      <span className="version">v4.1</span>
    </>
  );
};
export default App;
