import { ColumnType } from "antd/es/table";
import Cbutton from "../../../components/cButton";
import AntDComponent from "../../../components/cTableAntD";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import { useNavigate } from "react-router-dom";

// interface studentData {
//   name: string;
//   age: number;
//   address: string;
// }

function ManageStudent() {
  // const [rowData, setRowData] = useState<studentData[]>([]);
  // const fetchListStudent = useCallback(async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://66938df6c6be000fa07c06e5.mockapi.io/studentList"
  //     );
  //     const data = res.data;
  //     if (data.length <= 0) {
  //       toast.warning("nofind");
  //     } else {
  //       toast.success("successs");
  //     }
  //     setRowData(data);
  //   } catch (error: any) {
  //     toast.error(error.response?.data || "Error fetching data");
  //   }
  // }, []);
  // useEffect(() => {
  //   fetchListStudent();
  // }, []);
  const navigate = useNavigate();

  const handleViewDetails = (student: any) => {
    // student chứa thông tin của học sinh hiện tại
    console.log("Thông tin học sinh: ", student);
    navigate(`/psychologist/manage-student/${student.id}`);
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
    {
      id: "7",
      name: "Mai Thi G",
      MSSV: "SE7788",
      date: "24/01/2025",
      status: "Chưa thanh toán",
      time: "03:00 - 05:00 P.M",
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
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Chưa thanh toán" ? "#EC744A" : "#08509F",
          }}
        >
          {status === "Chưa thanh toán" ? (
            <CloseCircleOutlined />
          ) : (
            <CheckCircleOutlined />
          )}{" "}
          {status}
        </span>
      ),
    },
    {
      title: "Chi tiết",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Cbutton onClick={() => handleViewDetails(record)}>Xem</Cbutton>
      ),
    },
  ];

  const handleSearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <SearchBar
        fields={[
          { key: "name", placeholder: "Tên học sinh", type: "text" },
          {
            key: "status",
            placeholder: "Trạng thái thanh toán",
            type: "dropdown",
            options: ["Đã thanh toán", "Chưa thanh toán"],
          },
        ]}
        onSearch={handleSearch}
      />
      <p style={{ color: "#888", fontSize: "15px", paddingTop: "15px" }}>
        Danh sách học sinh đã nhận tư vấn
      </p>
      <AntDComponent dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default ManageStudent;
