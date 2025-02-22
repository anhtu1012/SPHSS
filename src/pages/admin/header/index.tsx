import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Logo } from "../../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/userSlice";
import { FaUserCircle } from "react-icons/fa";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo" onClick={() => navigate("/")}>
          <Logo />
          <span>YAG HEALTH</span>
        </div>

        <div className="header__actions">
          {user ? (
            <div className="header__user">
              <FaUserCircle
                size={20}
                className="header__user__icon"
                onClick={() => navigate("/user-profile")}
              />
              <LogoutOutlined
                className="header__logout__icon"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <>
              <button
                className="header__actions__login"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <button
                className="header__actions__register"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
