import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Divider, Radio, Space, Row, Col } from "antd";
import { toast } from "react-toastify";
import { getDetailReport } from "../../../services/psychologist/api";

const { Title, Text, Paragraph } = Typography;

interface ReportData {
  full_name: string;
  user_email: string;
  user_phone: string;
  health_status: string;
  health_level: string;
  feedback: string;
  recommendations: string;
  full_name_pys: string;
  pys_email: string;
  pys_phone: string;
  start_time: string;
  end_time: string;
}

function DetailReport() {
  const { id } = useParams();

  const [data, setData] = useState<ReportData | null>(null);

  const fetchDetailReport = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getDetailReport(id);
      setData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi fetch data");
    }
  }, [id]);

  useEffect(() => {
    fetchDetailReport();
  }, [fetchDetailReport]);

  if (!data) return <Title level={4}>Đang tải dữ liệu...</Title>;

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "30px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Báo Cáo Chi Tiết
      </Title>

      <Row gutter={[24, 24]}>
        {/* Thông tin bệnh nhân */}
        <Col xs={24} lg={12}>
          <Card title="Thông Tin Bệnh Nhân" bordered style={{ height: "100%" }}>
            <Title level={5}>Họ tên:</Title> <Text>{data.full_name}</Text>{" "}
            <br />
            <Title level={5}>Email:</Title> <Text>{data.user_email}</Text>{" "}
            <br />
            <Title level={5}>Số điện thoại:</Title>{" "}
            <Text>{data.user_phone}</Text> <br />
          </Card>
        </Col>

        {/* Thông tin bác sĩ */}
        <Col xs={24} lg={12}>
          <Card title="Thông Tin Bác Sĩ" bordered style={{ height: "100%" }}>
            <Title level={5}>Họ tên:</Title> <Text>{data.full_name_pys}</Text>{" "}
            <br />
            <Title level={5}>Email:</Title> <Text>{data.pys_email}</Text> <br />
            <Title level={5}>Số điện thoại:</Title>{" "}
            <Text>{data.pys_phone}</Text> <br />
            <Title level={5}>Thời gian tư vấn:</Title>
            <Text>{`${data.start_time} - ${data.end_time}`}</Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Chi tiết sức khỏe */}
      <Card title="Chi Tiết Báo Cáo Sức Khỏe" bordered>
        <Title level={5}>Trạng thái sức khỏe:</Title>
        <Paragraph>{data.health_status}</Paragraph>

        <Space direction="vertical">
          <Title level={5}>Mức độ nghiêm trọng:</Title>
          <Radio.Group value={data.health_level}>
            <Radio value="Low">Nhẹ</Radio>
            <Radio value="Medium">Trung bình</Radio>
            <Radio value="High">Nặng</Radio>
          </Radio.Group>
        </Space>

        <Divider />

        <Title level={5}>Phản hồi từ bệnh nhân:</Title>
        <Paragraph>{data.feedback}</Paragraph>

        <Title level={5}>Khuyến nghị:</Title>
        <Paragraph>{data.recommendations}</Paragraph>
      </Card>
    </div>
  );
}

export default DetailReport;
