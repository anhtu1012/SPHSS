import Cbutton from "../../../../../components/cButton";
import AntDComponent from "../../../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";
import { Rate } from "antd";

interface UserProfileTableProps {
  accountType: string;
  showModal: (record: any) => void;
}

const UserProfileTable: React.FC<UserProfileTableProps> = ({ accountType, showModal }) => {
  const columns: ColumnType<any>[] =
    ["Học/sinh viên", "Phụ huynh"].includes(accountType)
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
            title: "Xem chi tiết",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record)}>Xem</Cbutton>
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
            title: "Chi tiết khảo sát",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
              <Cbutton onClick={() => showModal(record)}>Chi tiết</Cbutton>
            ),
          },
          {
            title: "Đánh giá tư vấn",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => <Rate disabled value={rating || 0} />,
          },
        ];

  // ✅ Đã gán data vào dataSource, tránh truyền [] rỗng
  const data =
    ["Học/sinh viên", "Phụ huynh"].includes(accountType)
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
