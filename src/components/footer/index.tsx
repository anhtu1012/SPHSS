import { useNavigate } from "react-router-dom";
import { Logo } from "../Icons";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import { UserRole } from "../../models/enum";

function Footer() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <footer className="footer">
      <div className="footer__container">
        {(user as any).roleCode == UserRole.Student && (
          <div className="footer__main">
            <div className="footer__info">
              <div className="footer__logo">
                <Logo />
                <span>YAG HEALTH</span>
              </div>
              <p>
                Nền tảng chăm sóc sức khỏe tinh thần toàn diện cho sinh viên
              </p>
              <div className="footer__social">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="footer__links">
              <div className="footer__links__column">
                <h3>Dịch vụ</h3>
                <a onClick={() => navigate("/services")}>Tư vấn tâm lý</a>
                <a onClick={() => navigate("/services")}>Đặt lịch hẹn</a>
                <a onClick={() => navigate("/services")}>Khám sức khỏe</a>
              </div>

              <div className="footer__links__column">
                <h3>Hỗ trợ</h3>
                <a onClick={() => navigate("/faq")}>FAQ</a>
                <a onClick={() => navigate("/contact")}>Liên hệ</a>
                <a onClick={() => navigate("/privacy")}>Chính sách bảo mật</a>
              </div>

              <div className="footer__links__column">
                <h3>Liên hệ</h3>
                <p>Email: support@yaghealth.com</p>
                <p>Hotline: 1900 1234</p>
                <p>Địa chỉ: FPT University, Hòa Lạc, Hà Nội</p>
              </div>
            </div>
          </div>
        )}
        <div className="footer__bottom">
          <p>© 2024 YAG Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
