import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import AntDComponent from "../../../components/cTableAntD";
import Cbutton from "../../../components/cButton";
import { ColumnsType } from "antd/es/table";
import styles from "./ManageSurvey.module.scss";
import { getAllSurvey, getCategory } from "../../../services/admin/api";
import { Survey, CategorySurvey } from "../../../models/admin";

const ManageEffectConsult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Survey[]>([]); 
  const [categories, setCategories] = useState<CategorySurvey[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [surveyRes, categoryRes] = await Promise.all([
          getAllSurvey(),
          getCategory(),
        ]);
        const surveys = surveyRes.data.data;
        const categories = categoryRes.data.data;
        if (Array.isArray(surveys) && Array.isArray(categories)) {
          setData(surveys);
          setCategories(categories);
        } else {
          console.error("API trả về dữ liệu không hợp lệ:", {
            surveys: surveyRes.data,
            categories: categoryRes.data,
          });
          setData([]);
          setCategories([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setData([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.categoryId === categoryId)?.name || "Không xác định";
  };

  const columns: ColumnsType<Survey> = [
    {
      title: "Tên khảo sát",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.surveyName}>{record.title}</span>
          <br />
          <span className={styles.id}>ID: {record.surveyId}</span>
        </div>
      ),
    },
    {
      title: "Loại khảo sát",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (_, record) => {
        const categoryName = record.categoryId !== undefined 
          ? getCategoryName(record.categoryId.toString()) 
          : "Không xác định"; 
        return (
          <div className={styles.surveyInfoContainer}>
            <span className={styles.surveyType}>{categoryName}</span>
          </div>
        );
      },
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_, record) => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => navigate(`view/${record.surveyId}`)}
        >
          Xem chi tiết
        </Cbutton>
      ),
    },    
  ];

  const handleSearch = (values: Record<string, string>) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = data.filter(
        (item) =>
          (values.name
            ? item.title.toLowerCase().includes(values.name.toLowerCase())
            : true) &&
          (values.surveyId
            ? item.surveyId?.toLowerCase().includes(values.surveyId.toLowerCase())
            : true)
      );
  
      setData(filteredData);
      setLoading(false);
    }, 1000);
  };
  

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
              { key: "surveyId", placeholder: "Mã khảo sát", type: "text" },
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
          <p className={styles.sectionTitle}>Danh sách khảo sát</p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ManageEffectConsult;
