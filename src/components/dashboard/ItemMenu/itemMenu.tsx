import {
  FormOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ProfileOutlined,
  RadarChartOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { UserRole } from "../../../models/enum";
import styles from "./itemMenu.module.scss";

const { Manager, Parent, Psychologist } = UserRole;

const getMenuItems = (roleId: string) => {
  if (roleId === Manager) {
    return [
      // {
      //   label: "Tổng quan",
      //   key: "/manager/dashboard",
      //   icon: <LineChartOutlined />,
      // },
      {
        label: "Quản lý người dùng",
        key: "/manager/manage-user",
        icon: <UsergroupAddOutlined />,
      },
      {
        label: "Chi tiết hiệu quả tư vấn",
        key: "/manager/detail-effect-consult",
        icon: <RadarChartOutlined />,
      },
      {
        label: "Các chương trình hỗ trợ",
        key: "/manager/list-support-program",
        icon: <ProfileOutlined />,
      },
      {
        label: "Quản lý khảo sát",
        key: "/manager/manage-survey",
        icon: <FormOutlined />,
      },
      { label: "Log-out", key: "/login", icon: <LogoutOutlined /> },
    ];
  } else if (roleId === Parent) {
    return [
      {
        label: "Manage Student",
        key: "/parent/manage-student",
        icon: <PieChartOutlined />,
      },
    ];
  } else if (roleId === Psychologist) {
    return [
      {
        label: "Quản lý lịch hẹn",
        key: "/psychologist/manage-timeslot",
        icon: <AiOutlineSchedule />,
      },
      {
        label: "Danh sách lịch hẹn",
        key: "/psychologist/manage-survey",
        icon: <GrSchedule />,
      },
      {
        label: "Blogs",
        key: "/psychologist/manage-blog",
        icon: <AiOutlineSchedule />,
      },
      {
        label: "Danh sách học sinh",
        key: "/psychologist/manage-student",
        icon: <FaRegFileAlt />,
      },
      {
        label: "Báo cáo",
        key: "/psychologist/manage-report",
        icon: <TbReportAnalytics />,
      },
    ];
  }
  return [];
};

interface ItemMenuProps {
  roleId: string;
}

const ItemMenu: React.FC<ItemMenuProps> = ({ roleId }) => {
  const items = getMenuItems(roleId);

  return (
    <Menu defaultSelectedKeys={["/manager/dashboard"]} mode="inline">
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} className={styles.menuItem}>
          <Link to={item.key}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ItemMenu;
