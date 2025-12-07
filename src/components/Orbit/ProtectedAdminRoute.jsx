import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token"); // token login-mu

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
