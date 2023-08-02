import { Container } from "react-bootstrap";

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
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Datasets</span>
      <p>
        Training dataset and evaluation dataset that were used in this version.
      </p>

      <p className="bold">Training dataset</p>
      <div className="ms-3">
        <div className="mb-3">
          <label className="semi-bold">Dataset</label>
          <p>{props?.modelTrainingDataset || "--"}</p>
        </div>
        <div className="mb-3">
          <label className="semi-bold">Motivation</label>
          <p>{props?.modelTrainingMotivation || "--"}</p>
        </div>
        <div className="mb-3">
          <label className="semi-bold">Preprocessing</label>
          <p>{props?.modelTrainingPreprocessing || "--"}</p>
        </div>
      </div>

      <p className="bold">Evaluation dataset</p>
      <div className="ms-3">
        <div className="mb-3">
          <label className="semi-bold">Dataset</label>
          <p>{props?.modelEvaluationDataset || "--"}</p>
        </div>
        <div className="mb-3">
          <label className="semi-bold">Motivation</label>
          <p>{props?.modelEvaluationMotivation || "--"}</p>
        </div>
        <div className="mb-3">
          <label className="semi-bold">Preprocessing</label>
          <p>{props?.modelTrainingPreprocessing || "--"}</p>
        </div>
      </div>
    </Container>
  );
};

export default Datasets;
