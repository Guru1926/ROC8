import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { state } = authContext;


  if (!state.isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
