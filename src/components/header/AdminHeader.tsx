import { Logo } from "../Icons";
import "./adminHeader.scss";

function AdminHeader() {
  return (
    <header className="headerAdmin">
      <div className="headerAdmin__container">
        <div className="headerAdmin__logo">
          <Logo />
          <span>YAG HEALTH - Quản lý</span>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
