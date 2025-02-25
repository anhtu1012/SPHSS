import AntDComponent from "../../../components/cTableAntD";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import { useState } from "react";
import Cbutton from "../../../components/cButton";
import styles from "./manageUser.module.scss";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

interface StudentRecord {
  key: string;
  user: string;
  id: string;
  status: string;
  type: string;
}


function ManageUser() {
  const navigate = useNavigate();
  const columns : ColumnsType<StudentRecord> = [
    {
      title: "Tài khoản",
      dataIndex: "user",
      key: "user",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.userName}>{record.user || "N/A"}</span>
          <br />
          <span className={styles.userId}>{record.id || "Chưa có ID"}</span>
        </div>
      ),
    },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Loại tài khoản", dataIndex: "type", key: "type" },
    {
      title: "Hồ sơ",
      key: "action",
      render: () => (
        <div className={styles.buttonContainer}>
          <Cbutton
            origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
            onClick={() => navigate("detail")}
          >
            Xem hồ sơ
          </Cbutton>
        </div>
      ),
    },
  ];
  
  const [data, setData] = useState<StudentRecord[]>([
    {
      key: "1",
      user: "NGUYEN VAN A",
      id: "YA623",
      status: "Đang hoạt động",
      type: "Học/sinh viên",
    },
    { key: "2", user: "TRAN THI B", 
      id: "YA623", status: "Tạm dừng", type: "Phụ huynh" },
    {
      key: "3",
      user: "LE VAN C",
      id: "YA623",
      status: "Đang hoạt động",
      type: "Tư vấn viên",
    },
    {
      key: "4",
      user: "PHAM THI D",
      id: "YA623",
      status: "Tạm dừng",
      type: "Học/sinh viên",
    },
    {
      key: "5",
      user: "HOANG VAN E",
      id: "YA623",
      status: "Đang hoạt động",
      type: "Phụ huynh",
    },
    { key: "6", user: "DO THI F",
      id: "YA623", status: "Tạm dừng", type: "Tư vấn viên" },
    {
      key: "7",
      user: "VU VAN G",
      id: "YA623",
      status: "Đang hoạt động",
      type: "Học/sinh viên",
    },
    { key: "8", user: "BUI THI H",
      id: "YA623",status: "Tạm dừng", type: "Phụ huynh" },
    {
      key: "9",
      user: "DANG VAN I",
      id: "YA623",
      status: "Đang hoạt động",
      type: "Tư vấn viên",
    },
    {
      key: "10",
      user: "CAO THI J",
      id: "YA623",
      status: "Tạm dừng",
      type: "Học/sinh viên",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (values: Record<string, string>) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = data.filter(
        (item) =>
          (values.name ? item.user.includes(values.name.toUpperCase()) : true) &&
          (values.status && values.status !== "Tất cả"
            ? item.status === values.status
            : true) &&
          (values.type && values.type !== "Tất cả" ? item.type === values.type : true)
      );
  
      setData(filteredData.length ? filteredData : []); 
      setLoading(false);
    }, 1000);
  };
  

  return (
    <div>
      <SearchBar
        fields={[
          { key: "name", placeholder: "Tên người dùng", type: "text" },
          {
            key: "status",
            placeholder: "Trạng thái tài khoản",
            type: "dropdown",
            options: ["Đang hoạt động", "Tạm dừng", "Tất cả"],
          },
          {
            key: "type",
            placeholder: "Loại tài khoản",
            type: "dropdown",
            options: ["Học/sinh viên", "Phụ huynh", "Tư vấn viên", "Tất cả"],
          },
        ]}
        onSearch={handleSearch}
      />
      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách người dùng</p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
}


export default ManageUser;
