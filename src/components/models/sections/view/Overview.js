import { Container } from "react-bootstrap";
import { convertDate } from "common/constants";
import { useDispatch, useSelector } from "react-redux";

/**
 * A module for Overview component
 * @module components/models/sections/Overview
 */

/**
 * Overview component
 * @method Overview
 *
 * @return {JSX.Element}
 *
 */
const Overview = (props) => {
  import("../../../../styles/Overview.css");

  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Overview</span>
      <p>Basic information about this version.</p>

      <div className="mb-3">
        <label className="semi-bold">No.</label>
        <p>{props?.modelNumber|| "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Name</label>
        <p>{props?.modelVersionName || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Description</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelVersionDescription === "<p><br></p>" ||
              !props?.modelVersionDescription
                ? "--"
                : props?.modelVersionDescription,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">File</label>
        <p>{props?.modelFile?.replace("/media/", "") || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Date created</label>
        <p>
          {props?.modelDateCreated
            ? convertDate(props?.modelDateCreated)
            : "--"}
        </p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Author</label>
        <p>{props?.modelAuthor || "--"}</p>
      </div>

      <div className="mb-3">
        <label className="semi-bold">Contact Information</label>
        <p>{props?.modelContact || "--"}</p>
      </div>
    </Container>
  );
};

export default Overview;
