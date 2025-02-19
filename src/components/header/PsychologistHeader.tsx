import { LogoutOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { Logo } from "../Icons";
import "./psyHeader.scss";

function PsychologistheaderPsy() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="headerPsy">
      <div className="headerPsy__container">
        <div className="headerPsy__logo">
          <Logo />
          <span>YAG HEALTH - Psychologist</span>
        </div>

        <div className="headerPsy__actions">
          <div className="headerPsy__user">
            <FaUserCircle
              size={20}
              className="headerPsy__user__icon"
              onClick={() => navigate("/psychologist/profile")}
            />
            <LogoutOutlined
              className="headerPsy__logout__icon"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default PsychologistheaderPsy;
