import { Modal, Form, Input, Radio, Button } from "antd";
import { useEffect } from "react";
import { ReportData } from "../../../models/psy";
import { createReport } from "../../../services/psychologist/api";
import { toast } from "react-toastify";

const healthLevels = [
  { label: "Nhẹ", value: "Low" },
  { label: "Trung bình", value: "Medium" },
  { label: "Nặng", value: "High" },
];

const ModalReport = ({ isOpen, onClose, report }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (report) {
      form.setFieldsValue({
        health_level: "Low",
        health_status: "",
        feedback: "",
        recommendations: "",
      });
    }
  }, [report, form]);

  const handleSubmit = async (values: ReportData) => {
    if (!report) return;
    console.log("Dữ liệu gửi xuống API:", values);
    try {
      await createReport(report.appointment_id, values);
      toast.success("Báo cáo đã được lưu thành công!");
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Lỗi khi tạo báo cáo!");
    }
  };

  return (
    <Modal
      title="Tạo báo cáo tư vấn"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Lưu báo cáo
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Chọn mức độ sức khỏe */}
        <Form.Item
          label="Mức độ nghiêm trọng"
          name="health_level"
          rules={[{ required: true, message: "Vui lòng chọn mức độ sức khỏe" }]}
        >
          <Radio.Group
            style={{ display: "flex", justifyContent: "center", gap: "30px" }}
          >
            {healthLevels.map((level) => (
              <Radio key={level.value} value={level.value}>
                {level.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        {/* Trạng thái sức khỏe */}
        <Form.Item
          label="Trạng thái sức khỏe"
          name="health_status"
          rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
        >
          <Input.TextArea rows={5} placeholder="Nhập trạng thái sức khỏe" />
        </Form.Item>

        {/* Phản hồi của bệnh nhân */}
        <Form.Item
          label="Phản hồi của bệnh nhân"
          name="feedback"
          rules={[{ required: true, message: "Vui lòng nhập phản hồi" }]}
        >
          <Input.TextArea rows={5} placeholder="Nhập phản hồi" />
        </Form.Item>

        {/* Đề xuất và khuyến nghị */}
        <Form.Item
          label="Khuyến nghị"
          name="recommendations"
          rules={[{ required: true, message: "Vui lòng nhập khuyến nghị" }]}
        >
          <Input.TextArea rows={5} placeholder="Nhập khuyến nghị" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalReport;
