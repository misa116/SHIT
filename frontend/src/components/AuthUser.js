/* import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthUser = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo && !userInfo?.token) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return <>{children}</>;
};

export default AuthUser;


/*/




/*

// frontend/src/components/AuthUser.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCheckLoginQuery } from "../redux/userApiSlice";

const AuthUser = () => {
  // Call backend /profile endpoint with cookies
  const { data, isLoading, isError } = useCheckLoginQuery();

  if (isLoading) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  // If no user data or request failed → redirect to login
  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated → render nested route (inside Layout)
  return <Outlet />;
};

export default AuthUser;
*/






/*

// frontend/src/components/AuthUser.js
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCheckLoginQuery } from "../redux/userApiSlice";

const AuthUser = () => {
  const { data, isLoading, isError } = useCheckLoginQuery();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      console.warn("Auth check failed, redirecting to login...");
    }
  }, [isError]);

  if (isLoading) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  // If auth fails OR no user data → redirect to login
  if (isError || !data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated → render child route inside Layout
  return <Outlet />;
};

export default AuthUser;
*/



// frontend/src/components/AuthUser.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthUser = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // no token -> kick to login
  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace />;
  }

  // has token -> render protected content
  return <>{children}</>;
};

export default AuthUser;
