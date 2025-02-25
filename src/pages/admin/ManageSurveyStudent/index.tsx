import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import AntDComponent from "../../../components/cTableAntD";
import Cbutton from "../../../components/cButton";
import { ColumnsType } from "antd/es/table";
import styles from "./ManageSurvey.module.scss";

interface DataType {
  key: string;
  name: string;
  type: string;
  id: string;
}

const ManageEffectConsult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "Buổi tư vấn của CV Nguyễn Cảnh Hoàng",
      type: "Khảo sát tư vấn",
      id: "KSTV0002",
    },
    {
      key: "2",
      name: "HIV và những con số đáng kinh ngạc",
      type: "Khảo sát chương trình",
      id: "KSCT0009",
    },
    {
      key: "3",
      name: "Buổi tư vấn của CV Lương Mỹ Hoa",
      type: "Khảo sát tư vấn",
      id: "KSTV0007",
    },
    {
      key: "4",
      name: "Khảo sát tuần 3 kì SP24",
      type: "Khảo sát mỗi tuần",
      id: "KST0087",
    },
    {
      key: "5",
      name: "Buổi tư vấn của CV Nguyễn Như Ngọc",
      type: "Khảo sát tư vấn",
      id: "KSTV0019",
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
          (values.type && values.type !== "Tất cả"
            ? item.type === values.type
            : true)
      );

      setData(filteredData.length ? filteredData : []);
      setLoading(false);
    }, 1000);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khảo sát",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.surveyName}>{record.name}</span>
          <br />
          <span className={styles.id}>{record.id || "Chưa có ID"}</span>
        </div>
      ),
    },
    {
      title: "Kiểu khảo sát",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <div className={styles.surveyInfoContainer}>
          <span className={styles.surveyType}>{record.type}</span>
        </div>
      ),
    },
    {
      title: "Chi tiết",
      key: "action",
      render: () => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => navigate("view")}
        >
          Xem chi tiết
        </Cbutton>
      ),
    },
  ];
  const handleNavigate = () => {
    navigate("create-survey");
  };

  return (
    <div>
      <div className={styles.headerLine}>
        <div className={styles.searchBarName}>
          <SearchBar
            fields={[
              { key: "name", placeholder: "Tên khảo sát", type: "text" },
              {
                key: "type",
                placeholder: "Loại khảo sát",
                type: "dropdown",
                options: [
                  "Khảo sát tư vấn",
                  "Khảo sát chương trình",
                  "Khảo sát mỗi tuần",
                  "Tất cả",
                ],
              },
            ]}
            onSearch={handleSearch}
          />
        </div>

        <Cbutton className={styles.navigateButton} onClick={handleNavigate}>
          Tạo khảo sát
        </Cbutton>
      </div>

      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : (
        <div className={styles.tableContainer}>
          <p className={styles.sectionTitle}>Danh sách chương trình</p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ManageEffectConsult;
