import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * A module for Require Authentication component
 * @module components/RequireAuth
 */

/**
 * Require Authentication component
 * @method RequireAuth
 * 
 * @return {JSX.Element}
 *
 */
const RequireAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
