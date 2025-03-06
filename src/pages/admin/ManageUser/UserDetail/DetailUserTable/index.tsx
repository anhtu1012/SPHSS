import Cbutton from "../../../../../components/cButton";
import AntDComponent from "../../../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";

interface UserProfileTableProps {
  accountType: string;
  showModal: (record: any, type: "consult" | "survey") => void;
}

const UserProfileTable: React.FC<UserProfileTableProps> = ({ accountType, showModal }) => {
  const columns: ColumnType<any>[] =
    ["R1", "R2"].includes(accountType)
      ? [
          {
            title: "Ngày chẩn đoán",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Chẩn đoán",
            dataIndex: "diagnosis",
            key: "diagnosis",
            render: (text: string) => (text.length > 35 ? `${text.substring(0, 35)}...` : text),
          },
          {
            title: "Chi tiết báo cáo",
            dataIndex: "action",
            key: "action_consult",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "consult")}>Báo cáo</Cbutton>
            ),
          },
          {
            title: "Chi tiết khảo sát",
            dataIndex: "action",
            key: "action_survey",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "survey")}>Khảo sát</Cbutton>
            ),
          },
          
        ]
      : [
          {
            title: "Người được khảo sát",
            dataIndex: "studentName",
            key: "studentName",
          },
          {
            title: "Ngày khảo sát",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Chi tiết báo cáo",
            dataIndex: "action",
            key: "action_consult",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "consult")}>Báo cáo</Cbutton>
            ),
          },
          {
            title: "Chi tiết khảo sát",
            dataIndex: "action",
            key: "action_survey",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record, "survey")}>Khảo sát</Cbutton>
            ),
          },
          
        ];
  const data =
    ["R1", "R2"].includes(accountType)
      ? [
          {
            key: "1",
            date: "12/12/2024",
            diagnosis: "Rối loạn căng thẳng sau chấn thương (PTSD)",
            note: "Phải liên hệ phụ huynh",
          },
          {
            key: "2",
            date: "12/12/2024",
            diagnosis: "Rối loạn nhân cách chống đối xã hội",
            note: "",
          },
        ]
      : [
          {
            key: "1",
            date: "10/01/2025",
            studentName: "Nguyễn Văn A",
            email: "nguyenvana@mail.com",
            id: "SE170123",
            rating: 3,
          },
          {
            key: "2",
            date: "15/01/2025",
            studentName: "Lê Thị B",
            email: "nguyenvana@mail.com",
            id: "SE170123",
            rating: 4,
          },
        ];

  return <AntDComponent dataSource={data} columns={columns} />;
};

export default UserProfileTable;
