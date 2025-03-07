import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Flex, Image, Radio } from "antd";
import { useParams } from "react-router-dom";
import styles from "./reportDetail.module.scss";
import Atus from "../../../assets/vtos.jpg";
import { CheckboxGroupProps } from "antd/es/checkbox";
import Cbutton from "../../../components/cButton";

function ReportDetail() {
  const { id } = useParams();
  console.log({ id });
  const student = {
    name: "Phạm Anh Tú",
    phone: "0912 345 676",
    gender: "Nam",
    age: 20,
    consultationDate: "18/01/2025",
    consultationTime: "08:00 - 10:00 A.M",
    status: "Đã thanh toán", // This should be fetched from the backend
  };

  const options: CheckboxGroupProps<string>["options"] = [
    { label: "Nhẹ", value: "1" },
    { label: "Trung bình", value: "2" },
    { label: "Nặng", value: "3" },
  ];

  return (
    <>
      <div className={styles.container}>
        <Image
          alt="ATUS"
          src={Atus}
          width={100}
          height={100}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

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
      <div className={styles.content}>
        <p>Báo cáo tư vấn tâm lý</p>
        <p>
          <div> Mức độ nghiêm trọng: </div>
          <Flex vertical gap="middle" style={{ paddingTop: "5px" }}>
            <Radio.Group block options={options} defaultValue="1" />
          </Flex>
        </p>
        <p>Nhận xét của bác sĩ:</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>Hướng dẫn và đề xuất:</p>
        <ul>
          <li>
            Khuyến nghị dành cho học sinh:
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </li>
            </ul>
          </li>
        </ul>

        <ul>
          <li>
            Hướng dẫn dành cho phụ huynh:
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div
        style={{
          paddingTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Cbutton>Lưu báo cáo</Cbutton>
      </div>
    </>
  );
}

export default ReportDetail;
