/**
 * A module for Auth verify component
 *
 * @module common/AuthVerify
 */

/**
 * Parsing the JWT
 *
 * @method parseJwt
 *
 * @param {string} token - A string for JWT
 *
 * @return {string|null}
 *
 */
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

/**
 * Verifying user access by decoding JWT expiration Component
 * @method AuthVerify
 * @param {any} props - An arbitrary inputs of components
 *
 * @return {JSX.Element}
 *
 */
const AuthVerify = (props) => {
  if (props?.access) {
    const decodedJwt = parseJwt(props?.access);
    if (decodedJwt.exp * 1000 < Date.now()) {
      props?.logout();
    }
  }
};

export default AuthVerify;
