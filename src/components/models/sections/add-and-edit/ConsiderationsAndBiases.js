import { useState } from "react";
import { Container, Form } from "react-bootstrap";

/**
 * A module for ConsiderationsAndBiases component
 * @module components/models/sections/ConsiderationsAndBiases
 */

/**
 * ConsiderationsAndBiases component
 * @method ConsiderationsAndBiases
 *
 * @return {JSX.Element}
 *
 */
const ConsiderationsAndBiases = (props) => {

  const onChangeModelData = (e) => {
    const value = e.target.value;
    props?.setModelData(value);
    props?.validate("modelData", value);
  };

  const onChangeModelHumanLife = (e) => {
    const value = e.target.value;
    props?.setModelHumanLife(value);
    props?.validate("modelHumanLife", value);
  };

  const onChangeModelMitigations = (e) => {
    const value = e.target.value;
    props?.setModelMitigations(value);
    props?.validate("modelMitigations", value);
  };

  const onChangeModelRisksAndHarms = (e) => {
    const value = e.target.value;
    props?.setModelRisksAndHarms(value);
    props?.validate("modelRisksAndHarms", value);
  };

  const onChangeModelUseCases = (e) => {
    const value = e.target.value;
    props?.setModelUseCases(value);
    props?.validate("modelUseCases", value);
  };

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Ethical Considerations and Biases</p>
      <p>
        Provide information about the ethical considerations that went into
        model development. Include other ethical considerations such as review
        by an external board or testing with a specific group for clearing.
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">Data</Form.Label>
          <Form.Control
            type="text"
            value={props?.modelData}
            onChange={onChangeModelData}
            className={`form-control ${
              props?.isValid?.modelData
                ? "is-valid"
                : props?.isValid.modelData !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelData")}
          <span className="note">
            Cite any sensitive data that the model use.
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Human life
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelHumanLife}
            onChange={onChangeModelHumanLife}
            className={`form-control ${
              props?.isValid?.modelHumanLife
                ? "is-valid"
                : props?.isValid.modelHumanLife !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelHumanLife")}
          <span className="note">
            Is the model meant to function in a setting requiring
            decision-making in topics fundamental to human existence or
            flourishing?
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Mitigations
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelMitigations}
            onChange={onChangeModelMitigations}
            className={`form-control ${
              props?.isValid?.modelMitigations
                ? "is-valid"
                : props?.isValid.modelMitigations !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelMitigations")}
          <span className="note">
            Provide the risk mitigations employed during model development.
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Risks and Harms
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelRisksAndHarms}
            onChange={onChangeModelRisksAndHarms}
            className={`form-control ${
              props?.isValid?.modelRisksAndHarms
                ? "is-valid"
                : props?.isValid.modelRisksAndHarms !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelRisksAndHarms")}
          <span className="note">
            Identify potential recipients of risks, likelihood of risks, and
            magnitude of harms brought by the risks.
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Use Cases
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelUseCases}
            onChange={onChangeModelUseCases}
            className={`form-control ${
              props?.isValid?.modelUseCases
                ? "is-valid"
                : props?.isValid.modelUseCases !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelUseCases")}
          <span className="note">
            Define any model uses cases that are considered as fraught.
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ConsiderationsAndBiases;
