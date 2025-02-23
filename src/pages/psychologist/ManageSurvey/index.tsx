import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import AntDComponent from "../../../components/cTableAntD";
import { AppointmentData } from "../../../models/psy";
import {
  getAppointmentsByPsychologist,
  updateStatusAppointment,
} from "../../../services/psychologist/api";
import { formatDate } from "../../../utils/dateUtils";
import { RootState } from "../../../redux/RootReducer";
import { useSelector } from "react-redux";

function ManageSurvey() {
  const [rowData, setRowData] = useState<AppointmentData[]>([]);
  const [userID, setUserID] = useState("");
  const user = useSelector((state: RootState) => state.user) as any | null;

  useEffect(() => {
    if (user && user.id) {
      setUserID(user.id);
    }
  }, [user]);

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
  }, [fetchAppointment, userID]);

  const handleUpdateStatus = useCallback(async (id: string, status: string) => {
    const res = await updateStatusAppointment(id, { status });
    if (res) {
      toast.success("Cập nhật trạng thái thành công");
      fetchAppointment();
    } else {
      toast.error("Cập nhật trạng thái thất bại");
    }
  }, []);

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
      title: "Tác vụ",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <TiTickOutline
            size={30}
            style={{ cursor: "pointer" }}
            color="orange"
            onClick={() =>
              handleUpdateStatus(record.appointment_id, "Approved")
            }
          />
          <ImCross
            color="red"
            size={20}
            style={{ marginTop: "5px", cursor: "pointer" }}
            onClick={() =>
              handleUpdateStatus(record.appointment_id, "Cancelled")
            }
          />
        </div>
      ),
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
