/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AntDComponent from "../../../components/cTableAntD";
import SearchBar from "../../../components/cSearchbar/SearchBar";
import styles from "./manageDashboard.module.scss";
import dayjs from "dayjs";
import Cbutton from "../../../components/cButton";
import PopupInfoConsult from "../ManageUser/PopupViewInfoConsult";

interface StudentRecord {
  key: string;
  mssv: string;
  date: string;
  diagnosis: string;
  note: string;
}

const chartData = [
  {
    name: "T1",
    ASD: 50,
    Antisocial: 100,
    Depression: 30,
    Anxiety: 80,
    PTSD: 90,
  },
  {
    name: "T2",
    ASD: 80,
    Antisocial: 150,
    Depression: 60,
    Anxiety: 110,
    PTSD: 120,
  },
  {
    name: "T3",
    ASD: 120,
    Antisocial: 200,
    Depression: 100,
    Anxiety: 140,
    PTSD: 180,
  },
  {
    name: "T4",
    ASD: 180,
    Antisocial: 250,
    Depression: 150,
    Anxiety: 200,
    PTSD: 240,
  },
  {
    name: "T5",
    ASD: 90,
    Antisocial: 170,
    Depression: 80,
    Anxiety: 110,
    PTSD: 130,
  },
  {
    name: "T6",
    ASD: 50,
    Antisocial: 100,
    Depression: 40,
    Anxiety: 80,
    PTSD: 90,
  },
];

function ManageDashboard() {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState(null);

  const showModal = (record: any) => {
    setSelectedConsult(record);
    setIsModalOpen(true);
  };
  
  const columns = [
    { title: "MSSV", dataIndex: "mssv", key: "mssv" },
    {
      title: "Ngày chuẩn đoán",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    { title: "Chuẩn đoán", dataIndex: "diagnosis", key: "diagnosis" },
    {
      title: "Xem chi tiết",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: StudentRecord) => (
  
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => showModal(record)}
        >
          Xem
        </Cbutton>
      ),
    },
    { title: "Ghi chú", dataIndex: "note", key: "note" },
  ];

  const handleSearch = async (values: Record<string, string>) => {
    console.log("Tìm kiếm:", values);
    setLoading(true);
    setShowTable(true);

    setTimeout(() => {
      const mockData: StudentRecord[] = [
        {
          key: "1",
          mssv: "SE1701",
          date: new Date("2024-12-12").toISOString(),
          diagnosis: "PTSD",
          note: "Phải liên hệ phụ huynh",
        },
        {
          key: "2",
          mssv: "SE1702",
          date: new Date("2024-12-13").toISOString(),
          diagnosis: "Depression",
          note: "Cần theo dõi thêm",
        },
        {
          key: "3",
          mssv: "SE1701",
          date: new Date("2024-12-13").toISOString(),
          diagnosis: "Antisocial",
          note: "Phải liên hệ phụ huynh",
        },
        {
          key: "4",
          mssv: "SE1702",
          date: new Date("2024-12-15").toISOString(),
          diagnosis: "ASD",
          note: "Cần theo dõi thêm",
        },
      ];
      setData(mockData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <SearchBar
        title="Báo cáo chi tiết"
        fields={[
          { key: "school", placeholder: "Trường", type: "text" },
          { key: "class", placeholder: "Lớp", type: "text" },
          {
            key: "gender",
            placeholder: "Giới tính",
            type: "dropdown",
            options: ["Nam", "Nữ", "Tất cả"],
          },
        ]}
        onSearch={handleSearch}
      />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ASD"
            stroke="#003f88"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Antisocial"
            stroke="#0c660c"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Depression"
            stroke="#78b6ff"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Anxiety"
            stroke="#b6ff78"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="PTSD"
            stroke="#ec744a"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {loading ? (
        <p className={styles.message}>Đang tải dữ liệu...</p>
      ) : showTable ? (
        data.length > 0 ? (
          <div className={styles.tableContainer}>
            <p>Danh sách học/sinh viên</p>
            <AntDComponent dataSource={data} columns={columns} />
          </div>
        ) : (
          <p className={styles.message}>Không có dữ liệu</p>
        )
      ) : null}
      {selectedConsult && (
        <PopupInfoConsult
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          consultData={selectedConsult}
        />
      )}
    </div>
  );
}

export default ManageDashboard;
