import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Recommendations component
 * @module components/models/sections/Recommendations
 */

/**
 * Recommendations component
 * @method Recommendations
 *
 * @return {JSX.Element}
 *
 */
const Recommendations = (props) => {
  const [toolbarHiddenDetails, setToolbarHiddenDetails] = useState(true);
  const [isToolbarClickedDetails, setIsToolbarClickedDetails] = useState(false);

  const onChangeModelDetails = (e) => {
    props?.setModelDetails(e);
    props?.validate("modelDetails", e);
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlurDetails = () => {
    if (!isToolbarClickedDetails) {
      setToolbarHiddenDetails(true);
    }
  };

  const handleMouseDownDetails = () => {
    setIsToolbarClickedDetails(true);
  };

  const handleMouseUpDetails = () => {
    setIsToolbarClickedDetails(false);
  };

  const onFocusDetails = () => {
    setToolbarHiddenDetails(false);
  };

  useEffect(() => {
    setToolbarHiddenDetails(true);
  }, []);

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Caveats and Recommendations</p>
      <p>
        List additional concerns that were not covered in the other sections.
      </p>
      <Form>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDownDetails}
          onMouseUp={handleMouseUpDetails}
          onBlur={onBlurDetails}
          onFocus={onFocusDetails}
        >
          <Form.Label className="semi-bold">Details</Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelDetails}
            onChange={onChangeModelDetails}
            className={`input-description form-control ${
              props?.isValid?.modelDetails
                ? "is-valid"
                : props?.isValid.modelDetails !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHiddenDetails
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelDetails")}
          <span className="note">Optional.</span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Recommendations;
