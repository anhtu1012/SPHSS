import "./index.scss";
import { Logo } from "../Icons";

function Header() {
  return (
    <div className="header">
      <div className="logo">
          <Logo />
        <p>YAG HEALTH</p>
      </div>
    </div>
  );
}

export default Header;
