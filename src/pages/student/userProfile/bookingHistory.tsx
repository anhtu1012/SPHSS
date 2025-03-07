import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AntDComponent from "../../../components/cTableAntD";
import { RootState } from "../../../redux/RootReducer";
import { getAppointmentByUser } from "../../../services/student/PsychologistDetail/api";
import { formatDate } from "../../../utils/dateUtils";
import { getReports } from "../../../services/psychologist/api";
import { useNavigate } from "react-router-dom";

interface Report {
  appointment_id: string;
  report_id: string;
}

function BookingHistory() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [reportData, setReportData] = useState<Report[]>([]);
  const user = useSelector((state: RootState) => state.user) as any | null;
  const userID = user.id;

  const handleNavigateToDetail = (appointmentId: string) => {
    navigate(`/user-profile/${appointmentId}`);
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
          <a onClick={() => handleNavigateToDetail(report.appointment_id)}>
            Xem chi tiết
          </a>
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
    </div>
  );
}

export default BookingHistory;
