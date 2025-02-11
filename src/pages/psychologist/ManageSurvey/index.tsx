import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import AntDComponent from "../../../components/cTableAntD";
import { AppointmentData } from "../../../models/psy";
import { getAppointment } from "../../../services/psychologist/api";
import { formatDate } from "../../../utils/dateUtils";

function ManageSurvey() {
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [form] = useForm();
  const [rowData, setRowData] = useState<AppointmentData[]>([]);
  const fetchAppointment = useCallback(async () => {
    try {
      const res = await getAppointment();
      const data = res.data.data;
      if (data.length <= 0) {
        toast.warning("Chưa có lịch hẹn nào");
      }
      setRowData(data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, []);

  const handleViewDetails = (student: any) => {
    // student chứa thông tin của học sinh hiện tại
    console.log("Thông tin học sinh: ", student);
  };

  const columns: ColumnType[] = [
    {
      title: "Học sinh nhận tư vấn",
      dataIndex: "user",
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: "Ngày tư vấn",
      dataIndex: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "timeSlot",
      render: (timeSlot) => `${timeSlot.start_time}`,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "timeSlot",
      render: (timeSlot) => `${timeSlot.end_time}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Pending" ? "#EC744A" : "#08509F",
          }}
        >
          {status === "Pending" ? (
            <CloseCircleOutlined />
          ) : (
            <CheckCircleOutlined />
          )}{" "}
          {status}
        </span>
      ),
    },
    {
      title: "Tác vụ",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "12px" }}>
          <TiTickOutline
            size={30}
            color="orange"
            onClick={() => handleViewDetails(record)}
          />
          <ImCross color="red" size={20} style={{ marginTop: "5px" }} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAppointment();
  }, []);

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
