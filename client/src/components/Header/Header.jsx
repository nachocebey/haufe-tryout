import { useNavigate } from "react-router-dom";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const AUTH_KEY = "userId";
  const isAuthenticated = localStorage.getItem(AUTH_KEY) ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("login");
  };

  return (
    <div className="header">
      {!isAuthenticated ? (
        <div className="links__container">
          <a onClick={() => navigate("login")}>Log in</a>|
          <a onClick={() => navigate("register")}>Sign in</a>
        </div>
      ) : (
        <div className="links__container">
          <a onClick={() => handleLogout()}>Logout</a>
        </div>
      )}
    </div>
  );
}

export default Header;
