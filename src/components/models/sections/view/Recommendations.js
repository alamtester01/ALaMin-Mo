import { Container } from "react-bootstrap";
/**
 * A module for Recommendations component
 * @module components/models/sections/Recommendations
 */

/**
 * Recommendations component
 * @method Recommendations
 *
 * @return {JSX.Element}
 *
 */
const Recommendations = (props) => {
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Caveats and Recommendations</span>
      <p>Additional concerns that were not covered in the other sections.</p>
      <div className="mb-3">
        <label className="semi-bold">Details</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelDetails === "<p><br></p>" || !props?.modelDetails
                ? "--"
                : props?.modelDetails,
          }}
        ></p>
      </div>
    </Container>
  );
};

export default Recommendations;
