import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import "./layout.module.scss";

function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
