import { useEffect, useState, useRef } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Overview component
 * @module components/models/sections/Overview
 */

/**
 * Overview component
 * @method Overview
 *
 * @return {JSX.Element}
 *
 */
const Overview = (props) => {
  import("../../../../styles/Overview.css");
  const [toolbarHidden, setToolbarHidden] = useState(true);
  const [isToolbarClicked, setIsToolbarClicked] = useState(false);

  const onChangeModelNumber = (e) => {
    const value = e.target.value;
    props?.setModelNumber(value);
    props?.validate("modelNumber", value);
  };

  const onChangeModelVersionName = (e) => {
    const value = e.target.value;
    props?.setModelVersionName(value);
    props?.validate("modelVersionName", value);
  };

  const onChangeModelVersionDescription = (e) => {
    props?.setModelVersionDescription(e);
    props?.validate("modelVersionDescription", e);
  };

  const onChangeModelAuthor = (e) => {
    const value = e.target.value;
    props?.setModelAuthor(value);
    props?.validate("modelAuthor", value);
  };

  const onChangeModelContact = (e) => {
    const value = e.target.value;
    props?.setModelContact(value);
    props?.validate("modelContact", value);
  };
  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlur = () => {
    if (!isToolbarClicked) {
      setToolbarHidden(true);
    }
  };

  const handleMouseDown = () => {
    setIsToolbarClicked(true);
  };

  const handleMouseUp = () => {
    setIsToolbarClicked(false);
  };

  const onFocus = () => {
    setToolbarHidden(false);
  };

  /***********************************/
  /***********************************/
  /***********************************/

  // const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    props?.setSelectedFile(event.target.files[0]);
    props?.validate("modelFile", event.target.files[0]?.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    props?.setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setToolbarHidden(true);
  }, []);

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Overview</p>
      <p>Provide basic information about this version.</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Name</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={props?.modelNumber}
              onChange={onChangeModelNumber}
              className={`${
                props?.isValid?.modelNumber
                  ? "is-valid"
                  : props?.isValid.modelNumber !== undefined
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Number"
            />
            <Form.Control
              type="text"
              value={props?.modelVersionName}
              onChange={onChangeModelVersionName}
              className={`${
                props?.isValid?.modelVersionName
                  ? "is-valid"
                  : props?.isValid.modelVersionName !== undefined
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Name"
            />
          </InputGroup>
          <span className="d-flex justify-content-between">
            {props?.getFormErrorMessage("modelNumber", "d-block")}
            {props?.getFormErrorMessage("modelVersionName", "d-block")}
          </span>
          <span className="note">
            Assign a number and a name to your version.
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 group-div"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <Form.Label className="required-field semi-bold">
            Description
          </Form.Label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={props?.modelVersionDescription}
            onChange={onChangeModelVersionDescription}
            className={`input-description form-control ${
              props?.isValid?.modelVersionDescription
                ? "is-valid"
                : props?.isValid.modelVersionDescription !== undefined
                ? "is-invalid"
                : ""
            } ${
              toolbarHidden
                ? "ql-editor-170 toolbar-hidden"
                : "ql-editor-100 toolbar-display"
            }`}
          />
          {props?.getFormErrorMessage("modelVersionDescription")}
          <span className="note">
            How does this version of the model differ from its earlier
            version/s?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Choose model file to be uploaded
          </Form.Label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`file-drop-area form-control ${
              props?.isValid?.modelFile
                ? "is-valid"
                : props?.isValid.modelFile !== undefined
                ? "is-invalid"
                : ""
            }`}
          >
            {props?.selectedFile || props?.modelFile ? (
              <p>{props?.selectedFile.name || props?.modelFile}</p>
            ) : (
              <p>Drag and drop files, or Browse</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".h5, .hdf5, .he5, .pb, .pt, .safetensors"
            />
          </div>
          {props?.getFormErrorMessage("modelFile")}
          <span className="note">Supported formats(.h5, .hdf5, .he5, .pb, .pt, .safetensors).</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Author</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelAuthor}
            onChange={onChangeModelAuthor}
            className={`form-control ${
              props?.isValid?.modelAuthor
                ? "is-valid"
                : props?.isValid.modelAuthor !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelAuthor")}
          <span className="note">Assign a user.</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Contact Information
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelContact}
            onChange={onChangeModelContact}
            className={`form-control ${
              props?.isValid?.modelContact
                ? "is-valid"
                : props?.isValid.modelContact !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelContact")}
          <span className="note">
            Provide a means of communication for the author. (Ex. email, social
            media, phone number, etc...)
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Overview;
