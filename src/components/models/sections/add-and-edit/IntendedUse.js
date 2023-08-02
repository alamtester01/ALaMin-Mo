import { useEffect, useState } from "react";
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

  const onChangeModelPrimaryIntendedUses = (e) => {
    const value = e.target.value;
    props?.setModelPrimaryIntendedUses(value);
    props?.validate("modelPrimaryIntendedUses", value);
  };

  const onChangeModelPrimaryIntendedUsers = (e) => {
    const value = e.target.value;
    props?.setModelPrimaryIntendedUsers(value);
    props?.validate("modelPrimaryIntendedUsers", value);
  };

  const onChangeModelOutOfScopeUseCases = (e) => {
    const value = e.target.value;
    props?.setModelOutOfScopeUseCases(value);
    props?.validate("modelOutOfScopeUseCases", value);
  };

  return (
    <Container className="mw-65 ms-0">
      <p className="bold">Intended use and limitations</p>
      <p>
        Describe the use cases that were envisioned during model development.
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Primary Intended Uses
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelPrimaryIntendedUses}
            onChange={onChangeModelPrimaryIntendedUses}
            className={`form-control ${
              props?.isValid?.modelPrimaryIntendedUses
                ? "is-valid"
                : props?.isValid.modelPrimaryIntendedUses !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelPrimaryIntendedUses")}
          <span className="note">
            Describe the intended general or specific machine learning tasks in
            mind. (Ex. Plant identification in the northern provinces of the
            Philippines)
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Primary Intended Users
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelPrimaryIntendedUsers}
            onChange={onChangeModelPrimaryIntendedUsers}
            className={`form-control ${
              props?.isValid?.modelPrimaryIntendedUsers
                ? "is-valid"
                : props?.isValid.modelPrimaryIntendedUsers !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelPrimaryIntendedUsers")}
          <span className="note">
            Describe the primary intended users of the model. (Ex. Crop
            scientists, Hobbyists)
          </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="required-field semi-bold">
            Out-of-Scope Use Cases
          </Form.Label>
          <Form.Control
            type="text"
            value={props?.modelOutOfScopeUseCases}
            onChange={onChangeModelOutOfScopeUseCases}
            className={`form-control ${
              props?.isValid?.modelOutOfScopeUseCases
                ? "is-valid"
                : props?.isValid.modelOutOfScopeUseCases !== undefined
                ? "is-invalid"
                : ""
            }`}
          />
          {props?.getFormErrorMessage("modelOutOfScopeUseCases")}
          <span className="note">
            Describe possible usages of the model that are outside of the scope
            intended by its developers.
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default IntendedUse;
