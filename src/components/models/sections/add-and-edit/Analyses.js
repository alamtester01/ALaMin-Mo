import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Analyses component
 * @module components/models/sections/Analyses
 */

/**
 * Analyses component
 * @method Analyses
 *
 * @return {JSX.Element}
 *
 */
const Analyses = (props) => {
  const [toolbarHiddenUnitaryResults, setToolbarHiddenUnitaryResults] =
    useState(true);
  const [isToolbarClickedUnitaryResults, setIsToolbarClickedUnitaryResults] =
    useState(false);
  const [
    toolbarHiddenIntersectionalResults,
    setToolbarHiddenIntersectionalResults,
  ] = useState(true);
  const [
    isToolbarClickedIntersectionalResults,
    setIsToolbarClickedIntersectionalResults,
  ] = useState(false);

  const onChangeModelUnitaryResults = (e) => {
    props?.setModelUnitaryResults(e);
    props?.validate("modelUnitaryResults", e);
  };

  const onChangeModelIntersectionalResults = (e) => {
    props?.setModelIntersectionalResults(e);
    props?.validate("modelIntersectionalResults", e);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurUnitaryResults = () => {
    if (!isToolbarClickedUnitaryResults) {
      setToolbarHiddenUnitaryResults(true);
    }
  };

  const handleMouseDownUnitaryResults = () => {
    setIsToolbarClickedUnitaryResults(true);
  };

  const handleMouseUpUnitaryResults = () => {
    setIsToolbarClickedUnitaryResults(false);
  };

  const onFocusUnitaryResults = () => {
    setToolbarHiddenUnitaryResults(false);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurIntersectionalResults = () => {
    if (!isToolbarClickedIntersectionalResults) {
      setToolbarHiddenIntersectionalResults(true);
    }
  };

  const handleMouseDownIntersectionalResults = () => {
    setIsToolbarClickedIntersectionalResults(true);
  };

  const handleMouseUpIntersectionalResults = () => {
    setIsToolbarClickedIntersectionalResults(false);
  };

  const onFocusIntersectionalResults = () => {
    setToolbarHiddenIntersectionalResults(false);
  };

  useEffect(() => {
    setToolbarHiddenUnitaryResults(true);
    setToolbarHiddenIntersectionalResults(true);
  }, []);

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Quantitative Analyses</p>
      <p>
        Provide information on some quantitative analyses that were applied to
        this version of the model. Disaggregate the analyses into the chosen
        factors on which the model is evaluated. Provide results of evaluating
        the model according to the chosen performance metrics with confidence
        interval if possible. Demonstrate performance metric variation
      </p>
      <Form>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownUnitaryResults}
          onMouseUp={handleMouseUpUnitaryResults}
          onBlur={onBlurUnitaryResults}
          onFocus={onFocusUnitaryResults}
        >
          <Form.Label className="semi-bold">Unitary results</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelUnitaryResults}
            onChange={onChangeModelUnitaryResults}
            className={`input-description form-control ${
              props?.isValid?.modelUnitaryResults
                ? "is-valid"
                : props?.isValid.modelUnitaryResults !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenUnitaryResults
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelUnitaryResults")}
          <span className="note">
            Optional. How did the model perform with respect to each factor
            considered in model development?
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownIntersectionalResults}
          onMouseUp={handleMouseUpIntersectionalResults}
          onBlur={onBlurIntersectionalResults}
          onFocus={onFocusIntersectionalResults}
        >
          <Form.Label className="semi-bold">Intersectional results</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelIntersectionalResults}
            onChange={onChangeModelIntersectionalResults}
            className={`input-description form-control ${
              props?.isValid?.modelIntersectionalResults
                ? "is-valid"
                : props?.isValid.modelIntersectionalResults !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenIntersectionalResults
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelIntersectionalResults")}
          <span className="note">
            Optional. How did the model perform with respect to the intersection
            of the identified factors?
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Analyses;
