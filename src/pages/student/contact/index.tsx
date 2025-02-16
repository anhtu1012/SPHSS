import { Form, Input, Button, message } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Thông tin của bạn đã được gửi thành công!");
    form.resetFields();
  };

  return (
    <div className="contact-page">
      <h1 className="contact-page__title">Liên hệ với chúng tôi</h1>
      <p className="contact-page__subtitle">
        Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất
      </p>

      <div className="contact-page__content">
        <div className="contact-page__info">
          <h2>Thông tin liên hệ</h2>
          <div className="contact-info__item">
            <PhoneOutlined /> <span>1900 1234</span>
          </div>
          <div className="contact-info__item">
            <MailOutlined /> <span>support@yaghealth.com</span>
          </div>
          <div className="contact-info__item">
            <EnvironmentOutlined /> <span>FPT University, Hòa Lạc, Hà Nội</span>
          </div>
        </div>

        <div className="contact-page__form">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="message"
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi tin nhắn
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
