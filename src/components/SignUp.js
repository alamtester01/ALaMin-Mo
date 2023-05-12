import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "actions/auth";
import { clearMessage } from "actions/message";
import {
  Spinner,
  Alert,
  Card,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";

/**
 * A module for the Consumer Register Component
 * @module components/consumer/Register
 */

/**
 * Consumer Register Component
 * @method Register
 * @return {JSX.Element}
 *
 */
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  /**
   * --------------------
   * * Redux store state
   *  -------------------
   */
  const { message } = useSelector((state) => state.message);

  /**
   * --------------------
   * * Component state
   *  -------------------
   */
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [division, setDivision] = useState("");
  const [orgAddressBuilding, setOrgAddressBuilding] = useState("");
  const [orgAddressStreet, setOrgAddressStreet] = useState("");
  const [orgAddressSubdivision, setOrgAddressSubdivision] = useState("");
  const [orgAddressBarangay, setOrgAddressBarangay] = useState("");
  const [orgAddressMunicipality, setOrgAddressMunicipality] = useState("");
  const [orgAddressProvince, setOrgAddressProvince] = useState("");
  const [orgAddressZipCode, setOrgAddressZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [emailActivationMessage, setEmailActivationMessage] = useState("");
  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  /**
   * Validates name and value of the input field
   * @method validate
   *
   * @param {string} name - A string for name of the input field
   * @param {string} value - A string for the value of the input field
   *
   * @return {void}
   */
  const validate = (name, value) => {
    if (name !== "middlename" && !value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This field is required!" }));
      return;
    }

    if (name !== "middlename" && value.toString().trim() === "") {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, { [name]: "This field should not be empty" })
      );
      return;
    }

    if (
      name !== "middlename" &&
      name !== "password" &&
      name !== "confirmPassword" &&
      (value.length < 2 || value.length > 50)
    ) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, {
          [name]: "Value must be between 2 and 50 characters.",
        })
      );
      return;
    }

    if (value) {
      switch (name) {
        case "firstname":
        case "middlename":
        case "lastname":
          setIsValid(Object.assign(isValid, { [name]: false }));
          // const validateNames = new RegExp("/^[ña-z .'-]+$/i");
          if (!/^[ña-z .'-]+$/i.test(value)) {
            setError(
              Object.assign(error, {
                [name]: "Numbers and special characters not allowed except .'-",
              })
            );
            return;
          }
          break;
        case "email":
          setIsValid(Object.assign(isValid, { [name]: false }));
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            setError(
              Object.assign(error, { [name]: "This is not a valid email." })
            );
            return;
          }
          break;
        case "password":
          setIsValid(Object.assign(isValid, { [name]: false }));
          const validatePassword = new RegExp(
            "^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}"
          ); // Minimum eight characters, at least one letter, one number, and one symbol
          const validatePassword2 = new RegExp("[^A-Za-z 0-9]");
          if (
            validatePassword.test(value) === false ||
            validatePassword2.test(value) === false
          ) {
            setError(
              Object.assign(error, {
                [name]:
                  "The Password must be minimum eight characters, at least one letter, one number, and one symbol",
              })
            );
            return;
          }
          break;
        case "confirmPassword":
          setIsValid(Object.assign(isValid, { [name]: false }));
          if (value !== password) {
            setError(
              Object.assign(error, {
                [name]: "The confirm password does not match the password.",
              })
            );
            return;
          }
          break;
        case "orgAddressZipCode":
          setIsValid(Object.assign(isValid, { [name]: false }));
          if (!/^[0-9]+$/.test(value)) {
            setError(
              Object.assign(error, {
                [name]:
                  "Please enter a valid digit zip code consisting of only numbers.",
              })
            );
            return;
          }
          break;
        default:
        // code block
      }
    }
    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  /**
   * Gets the corresponding error message
   * @method getFormErrorMessage
   *
   * @param {string} name - A string for the name of the input field
   *
   * @return {HTMLElement}
   */
  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  /**
   * Gets value of the first name input field
   * @method onChangeFirstName
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
    validate("firstname", firstname);
  };

  /**
   * Gets value of the middle name input field
   * @method onChangeMiddleName
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeMiddleName = (e) => {
    const middlename = e.target.value;
    setMiddleName(middlename);
    validate("middlename", middlename);
  };

  /**
   * Gets value of the last name input field
   * @method onChangeLastName
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
    validate("lastname", lastname);
  };

  /**
   * Gets value of the destination input field
   * @method onChangeDesignation
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeDesignation = (e) => {
    const designation = e.target.value;
    setDesignation(designation);
    validate("designation", designation);
  };

  /**
   * Gets value of the email address input field
   * @method onChangeEmail
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    validate("email", email);
  };

  /**
   * Gets value of the organization input field
   * @method onChangeOrganization
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrganization = (e) => {
    const organization = e.target.value;
    setOrganization(organization);
    validate("organization", organization);
  };

  /**
   * Gets value of the division, section, or unit name input field
   * @method onChangeDivision
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeDivision = (e) => {
    const division = e.target.value;
    setDivision(division);
    validate("division", division);
  };

  /**
   * Gets value of the organization building address input field
   * @method onChangeOrgAddressBuilding
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressBuilding = (e) => {
    const orgAddressBuilding = e.target.value;
    setOrgAddressBuilding(orgAddressBuilding);
    validate("orgAddressBuilding", orgAddressBuilding);
  };

  /**
   * Gets value of the organization street address input field
   * @method onChangeOrgAddressStreet
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressStreet = (e) => {
    const orgAddressStreet = e.target.value;
    setOrgAddressStreet(orgAddressStreet);
    validate("orgAddressStreet", orgAddressStreet);
  };

  /**
   * Gets value of the organization subdivision address input field
   * @method onChangeOrgAddressSubdivision
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressSubdivision = (e) => {
    const orgAddressSubdivision = e.target.value;
    setOrgAddressSubdivision(orgAddressSubdivision);
    validate("orgAddressSubdivision", orgAddressSubdivision);
  };

  /**
   * Gets value of the organization barangay address input field
   * @method onChangeOrgAddressBarangay
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressBarangay = (e) => {
    const orgAddressBarangay = e.target.value;
    setOrgAddressBarangay(orgAddressBarangay);
    validate("orgAddressBarangay", orgAddressBarangay);
  };

  /**
   * Gets value of the organization municipality address input field
   * @method onChangeOrgAddressMunicipality
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressMunicipality = (e) => {
    const orgAddressMunicipality = e.target.value;
    setOrgAddressMunicipality(orgAddressMunicipality);
    validate("orgAddressMunicipality", orgAddressMunicipality);
  };

  /**
   * Gets value of the organization province address input field
   * @method onChangeOrgAddressProvince
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressProvince = (e) => {
    const orgAddressProvince = e.target.value;
    setOrgAddressProvince(orgAddressProvince);
    validate("orgAddressProvince", orgAddressProvince);
  };

  /**
   * Gets value of the organization zip code address input field
   * @method onChangeOrgAddressZipCode
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeOrgAddressZipCode = (e) => {
    const orgAddressZipCode = e.target.value;
    setOrgAddressZipCode(orgAddressZipCode);
    validate("orgAddressZipCode", orgAddressZipCode);
  };

  /**
   * Gets value of the password input field
   * @method onChangePassword
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validate("password", password);
  };

  /**
   * Gets value of the confirm password input field
   * @method onChangeConfirmPassword
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    validate("confirmPassword", confirmPassword);
  };

  /**
   * Handles register data after submitting the form
   * @method handleRegister
   *
   * @param {event} e - An event object containing information about the action
   */
  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    validate("firstname", firstname);
    validate("middlename", middlename);
    validate("lastname", lastname);
    validate("designation", designation);
    validate("email", email);
    validate("organization", organization);
    validate("division", division);
    validate("orgAddressBuilding", orgAddressBuilding);
    validate("orgAddressStreet", orgAddressStreet);
    validate("orgAddressSubdivision", orgAddressSubdivision);
    validate("orgAddressBarangay", orgAddressBarangay);
    validate("orgAddressMunicipality", orgAddressMunicipality);
    validate("orgAddressProvince", orgAddressProvince);
    validate("orgAddressZipCode", orgAddressZipCode);
    validate("password", password);
    validate("confirmPassword", confirmPassword);
    setCounter(counter + 1);

    if (Object.keys(error).length === 0) {
      setLoading(true);
      dispatch(
        register(
          firstname,
          middlename,
          lastname,
          designation,
          email,
          organization,
          division,
          orgAddressBuilding,
          orgAddressStreet,
          orgAddressSubdivision,
          orgAddressBarangay,
          orgAddressMunicipality,
          orgAddressProvince,
          orgAddressZipCode,
          password,
          confirmPassword
        )
      )
        .then(() => {
          setSuccessful(true);
          setEmailActivationMessage(
            "An activation link has been sent. Please check your email account."
          );
        })
        .catch(() => {
          setSuccessful(false);
        })
        .finally(() => {
          setShow(true);
          setLoading(false);
          clearMessageNotification();
        });
    }
  };

  const clearMessageNotification = () => {
    const timeout = setTimeout(() => {
      setShow(false);
      dispatch(clearMessage());
    }, 5000); // 5 seconds

    return () => clearTimeout(timeout);
  };

  return (
    <>
      <section className="register-section">
        <div className="container h-100">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">
                      <div className="row">
                        <p className="text-left h2 mb-5 mx-1 mx-md-4 mt-4">
                          Consumer Registration Form
                        </p>
                      </div>

                      {!successful ? (
                        <>
                          <form
                            className="row mx-1 mx-md-4"
                            onSubmit={handleRegister}
                            ref={form}
                          >
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="First Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChangeFirstName}
                                    className={
                                      isValid?.firstname
                                        ? "is-valid"
                                        : isValid.firstname !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("firstname")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Middle Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="middlename"
                                    value={middlename}
                                    onChange={onChangeMiddleName}
                                    className={
                                      isValid?.middlename
                                        ? "is-valid"
                                        : isValid.middlename !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("middlename")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Last Name"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChangeLastName}
                                    className={
                                      isValid?.lastname
                                        ? "is-valid"
                                        : isValid.lastname !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("lastname")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="Designation"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="designation"
                                    value={designation}
                                    onChange={onChangeDesignation}
                                    className={
                                      isValid?.designation
                                        ? "is-valid"
                                        : isValid.designation !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("designation")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Organization"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="organization"
                                    value={organization}
                                    onChange={onChangeOrganization}
                                    className={
                                      isValid?.organization
                                        ? "is-valid"
                                        : isValid.organization !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("organization")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Division/Section/Unit"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="division"
                                    value={division}
                                    onChange={onChangeDivision}
                                    className={
                                      isValid?.division
                                        ? "is-valid"
                                        : isValid.division !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("division")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Form.Label>Organization</Form.Label>
                              <Col>
                                <FloatingLabel
                                  label="Building"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    ame="orgAddressBuilding"
                                    value={orgAddressBuilding}
                                    onChange={onChangeOrgAddressBuilding}
                                    className={
                                      isValid?.orgAddressBuilding
                                        ? "is-valid"
                                        : isValid.orgAddressBuilding !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressBuilding")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel label="Street" className="mb-3">
                                  <Form.Control
                                    name="orgAddressStreet"
                                    value={orgAddressStreet}
                                    onChange={onChangeOrgAddressStreet}
                                    className={
                                      isValid?.orgAddressStreet
                                        ? "is-valid"
                                        : isValid.orgAddressStreet !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressStreet")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Subdivision"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="orgAddressSubdivision"
                                    value={orgAddressSubdivision}
                                    onChange={onChangeOrgAddressSubdivision}
                                    className={
                                      isValid?.orgAddressSubdivision
                                        ? "is-valid"
                                        : isValid.orgAddressSubdivision !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressSubdivision")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Barangay"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="orgAddressBarangay"
                                    value={orgAddressBarangay}
                                    onChange={onChangeOrgAddressBarangay}
                                    className={
                                      isValid?.orgAddressBarangay
                                        ? "is-valid"
                                        : isValid.orgAddressBarangay !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressBarangay")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FloatingLabel
                                  label="Municipality"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="orgAddressMunicipality"
                                    value={orgAddressMunicipality}
                                    onChange={onChangeOrgAddressMunicipality}
                                    className={
                                      isValid?.orgAddressMunicipality
                                        ? "is-valid"
                                        : isValid.orgAddressMunicipality !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage(
                                    "orgAddressMunicipality"
                                  )}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Province"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="orgAddressProvince"
                                    value={orgAddressProvince}
                                    onChange={onChangeOrgAddressProvince}
                                    className={
                                      isValid?.orgAddressProvince
                                        ? "is-valid"
                                        : isValid.orgAddressProvince !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressProvince")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Zip Code"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="orgAddressZipCode"
                                    value={orgAddressZipCode}
                                    onChange={onChangeOrgAddressZipCode}
                                    className={
                                      isValid?.orgAddressZipCode
                                        ? "is-valid"
                                        : isValid.orgAddressZipCode !==
                                          undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("orgAddressZipCode")}
                                </FloatingLabel>
                              </Col>
                            </Row>
                            <Row>
                              <Form.Label>Account</Form.Label>
                              <Col>
                                <FloatingLabel
                                  label="Official Email Address"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    className={
                                      isValid?.email
                                        ? "is-valid"
                                        : isValid.email !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("email")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    className={
                                      isValid?.password
                                        ? "is-valid"
                                        : isValid.password !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("password")}
                                </FloatingLabel>
                              </Col>
                              <Col>
                                <FloatingLabel
                                  label="Confirm Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChangeConfirmPassword}
                                    className={
                                      isValid?.confirmPassword
                                        ? "is-valid"
                                        : isValid.confirmPassword !== undefined
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {getFormErrorMessage("confirmPassword")}
                                </FloatingLabel>
                              </Col>
                            </Row>

                            <Button
                              type="submit"
                              className="button btn btn-primary btn-lg"
                            >
                              Register
                              {loading && (
                                <Spinner
                                  className="spinner"
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                            </Button>
                            <input
                              type="hidden"
                              name="counter"
                              value={counter}
                              style={{ display: "block" }}
                              ref={checkBtn}
                            />
                          </form>
                        </>
                      ) : (
                        <Card body>
                          {/* <FontAwesomeIcon
                            className="icon"
                            icon={solid("envelope-circle-check")}
                          /> */}
                          {emailActivationMessage}
                        </Card>
                      )}
                      {message && (
                        <div className="form-group">
                          <Alert
                            className="alert-message"
                            show={show}
                            variant={successful ? "success" : "danger"}
                            onClose={() => setShow(false)}
                            dismissible
                          >
                            <p>{message}</p>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
