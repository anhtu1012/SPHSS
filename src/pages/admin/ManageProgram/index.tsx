import { useState, useEffect } from "react";
import { Dropdown, Menu, Pagination } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import styles from "./ManageProgram.module.scss";
import { useNavigate } from "react-router-dom";
import Cbutton from "../../../components/cButton";
import { Program } from "../../../models/admin";
import {
  getAllPrograms,
  deleteProgramId,
  updateProgramInfo,
} from "../../../services/admin/api";
import EditProgramModal from "./PopupEditProgram";
import dayjs from "dayjs";

const ProgramActions = ({
  onView,
  onDelete,
  onEdit,
}: {
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="view" onClick={onView} style={{ color: "green" }}>
        <SearchOutlined style={{ marginRight: 8 }} />
        Xem chi tiết
      </Menu.Item>
      <Menu.Item key="edit" onClick={onEdit} style={{ color: "#08509f" }}>
        <EditOutlined style={{ marginRight: 8 }} />
        Chỉnh sửa
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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredData, setFilteredData] = useState<Program[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [programToEdit, setProgramToEdit] = useState<Program | null>(null);

  const openEditModal = (program: Program) => {
    setProgramToEdit(program);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setProgramToEdit(null);
  };

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await getAllPrograms();
      console.log("API response:", response.data);
      const programList = response.data.data || [];
      setPrograms(programList);
      setFilteredData(programList);
    } catch (error) {
      console.error("Lỗi khi tải chương trình:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleUpdateProgram = async (values: Partial<Program>) => {
    if (!programToEdit) return;
    try {
      await updateProgramInfo(programToEdit.programId, {
        ...programToEdit,
        ...values,
      });
      await fetchPrograms();
      closeEditModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật chương trình:", error);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const response = await getAllPrograms();
        console.log("API response:", response.data);
        const programList = response.data.data || [];
        setPrograms(programList);
        setFilteredData(programList);
      } catch (error) {
        console.error("Lỗi khi tải chương trình:", error);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  const handleSearch = (values: Record<string, string>) => {
    const searchTitle = values.name?.toLowerCase().trim() || "";
    const searchPrice = values.price?.trim() || "";
    if (!searchTitle && !searchPrice) {
      setFilteredData(programs);
      return;
    }
    const filtered = programs.filter((program) => {
      const matchTitle = searchTitle
        ? program.title.toLowerCase().includes(searchTitle)
        : true;
      const matchPrice = searchPrice
        ? program.price.toString().includes(searchPrice)
        : true;
      return matchTitle && matchPrice;
    });
    setFilteredData(filtered);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  const openDeleteModal = (program: Program) => {
    setProgramToDelete(program);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProgramToDelete(null);
  };
  const confirmDelete = async () => {
    if (programToDelete) {
      try {
        await deleteProgramId(programToDelete.programId);
        setPrograms((prev) =>
          prev.filter((item) => item.programId !== programToDelete.programId)
        );
        closeDeleteModal();
      } catch (error) {
        console.error("Lỗi khi xóa chương trình:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.headerLine}>
        <div className={styles.searchBarName}>
          <SearchBar
            fields={[
              { key: "name", placeholder: "Tên chương trình", type: "text" },
              { key: "price", placeholder: "Giá vé", type: "text" },
            ]}
            onSearch={handleSearch}
          />
        </div>
        <Cbutton
          className={styles.navigateButton}
          onClick={() => navigate("create-program")}
        >
          Tạo chương trình
        </Cbutton>
      </div>
      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ): filteredData.length === 0 ? (
        <p className={styles.message}>Không có thông tin</p>
      ) : (
        <div className={styles.tagContainer}>
          <p className={styles.sectionTitle}>Danh sách tất cả chương trình</p>
          <div className={styles.programList}>
            {currentData.map((item) => (
              <div key={item.programId} className={styles.programCard}>
                <div className={styles.headerRow}>
                  <h3 className={styles.nameProgram}>{item.title}</h3>
                  <ProgramActions
                    onView={() =>
                      navigate(
                        `/manager/list-support-program/view/${item.programId}`, {
                state: item,
              }
                      )
                    }
                    onEdit={() => openEditModal(item)}
                    onDelete={() => openDeleteModal(item)}
                  />
                </div>
                <p className={styles.price}>
                  <MoneyCollectOutlined /> {item.price}
                </p>
                <p>
                  <CalendarOutlined />{" "}
                  {dayjs(item.startDate).format("DD/MM/YYYY")} -{" "}
                  {dayjs(item.endDate).format("DD/MM/YYYY")}
                </p>
                <p className={styles.price}>
                  {" "}
                  <UsergroupAddOutlined />
                  {item.targetAudience}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              className={styles.pagination}
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
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
            <p>Bạn muốn xóa "{programToDelete.title}" không?</p>
            <Cbutton onClick={confirmDelete} className={styles.deleteBtn}>
              Xóa
            </Cbutton>
            <Cbutton onClick={closeDeleteModal} className={styles.cancelBtn}>
              Hủy
            </Cbutton>
          </div>
        </div>
      )}
      {showEditModal && programToEdit && (
        <EditProgramModal
          isOpen={showEditModal}
          program={programToEdit}
          onUpdate={handleUpdateProgram}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default ManageProgram;
