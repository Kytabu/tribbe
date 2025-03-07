
import { Navigate } from "react-router-dom";
import AuthPage from "./AuthPage";

// This file serves as a redirect to maintain backward compatibility
const Auth = () => {
  return <Navigate to="/auth" replace />;
};

export default Auth;
