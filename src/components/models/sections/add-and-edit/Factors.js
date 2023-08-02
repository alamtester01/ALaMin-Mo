import { useEffect, useState, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Factors component
 * @module components/models/sections/Factors
 */

/**
 * Factors component
 * @method Factors
 *
 * @return {JSX.Element}
 *
 */
const Factors = (props) => {
  const [toolbarHiddenGroups, setToolbarHiddenGroups] = useState(true);
  const [isToolbarClickedGroups, setIsToolbarClickedGroups] = useState(false);
  const [toolbarHiddenInstrumentation, setToolbarHiddenInstrumentation] =
    useState(true);
  const [isToolbarClickedInstrumentation, setIsToolbarClickedInstrumentation] =
    useState(false);
  const [toolbarHiddenEnvironment, setToolbarHiddenEnvironment] =
    useState(true);
  const [isToolbarClickedEnvironment, setIsToolbarClickedEnvironment] =
    useState(false);

  const onChangeModelGroups = (e) => {
    props?.setModelGroups(e);
    props?.validate("modelGroups", e);
  };

  const onChangeModelInstrumentation = (e) => {
    props?.setModelInstrumentation(e);
    props?.validate("modelInstrumentation", e);
  };

  const onChangeModelEnvironment = (e) => {
    props?.setModelEnvironment(e);
    props?.validate("modelEnvironment", e);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurGroups = () => {
    if (!isToolbarClickedGroups) {
      setToolbarHiddenGroups(true);
    }
  };

  const handleMouseDownGroups = () => {
    setIsToolbarClickedGroups(true);
  };

  const handleMouseUpGroups = () => {
    setIsToolbarClickedGroups(false);
  };

  const onFocusGroups = () => {
    setToolbarHiddenGroups(false);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurInstrumentation = () => {
    if (!isToolbarClickedInstrumentation) {
      setToolbarHiddenInstrumentation(true);
    }
  };

  const handleMouseDownInstrumentation = () => {
    setIsToolbarClickedInstrumentation(true);
  };

  const handleMouseUpInstrumentation = () => {
    setIsToolbarClickedInstrumentation(false);
  };

  const onFocusInstrumentation = () => {
    setToolbarHiddenInstrumentation(false);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurEnvironment = () => {
    if (!isToolbarClickedEnvironment) {
      setToolbarHiddenEnvironment(true);
    }
  };

  const handleMouseDownEnvironment = () => {
    setIsToolbarClickedEnvironment(true);
  };

  const handleMouseUpEnvironment = () => {
    setIsToolbarClickedEnvironment(false);
  };

  const onFocusEnvironment = () => {
    setToolbarHiddenEnvironment(false);
  };

  useEffect(() => {
    setToolbarHiddenGroups(true);
    setToolbarHiddenInstrumentation(true);
    setToolbarHiddenEnvironment(true);
  }, []);

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Factors</p>
      <p>
        Describe the demographic or phenotypic groups, environmental conditions,
        technical attributes, and instrumentation conditions that were
        considered during model development.
      </p>
      <Form>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownGroups}
          onMouseUp={handleMouseUpGroups}
          onBlur={onBlurGroups}
          onFocus={onFocusGroups}
        >
          <Form.Label className=" semi-bold">Groups</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelGroups}
            onChange={onChangeModelGroups}
            className={`input-description form-control ${
              props?.isValid?.modelGroups
                ? "is-valid"
                : props?.isValid.modelGroups !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenGroups
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelGroups")}
          <span className="note">
            Optional. Cite distinct categories with similar characteristics that
            are present in the evaluation data instances.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownInstrumentation}
          onMouseUp={handleMouseUpInstrumentation}
          onBlur={onBlurInstrumentation}
          onFocus={onFocusInstrumentation}
        >
          <Form.Label className="required-field semi-bold">
            Instrumentation
          </Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelInstrumentation}
            onChange={onChangeModelInstrumentation}
            className={`input-description form-control ${
              props?.isValid?.modelInstrumentation
                ? "is-valid"
                : props?.isValid.modelInstrumentation !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenInstrumentation
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelInstrumentation")}
          <span className="note">
            Provide information about the instruments that were used to capture
            the training and evaluation datasets for model development.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownEnvironment}
          onMouseUp={handleMouseUpEnvironment}
          onBlur={onBlurEnvironment}
          onFocus={onFocusEnvironment}
        >
          <Form.Label className="required-field semi-bold">
            Environment
          </Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelEnvironment}
            onChange={onChangeModelEnvironment}
            className={`input-description form-control ${
              props?.isValid?.modelEnvironment
                ? "is-valid"
                : props?.isValid.modelEnvironment !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenEnvironment
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelEnvironment")}
          <span className="note">
            Provide information about the model’s performance with respect to
            the different environmental settings considered in the development
            of the model.
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Factors;
