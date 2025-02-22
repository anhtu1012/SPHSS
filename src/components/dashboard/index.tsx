import { Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectUser } from "../../redux/features/userSlice";
import { User } from "../../models/user";
import Header from "../header";
import Footer from "../footer";
import styles from "./Dashboard.module.scss";
import ItemMenu from "./ItemMenu/itemMenu";

const { Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  const user = useSelector(selectUser) as User | null;

  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout className={styles.main_layout}>
        <Sider className={styles.sidebar} theme="light">
          {user && <ItemMenu roleId={user.roleCode} />}
        </Sider>
        <Content className={styles.main_content}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Dashboard;
