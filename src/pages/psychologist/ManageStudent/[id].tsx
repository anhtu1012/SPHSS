import { Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./manageStudent.module.scss";
import AntDComponent from "../../../components/cTableAntD";
import { ColumnType } from "antd/es/table";
import Cbutton from "../../../components/cButton";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function StudentDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  console.log({ id });
  const navigate = useNavigate();

  const handleViewReportDetails = () => {
    navigate(`/psychologist/manage-report/${id}`);
  };

  const dataSource = [
    {
      id: "1",
      question: "Bạn có thường cảm thấy buồn bã hoặc tuyệt vọng không?",
      answer:
        "Hầu như mỗi ngày, tôi cảm thấy không có động lực để làm bất cứ điều gì.",
    },
    {
      id: "2",
      question: "Bạn có gặp khó khăn trong việc ngủ hoặc ngủ quá nhiều không?",
      answer:
        "Tôi thường xuyên thức trắng đêm, dù rất mệt nhưng không thể ngủ được.",
    },
    {
      id: "3",
      question:
        "Bạn có cảm thấy mất hứng thú với những điều từng yêu thích không?",
      answer:
        "Trước đây tôi thích vẽ tranh, nhưng giờ tôi không còn thấy vui khi làm điều đó nữa.",
    },
    {
      id: "4",
      question: "Bạn có thường xuyên cảm thấy lo lắng hoặc căng thẳng không?",
      answer:
        "Lúc nào tôi cũng cảm thấy lo lắng, ngay cả khi không có lý do gì cụ thể.",
    },
    {
      id: "5",
      question: "Bạn có cảm thấy mình vô giá trị hoặc có lỗi về điều gì không?",
      answer: "Tôi luôn nghĩ rằng mình là gánh nặng cho mọi người xung quanh.",
    },
    {
      id: "6",
      question: "Bạn có gặp khó khăn trong việc tập trung không?",
      answer:
        "Tôi thường xuyên bị phân tâm, không thể tập trung vào công việc hay cuộc trò chuyện.",
    },
    {
      id: "7",
      question: "Bạn có từng có ý nghĩ làm hại bản thân hoặc tự tử không?",
      answer:
        "Đôi khi tôi nghĩ đến điều đó, nhưng tôi không biết phải nói với ai.",
    },
    {
      id: "8",
      question: "Bạn có cảm thấy cô đơn hoặc bị cô lập không?",
      answer:
        "Dù có nhiều người xung quanh, tôi vẫn cảm thấy mình đang một mình.",
    },
    {
      id: "9",
      question:
        "Bạn có thấy bản thân dễ nổi nóng hoặc khó kiểm soát cảm xúc không?",
      answer: "Tôi dễ bị kích động và đôi khi la hét mà không kiểm soát được.",
    },
  ];

  const columns: ColumnType[] = [
    {
      title: "Câu hỏi",
      dataIndex: "question",
    },
    {
      title: "Câu trả lời",
      dataIndex: "answer",
    },
  ];

  const student = {
    name: "Phạm Anh Tú",
    phone: "0912 345 676",
    gender: "Nam",
    age: 20,
    consultationDate: "18/01/2025",
    consultationTime: "08:00 - 10:00 A.M",
    status: "Đã thanh toán", // This should be fetched from the backend
  };

  return (
    <>
      <div className={styles.container}>
        <Image alt="ATUS" />
        <div className={styles.firstInfo}>
          <p>Tên: {student.name}</p>
          <p>Số điện thoại: {student.phone}</p>
          <p>Giới tính: {student.gender}</p>
          <p>Tuổi: {student.age}</p>
        </div>
        <div>
          <p>Ngày tư vấn: {student.consultationDate}</p>
          <p>Giờ tư vấn: {student.consultationTime}</p>
          <p>
            Trạng thái:{" "}
            <span
              style={{
                color:
                  student.status === "Chưa thanh toán" ? "#EC744A" : "#08509F",
              }}
            >
              {student.status === "Chưa thanh toán" ? (
                <CloseCircleOutlined />
              ) : (
                <CheckCircleOutlined />
              )}{" "}
              {student.status}
            </span>
          </p>
        </div>
      </div>
      <AntDComponent dataSource={dataSource} columns={columns} />
      <Cbutton onClick={() => handleViewReportDetails()}>Xem báo cáo</Cbutton>
    </>
  );
}

export default StudentDetail;
