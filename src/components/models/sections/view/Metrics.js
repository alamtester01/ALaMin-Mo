import { Container } from "react-bootstrap";

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
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Metrics</span>
      <p>Metrics information about this version.</p>

      <div className="mb-3">
        <label className="semi-bold">Performance measures</label>
        <p>{props?.modelPerformanceMeasures || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Decision thresholds</label>
        <p>{props?.modelDecisionThresholds || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">
          Approaches to uncertainty and variability
        </label>
        <p>{props?.modelApproachesToUncertainty || "--"}</p>
      </div>
    </Container>
  );
};

export default Metrics;
