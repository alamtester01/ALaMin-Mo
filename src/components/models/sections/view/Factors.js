import { useEffect, useState, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { modules, formats } from "common/constants";
import ReactQuill from "react-quill";

/**
 * A module for Factors component
 * @module components/models/sections/Factors
 */

/**
 * Factors component
 * @method Factors
 *
 * @return {JSX.Element}
 *
 */
const Factors = (props) => {
  return (
    <Container className="mw-65 ms-0">
      <span className="bold">Factors</span>
      <p>
        The different demographic or phenotypic groups, environmental
        conditions, technical attributes, and instrumentation conditions that
        were considered during model development.
      </p>
      <div className="mb-3">
        <label className="semi-bold">Groups</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelGroups === "<p><br></p>" || !props?.modelGroups
                ? "--"
                : props?.modelGroups,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Instrumentation</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelInstrumentation === "<p><br></p>" ||
              !props?.modelInstrumentation
                ? "--"
                : props?.modelInstrumentation,
          }}
        ></p>
      </div>
      <div className="mb-3">
        <label className="semi-bold">Environment</label>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props?.modelEnvironment === "<p><br></p>" ||
              !props?.modelEnvironment
                ? "--"
                : props?.modelEnvironment,
          }}
        ></p>
      </div>
    </Container>
  );
};

export default Factors;
