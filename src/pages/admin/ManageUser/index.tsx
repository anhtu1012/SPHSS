import AntDComponent from "../../../components/cTableAntD";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import { useState } from "react";
import { Button } from "antd";
import styles from "./manageUser.module.scss";

interface StudentRecord {
  key: string;
  user: string;
  status: string;
  type: string;
}

const columns = [
  { title: "Tài khoản", dataIndex: "user", key: "user" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
  { title: "Loại tài khoản", dataIndex: "type", key: "type" },
  {
    title: "Hồ sơ",
    key: "action",
    render: () => (
      <div className={styles.buttonContainer}>
        <Button type="primary" className={styles.customButton}>
          Xem hồ sơ
        </Button>
      </div>
    ),
  },
];

function ManageUser() {
  const [data, setData] = useState<StudentRecord[]>([
    {
      key: "1",
      user: "NGUYEN VAN A",
      status: "Đang hoạt động",
      type: "Học/sinh viên",
    },
    { key: "2", user: "TRAN THI B", status: "Tạm dừng", type: "Phụ huynh" },
    {
      key: "3",
      user: "LE VAN C",
      status: "Đang hoạt động",
      type: "Tư vấn viên",
    },
    {
      key: "4",
      user: "PHAM THI D",
      status: "Tạm dừng",
      type: "Học/sinh viên",
    },
    {
      key: "5",
      user: "HOANG VAN E",
      status: "Đang hoạt động",
      type: "Phụ huynh",
    },
    { key: "6", user: "DO THI F", status: "Tạm dừng", type: "Tư vấn viên" },
    {
      key: "7",
      user: "VU VAN G",
      status: "Đang hoạt động",
      type: "Học/sinh viên",
    },
    { key: "8", user: "BUI THI H", status: "Tạm dừng", type: "Phụ huynh" },
    {
      key: "9",
      user: "DANG VAN I",
      status: "Đang hoạt động",
      type: "Tư vấn viên",
    },
    {
      key: "10",
      user: "CAO THI J",
      status: "Tạm dừng",
      type: "Học/sinh viên",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (values: Record<string, string>) => {
    console.log("Tìm kiếm:", values);
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

      setData(filteredData);
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
          <p>Danh sách người dùng</p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
}


export default ManageUser;
