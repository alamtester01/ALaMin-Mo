import { useState } from "react";
import { Container, Form } from "react-bootstrap";

/**
 * A module for Metrics component
 * @module components/models/sections/Metrics
 */

/**
 * Metrics component
 * @method Metrics
 *
 * @return {JSX.Element}
 *
 */
const Metrics = (props) => {
  const onChangeModelPerformanceMeasures = (e) => {
    const value = e.target.value;
    props?.setModelPerformanceMeasures(value);
    props?.validate("modelPerformanceMeasures", value);
  };

  const onChangeModelDecisionThresholds = (e) => {
    const value = e.target.value;
    props?.setModelDecisionThresholds(value);
    props?.validate("modelDecisionThresholds", value);
  };

  const onChangeModelApproachesToUncertainty = (e) => {
    const value = e.target.value;
    props?.setModelApproachesToUncertainty(value);
    props?.validate("modelApproachesToUncertainty", value);
  };

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Metrics</p>
      <p>Provide metrics information about this version.</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Performance Measures
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelPerformanceMeasures}
            onChange={onChangeModelPerformanceMeasures}
            className={`form-control ${
              props?.isValid?.modelPerformanceMeasures
                ? "is-valid"
                : props?.isValid.modelPerformanceMeasures !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelPerformanceMeasures")}
          <span className="note">
            What are the performance metrics reported for the model? Why were
            these performance metrics chosen over other metrics?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Decision Thresholds
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelDecisionThresholds}
            onChange={onChangeModelDecisionThresholds}
            className={`form-control ${
              props?.isValid?.modelDecisionThresholds
                ? "is-valid"
                : props?.isValid.modelDecisionThresholds !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelDecisionThresholds")}
          <span className="note">
            What were decision thresholds that were applied in developing the
            model?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Approaches to Uncertainty and Variability
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelApproachesToUncertainty}
            onChange={onChangeModelApproachesToUncertainty}
            className={`form-control ${
              props?.isValid?.modelApproachesToUncertainty
                ? "is-valid"
                : props?.isValid.modelApproachesToUncertainty !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelApproachesToUncertainty")}
          <span className="note">
            Provide details on how values of uncertainty and variability on the
            performance of the model were approximated.
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Metrics;
