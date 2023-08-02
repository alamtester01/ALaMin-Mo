import { useEffect, useState, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Details component
 * @module components/models/sections/Details
 */

/**
 * Details component
 * @method Details
 *
 * @return {JSX.Element}
 *
 */
const Details = (props) => {
  const [
    toolbarHiddenModelCitationDetails,
    setToolbarHiddenModelCitationDetails,
  ] = useState(true);
  const [
    isToolbarClickedModelCitationDetails,
    setIsToolbarClickedModelCitationDetails,
  ] = useState(false);

  const [toolbarHiddenModelLicense, setToolbarHiddenModelLicense] =
    useState(true);
  const [isToolbarClickedModelLicense, setIsToolbarClickedModelLicense] =
    useState(false);

  const [
    toolbarHiddenModelOtherRelevantInfo,
    setToolbarHiddenModelOtherRelevantInfo,
  ] = useState(true);
  const [
    isToolbarClickedModelOtherRelevantInfo,
    setIsToolbarClickedModelOtherRelevantInfo,
  ] = useState(false);

  const onChangeModelDevelopmentDate = (e) => {
    const value = e.target.value;
    props?.setModelDevelopmentDate(value);
    props?.validate("modelDevelopmentDate", value);
  };

  const onChangeModelDevelopers = (e) => {
    const value = e.target.value;
    props?.setModelDevelopers(value);
    props?.validate("modelDevelopers", value);
  };

  const onChangeModelAccuracy = (e) => {
    const value = e.target.value;
    props?.setModelAccuracy(value);
    props?.validate("modelAccuracy", value);
  };

  const onChangeModelInput = (e) => {
    const value = e.target.value;
    props?.setModelInput(value);
    props?.validate("modelInput", value);
  };

  const onChangeModelOutput = (e) => {
    const value = e.target.value;
    props?.setModelOutput(value);
    props?.validate("modelOutput", value);
  };

  const onChangeModelType = (e) => {
    const value = e.target.value;
    props?.setModelType(value);
    props?.validate("modelType", value);
  };

  const onChangeModelPaper = (e) => {
    const value = e.target.value;
    props?.setModelPaper(value);
    props?.validate("modelPaper", value);
  };

  const onChangeModelCitationDetails = (e) => {
    props?.setModelCitationDetails(e);
    props?.validate("modelCitationDetails", e);
  };

  const onChangeModelLicense = (e) => {
    props?.setModelLicense(e);
    props?.validate("modelLicense", e);
  };

  const onChangeModelOtherRelevantInfo = (e) => {
    props?.setModelOtherRelevantInfo(e);
    props?.validate("modelOtherRelevantInfo", e);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurModelCitationDetails = () => {
    if (!isToolbarClickedModelCitationDetails) {
      setToolbarHiddenModelCitationDetails(true);
    }
  };

  const handleMouseDownModelCitationDetails = () => {
    setIsToolbarClickedModelCitationDetails(true);
  };

  const handleMouseUpModelCitationDetails = () => {
    setIsToolbarClickedModelCitationDetails(false);
  };

  const onFocusModelCitationDetails = () => {
    setToolbarHiddenModelCitationDetails(false);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurModelLicense = () => {
    if (!isToolbarClickedModelLicense) {
      setToolbarHiddenModelLicense(true);
    }
  };

  const handleMouseDownModelLicense = () => {
    setIsToolbarClickedModelLicense(true);
  };

  const handleMouseUpModelLicense = () => {
    setIsToolbarClickedModelLicense(false);
  };

  const onFocusModelLicense = () => {
    setToolbarHiddenModelLicense(false);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurModelOtherRelevantInfo = () => {
    if (!isToolbarClickedModelOtherRelevantInfo) {
      setToolbarHiddenModelOtherRelevantInfo(true);
    }
  };

  const handleMouseDownModelOtherRelevantInfo = () => {
    setIsToolbarClickedModelOtherRelevantInfo(true);
  };

  const handleMouseUpModelOtherRelevantInfo = () => {
    setIsToolbarClickedModelOtherRelevantInfo(false);
  };

  const onFocusModelOtherRelevantInfo = () => {
    setToolbarHiddenModelOtherRelevantInfo(false);
  };

  useEffect(() => {
    setToolbarHiddenModelCitationDetails(true);
    setToolbarHiddenModelLicense(true);
    setToolbarHiddenModelOtherRelevantInfo(true);
  }, [])

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Version details</p>
      <p>Provide more information about this version.</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Development date
          </Form.Label>
          <Form.Control
            type="date"
            value={props?.modelDevelopmentDate}
            onChange={onChangeModelDevelopmentDate}
            className={`form-control ${
              props?.isValid?.modelDevelopmentDate
                ? "is-valid"
                : props?.isValid.modelDevelopmentDate !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelDevelopmentDate")}
          <span className="note">
            The date when the model was finalized in its development.
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Developers
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelDevelopers}
            onChange={onChangeModelDevelopers}
            className={`form-control ${
              props?.isValid?.modelDevelopers
                ? "is-valid"
                : props?.isValid.modelDevelopers !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelDevelopers")}
          <span className="note">
            Indicate the people who were involved in the development of the
            model.
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Accuracy</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelAccuracy}
            onChange={onChangeModelAccuracy}
            className={`form-control ${
              props?.isValid?.modelAccuracy
                ? "is-valid"
                : props?.isValid.modelAccuracy !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelAccuracy")}
          <span className="note">Provide the accuracy of the model.</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Input</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelInput}
            onChange={onChangeModelInput}
            className={`form-control ${
              props?.isValid?.modelInput
                ? "is-valid"
                : props?.isValid.modelInput !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelInput")}
          <span className="note">Describe the model's expected input.</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Output</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelOutput}
            onChange={onChangeModelOutput}
            className={`form-control ${
              props?.isValid?.modelOutput
                ? "is-valid"
                : props?.isValid.modelOutput !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelOutput")}
          <span className="note">Describe the model's expected output.</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Type</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelType}
            onChange={onChangeModelType}
            className={`form-control ${
              props?.isValid?.modelType
                ? "is-valid"
                : props?.isValid.modelType !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelType")}
          <span className="note">
            Describe the type of the model. (Ex. Random Forest classifier, Naive
            Bayes classifier, Support Vector Machine classifier, etc...)
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Paper or Other resource for information
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelPaper}
            onChange={onChangeModelPaper}
            className={`form-control ${
              props?.isValid?.modelPaper
                ? "is-valid"
                : props?.isValid.modelPaper !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelPaper")}
          <span className="note">
            Optional. Cite other resource for information.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownModelCitationDetails}
          onMouseUp={handleMouseUpModelCitationDetails}
          onBlur={onBlurModelCitationDetails}
          onFocus={onFocusModelCitationDetails}
        >
          <Form.Label className="required-field semi-bold">
            Citation details
          </Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelCitationDetails}
            onChange={onChangeModelCitationDetails}
            className={`input-description form-control ${
              props?.isValid?.modelCitationDetails
                ? "is-valid"
                : props?.isValid.modelCitationDetails !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenModelCitationDetails === true
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelCitationDetails")}
          <span className="note">
            Provide information on how to cite the model.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownModelLicense}
          onMouseUp={handleMouseUpModelLicense}
          onBlur={onBlurModelLicense}
          onFocus={onFocusModelLicense}
        >
          <Form.Label className="required-field semi-bold">License</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelLicense}
            onChange={onChangeModelLicense}
            className={`input-description form-control ${
              props?.isValid?.modelLicense
                ? "is-valid"
                : props?.isValid.modelLicense !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenModelLicense === true
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelLicense")}
          <span className="note">
            Provide details of the license assigned to the model.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownModelOtherRelevantInfo}
          onMouseUp={handleMouseUpModelOtherRelevantInfo}
          onBlur={onBlurModelOtherRelevantInfo}
          onFocus={onFocusModelOtherRelevantInfo}
        >
          <Form.Label className="semi-bold">
            Other relevant information
          </Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelOtherRelevantInfo}
            onChange={onChangeModelOtherRelevantInfo}
            className={`input-description form-control ${
              props?.isValid?.modelOtherRelevantInfo
                ? "is-valid"
                : props?.isValid.modelOtherRelevantInfo !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenModelOtherRelevantInfo === true
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelOtherRelevantInfo")}
          <span className="note">
            Optional. Cite other relevant information.
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Details;
