import { LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../models/enum";
import { selectUser } from "../../redux/features/userSlice";
import { logoutUser } from "../../services/auth/api";
import { Logo } from "../Icons";
import "./index.scss";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const menuItems = [
    { key: "home", label: "Trang chủ", path: "/" },
    { key: "survey", label: "Khảo sát tâm lý", path: "/survey" },
    { key: "program", label: "Chương trình", path: "/program" },
    { key: "doctors", label: "Đội ngũ bác sĩ", path: "/doctors" },
    { key: "blog", label: "Blog", path: "/blog" },
    { key: "contact", label: "Liên hệ", path: "/contact" },
  ];

  const handleMenuClick = (key: string, path: string) => {
    setActiveItem(key);
    navigate(path);
  };

  const handleLogout = async () => {
    // dispatch(logout());
    await logoutUser();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo" onClick={() => navigate("/")}>
          <Logo />
          <span>YAG HEALTH</span>
        </div>

        {(user as any).roleCode == UserRole.Student && (
          <nav className="header__nav">
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={`header__nav__item ${
                  activeItem === item.key ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item.key, item.path)}
              >
                {item.label}
              </div>
            ))}
          </nav>
        )}

        <div className="header__actions">
          {user ? (
            <div className="header__user">
              <FaCartShopping
                size={20}
                className="header__cart__icon"
                onClick={() => navigate("/user-cart")}
              />
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
}

export default Header;
