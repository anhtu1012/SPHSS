import { useState } from "react";
import { Input, Form, Select, message } from "antd";
import { Account } from "../../../../models/admin";
import { createUser } from "../../../../services/admin/api";
import styles from "./CreateAccount.module.scss";
import Cbutton from "../../../../components/cButton";

const { Option } = Select;

const CreateAccount = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Account) => {
    setIsSubmitting(true);
    try {
      await createUser({ ...values, createdBy: "admin", password:"123456" });
      form.resetFields();
      message.success("Tạo tài khoản thành công!");
    } catch (err: any) {
      console.error("Error:", err.response ? err.response.data : err);
      message.error("Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TẠO MỚI TÀI KHOẢN</h2>
      <div className={styles.mainContent}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className={styles.inputForm}>
            <Form.Item label="Tên người dùng" name="username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="ID/MSSV" name="userCode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div className={styles.inputForm}>
            <Form.Item label="Họ và tên đệm" name="firstName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên" name="lastName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div className={styles.inputForm}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div className={styles.inputForm}>
            <Form.Item label="Giới tính" name="gender" initialValue="male" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Loại tài khoản" name="roleCode" initialValue="R1" rules={[{ required: true }]}>
              <Select>
                <Option value="R1">Sinh viên</Option>
                <Option value="R2">Phụ huynh</Option>
                <Option value="R3">Tư vấn viên</Option>
              </Select>
            </Form.Item>
          </div>

          <Cbutton
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Đang tạo..." : "Tạo người dùng"}
          </Cbutton>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
