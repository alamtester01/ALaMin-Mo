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
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Ethical Considerations and Biases</span>
      <p>
        Information about the ethical considerations that went into model
        development.
      </p>
      <div className="mb-3">
        <label className="semi-bold">Data</label>
        <p>{props?.modelData || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Human life</label>
        <p>{props?.modelHumanLife || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Mitigations</label>
        <p>{props?.modelMitigations || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Risks and harms</label>
        <p>{props?.modelRisksAndHarms || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Use cases</label>
        <p>{props?.modelUseCases || "--"}</p>
      </div>
    </Container>
  );
};

export default ConsiderationsAndBiases;
