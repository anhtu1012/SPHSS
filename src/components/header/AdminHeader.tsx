import { LogoutOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { Logo } from "../Icons";
import "./adminHeader.scss";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="headerAdmin">
      <div className="headerAdmin__container">
        <div className="headerAdmin__logo">
          <Logo />
          <span>YAG HEALTH - Manager</span>
        </div>

        <div className="headerAdmin__actions">
          <div className="headerAdmin__user">
            <FaUserCircle
              size={20}
              className="headerAdmin__user__icon"
              onClick={() => navigate("/admin/profile")}
            />
            <LogoutOutlined
              className="headerAdmin__logout__icon"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
