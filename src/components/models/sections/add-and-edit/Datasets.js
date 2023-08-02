import { useState } from "react";
import { Container, Form } from "react-bootstrap";

/**
 * A module for Datasets component
 * @module components/models/sections/Datasets
 */

/**
 * Datasets component
 * @method Datasets
 *
 * @return {JSX.Element}
 *
 */
const Datasets = (props) => {

  const onChangeModelTrainingDataset = (e) => {
    const value = e.target.value;
    props?.setModelTrainingDataset(value);
    props?.validate("modelTrainingDataset", value);
  };

  const onChangeModelTrainingMotivation = (e) => {
    const value = e.target.value;
    props?.setModelTrainingMotivation(value);
    props?.validate("modelTrainingMotivation", value);
  };

  const onChangeModelTrainingPreprocessing = (e) => {
    const value = e.target.value;
    props?.setModelTrainingPreprocessing(value);
    props?.validate("modelTrainingPreprocessing", value);
  };

  const onChangeModelEvaluationDataset = (e) => {
    const value = e.target.value;
    props?.setModelEvaluationDataset(value);
    props?.validate("modelEvaluationDataset", value);
  };

  const onChangeModelEvaluationMotivation = (e) => {
    const value = e.target.value;
    props?.setModelEvaluationMotivation(value);
    props?.validate("modelEvaluationMotivation", value);
  };

  const onChangeModelEvaluationPreprocessing = (e) => {
    const value = e.target.value;
    props?.setModelEvaluationPreprocessing(value);
    props?.validate("modelEvaluationPreprocessing", value);
  };

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Datasets</p>
      <p>
        Provide both training dataset and evaluation dataset that were used in
        this version.
      </p>
      <Form>
        <p className="bold">Training dataset</p>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Dataset</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelTrainingDataset}
            onChange={onChangeModelTrainingDataset}
            className={`form-control ${
              props?.isValid?.modelTrainingDataset
                ? "is-valid"
                : props?.isValid.modelTrainingDataset !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelTrainingDataset")}
          <span className="note">
            What datasets were used to train the model?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Motivation
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelTrainingMotivation}
            onChange={onChangeModelTrainingMotivation}
            className={`form-control ${
              props?.isValid?.modelTrainingMotivation
                ? "is-valid"
                : props?.isValid.modelTrainingMotivation !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelTrainingMotivation")}
          <span className="note">
            Why were these datasets chosen for the training of the model?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Preprocessing
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelTrainingPreprocessing}
            onChange={onChangeModelTrainingPreprocessing}
            className={`form-control ${
              props?.isValid?.modelTrainingPreprocessing
                ? "is-valid"
                : props?.isValid.modelTrainingPreprocessing !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelTrainingPreprocessing")}
          <span className="note">
            How were these datasets preprocessed in preparation for the training
            of the model?
          </span>
        </Form.Group>
        <p className="bold">Evaluation dataset</p>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Dataset</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelEvaluationDataset}
            onChange={onChangeModelEvaluationDataset}
            className={`form-control ${
              props?.isValid?.modelEvaluationDataset
                ? "is-valid"
                : props?.isValid.modelEvaluationDataset !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelEvaluationDataset")}
          <span className="note">
            What datasets were used to evaluate the model?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Motivation
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelEvaluationMotivation}
            onChange={onChangeModelEvaluationMotivation}
            className={`form-control ${
              props?.isValid?.modelEvaluationMotivation
                ? "is-valid"
                : props?.isValid.modelEvaluationMotivation !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelEvaluationMotivation")}
          <span className="note">
            Why were these datasets chosen for the evaluation of the model?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Preprocessing
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelEvaluationPreprocessing}
            onChange={onChangeModelEvaluationPreprocessing}
            className={`form-control ${
              props?.isValid?.modelEvaluationPreprocessing
                ? "is-valid"
                : props?.isValid.modelEvaluationPreprocessing !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelEvaluationPreprocessing")}
          <span className="note">
            How were these datasets preprocessed in preparation for the
            evaluation of the model?
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Datasets;
