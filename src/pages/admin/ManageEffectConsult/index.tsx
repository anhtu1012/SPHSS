import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd"; 
import SearchBar from "../../../components/cSearchbar/SearchBar";
import AntDComponent from "../../../components/cTableAntD";
import Cbutton from "../../../components/cButton";
import { ColumnsType } from "antd/es/table";
import styles from "./ManageEffectConsult.module.scss";

interface DataType {
  key: string;
  name: string;
  email: string;
  id: string;
  status: string;
  rating: number; 
}

const ManageEffectConsult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      id: "YA623",
      status: "active",
      rating: 4,
    },
    {
      key: "2",
      name: "dsbfsfbfs",
      email: "dsbfsfbfs@gmail.com",
      id: "YA001",
      status: "active",
      rating: 3,
    },
    {
      key: "3",
      name: "Nguyen Van B",
      email: "nguyenvanb@gmail.com",
      id: "YA003",
      status: "active",
      rating: 5,
    },
    {
      key: "4",
      name: "bndf",
      email: "bndf@gmail.com",
      id: "YA056",
      status: "active",
      rating: 2,
    },
    {
      key: "5",
      name: "Nguyen gn r fgn A",
      email: "nguyengnrfgn@gmail.com",
      id: "YA678",
      status: "inactive",
      rating: 4,
    },
  ]);

  const handleSearch = (values: Record<string, string>) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = data.filter(
        (item) =>
          (values.name
            ? item.name.toLowerCase().includes(values.name.toLowerCase())
            : true) &&
          (values.status && values.status !== "Tất cả"
            ? item.status === values.status
            : true)
      );

      setData(filteredData.length ? filteredData : []);
      setLoading(false);
    }, 1000);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Chuyên viên tư vấn",
      key: "userInfo",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.userName}>{record.name}</span>
          <br />
          {record.email}
          <br />
          <span className={styles.userId}>{record.id}</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "active" ? "Đang hoạt động" : "Không hoạt động",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Chi tiết",
      key: "action",
      render: () => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => navigate("detail")}
        >
          Xem chi tiết
        </Cbutton>
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
            options: ["Đang hoạt động", "Tạm dừng", "Tất cả"],
          },
        ]}
        onSearch={handleSearch}
      />
      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách chuyên viên tư vấn</p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ManageEffectConsult;
