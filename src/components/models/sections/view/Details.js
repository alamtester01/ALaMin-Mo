import { Container } from "react-bootstrap";

/**
 * A module for Details component
 * @module components/models/sections/Details
 */

/**
 * Details component
 * @method Details
 *
 * @return {JSX.Element}
 *
 */
const Details = (props) => {
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Version details</span>
      <p>More information about this version.</p>

      <div className="mb-3">
        <label className="semi-bold">Development date</label>
        <p>{props?.modelDevelopmentDate || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Developers</label>
        <p>{props?.modelDevelopers || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Accuracy</label>
        <p>{props?.modelAccuracy || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Input</label>
        <p>{props?.modelInput || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Output</label>
        <p>{props?.modelOutput || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Type</label>
        <p>{props?.modelType || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">
          Paper or other resource of information
        </label>
        <p>{props?.modelPaper || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Citation details</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelCitationDetails === "<p><br></p>" ||
              !props?.modelCitationDetails
                ? "--"
                : props?.modelCitationDetails,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">License</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelLicense === "<p><br></p>" || !props?.modelLicense
                ? "--"
                : props?.modelLicense,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Other relevant information</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelOtherRelevantInfo === "<p><br></p>" ||
              !props?.modelOtherRelevantInfo
                ? "--"
                : props?.modelOtherRelevantInfo,
          }}
        ></p>
      </div>
    </Container>
  );
};

export default Details;
