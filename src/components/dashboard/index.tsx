import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectUser } from "../../redux/features/userSlice";
import { User } from "../../models/user";
import { UserRole } from "../../models/enum";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>, //label = label ,
  } as MenuItem;
}
const { Manager, Parent, Psychologist } = UserRole;
// const dispatch = useDispatch();
const getMenuItems = (roleId: string): MenuItem[] => {
  if (roleId === Manager) {
    return [
      getItem("ManageUser", "/manager/manage-user", <PieChartOutlined />),
      getItem(
        "ManagePsychologist",
        "/manager/manage-psychologist-blog",
        <PieChartOutlined />
      ),
    ];
  } else if (roleId === Parent) {
    return [
      getItem("ManageStudent", "/parent/manage-student", <PieChartOutlined />),
    ];
  } else if (roleId === Psychologist) {
    return [
      getItem(
        "ManageStudent",
        "/psychologist/manage-student",
        <PieChartOutlined />
      ),
      getItem(
        "ManageSurvey",
        "/psychologist/manage-survey",
        <PieChartOutlined />
      ),
    ];
  }
  return []; // Default return statement
};

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector(selectUser) as User | null;
  const items: MenuItem[] = user ? getMenuItems(user.roleCode) : [];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" style={{ textAlign: "center" }}>
          <img
            src="https://static.kfcvietnam.com.vn/images/web/kfc-logo.svg?v=5.0"
            alt="logo"
            width={55}
            className="header__logo"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <div>
            <h1>{user?.email}</h1>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
