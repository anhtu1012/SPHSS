import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import Cbutton from "../../../components/cButton";
import AntDComponent from "../../../components/cTableAntD";

function ManageReport() {
  const navigate = useNavigate();

  const handleViewDetails = (student: any) => {
    // student chứa thông tin của học sinh hiện tại
    console.log("Thông tin học sinh: ", student);
    navigate(`/psychologist/manage-report/${student.id}`);
  };

  const dataSource = [
    {
      id: "1",
      name: "Nguyen Van A",
      MSSV: "SE1234",
      date: "18/01/2025",
      status: "Đã thanh toán",
      time: "08:00 - 10:00 A.M",
    },
    {
      id: "2",
      name: "Le Thi B",
      MSSV: "SE5678",
      date: "19/01/2025",
      status: "Đã thanh toán",
      time: "10:00 - 12:00 P.M",
    },
    {
      id: "3",
      name: "Tran Minh C",
      MSSV: "SE9101",
      date: "20/01/2025",
      status: "Đã thanh toán",
      time: "01:00 - 03:00 P.M",
    },
    {
      id: "4",
      name: "Pham Quoc D",
      MSSV: "SE1122",
      date: "21/01/2025",
      status: "Đã thanh toán",
      time: "09:00 - 11:00 A.M",
    },
    {
      id: "5",
      name: "Hoang Thi E",
      MSSV: "SE3344",
      date: "22/01/2025",
      status: "Chưa thanh toán",
      time: "02:00 - 04:00 P.M",
    },
    {
      id: "6",
      name: "Nguyen Minh F",
      MSSV: "SE5566",
      date: "23/01/2025",
      status: "Đã thanh toán",
      time: "11:00 - 01:00 P.M",
    },
  ];

  const columns: ColumnType[] = [
    {
      title: "Học sinh",
      dataIndex: "name",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "MSSV",
    },
    {
      title: "Ngày",
      dataIndex: "date",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
    },
    {
      title: "Báo cáo",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Cbutton onClick={() => handleViewDetails(record)}>Tạo báo cáo</Cbutton>
      ),
    },
  ];

  return (
    <div>
      <p style={{ color: "#888", fontSize: "15px", paddingTop: "15px" }}>
        Danh sách học sinh đã nhận tư vấn
      </p>
      <AntDComponent dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default ManageReport;
