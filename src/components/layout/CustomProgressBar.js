import React from "react";
import { ProgressBar, Toast, Button, ToastContainer } from "react-bootstrap";

const CustomProgressBar = (props) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast bg="light" onClose={props?.handleOnCloseProgressBar}>
        <Toast.Header closeButton>
          <strong className="me-auto">
            {props?.progressBarPercentage === 100
              ? props?.upload
                ? "Upload complete"
                : "Zip complete"
              : props?.cancelFileUpload
              ? props?.upload
                ? "Upload canceled"
                : "Zip canceled"
              : props?.upload
              ? "Uploading..."
              : "Zipping..."}
          </strong>
        </Toast.Header>
        <Toast.Body style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div>{props?.filename}</div>
            <ProgressBar
              now={props?.progressBarPercentage}
              style={{ flex: 1, marginRight: "10px", height: "5px" }}
            />
          </div>
          {props?.progressBarPercentage === 100 ? (
            <img
              src="/images/done_checkmark.svg"
              className="img-fluid"
              alt="checkmark"
            />
          ) : props?.cancelFileUpload ? (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={
                props?.upload
                  ? () => props?.handleUploadFile()
                  : () => props?.downloadVersion()
              }
            >
              Retry
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={props?.cancelProgressBar}
            >
              Cancel
            </Button>
          )}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomProgressBar;
