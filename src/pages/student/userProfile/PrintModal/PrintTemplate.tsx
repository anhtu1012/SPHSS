import { Card } from "antd";
import React from "react";

interface PrintTemplateProps {
  survey?: {
    title: string;
    date: string;
    responses: { question: string; answer: string; score: number }[];
  } | null;
}

const PrintTemplate = React.forwardRef<HTMLDivElement, PrintTemplateProps>(
  ({ survey }, ref) => {
    if (!survey) {
      return (
        <div ref={ref} style={{ padding: "20px", fontSize: "10px" }}>
          <p>Không có dữ liệu để in</p>
        </div>
      );
    }

    const chartData = [
      { name: "Trầm cảm", strength: 1 },
      { name: "Lo âu", strength: 2 },
      { name: "Căng thẳng", strength: 4 },
    ];

    const formatYAxis = (value: number) => {
      if (value === 1) return "Bình thường";
      if (value === 2) return "Nhẹ";
      if (value === 3) return "Trung bình";
      if (value === 4) return "Nặng";
      if (value === 5) return "Báo động";
      return "";
    };

    return (
      <div ref={ref} style={{ padding: "20px", fontSize: "12px" }}>
        {/* Survey Title & Date */}
        <h2 style={{ textAlign: "center", color: "#08509f" }}>
          {survey.title}
        </h2>
        <p style={{ textAlign: "center" }}>Ngày: {survey.date}</p>

        {/* Survey Score */}
        <h3 style={{ textAlign: "center", color: "#08509f" }}>
          Kết quả khảo sát
        </h3>
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#D32F2F",
          }}
        >
          63
        </div>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Điểm của bạn
        </p>

        {/* Chart as Table */}
        <h3 style={{ textAlign: "center", color: "#08509f" }}>
          Chi tiết kết quả
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            marginBottom: "20px",
          }}
          border={1}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th>Danh mục</th>
              <th>Mức độ</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{formatYAxis(item.strength)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Recommendation */}
        <h3 style={{ textAlign: "center", color: "#08509f" }}>Lời khuyên</h3>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#D32F2F",
            marginBottom: "10px",
          }}
        >
          Kết quả của bạn ở mức báo động. Bạn cần tìm đến chuyên gia tâm lý ngay
          lập tức!
        </p>

        {/* Survey Responses */}
        <h3 style={{ textAlign: "center", color: "#08509f" }}>
          Chi tiết câu trả lời
        </h3>
        {survey.responses.map((response, index) => (
          <Card
            key={index}
            style={{
              width: "100%",
              marginBottom: "10px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            <div style={{ fontSize: "12px", color: "#08509f" }}>
              {response.question}
            </div>
            <div className="answer" style={{ fontSize: "12px", color: "#333" }}>
              <strong>Trả lời:</strong> {response.answer} (Điểm:{" "}
              {response.score})
            </div>
          </Card>
        ))}
      </div>
    );
  }
);

PrintTemplate.displayName = "PrintTemplate";
export { PrintTemplate };
