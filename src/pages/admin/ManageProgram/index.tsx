import { useState } from "react";
import { Dropdown, Menu, Pagination } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import styles from "./ManageProgram.module.scss";
import { useNavigate } from "react-router-dom";
import Cbutton from "../../../components/cButton";

interface DataType {
  key: string;
  name: string;
  sitInProgram: string;
  detail: string;
  status: string;
}

const ProgramActions = ({
  onView,
  onDelete,
}: {
  onView: () => void;
  onDelete: () => void;
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="view" onClick={onView} style={{ color: "green" }}>
        <SearchOutlined style={{ marginRight: 8 }} />
        Xem chi tiết
      </Menu.Item>
      <Menu.Item key="delete" onClick={onDelete} style={{ color: "red" }}>
        <DeleteOutlined style={{ marginRight: 8 }} />
        Xóa chương trình
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <button
        className="more-button"
        onClick={(e) => e.preventDefault()}
        aria-label="Tùy chọn chương trình"
        title="Tùy chọn chương trình"
      >
        <MoreOutlined className="more-icon" />
      </button>
    </Dropdown>
  );
};

const ManageProgram = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      name: "HIV và AIDS",
      sitInProgram: "35 người",
      detail:
        "Our collective efforts can foster a healthy and joyful community.",
      status: "active",
    },
    {
      key: "2",
      name: "Làm thế nào để giảm mệt mỏi",
      sitInProgram: "Lớp SE1702",
      detail:
        "Our collective efforts can foster a healthy and joyful community. Remember, neither happiness nor good health can be bought, so it's our responsibility to cherish and nurture them in ourselves and in those around us.",
      status: "active",
    },
    {
      key: "3",
      name: "Tôi và cơn giận của mình",
      sitInProgram: "35 người",
      detail:
        "Our collective efforts can foster a healthy and joyful community. Remember, neither happiness nor good health can be bought, so it's our responsibility to cherish and nurture them in ourselves and in those around us.",
      status: "active",
    },
    {
      key: "4",
      name: "Tăng cường trí nhớ hiệu quả",
      sitInProgram: "Lớp SE1703",
      detail:
        "Improving memory requires a combination of healthy habits, proper nutrition, and mental exercises. Stay curious and keep learning!",
      status: "active",
    },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<DataType | null>(null);

  const handleSearch = (values: Record<string, string>) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = data.filter(
        (item) =>
          (values.name ? item.name.includes(values.name) : true) && 
          (values.status && values.status !== "Tất cả"
            ? item.status === values.status
            : true)
      );
      setData(filteredData.length ? filteredData : []);
      setLoading(false);
    }, 1000);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const openDeleteModal = (program: DataType) => {
    setProgramToDelete(program);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProgramToDelete(null);
  };

  const confirmDelete = () => {
    if (programToDelete) {
      setData((prev) => prev.filter((item) => item.key !== programToDelete.key));
      closeDeleteModal();
    }
  };
  const handleNavigate = () => {
    navigate("create-program");
  };


  return (
    <div>
      <div className={styles.headerLine}>
      <SearchBar
        fields={[
          { key: "name", placeholder: "Tên chương trình", type: "text" },
          {
            key: "status",
            placeholder: "Trạng thái",
            type: "dropdown",
            options: ["Đang hoạt động", "Tạm dừng", "Tất cả"],
          },
        ]}
        onSearch={handleSearch}
      />
      <Cbutton
          className={styles.navigateButton}
          onClick={handleNavigate}
        >
          Tạo chương trình
        </Cbutton>
      </div>
      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : (
        <div className={styles.tagContainer}>
          <p className={styles.sectionTitle}>Danh sách chương trình</p>
          <div className={styles.programList}>
            {currentData.map((item) => (
              <div key={item.key} className={styles.programCard}>
                <div className={styles.headerRow}>
                  <h3 className={styles.nameProgram}>{item.name}</h3>
                  <ProgramActions
                    onView={() => navigate("view")}
                    onDelete={() => openDeleteModal(item)}
                  />
                </div>
                <p className={styles.sitInProgram}>
                  <UserOutlined className={styles.iconPeople} />
                  {item.sitInProgram}
                </p>
                <p className={styles.detail}>
                  {item.detail.length > 80
                    ? item.detail.slice(0, 80) + "..."
                    : item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              className={styles.pagination}
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={(page, newPageSize) => {
                setCurrentPage(page);
                if (newPageSize !== pageSize) {
                  setPageSize(newPageSize);
                  setCurrentPage(1);
                }
              }}
            />
          </div>
        </div>
      )}

      {showDeleteModal && programToDelete && (
        <div className={styles.customModal}>
          <div className={styles.modalContent}>
            <p>Bạn muốn xóa "{programToDelete.name}" không?</p>
            <Cbutton onClick={confirmDelete} className={styles.deleteBtn}>Xóa</Cbutton>
            <Cbutton onClick={closeDeleteModal} className={styles.cancelBtn}>Hủy</Cbutton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProgram;