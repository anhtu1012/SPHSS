import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import AntDComponent from "../../../components/cTableAntD";
import Cbutton from "../../../components/cButton";
import { ColumnsType } from "antd/es/table";
import styles from "./ManageEffectConsult.module.scss";
import { User } from "../../../models/admin";
import { getUserRole } from "../../../services/admin/api";

const ManageEffectConsult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserRole("R3");
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
    const searchStatus = values.status?.trim();
    if (!searchName && (!searchStatus || searchStatus === "Tất cả")) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`
        .trim()
        .toLowerCase();
      const matchName = searchName ? fullName.includes(searchName) : true;
      const matchStatus =
        searchStatus && searchStatus !== "Tất cả"
          ? statusMap[user.status.toString()] === searchStatus
          : true;
      return matchName && matchStatus;
    });
    setFilteredData(filtered);
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
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: () => <Rate disabled defaultValue={4} />,
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

  return (
    <div>
      <SearchBar
        fields={[
          { key: "name", placeholder: "Tên người dùng", type: "text" },
          {
            key: "status",
            placeholder: "Trạng thái tài khoản",
            type: "dropdown",
            options: ["Đang hoạt động", "Đã khóa", "Tất cả"],
          },
        ]}
        onSearch={handleSearch}
      />

      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : filteredData.length === 0 ? (
        <p className={styles.message}>Không có thông tin</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách tư vấn viên</p>
          <AntDComponent dataSource={filteredData} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ManageEffectConsult;
