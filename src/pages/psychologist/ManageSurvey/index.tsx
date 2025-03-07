import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AntDComponent from "../../../components/cTableAntD";
import { AppointmentData } from "../../../models/psy";
import { RootState } from "../../../redux/RootReducer";
import {
  getAppointmentsByPsychologist,
  getReports,
  updateStatusAppointment,
} from "../../../services/psychologist/api";
import { formatDate } from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

interface Report {
  appointment_id: string;
  report_id: string;
}

function ManageSurvey() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState<AppointmentData[]>([]);
  const [reportData, setReportData] = useState<Report[]>([]);
  const [userID, setUserID] = useState("");
  const user = useSelector((state: RootState) => state.user) as any | null;

  useEffect(() => {
    if (user && user.id) {
      setUserID(user.id);
    }
  }, [user]);

  const handleNavigateToDetail = (reportId: string) => {
    navigate(`/psychologist/manage-survey/${reportId}`);
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
      const res = await getAppointmentsByPsychologist(userID);
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
    fetchAppointment();
    fetchReports();
  }, [fetchAppointment, fetchReports, userID]);

  const handleUpdateStatus = useCallback(
    async (id: string, status: string, linkMeeting?: string) => {
      const res = await updateStatusAppointment(id, { status, linkMeeting });
      if (res) {
        toast.success(res?.data.message);
        fetchAppointment();
      } else {
        toast.error("Cập nhật trạng thái thất bại");
      }
    },
    [rowData]
  );

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

        if (record.status === "Pending") {
          color = "#EC744A";
          icon = <AiOutlineLoading3Quarters />;
        } else if (record.status === "Cancelled") {
          color = "red";
          icon = <CloseCircleOutlined />;
        }

        return (
          <div>
            <span style={{ color }}>
              {icon} {record.status}
            </span>
            {record.status === "Approved" && record.linkMeeting && (
              <div>
                <a
                  href={record.linkMeeting}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: "1px solid  #66a3ff",
                    borderRadius: "10px",
                    backgroundColor: " #66a3ff",
                    color: "White",
                    fontWeight: "bold",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  Link Meeting
                </a>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Tác vụ",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <TiTickOutline
            size={30}
            style={
              record.status == "Pending"
                ? { cursor: "pointer" }
                : { cursor: "not-allowed", opacity: 0.3 }
            }
            color="orange"
            onClick={() => {
              if (record.status == "Pending") {
                handleUpdateStatus(
                  record.appointment_id,
                  "Approved",
                  "https://meet.google.com/zdo-mqvm-fcm"
                );
              }
            }}
          />
          <ImCross
            color="red"
            size={20}
            style={
              record.status != "Cancelled"
                ? { marginTop: "5px", cursor: "pointer" }
                : { marginTop: "5px", cursor: "not-allowed", opacity: 0.3 }
            }
            onClick={() => {
              if (record.status != "Cancelled") {
                handleUpdateStatus(record.appointment_id, "Cancelled");
              }
            }}
          />
        </div>
      ),
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "5px",
        }}
      >
        <p style={{ color: "#888", fontSize: "15px", paddingTop: "15px" }}>
          Danh sách lịch hẹn
        </p>
      </div>
      <AntDComponent dataSource={rowData} columns={columns} />
    </div>
  );
}

export default ManageSurvey;
