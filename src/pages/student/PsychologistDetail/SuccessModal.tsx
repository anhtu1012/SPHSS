/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CalendarOutlined,
  DollarOutlined,
  FolderViewOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import "./index.scss";

interface AppointmentDetails {
  doctorName: string;
  startTime: string;
  endTime: string;
  date: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  appointmentDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointmentDetails: AppointmentDetails;
}) => {
  const { doctorName, startTime, endTime, date } = appointmentDetails;
  return (
    <Modal
      title="Đặt lịch tư vấn thành công"
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      width={600}
    >
      <div className="success-info">
        <p>
          <UserOutlined className="info-icon" />
          <strong>Bác sĩ:</strong> {doctorName}
        </p>
        <p>
          <CalendarOutlined className="info-icon" />
          <strong>Thời gian:</strong> {dayjs(date).format("DD/MM/YYYY")} -{" "}
          {startTime} - {endTime}
        </p>
        <p>
          <DollarOutlined className="info-icon" />
          <strong>Phí tư vấn:</strong> 300.000đ
        </p>
        <p>
          <FolderViewOutlined className="info-icon" />
          <strong>Thông tin chi tiết:</strong> Hồ sơ cá nhân
        </p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
