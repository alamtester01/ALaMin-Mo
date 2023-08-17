import { useState, useEffect } from "react";
import {
  Container,
  Tab,
  Breadcrumb,
  Tabs,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import validator from "validator";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModel } from "actions/model";
import Overview from "./sections/add-and-edit/Overview";
import Details from "./sections/add-and-edit/Details";
import IntendedUse from "./sections/add-and-edit/IntendedUse";
import Factors from "./sections/add-and-edit/Factors";
import Metrics from "./sections/add-and-edit/Metrics";
import Datasets from "./sections/add-and-edit/Datasets";
import Analyses from "./sections/add-and-edit/Analyses";
import ConsiderationsAndBiases from "./sections/add-and-edit/ConsiderationsAndBiases";
import Recommendations from "./sections/add-and-edit/Recommendations";
import SaveAndPublishModal from "components/models/SaveAndPublishModal";
import DiscardModal from "./DiscardModal";
import { SET_MESSAGE } from "actions/types";

/**
 * A module for showing Add Model Version component
 * @module components/models/AddModelVersion
 */

/**
 * Add Model Version component
 * @method AddModelVersion
 *
 * @return {JSX.Element}
 *
 */

const AddModelVersion = (props) => {
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
  const { currentModel } = useSelector((state) => state.model);

  const [modelName, setModelName] = useState("");
  const [showSaveAndPublishModal, setShowSaveAndPublishModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);

  const [saveDraftDisable, setSaveDraftDisable] = useState(true);
  const [saveAndPublishDisable, setSaveAndPublishDisable] = useState(true);
  const [discardDisable, setDiscardDisable] = useState(true);

  useEffect(() => {
    dispatch(getModel(id)).catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    setModelName(currentModel[0]?.model_profile_name);
  }, [currentModel]);

  /**
   * Gets the corresponding error message
   * @method getFormErrorMessage
   * @param {string} name - A string for the name of the input field
   *
   * @return {HTMLElement}
   */
  const getFormErrorMessage = (name, cName) => {
    return <div className={`invalid-feedback ` + cName}>{error[name]} </div>;
  };

  const handleSaveAndPublishModalClose = () => {
    setShowSaveAndPublishModal(false);
  };

  const handleDiscardModalClose = () => {
    setShowDiscardModal(false);
  };

  const [isValid, setIsValid] = useState({});
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
    resetForm();
  }, []);

  const resetForm = () => {
    props?.setSelectedFile("");
    props?.setModelNumber("");
    props?.setModelVersionName("");
    props?.setModelVersionDescription("<p><br></p>");
    props?.setModelAuthor("");
    props?.setModelContact("");
    props?.setModelDevelopmentDate("");
    props?.setModelDevelopers("");
    props?.setModelAccuracy("");
    props?.setModelInput("");
    props?.setModelOutput("");
    props?.setModelOutput("");
    props?.setModelType("");
    props?.setModelPaper("");
    props?.setModelCitationDetails("<p><br></p>");
    props?.setModelLicense("<p><br></p>");
    props?.setModelOtherRelevantInfo("<p><br></p>");
    props?.setModelPrimaryIntendedUses("");
    props?.setModelPrimaryIntendedUsers("");
    props?.setModelOutOfScopeUseCases("");
    props?.setModelGroups("<p><br></p>");
    props?.setModelInstrumentation("<p><br></p>");
    props?.setModelEnvironment("<p><br></p>");
    props?.setModelPerformanceMeasures("");
    props?.setModelDecisionThresholds("");
    props?.setModelApproachesToUncertainty("");
    props?.setModelTrainingDataset("");
    props?.setModelTrainingMotivation("");
    props?.setModelTrainingPreprocessing("");
    props?.setModelEvaluationDataset("");
    props?.setModelEvaluationMotivation("");
    props?.setModelEvaluationPreprocessing("");
    props?.setModelUnitaryResults("<p><br></p>");
    props?.setModelIntersectionalResults("<p><br></p>");
    props?.setModelData("");
    props?.setModelHumanLife("");
    props?.setModelMitigations("");
    props?.setModelRisksAndHarms("");
    props?.setModelUseCases("");
    props?.setModelDetails("<p><br></p>");
    setIsValid({});
    setError({});
  };

  useEffect(() => {
    if (
      props?.selectedFile !== "" ||
      props?.modelNumber !== "" ||
      props?.modelVersionName !== "" ||
      props?.modelVersionDescription !== "<p><br></p>" ||
      props?.modelAuthor !== "" ||
      props?.modelContact !== "" ||
      props?.modelDevelopmentDate !== "" ||
      props?.modelDevelopers !== "" ||
      props?.modelAccuracy !== "" ||
      props?.modelInput !== "" ||
      props?.modelOutput !== "" ||
      props?.modelType !== "" ||
      props?.modelPaper !== "" ||
      props?.modelCitationDetails !== "<p><br></p>" ||
      props?.modelLicense !== "<p><br></p>" ||
      props?.modelOtherRelevantInfo !== "<p><br></p>" ||
      props?.modelPrimaryIntendedUses !== "" ||
      props?.modelPrimaryIntendedUsers !== "" ||
      props?.modelOutOfScopeUseCases !== "" ||
      props?.modelGroups !== "<p><br></p>" ||
      props?.modelInstrumentation !== "<p><br></p>" ||
      props?.modelEnvironment !== "<p><br></p>" ||
      props?.modelPerformanceMeasures !== "" ||
      props?.modelDecisionThresholds !== "" ||
      props?.modelApproachesToUncertainty !== "" ||
      props?.modelTrainingDataset !== "" ||
      props?.modelTrainingMotivation !== "" ||
      props?.modelTrainingPreprocessing !== "" ||
      props?.modelEvaluationDataset !== "" ||
      props?.modelEvaluationMotivation !== "" ||
      props?.modelEvaluationPreprocessing !== "" ||
      props?.modelUnitaryResults !== "<p><br></p>" ||
      props?.modelIntersectionalResults !== "<p><br></p>" ||
      props?.modelData !== "" ||
      props?.modelHumanLife !== "" ||
      props?.modelMitigations !== "" ||
      props?.modelRisksAndHarms !== "" ||
      props?.modelUseCases !== "" ||
      props?.modelDetails !== "<p><br></p>"
    ) {
      setDiscardDisable(false);
      if (Object.keys(error).length > 0) {
        if (
          (error?.modelFile && props?.selectedFile !== "") ||
          (error?.modelNumber && props?.modelNumber !== "") ||
          (error?.modelVersionName && props?.modelVersionName !== "") ||
          (error?.modelVersionDescription &&
            props?.modelVersionDescription !== "") ||
          (error?.modelAuthor && props?.modelAuthor !== "") ||
          (error?.modelContact && props?.modelContact !== "") ||
          (error?.modelDevelopmentDate && props?.modelDevelopmentDate !== "") ||
          (error?.modelDevelopers && props?.modelDevelopers !== "") ||
          (error?.modelAccuracy && props?.modelAccuracy !== "") ||
          (error?.modelInput && props?.modelInput !== "") ||
          (error?.modelOutput && props?.modelOutput !== "") ||
          (error?.modelType && props?.modelType !== "") ||
          (error?.modelPaper && props?.modelPaper !== "") ||
          (error?.modelCitationDetails && props?.modelCitationDetails !== "") ||
          (error?.modelLicense && props?.modelLicense !== "") ||
          (error?.modelOtherRelevantInfo &&
            props?.modelOtherRelevantInfo !== "") ||
          (error?.modelPrimaryIntendedUses &&
            props?.modelPrimaryIntendedUses !== "") ||
          (error?.modelPrimaryIntendedUsers &&
            props?.modelPrimaryIntendedUsers !== "") ||
          (error?.modelOutOfScopeUseCases &&
            props?.modelOutOfScopeUseCases !== "") ||
          (error?.modelGroups && props?.modelGroups !== "") ||
          (error?.modelInstrumentation && props?.modelInstrumentation !== "") ||
          (error?.modelEnvironment && props?.modelEnvironment !== "") ||
          (error?.modelPerformanceMeasures &&
            props?.modelPerformanceMeasures !== "") ||
          (error?.modelDecisionThresholds &&
            props?.modelDecisionThresholds !== "") ||
          (error?.modelApproachesToUncertainty &&
            props?.modelApproachesToUncertainty !== "") ||
          (error?.modelTrainingDataset && props?.modelTrainingDataset !== "") ||
          (error?.modelTrainingMotivation &&
            props?.modelTrainingMotivation !== "") ||
          (error?.modelTrainingPreprocessing &&
            props?.modelTrainingPreprocessing !== "") ||
          (error?.modelEvaluationDataset &&
            props?.modelEvaluationDataset !== "") ||
          (error?.modelEvaluationMotivation &&
            props?.modelEvaluationMotivation !== "") ||
          (error?.modelEvaluationPreprocessing &&
            props?.modelEvaluationPreprocessing !== "") ||
          (error?.modelUnitaryResults && props?.modelUnitaryResults !== "") ||
          (error?.modelIntersectionalResults &&
            props?.modelIntersectionalResults !== "") ||
          (error?.modelData && props?.modelData !== "") ||
          (error?.modelHumanLife && props?.modelHumanLife !== "") ||
          (error?.modelMitigations && props?.modelMitigations !== "") ||
          (error?.modelRisksAndHarms && props?.modelRisksAndHarms !== "") ||
          (error?.modelUseCases && props?.modelUseCases !== "") ||
          (error?.modelDetails && props?.modelDetails !== "")
        ) {
          setSaveDraftDisable(true);
        } else {
          setSaveDraftDisable(false);
        }
      } else {
        setSaveDraftDisable(false);
      }
    } else {
      setSaveDraftDisable(true);
    }

    if (
      Object.keys(error).length === 0 &&
      props?.selectedFile !== "" &&
      props?.modelNumber !== "" &&
      props?.modelVersionName !== "" &&
      props?.modelVersionDescription !== "<p><br></p>" &&
      props?.modelAuthor !== "" &&
      props?.modelContact !== "" &&
      props?.modelDevelopmentDate !== "" &&
      props?.modelDevelopers !== "" &&
      props?.modelAccuracy !== "" &&
      props?.modelInput !== "" &&
      props?.modelOutput !== "" &&
      props?.modelType !== "" &&
      props?.modelCitationDetails !== "<p><br></p>" &&
      props?.modelLicense !== "<p><br></p>" &&
      props?.modelPrimaryIntendedUses !== "" &&
      props?.modelPrimaryIntendedUsers !== "" &&
      props?.modelOutOfScopeUseCases !== "" &&
      props?.modelInstrumentation !== "<p><br></p>" &&
      props?.modelEnvironment !== "<p><br></p>" &&
      props?.modelPerformanceMeasures !== "" &&
      props?.modelDecisionThresholds !== "" &&
      props?.modelApproachesToUncertainty !== "" &&
      props?.modelTrainingDataset !== "" &&
      props?.modelTrainingMotivation !== "" &&
      props?.modelTrainingPreprocessing !== "" &&
      props?.modelEvaluationDataset !== "" &&
      props?.modelEvaluationMotivation !== "" &&
      props?.modelEvaluationPreprocessing !== "" &&
      props?.modelData !== "" &&
      props?.modelHumanLife !== "" &&
      props?.modelMitigations !== "" &&
      props?.modelRisksAndHarms !== "" &&
      props?.modelUseCases !== ""
    ) {
      setSaveAndPublishDisable(false);
    } else {
      setSaveAndPublishDisable(true);
    }
  }, [props]);

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
        console.log(extensionName);
        if (
          (extensionName !== "h5" &&
            extensionName !== "hdf5" &&
            extensionName !== "he5" &&
            extensionName !== "pb" &&
            extensionName !== "pt" &&
            extensionName !== "safetensors") ||
          value === ""
        ) {
          setCounter(counter + 1);
          setIsValid(Object.assign(isValid, { [name]: false }));
          setError(
            Object.assign(error, {
              [name]:
                "Supported formats (.h5, .hdf5, .he5, .pb, .pt, .safetensors).",
            })
          );
          props?.setSelectedFile("");
          return;
        }
        break;
      case "modelNumber":
        setIsValid(Object.assign(isValid, { [name]: false }));
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
        setIsValid(Object.assign(isValid, { [name]: false }));
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
        setIsValid(Object.assign(isValid, { [name]: false }));
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
        setIsValid(Object.assign(isValid, { [name]: false }));
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
          setIsValid(Object.assign(isValid, { [name]: false }));
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
        setIsValid(Object.assign(isValid, { [name]: false }));
        if (!accuracyRegex.test(value)) {
          setError(
            Object.assign(error, {
              [name]: "Accepts 0-9, space, period and special character like %",
            })
          );
          return;
        }
        break;
      case "modelPaper":
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
        setIsValid(Object.assign(isValid, { [name]: false }));
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
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  const validateAll = () => {
    setCounter(counter + 1);
    validate("modelNumber", props?.modelNumber);
    validate("modelVersionName", props?.modelVersionName);
    validate("modelVersionDescription", props?.modelVersionDescription);
    validate("modelAuthor", props?.modelAuthor);
    validate("modelContact", props?.modelContact);
    validate("modelFile", props?.selectedFile.name);
    validate("modelDevelopmentDate", props?.modelDevelopmentDate);
    validate("modelDevelopers", props?.modelDevelopers);
    validate("modelAccuracy", props?.modelAccuracy);
    validate("modelInput", props?.modelInput);
    validate("modelOutput", props?.modelOutput);
    validate("modelType", props?.modelType);
    validate("modelPaper", props?.modelPaper);
    validate("modelCitationDetails", props?.modelCitationDetails);
    validate("modelLicense", props?.modelLicense);
    validate("modelOtherRelevantInfo", props?.modelOtherRelevantInfo);
    validate("modelPrimaryIntendedUses", props?.modelPrimaryIntendedUses);
    validate("modelPrimaryIntendedUsers", props?.modelPrimaryIntendedUsers);
    validate("modelOutOfScopeUseCases", props?.modelOutOfScopeUseCases);
    validate("modelGroups", props?.modelGroups);
    validate("modelInstrumentation", props?.modelInstrumentation);
    validate("modelEnvironment", props?.modelEnvironment);
    validate("modelPerformanceMeasures", props?.modelPerformanceMeasures);
    validate("modelDecisionThresholds", props?.modelDecisionThresholds);
    validate(
      "modelApproachesToUncertainty",
      props?.modelApproachesToUncertainty
    );
    validate("modelTrainingDataset", props?.modelTrainingDataset);
    validate("modelTrainingMotivation", props?.modelTrainingMotivation);
    validate("modelTrainingPreprocessing", props?.modelTrainingPreprocessing);
    validate("modelEvaluationDataset", props?.modelEvaluationDataset);
    validate("modelEvaluationMotivation", props?.modelEvaluationMotivation);
    validate(
      "modelEvaluationPreprocessing",
      props?.modelEvaluationPreprocessing
    );
    validate("modelUnitaryResults", props?.modelUnitaryResults);
    validate("modelIntersectionalResults", props?.modelIntersectionalResults);
    validate("modelData", props?.modelData);
    validate("modelHumanLife", props?.modelHumanLife);
    validate("modelMitigations", props?.modelMitigations);
    validate("modelRisksAndHarms", props?.modelRisksAndHarms);
    validate("modelUseCases", props?.modelUseCases);
    validate("modelDetails", props?.modelDetails);
  };

  const onClickSave = (isPublish) => {
    if (isPublish) {
      validateAll();
      if (Object.keys(error).length === 0) {
        props?.handleUploadFile(true);
      }
    } else {
      if (
        props?.selectedFile !== "" ||
        props?.modelNumber !== "" ||
        props?.modelVersionName !== "" ||
        props?.modelVersionDescription !== "<p><br></p>" ||
        props?.modelAuthor !== "" ||
        props?.modelContact !== "" ||
        props?.modelDevelopmentDate !== "" ||
        props?.modelDevelopers !== "" ||
        props?.modelAccuracy !== "" ||
        props?.modelInput !== "" ||
        props?.modelOutput !== "" ||
        props?.modelOutput !== "" ||
        props?.modelType !== "" ||
        props?.modelPaper !== "" ||
        props?.modelCitationDetails !== "<p><br></p>" ||
        props?.modelLicense !== "<p><br></p>" ||
        props?.modelOtherRelevantInfo !== "<p><br></p>" ||
        props?.modelPrimaryIntendedUses !== "" ||
        props?.modelPrimaryIntendedUsers !== "" ||
        props?.modelOutOfScopeUseCases !== "" ||
        props?.modelGroups !== "<p><br></p>" ||
        props?.modelInstrumentation !== "<p><br></p>" ||
        props?.modelEnvironment !== "<p><br></p>" ||
        props?.modelPerformanceMeasures !== "" ||
        props?.modelDecisionThresholds !== "" ||
        props?.modelApproachesToUncertainty !== "" ||
        props?.modelTrainingDataset !== "" ||
        props?.modelTrainingMotivation !== "" ||
        props?.modelTrainingPreprocessing !== "" ||
        props?.modelEvaluationDataset !== "" ||
        props?.modelEvaluationMotivation !== "" ||
        props?.modelEvaluationPreprocessing !== "" ||
        props?.modelUnitaryResults !== "<p><br></p>" ||
        props?.modelIntersectionalResults !== "<p><br></p>" ||
        props?.modelData !== "" ||
        props?.modelHumanLife !== "" ||
        props?.modelMitigations !== "" ||
        props?.modelRisksAndHarms !== "" ||
        props?.modelUseCases !== "" ||
        props?.modelDetails !== "<p><br></p>"
      ) {
        props?.handleSaveDraft();
      }
    }
  };

  const onClickDiscard = () => {
    navigate("/models/view/" + id + "?tab=2");
    dispatch({
      type: SET_MESSAGE,
      payload: "Version discarded.",
    });
    props?.setShowToast(true);
    props?.setToastStatus("error");
    props?.setToastImage("/images/remove-success.svg");
  };

  return (
    <>
      <SaveAndPublishModal
        showSaveAndPublishModal={showSaveAndPublishModal}
        handleSaveAndPublishModalClose={handleSaveAndPublishModalClose}
        onClickSave={onClickSave}
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
            linkProps={{ to: `/models/view/${id}` }}
          >
            {modelName}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-between">
          <p className="title">Add Version</p>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Save as draft</Tooltip>}
              trigger={["hover", "focus"]}
            >
              <Button
                disabled={saveDraftDisable}
                className="save-icon"
                onClick={() => onClickSave(false)}
              >
                <img
                  src="/images/save_draft.svg"
                  className="img-fluid save-icon"
                  alt="save as draft"
                />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Save and publish</Tooltip>}
              trigger={["hover", "focus"]}
            >
              <Button
                disabled={saveAndPublishDisable}
                className="save-icon"
                onClick={() => setShowSaveAndPublishModal(true)}
              >
                <img
                  src="/images/save_publish.svg"
                  className="img-fluid"
                  alt="save and publish"
                />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Discard</Tooltip>}
              trigger={["hover", "focus"]}
            >
              <Button
                disabled={discardDisable}
                className="save-icon"
                onClick={() => setShowDiscardModal(true)}
              >
                <img
                  src="/images/trash.svg"
                  className="img-fluid"
                  alt="discard"
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
            <Overview
              selectedFile={props?.selectedFile}
              setSelectedFile={props?.setSelectedFile}
              error={error}
              modelNumber={props?.modelNumber}
              modelVersionName={props?.modelVersionName}
              modelVersionDescription={props?.modelVersionDescription}
              modelAuthor={props?.modelAuthor}
              modelContact={props?.modelContact}
              setModelNumber={props?.setModelNumber}
              setModelVersionName={props?.setModelVersionName}
              setModelVersionDescription={props?.setModelVersionDescription}
              setModelAuthor={props?.setModelAuthor}
              setModelContact={props?.setModelContact}
              getFormErrorMessage={getFormErrorMessage}
              validate={validate}
              isValid={isValid}
              setIsValid={setIsValid}
            />
          </Tab>
          <Tab eventKey="model-details" tabClassName="tabs" title="Details">
            <Details
              error={error}
              modelDevelopmentDate={props?.modelDevelopmentDate}
              modelDevelopers={props?.modelDevelopers}
              modelAccuracy={props?.modelAccuracy}
              modelInput={props?.modelInput}
              modelOutput={props?.modelOutput}
              modelType={props?.modelType}
              modelPaper={props?.modelPaper}
              modelCitationDetails={props?.modelCitationDetails}
              modelLicense={props?.modelLicense}
              modelOtherRelevantInfo={props?.modelOtherRelevantInfo}
              setModelDevelopmentDate={props?.setModelDevelopmentDate}
              setModelDevelopers={props?.setModelDevelopers}
              setModelAccuracy={props?.setModelAccuracy}
              setModelInput={props?.setModelInput}
              setModelOutput={props?.setModelOutput}
              setModelType={props?.setModelType}
              setModelPaper={props?.setModelPaper}
              setModelCitationDetails={props?.setModelCitationDetails}
              setModelLicense={props?.setModelLicense}
              setModelOtherRelevantInfo={props?.setModelOtherRelevantInfo}
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab
            eventKey="model-intended-use"
            tabClassName="tabs"
            title="Intended use"
          >
            <IntendedUse
              error={error}
              modelPrimaryIntendedUses={props?.modelPrimaryIntendedUses}
              modelPrimaryIntendedUsers={props?.modelPrimaryIntendedUsers}
              modelOutOfScopeUseCases={props?.modelOutOfScopeUseCases}
              setModelPrimaryIntendedUses={props?.setModelPrimaryIntendedUses}
              setModelPrimaryIntendedUsers={props?.setModelPrimaryIntendedUsers}
              setModelOutOfScopeUseCases={props?.setModelOutOfScopeUseCases}
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab eventKey="model-factors" tabClassName="tabs" title="Factors">
            <Factors
              error={error}
              modelGroups={props?.modelGroups}
              modelInstrumentation={props?.modelInstrumentation}
              modelEnvironment={props?.modelEnvironment}
              setModelGroups={props?.setModelGroups}
              setModelInstrumentation={props?.setModelInstrumentation}
              setModelEnvironment={props?.setModelEnvironment}
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab eventKey="model-metrics" tabClassName="tabs" title="Metrics">
            <Metrics
              error={error}
              modelPerformanceMeasures={props?.modelPerformanceMeasures}
              modelDecisionThresholds={props?.modelDecisionThresholds}
              modelApproachesToUncertainty={props?.modelApproachesToUncertainty}
              setModelPerformanceMeasures={props?.setModelPerformanceMeasures}
              setModelDecisionThresholds={props?.setModelDecisionThresholds}
              setModelApproachesToUncertainty={
                props?.setModelApproachesToUncertainty
              }
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab eventKey="model-datasets" tabClassName="tabs" title="Datasets">
            <Datasets
              error={error}
              modelTrainingDataset={props?.modelTrainingDataset}
              modelTrainingMotivation={props?.modelTrainingMotivation}
              modelTrainingPreprocessing={props?.modelTrainingPreprocessing}
              modelEvaluationDataset={props?.modelEvaluationDataset}
              modelEvaluationMotivation={props?.modelEvaluationMotivation}
              modelEvaluationPreprocessing={props?.modelEvaluationPreprocessing}
              setModelTrainingDataset={props?.setModelTrainingDataset}
              setModelTrainingMotivation={props?.setModelTrainingMotivation}
              setModelTrainingPreprocessing={
                props?.setModelTrainingPreprocessing
              }
              setModelEvaluationDataset={props?.setModelEvaluationDataset}
              setModelEvaluationMotivation={props?.setModelEvaluationMotivation}
              setModelEvaluationPreprocessing={
                props?.setModelEvaluationPreprocessing
              }
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab eventKey="model-analyses" tabClassName="tabs" title="Analyses">
            <Analyses
              error={error}
              modelUnitaryResults={props?.modelUnitaryResults}
              modelIntersectionalResults={props?.modelIntersectionalResults}
              setModelUnitaryResults={props?.setModelUnitaryResults}
              setModelIntersectionalResults={
                props?.setModelIntersectionalResults
              }
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab
            eventKey="model-considerations-and-biases"
            tabClassName="tabs"
            title="Considerations and Biases"
          >
            <ConsiderationsAndBiases
              error={error}
              modelData={props?.modelData}
              modelHumanLife={props?.modelHumanLife}
              modelMitigations={props?.modelMitigations}
              modelRisksAndHarms={props?.modelRisksAndHarms}
              modelUseCases={props?.modelUseCases}
              setModelData={props?.setModelData}
              setModelHumanLife={props?.setModelHumanLife}
              setModelMitigations={props?.setModelMitigations}
              setModelRisksAndHarms={props?.setModelRisksAndHarms}
              setModelUseCases={props?.setModelUseCases}
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
          <Tab
            eventKey="model-recommendations"
            tabClassName="tabs"
            title="Recommendations"
          >
            <Recommendations
              error={error}
              modelDetails={props?.modelDetails}
              setModelDetails={props?.setModelDetails}
              getFormErrorMessage={getFormErrorMessage}
              isValid={isValid}
              validate={validate}
            />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default AddModelVersion;
