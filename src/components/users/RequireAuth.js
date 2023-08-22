import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
