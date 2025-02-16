/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CalendarOutlined,
  DollarOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";

// Define or import DoctorType and TimeSlotType
interface DoctorType {
  id: string;
  name: string;
  // Add other properties as needed
}

interface TimeSlotType {
  startTime: string;
  endTime: string;
  // Add other properties as needed
}

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: DoctorType;
  selectedSlot: TimeSlotType | null;
  selectedDate: Date;
  onSubmit: (values: any) => void;
}

const AppointmentForm = ({
  isOpen,
  onClose,
  doctor,
  selectedSlot,
  selectedDate,
  onSubmit,
}: AppointmentFormProps) => {
  const [form] = Form.useForm();

  if (!selectedSlot) {
    return null;
  }

  return (
    <Modal
      title="Đặt lịch tư vấn"
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      okButtonProps={{ disabled: !selectedSlot }}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          appointmentDate: dayjs(selectedDate),
        }}
      >
        <div className="appointment-info">
          <p>
            <UserOutlined className="info-icon" />
            <strong>Bác sĩ:</strong> {doctor.name}
          </p>
          <p>
            <CalendarOutlined className="info-icon" />
            <strong>Thời gian:</strong> {selectedSlot.startTime} -{" "}
            {selectedSlot.endTime}
          </p>
          <p>
            <DollarOutlined className="info-icon" />
            <strong>Phí tư vấn:</strong> 200.000đ
          </p>
        </div>

        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="appointmentDate"
          label="Ngày hẹn"
          rules={[{ required: true, message: "Vui lòng chọn ngày hẹn" }]}
        >
          <DatePicker
            className="appointment-date-picker"
            format="DD/MM/YYYY"
            prefix={<CalendarOutlined />}
          />
        </Form.Item>

        <Form.Item name="notes" label="Ghi chú">
          <Input.TextArea placeholder="Nhập ghi chú cho buổi tư vấn" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentForm;
