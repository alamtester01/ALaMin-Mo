import { Container, Form } from "react-bootstrap";

/**
 * A module for IntendedUse component
 * @module components/models/sections/IntendedUse
 */

/**
 * IntendedUse component
 * @method IntendedUse
 *
 * @return {JSX.Element}
 *
 */
const IntendedUse = (props) => {
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Intended user and limitations</span>
      <p>Different use cases that were envisioned during model development.</p>
      <div className="mb-3">
        <label className="semi-bold">Primary intended uses</label>
        <p>{props?.modelPrimaryIntendedUses || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Primary intended users</label>
        <p>{props?.modelPrimaryIntendedUsers || "--"}</p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Out-of-Scope use cases</label>
        <p>{props?.modelOutOfScopeUseCases || "--"}</p>
      </div>
    </Container>
  );
};

export default IntendedUse;
