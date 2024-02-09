import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import profilePic from "../../assets/images/morty_smith.png";
import "./Header.scss";
import { clearUserInfo } from "../../redux/slices/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const isAuthenticated = user.id ? true : false;

  const handleLogout = () => {
    dispatch(clearUserInfo());
    navigate("login");
  };

  return (
    <div className="header">
      <div className="profile-info__container">
        {isAuthenticated && user ? (
          <>
            <div className="profile-pic">
              <img src={profilePic} alt="Profile pic" loading="lazy" />
            </div>
            <span className="name">{user.name}</span>
          </>
        ) : null}
      </div>
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
