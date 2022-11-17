import { useNavigate } from "react-router-dom";

const ProtectedRouterIsLogged = ({ children }) => {
  const navigate = useNavigate();

  if (localStorage.loggedIn) {
    navigate(-1);
  }
  return children;
};

export default ProtectedRouterIsLogged;
