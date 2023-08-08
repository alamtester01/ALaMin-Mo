import { useState, useEffect } from "react";
import {
  Container,
  Tab,
  Breadcrumb,
  Tabs,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModel, getModelVersion } from "actions/model";
import Overview from "./sections/view/Overview";
import Details from "./sections/view/Details";
import IntendedUse from "./sections/view//IntendedUse";
import Factors from "./sections/view/Factors";
import Metrics from "./sections/view/Metrics";
import Datasets from "./sections/view/Datasets";
import Analyses from "./sections/view/Analyses";
import ConsiderationsAndBiases from "./sections/view/ConsiderationsAndBiases";
import Recommendations from "./sections/view/Recommendations";
import SaveAndPublishModal from "components/models/SaveAndPublishModal";
import DiscardModal from "./DiscardModal";
import { SET_MESSAGE } from "actions/types";
import ArchiveModal from "./ArchiveModal";
import validator from "validator";
import DeleteModelVersionModal from "./DeleteModelVersionModal";

/**
 * A module for showing View  Model Version component
 * @module components/models/ViewModelVersion
 */

/**
 * View Model Version component
 * @method ViewModelVersion
 *
 * @return {JSX.Element}
 *
 */

const ViewModelVersion = (props) => {
  import("../../styles/AddModelVersion.css");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { user } = useSelector((state) => state.auth);
  const { groups } = useSelector((state) => state.group);
  const { currentModel, currentModelVersion } = useSelector(
    (state) => state.model
  );

  const [modelName, setModelName] = useState("");
  const [showSaveAndPublishModal, setShowSaveAndPublishModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModelVersionModal, setShowDeleteModelVersionModal] =
    useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);

  const [saveDraftDisable, setSaveDraftDisable] = useState(true);
  const [saveAndPublishDisable, setSaveAndPublishDisable] = useState(true);
  const [discardDisable, setDiscardDisable] = useState(true);
  const [userAllow, setUserAllow] = useState(false);
  const [publishAllow, setPublishAllow] = useState(false);

  const withFormattingOptions = [
    "modelVersionDescription",
    "modelCitationDetails",
    "modelLicense",
    "modelOtherRelevantInfo",
    "modelGroups",
    "modelInstrumentation",
    "modelEnvironment",
    "modelUnitaryResults",
    "modelIntersectionalResults",
    "modelDetails",
  ];

  useEffect(() => {
    if (currentModelVersion?.model) {
      dispatch(getModel(currentModelVersion?.model[0]?.model_profile)).catch(
        (error) => console.log(error)
      );
    }
  }, [currentModelVersion?.model]);

  useEffect(() => {
    dispatch(getModelVersion(id)).catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    setUserAllow(false);
    const group = Object.values(groups).find(
      (group) => group.id === currentModel[0]?.model_profile_group_id
    );
    if (group) {
      const member = Object.values(group?.group_members).find(
        (group) => group.email === user.email
      );
      if (member) {
        setUserAllow(true);
      }
    }
    if (currentModel[0]?.model_created_by === user.email) {
      setUserAllow(true);
    }
    setModelName(currentModel[0]?.model_profile_name);
  }, [currentModel[0]?.model_profile_name]);

  useEffect(() => {
    if (currentModelVersion?.model_file) {
      setModelFile(currentModelVersion?.model_file[0]?.file);
      setModelFileID(currentModelVersion?.model_file[0]?.id);
    }
    if (currentModelVersion?.model) {
      setModelProfileID(currentModelVersion?.model[0]?.model_profile);
      setModelNumber(currentModelVersion?.model[0]?.version);
      setModelVersionName(currentModelVersion?.model[0]?.name);
      setModelVersionDescription(currentModelVersion?.model[0]?.description);
      setModelDateCreated(currentModelVersion?.model[0]?.date_created);
      setModelAuthor(currentModelVersion?.model[0]?.author);
      setModelContact(currentModelVersion?.model[0]?.contact_information);
      setIsArchive(currentModelVersion?.model[0]?.is_archive);
    }

    if (currentModelVersion?.model_details) {
      setModelDevelopmentDate(
        currentModelVersion?.model_details[0]?.development_date
      );
      setModelDevelopers(currentModelVersion?.model_details[0]?.developers);
      setModelAccuracy(currentModelVersion?.model_details[0]?.accuracy);
      setModelInput(currentModelVersion?.model_details[0]?.input);
      setModelOutput(currentModelVersion?.model_details[0]?.output);
      setModelType(currentModelVersion?.model_details[0]?.type);
      setModelPaper(currentModelVersion?.model_details[0]?.paper);
      setModelCitationDetails(
        currentModelVersion?.model_details[0]?.citation_details
      );
      setModelLicense(currentModelVersion?.model_details[0]?.license);
      setModelOtherRelevantInfo(
        currentModelVersion?.model_details[0]?.other_relevant_information
      );
      setIsPublish(currentModelVersion?.model_details[0]?.is_publish);
    }

    if (currentModelVersion?.intended_use) {
      setModelPrimaryIntendedUses(
        currentModelVersion?.intended_use[0]?.primary_intended_uses
      );
      setModelPrimaryIntendedUsers(
        currentModelVersion?.intended_use[0]?.primary_intended_user
      );
      setModelOutOfScopeUseCases(
        currentModelVersion?.intended_use[0]?.out_of_scope_use_cases
      );
    }

    if (currentModelVersion?.factor) {
      setModelGroups(currentModelVersion?.factor[0]?.groups);
      setModelInstrumentation(currentModelVersion?.factor[0]?.instrumentation);
      setModelEnvironment(currentModelVersion?.factor[0]?.environment);
    }

    if (currentModelVersion?.metric) {
      setModelPerformanceMeasures(
        currentModelVersion?.metric[0]?.performance_measures
      );
      setModelDecisionThresholds(
        currentModelVersion?.metric[0]?.decision_thresholds
      );
      setModelApproachesToUncertainty(
        currentModelVersion?.metric[0]?.approaches_to_uncertainty
      );
    }

    if (currentModelVersion?.dataset) {
      setModelTrainingDataset(currentModelVersion?.dataset[0]?.td_datasets);
      setModelTrainingMotivation(
        currentModelVersion?.dataset[0]?.td_motivation
      );
      setModelTrainingPreprocessing(
        currentModelVersion?.dataset[0]?.td_preprocessing
      );
      setModelEvaluationDataset(currentModelVersion?.dataset[0]?.ed_datasets);
      setModelEvaluationMotivation(
        currentModelVersion?.dataset[0]?.ed_motivation
      );
      setModelEvaluationPreprocessing(
        currentModelVersion?.dataset[0]?.ed_preprocessing
      );
    }

    if (currentModelVersion?.analysis) {
      setModelUnitaryResults(currentModelVersion?.analysis[0]?.unitary_result);
      setModelIntersectionalResults(
        currentModelVersion?.analysis[0]?.intersectional_result
      );
    }

    if (currentModelVersion?.ethical_consideration) {
      setModelData(currentModelVersion?.ethical_consideration[0]?.data);
      setModelHumanLife(
        currentModelVersion?.ethical_consideration[0]?.human_life
      );
      setModelMitigations(
        currentModelVersion?.ethical_consideration[0]?.mitigations
      );
      setModelRisksAndHarms(
        currentModelVersion?.ethical_consideration[0]?.risks_and_harms
      );
      setModelUseCases(
        currentModelVersion?.ethical_consideration[0]?.use_cases
      );
    }

    if (currentModelVersion?.recommendation) {
      setModelDetails(currentModelVersion?.recommendation[0]?.details);
    }
  }, [currentModelVersion]);

  useEffect(() => {
    setModelProfileID("");
    setModelFile("");
    setModelNumber("");
    setModelVersionName("");
    setModelVersionDescription("");
    setModelDateCreated("");
    setModelAuthor("");
    setModelContact("");

    setModelDevelopmentDate("");
    setModelDevelopers("");
    setModelAccuracy("");
    setModelInput("");
    setModelOutput("");
    setModelType("");
    setModelPaper("");
    setModelCitationDetails("");
    setModelLicense("");
    setModelOtherRelevantInfo("");

    setModelPrimaryIntendedUses("");
    setModelPrimaryIntendedUsers("");
    setModelOutOfScopeUseCases("");

    setModelGroups("");
    setModelInstrumentation("");
    setModelEnvironment("");

    setModelPerformanceMeasures("");
    setModelDecisionThresholds("");
    setModelApproachesToUncertainty("");

    setModelTrainingDataset("");
    setModelTrainingMotivation("");
    setModelTrainingPreprocessing("");
    setModelEvaluationDataset("");
    setModelEvaluationMotivation("");
    setModelEvaluationPreprocessing("");

    setModelUnitaryResults("");
    setModelIntersectionalResults("");

    setModelData("");
    setModelHumanLife("");
    setModelMitigations("");
    setModelRisksAndHarms("");
    setModelUseCases("");

    setModelDetails("");
  }, []);

  const handleSaveAndPublishModalClose = () => {
    setShowSaveAndPublishModal(false);
  };

  const handleArchiveModalClose = () => {
    setShowArchiveModal(false);
  };

  const handleDeleteModelVersionModalClose = () => {
    setShowDeleteModelVersionModal(false);
  };

  const handleDiscardModalClose = () => {
    setShowDiscardModal(false);
  };

  const onClickSave = (isPublish) => {
    if (isPublish) {
      props?.saveAndPublish(modelFileID);
    }
  };

  const onClickDiscard = () => {
    navigate("/models/view/" + id + "?tab=2");
    dispatch({
      type: SET_MESSAGE,
      payload: "Version discarded.",
    });
    props?.setShowToast(true);
    props?.setToastStatus("error")
    props?.setToastImage("/images/remove-success.svg");
  };

  // Overview
  const [modelProfileID, setModelProfileID] = useState("");
  const [modelFileID, setModelFileID] = useState("");
  const [modelFile, setModelFile] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [modelVersionName, setModelVersionName] = useState("");
  const [modelAuthor, setModelAuthor] = useState("");
  const [modelContact, setModelContact] = useState("");
  const [modelVersionDescription, setModelVersionDescription] = useState("");
  const [modelDateCreated, setModelDateCreated] = useState("");

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
  const [isPublish, setIsPublish] = useState("");
  const [isArchive, setIsArchive] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = (e) => {
    setExpanded(!expanded);
  };

  const onClickEdit = () => {
    navigate("/models/version/edit/" + id);
  };

  const validateAll = () => {
    // validate("modelFile", props?.modelFile);
    validate("modelNumber", modelNumber);
    validate("modelVersionName", modelVersionName);
    validate("modelVersionDescription", modelVersionDescription);
    validate("modelAuthor", modelAuthor);
    validate("modelContact", modelContact);
    if (modelFile) {
      validate("modelFile", modelFile);
    }
    validate("modelDevelopmentDate", modelDevelopmentDate);
    validate("modelDevelopers", modelDevelopers);
    validate("modelAccuracy", modelAccuracy);
    validate("modelInput", modelInput);
    validate("modelOutput", modelOutput);
    validate("modelType", modelType);
    validate("modelPaper", modelPaper);
    validate("modelCitationDetails", modelCitationDetails);
    validate("modelLicense", modelLicense);
    validate("modelOtherRelevantInfo", modelOtherRelevantInfo);
    validate("modelPrimaryIntendedUses", modelPrimaryIntendedUses);
    validate("modelPrimaryIntendedUsers", modelPrimaryIntendedUsers);
    validate("modelOutOfScopeUseCases", modelOutOfScopeUseCases);
    validate("modelGroups", modelGroups);
    validate("modelInstrumentation", modelInstrumentation);
    validate("modelEnvironment", modelEnvironment);
    validate("modelPerformanceMeasures", modelPerformanceMeasures);
    validate("modelDecisionThresholds", modelDecisionThresholds);
    validate("modelApproachesToUncertainty", modelApproachesToUncertainty);
    validate("modelTrainingDataset", modelTrainingDataset);
    validate("modelTrainingMotivation", modelTrainingMotivation);
    validate("modelTrainingPreprocessing", modelTrainingPreprocessing);
    validate("modelEvaluationDataset", modelEvaluationDataset);
    validate("modelEvaluationMotivation", modelEvaluationMotivation);
    validate("modelEvaluationPreprocessing", modelEvaluationPreprocessing);
    validate("modelUnitaryResults", modelUnitaryResults);
    validate("modelIntersectionalResults", modelIntersectionalResults);
    validate("modelData", modelData);
    validate("modelHumanLife", modelHumanLife);
    validate("modelMitigations", modelMitigations);
    validate("modelRisksAndHarms", modelRisksAndHarms);
    validate("modelUseCases", modelUseCases);
    validate("modelDetails", modelDetails);
  };

  const validate = (name, value) => {
    if (
      withFormattingOptions.findIndex((field) => name === field) >= 0 &&
      value === "<p><br></p>"
    ) {
      value = "";
    }
    if (value) {
      value = value.toString().trim();
    }
    switch (name) {
      case "modelFile":
        const extensionName = value?.split(".").at(-1).toLowerCase();
        if (
          (extensionName !== "h5" &&
            extensionName !== "hdf5" &&
            extensionName !== "he5") ||
          value === ""
        ) {
          setError(
            Object.assign(error, {
              [name]: "Support HDF5 format (h5, hdf5, he5).",
            })
          );
          setModelFile("");
          return;
        }
        break;
      case "modelNumber":
        if (!/^[a-zA-Z0-9.]+$/.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Accepts alphanumeric and period only.",
            })
          );
          return;
        }
        break;
      case "modelAuthor":
        const authorRegex = /^[a-zA-ZñÑ\s.]+$/;
        if (!authorRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Accepts a-z, A-Z, Ñ/ñ, space, and period",
            })
          );
          return;
        }
        break;
      case "modelDevelopers":
        const developersRegex = /^[a-zA-ZñÑ\s.,]+$/;
        if (!developersRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Accepts a-z, A-Z, Ñ/ñ, space, comma, and period",
            })
          );
          return;
        }
        break;

      case "modelContact":
        const contactRegex = /^[a-zA-Z0-9ñÑ\s.@#_]+$/;
        if (!contactRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]:
                "Accepts a-z, A-Z, 0-9, Ñ/ñ, space, period, and special characters like @#_",
            })
          );
          return;
        }
        break;
      case "modelDevelopmentDate":
        if (!validator.isDate(value)) {
          setError(
            Object.assign(error, {
              [name]: "Please match the requested format",
            })
          );
          return;
        }
        break;
      case "modelAccuracy":
        const accuracyRegex = /^[0-9\s.%]+$/;
        if (!accuracyRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Accepts 0-9, space, period and special character like %",
            })
          );
          return;
        }
        break;
      case "modelOtherRelevantInfo":
      case "modelGroups":
      case "modelUnitaryResults":
      case "modelIntersectionalResults":
      case "modelDetails":
        if (value === "") {
          break;
        }
      default:
        const nameRegex =
          /^[a-zA-Z0-9ñÑ\s~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]+$/;
        if (!nameRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]:
                "Accepts a-z, A-Z, 0-9, Ñ/ñ, space, and special characters like ~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/",
            })
          );
          return;
        }
        break;
    }

    delete error[name];
  };

  useEffect(() => {
    validateAll();
    if (
      Object.keys(error).length === 0 &&
      modelFile !== "" &&
      modelNumber !== "" &&
      modelVersionName !== "" &&
      modelVersionDescription !== "<p><br></p>" &&
      modelAuthor !== "" &&
      modelContact !== "" &&
      modelDevelopmentDate !== "" &&
      modelDevelopers !== "" &&
      modelAccuracy !== "" &&
      modelInput !== "" &&
      modelOutput !== "" &&
      modelType !== "" &&
      modelPaper !== "" &&
      modelCitationDetails !== "<p><br></p>" &&
      modelLicense !== "<p><br></p>" &&
      modelPrimaryIntendedUses !== "" &&
      modelPrimaryIntendedUsers !== "" &&
      modelOutOfScopeUseCases !== "" &&
      modelInstrumentation !== "<p><br></p>" &&
      modelEnvironment !== "<p><br></p>" &&
      modelPerformanceMeasures !== "" &&
      modelDecisionThresholds !== "" &&
      modelApproachesToUncertainty !== "" &&
      modelTrainingDataset !== "" &&
      modelTrainingMotivation !== "" &&
      modelTrainingPreprocessing !== "" &&
      modelEvaluationDataset !== "" &&
      modelEvaluationMotivation !== "" &&
      modelEvaluationPreprocessing !== "" &&
      modelData !== "" &&
      modelHumanLife !== "" &&
      modelMitigations !== "" &&
      modelRisksAndHarms !== "" &&
      modelUseCases !== ""
    ) {
      setPublishAllow(true);
    } else {
      setPublishAllow(false);
    }
  }, [
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
    modelPrimaryIntendedUses,
    modelPrimaryIntendedUsers,
    modelOutOfScopeUseCases,
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
    modelData,
    modelHumanLife,
    modelMitigations,
    modelRisksAndHarms,
    modelUseCases,
  ]);

  const onClickArchive = () => {
    props?.archive(modelFileID);
  };

  const onClickDeleteModelVersion = () => {
    props?.deleteModelVersion(modelFileID);
  };

  const onClickDownload = () => {
    props?.downloadModelVersion(modelFileID)
  }

  return (
    <>
      <SaveAndPublishModal
        showSaveAndPublishModal={showSaveAndPublishModal}
        handleSaveAndPublishModalClose={handleSaveAndPublishModalClose}
        onClickSave={onClickSave}
      />
      <ArchiveModal
        showArchiveModal={showArchiveModal}
        handleArchiveModalClose={handleArchiveModalClose}
        onClickArchive={onClickArchive}
      />
      <DeleteModelVersionModal
        showDeleteModelVersionModal={showDeleteModelVersionModal}
        handleDeleteModelVersionModalClose={handleDeleteModelVersionModalClose}
        onClickDeleteModelVersion={onClickDeleteModelVersion}
      />
      <DiscardModal
        showDiscardModal={showDiscardModal}
        handleDiscardModalClose={handleDiscardModalClose}
        onClickDiscard={onClickDiscard}
      />
      <Container className="mw-100">
        <Breadcrumb>
          <Breadcrumb.Item active>Models</Breadcrumb.Item>
          <Breadcrumb.Item
            className="link"
            linkAs={Link}
            linkProps={{ to: "/models" }}
          >
            Model Profiles
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="link"
            linkAs={Link}
            linkProps={{
              to: `/models/view/${modelProfileID}?tab=2`,
            }}
          >
            {modelName}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-flex justify-content-between">
          <p className="title">{modelVersionName}</p>
          <div className="d-flex">
            {userAllow &&
              (!isArchive ? (
                <Dropdown
                  className="action-dropdown"
                  show={expanded}
                  onToggle={handleToggleExpand}
                >
                  <Dropdown.Toggle
                    variant="outline-primary"
                    className={
                      expanded ? "button" : "action-btn btn-outline-light"
                    }
                    id="dropdown-filter-toggle"
                  >
                    {isPublish ? "Published version" : "Draft version"}
                    <img
                      src={
                        expanded
                          ? "/images/arrow_down_white.svg"
                          : "/images/arrow_down.svg"
                      }
                      className="arrow-down img-fluid"
                      alt="arrow down"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="action-dropdown-menu">
                    {!isPublish ? (
                      <>
                        {publishAllow && (
                          <Dropdown.Item
                            onClick={() => setShowSaveAndPublishModal(true)}
                          >
                            <img
                              src="/images/save_publish.svg"
                              className="img-fluid icon-list"
                              alt="save and publish"
                            />
                            Publish
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={onClickEdit}>
                          <img
                            src="/images/edit.svg"
                            className="img-fluid icon-list"
                            alt="edit"
                          />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={() => setShowDeleteModelVersionModal(true)}
                        >
                          <img
                            src="/images/trash.svg"
                            className="img-fluid icon-list"
                            alt="discard"
                          />
                          Delete
                        </Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item onClick={() => setShowArchiveModal(true)}>
                        <img
                          src="/images/archive.svg"
                          className="img-fluid icon-list"
                          alt="archive"
                        />
                        Archive
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="archived-label">
                  <span>Archived version</span>
                </div>
              ))}
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Download</Tooltip>}
              trigger={["hover", "focus"]}
            >
              <Button className="save-icon" onClick={() => onClickDownload()}>
                <img
                  src="/images/download.svg"
                  className="img-fluid save-icon"
                  alt="download"
                />
              </Button>
            </OverlayTrigger>
          </div>
        </div>
        <Tabs
          defaultActiveKey="model-overview"
          id="model-tabs"
          className="mb-3"
        >
          <Tab eventKey="model-overview" tabClassName="tabs" title="Overview">
            {currentModelVersion.model && (
              <Overview
                modelProfileID={modelProfileID}
                modelFile={modelFile}
                modelNumber={modelNumber}
                modelVersionName={modelVersionName}
                modelVersionDescription={modelVersionDescription}
                modelDateCreated={modelDateCreated}
                modelAuthor={modelAuthor}
                modelContact={modelContact}
              />
            )}
          </Tab>
          <Tab eventKey="model-details" tabClassName="tabs" title="Details">
            {currentModelVersion.model_details && (
              <Details
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
              />
            )}
          </Tab>
          <Tab
            eventKey="model-intended-use"
            tabClassName="tabs"
            title="Intended use"
          >
            {currentModelVersion.intended_use && (
              <IntendedUse
                modelPrimaryIntendedUses={modelPrimaryIntendedUses}
                modelPrimaryIntendedUsers={modelPrimaryIntendedUsers}
                modelOutOfScopeUseCases={modelOutOfScopeUseCases}
              />
            )}
          </Tab>
          <Tab eventKey="model-factors" tabClassName="tabs" title="Factors">
            {currentModelVersion.factor && (
              <Factors
                modelGroups={modelGroups}
                modelInstrumentation={modelInstrumentation}
                modelEnvironment={modelEnvironment}
              />
            )}
          </Tab>
          <Tab eventKey="model-metrics" tabClassName="tabs" title="Metrics">
            {currentModelVersion.metric && (
              <Metrics
                modelPerformanceMeasures={modelPerformanceMeasures}
                modelDecisionThresholds={modelDecisionThresholds}
                modelApproachesToUncertainty={modelApproachesToUncertainty}
              />
            )}
          </Tab>
          <Tab eventKey="model-datasets" tabClassName="tabs" title="Datasets">
            {currentModelVersion.dataset && (
              <Datasets
                modelTrainingDataset={modelTrainingDataset}
                modelTrainingMotivation={modelTrainingMotivation}
                modelTrainingPreprocessing={modelTrainingPreprocessing}
                modelEvaluationDataset={modelEvaluationDataset}
                modelEvaluationMotivation={modelEvaluationMotivation}
                modelEvaluationPreprocessing={modelEvaluationPreprocessing}
              />
            )}
          </Tab>
          <Tab eventKey="model-analyses" tabClassName="tabs" title="Analyses">
            {currentModelVersion.analysis && (
              <Analyses
                modelUnitaryResults={modelUnitaryResults}
                modelIntersectionalResults={modelIntersectionalResults}
              />
            )}
          </Tab>
          <Tab
            eventKey="model-considerations-and-biases"
            tabClassName="tabs"
            title="Considerations and Biases"
          >
            {currentModelVersion.ethical_consideration && (
              <ConsiderationsAndBiases
                modelData={modelData}
                modelHumanLife={modelHumanLife}
                modelMitigations={modelMitigations}
                modelRisksAndHarms={modelRisksAndHarms}
                modelUseCases={modelUseCases}
              />
            )}
          </Tab>
          <Tab
            eventKey="model-recommendations"
            tabClassName="tabs"
            title="Recommendations"
          >
            {currentModelVersion.recommendation && (
              <Recommendations modelDetails={modelDetails} />
            )}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default ViewModelVersion;
