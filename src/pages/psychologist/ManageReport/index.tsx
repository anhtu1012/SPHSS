import { CheckCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cbutton from "../../../components/cButton";
import AntDComponent from "../../../components/cTableAntD";
import { RootState } from "../../../redux/RootReducer";
import { getFinishAppointment } from "../../../services/psychologist/api";
import { formatDate } from "../../../utils/dateUtils";
import ModalReport from "./ModalReport";

function ManageReport() {
  const [rowData, setRowData] = useState([]);
  const [userID, setUserID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const user = useSelector((state: RootState) => state.user) as any | null;

  useEffect(() => {
    if (user && user.id) {
      setUserID(user.id);
    }
  }, [user]);

  const handleOpenModal = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const fetchFinishMeeting = useCallback(async () => {
    try {
      const res = await getFinishAppointment(userID);
      const data = res.data.data;
      if (data.length <= 0) {
        toast.warning("Chưa có lịch hẹn nào");
      }
      setRowData(data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, [userID]);

  useEffect(() => {
    fetchFinishMeeting();
  }, [fetchFinishMeeting, userID]);

  const columns: ColumnType[] = [
    {
      title: "Học sinh nhận tư vấn",
      dataIndex: "fullName",
    },
    {
      title: "Ngày tư vấn",
      dataIndex: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => {
        let color = "#08509F";
        let icon = <CheckCircleOutlined />;
        return (
          <div>
            <span style={{ color }}>
              {icon} {record.status}
            </span>
          </div>
        );
      },
    },
    {
      title: "Báo cáo",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Cbutton onClick={() => handleOpenModal(record)}>Tạo báo cáo</Cbutton>
      ),
    },
  ];

  return (
    <div>
      <p style={{ color: "#888", fontSize: "15px", paddingTop: "15px" }}>
        Danh sách học sinh đã nhận tư vấn
      </p>
      <AntDComponent dataSource={rowData} columns={columns} />
      <ModalReport
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
      />
    </div>
  );
}

export default ManageReport;
