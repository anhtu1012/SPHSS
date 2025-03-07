import AntDComponent from "../../../components/cTableAntD";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import { useState, useEffect } from "react";
import Cbutton from "../../../components/cButton";
import styles from "./manageUser.module.scss";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { getAllUser } from "../../../services/admin/api";
import { User } from "../../../models/admin";

function ManageUser() {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUser();
      console.log("getUser:", response.data);
      const userList = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setData(userList);
      setFilteredData(userList);
    } catch (error) {
      console.error("Lỗi danh sách người dùng:", error);
      setData([]);
      setFilteredData([]);
    }
    setLoading(false);
  };

  const handleSearch = (values: Record<string, string>) => {
    const searchName = values.name?.toLowerCase().trim() || "";
    const searchRole = values.role?.trim();
    if (!searchName && (!searchRole || searchRole === "Tất cả")) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`
        .trim()
        .toLowerCase();
      const matchName = searchName ? fullName.includes(searchName) : true;
      const matchRole =
        searchRole && searchRole !== "Tất cả"
          ? roleMap[user.roleCode] === searchRole
          : true;
      return matchName && matchRole;
    });
    setFilteredData(filtered);
  };

  const roleMap: Record<string, string> = {
    R1: "Sinh viên",
    R2: "Phụ huynh",
    R3: "Tư vấn viên",
    R4: "Quản lý",
  };
  const statusMap: Record<string, string> = {
    true: "Đang hoạt động",
    false: "Đã khóa",
  };
  const columns: ColumnsType<User> = [
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.userName}>
            {`${record.firstName || ""} ${record.lastName || ""}`.trim()}
          </span>
          <br />
          <span className={styles.userId}>
            {record.userCode || "Chưa có ID"}
          </span>
        </div>
      ),
    },
    {
      title: "Loại tài khoản",
      dataIndex: "role",
      key: "role",
      render: (role) => roleMap[role] || "Unknown",
    },
    {
      title: "Trạng thái tài khoản",
      dataIndex: "status",
      key: "status",
      render: (status) => statusMap[status] || "Unknown",
    },
    {
      title: "Hồ sơ",
      key: "action",
      render: (_, record) => (
        <div className={styles.buttonContainer}>
          <Cbutton
            origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
            onClick={() => navigate(`detail/${record.id}`)}
          >
            Xem hồ sơ
          </Cbutton>
        </div>
      ),
    },
  ];
  const handleNavigate = () => {
    navigate("create-account");
  };
  return (
    <div>
      <div className={styles.headerLine}>
        <div className={styles.searchBarName}>
          <SearchBar
            fields={[
              { key: "name", placeholder: "Tên tài khoản", type: "text" },
              {
                key: "role",
                placeholder: "Loại tài khoản",
                type: "dropdown",
                options: [
                  "Sinh viên",
                  "Phụ huynh",
                  "Tư vấn viên",
                  "Quản lý",
                  "Tất cả",
                ],
              },
            ]}
            onSearch={handleSearch}
          />
        </div>
        <Cbutton className={styles.navigateButton} onClick={handleNavigate}>
          Tạo mới tài khoản
        </Cbutton>
      </div>

      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : filteredData.length === 0 ? (
        <p className={styles.message}>Không có thông tin</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách tất cả người dùng</p>
          <AntDComponent dataSource={filteredData} columns={columns} />
        </div>
      )}
    </div>
  );
}

export default ManageUser;
