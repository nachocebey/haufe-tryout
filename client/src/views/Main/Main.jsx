import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import "./Main.scss";

function Main() {
  const isLogin = window.location.pathname === "/login" ? true : false;
  const navigate = useNavigate();

  return (
    <div id="main">
      <div className="auth__container">
        <AuthForm isLogin={isLogin} onLogin={() => navigate('/list')}/>
      </div>
      <div className="content__container">
        <span className="name">Nacho Cebey</span>
        <span>Technical challenge</span>
      </div>
    </div>
  );
}

export default Main;
