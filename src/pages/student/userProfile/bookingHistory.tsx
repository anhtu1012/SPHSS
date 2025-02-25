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

function BookingHistory() {
  const [booking, setBooking] = useState([]);
  const user = useSelector((state: RootState) => state.user) as any | null;
  const userID = user.id;

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
  ];

  useEffect(() => {
    fetchAppointment();
  }, []);

  return (
    <div>
      <AntDComponent dataSource={booking} columns={columns} />
    </div>
  );
}

export default BookingHistory;
