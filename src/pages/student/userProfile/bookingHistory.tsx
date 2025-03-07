import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AntDComponent from "../../../components/cTableAntD";
import { RootState } from "../../../redux/RootReducer";
import { getReports } from "../../../services/psychologist/api";
import { getAppointmentByUser } from "../../../services/student/PsychologistDetail/api";
import { formatDate } from "../../../utils/dateUtils";
import { Modal } from "antd";
import styles from "./modal.module.scss";

interface Report {
  appointment_id: string;
  report_id: string;
  appointment_date: string;
  appointment_status: string;
  end_time: string;
  feedback: string;
  full_name: string;
  health_level: string;
  health_status: string;
  start_time: string;
  student_id: string;
  user_email: string;
  user_phone: string;
  full_name_pys: string;
  pys_email: string;
  pys_phone: string;
  recommendations: string;
  createdAt: string;
}

function BookingHistory() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [booking, setBooking] = useState([]);
  const [reportData, setReportData] = useState<Report[]>([]);
  const user = useSelector((state: RootState) => state.user) as any | null;
  const userID = user.id;

  const handleOpenModal = (report: Report) => {
    setSelectedReport(report);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReport(null);
  };

  const fetchReports = useCallback(async () => {
    try {
      const res = await getReports();
      setReportData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi lấy danh sách báo cáo");
    }
  }, []);

  const fetchAppointment = useCallback(async () => {
    try {
      const res = await getAppointmentByUser(userID);
      const data = res.data.data;
      if (data.length < 0) {
        toast.info("Không có lịch hẹn nào");
      }
      setBooking(data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  }, []);

  const columns: ColumnType[] = [
    {
      title: "Bác sĩ",
      dataIndex: ["firstNamePys", "lastNamePys"],
      render: (_: any, record: any) =>
        `${record.firstNamePys} ${record.lastNamePys}`,
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
      title: "Link",
      dataIndex: "linkMeeting",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Link Meeting
          </a>
        ) : (
          ""
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color = "#08509F";
        let icon = <CheckCircleOutlined />;

        if (status === "Pending") {
          color = "#EC744A";
          icon = <AiOutlineLoading3Quarters />;
        } else if (status === "Cancelled") {
          color = "red";
          icon = <CloseCircleOutlined />;
        }

        return (
          <span style={{ color }}>
            {icon} {status}
          </span>
        );
      },
    },
    {
      title: "Báo cáo",
      dataIndex: "report",
      render: (_, record) => {
        const report = reportData.find(
          (r: any) => String(r.appointment_id) === record.appointment_id
        );

        return report ? (
          <a onClick={() => handleOpenModal(report)}>Xem chi tiết</a>
        ) : (
          ""
        );
      },
    },
  ];

  useEffect(() => {
    fetchAppointment();
    fetchReports();
  }, []);

  return (
    <div>
      <AntDComponent dataSource={booking} columns={columns} />
      <Modal
        open={openModal}
        onCancel={handleCloseModal}
        footer={null}
        width={750}
      >
        <div className={styles.popupContainer}>
          <h2 className={styles.title}>BÁO CÁO CHI TIẾT BUỔI TƯ VẤN</h2>

          {selectedReport ? (
            <>
              <div className={styles.infoGrid}>
                <div>
                  <p>NGÀY TƯ VẤN</p>
                  <span className={styles.highlight}>
                    {formatDate(selectedReport.appointment_date)}
                  </span>
                </div>
                <div>
                  <p>THỜI GIAN</p>
                  <span className={styles.highlight}>
                    {selectedReport.start_time || "-"} -{" "}
                    {selectedReport.end_time}
                  </span>
                </div>
                <div>
                  <p>TRẠNG THÁI BUỔI TƯ VẤN</p>
                  <span className={styles.highlight}>
                    {selectedReport.appointment_status === "Completed"
                      ? "Đã hoàn thành"
                      : "-"}
                  </span>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div>
                  <p>CHUYÊN VIÊN TƯ VẤN</p>
                  <span className={styles.highlight}>
                    {selectedReport.full_name_pys || "-"}
                  </span>
                </div>
                <div>
                  <p>EMAIL</p>
                  <span className={styles.highlight}>
                    {selectedReport.pys_email}
                  </span>
                </div>
                <div>
                  <p>ĐIỆN THOẠI LIÊN HỆ</p>
                  <span className={styles.highlight}>
                    {selectedReport.pys_phone}
                  </span>
                </div>
              </div>

              <div className={styles.infoDetails}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>HỌ VÀ TÊN SINH VIÊN</strong>
                      </td>
                      <td>{selectedReport.full_name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MSSV</strong>
                      </td>
                      <td>{selectedReport.student_id}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Thông tin cá nhân</strong>
                      </td>
                      <td>
                        Email: {selectedReport.user_email} <br /> Phone:{" "}
                        {selectedReport.user_phone}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MỨC ĐỘ SỨC KHỎE</strong>
                      </td>
                      <td>{getHealthLevelText(selectedReport.health_level)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tình trạng sức khỏe</strong>
                      </td>
                      <td>{selectedReport.health_status || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ĐÁNH GIÁ TỪ NGƯỜI TƯ VẤN</strong>
                      </td>
                      <td>{selectedReport.feedback || "-"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>GHI CHÚ</strong>
                      </td>
                      <td>{selectedReport.recommendations || "-"}</td>
                    </tr>
                  </tbody>
                </table>
                <div className={styles.footerReport}>
                  <p>Mã báo cáo: {selectedReport.report_id || "-"}</p>
                  <p>Ngày tạo: {selectedReport.createdAt || "-"}</p>
                  <p>Người tạo: {selectedReport.full_name_pys || "-"}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Không có dữ liệu báo cáo.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

const getHealthLevelText = (level: string | null | undefined) => {
  switch (level) {
    case "Low":
      return "Thấp";
    case "Medium":
      return "Trung Bình";
    case "Hard":
      return "Nặng";
    default:
      return "-";
  }
};

export default BookingHistory;
