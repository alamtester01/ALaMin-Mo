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
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Analyses</span>
      <p>
        Information on some quantitative analyses that were applied to this
        version of the model.
      </p>
      <div className="mb-3">
        <label className="semi-bold">Unitary results</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelUnitaryResults === "<p><br></p>" ||
              !props?.modelUnitaryResults
                ? "--"
                : props?.modelUnitaryResults,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Intersectional results</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelIntersectionalResults === "<p><br></p>" ||
              !props?.modelIntersectionalResults
                ? "--"
                : props?.modelIntersectionalResults,
          }}
        ></p>
      </div>
    </Container>
  );
};

export default Analyses;
