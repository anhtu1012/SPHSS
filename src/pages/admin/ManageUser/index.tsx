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
    const searchUsername = values.username?.toLowerCase() || "";
    const searchEmail = values.email?.toLowerCase() || "";
  
    if (!searchUsername && !searchEmail) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((user) => {
      const matchUsername = user.username?.toLowerCase().includes(searchUsername);
      const matchEmail = user.email?.toLowerCase().includes(searchEmail);
      return (searchUsername && matchUsername) || (searchEmail && matchEmail);
    });
    setFilteredData(filtered);
  };
  

  const roleMap: Record<string, string> = {
    R1: "Student",
    R2: "Parent",
    R3: "Psychologist",
    R4: "Manager",
  }; 
  const columns: ColumnsType<User> = [
    {
      title: "Tài khoản",
      dataIndex: "username",
      key: "username",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.userName}>{record.username || "N/A"}</span>
          <br />
          <span className={styles.userId}>
            {record.userCode || "Chưa có ID"}
          </span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Loại tài khoản",
      dataIndex: "role",
      key: "role",
      render: (role) => roleMap[role] || "Unknown",
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

  return (
    <div>
      <SearchBar
        fields={[
          { key: "username", placeholder: "Tên người dùng", type: "text" },
          { key: "email", placeholder: "Tên người dùng", type: "text" },
        ]}
        onSearch={handleSearch}
      />
      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : filteredData.length === 0 ? (
        <p className={styles.message}>Không có thông tin</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách người dùng</p>
          <AntDComponent dataSource={filteredData} columns={columns} />
        </div>
      )}
    </div>
  );
}

export default ManageUser;
