import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import "./layout.module.scss";
import FloatingChatWidget from "../FloatingChatWidget";

function Layout() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "90px" }}>
        <Outlet />
        <FloatingChatWidget />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default Layout;
