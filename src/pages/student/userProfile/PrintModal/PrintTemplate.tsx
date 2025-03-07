import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Survey } from "../surveyHistory";
import { formatDate } from "../../../../utils/dateUtils";

interface PrintTemplateProps {
  survey?: Survey;
  onImageReady?: () => void;
}

const PrintTemplate = React.forwardRef<HTMLDivElement, PrintTemplateProps>(
  ({ survey, onImageReady }, ref) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartImage, setChartImage] = useState<string | null>(null);

    useEffect(() => {
      const captureChart = async () => {
        if (chartRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const canvas = await html2canvas(chartRef.current, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            foreignObjectRendering: true,
          });

          const imageData = canvas.toDataURL("image/png");
          console.log("Chart Image Data:", imageData); // 🔍 Debug: Xem ảnh có được tạo không
          setChartImage(imageData);
          if (onImageReady) {
            onImageReady();
          }
        }
      };

      captureChart();
    }, [survey, onImageReady]);


    if (!survey) {
      return (
        <div ref={ref} style={{ padding: "20px", fontSize: "10px" }}>
          <p>Không có dữ liệu để in</p>
        </div>
      );
    }

    const chartData = [
      { name: "Trầm cảm", strength: getStrength(survey.depressionLevel) },
      { name: "Lo âu", strength: getStrength(survey.anxietyLevel) },
      { name: "Căng thẳng", strength: getStrength(survey.stressLevel) },
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
        <h2 style={{ textAlign: "center", color: "#08509f" }}>
          {survey.survey.title}
        </h2>
        <p style={{ textAlign: "center" }}>
          Ngày: {formatDate(survey.survey.createdAt)}
        </p>

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
          {survey.depressionScore + survey.anxietyScore + survey.stressScore}
        </div>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Điểm của bạn
        </p>

        <h3 style={{ textAlign: "center", color: "#08509f" }}>
          Chi tiết kết quả
        </h3>

        {/* Nếu đang in, hiển thị ảnh, nếu không hiển thị biểu đồ */}
        {chartImage ? (
          <img src={chartImage} alt="Chart" style={{ width: "100%" }} />
        ) : (
          <div ref={chartRef}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={formatYAxis}
                  domain={[0, 5]}
                  tickCount={6}
                />
                <Bar
                  dataKey="strength"
                  fill="#B3CDAD"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <h3 style={{ textAlign: "center", color: "#08509f" }}>Lời khuyên</h3>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#D32F2F",
            marginBottom: "10px",
          }}
        >
          {getResultInterpretation(
            survey.depressionScore + survey.anxietyScore + survey.stressScore
          )}
        </p>
      </div>
    );
  }
);

PrintTemplate.displayName = "PrintTemplate";
export { PrintTemplate };

function getResultInterpretation(score: number) {
  if (score >= 0 && score <= 9) {
    return "Bạn đang ở mức bình thường. Tiếp tục duy trì lối sống lành mạnh.";
  } else if (score >= 10 && score <= 13) {
    return "Bạn có dấu hiệu nhẹ của vấn đề tâm lý. Hãy theo dõi sức khỏe tinh thần.";
  } else if (score >= 14 && score <= 20) {
    return "Bạn đang có dấu hiệu trung bình của vấn đề tâm lý. Nên tìm chuyên gia tư vấn.";
  } else if (score >= 21 && score <= 27) {
    return "Mức độ cao, nên tìm chuyên gia càng sớm càng tốt.";
  }
  return "Mức báo động! Cần hỗ trợ tâm lý ngay lập tức!";
}

function getStrength(level: any) {
  switch (level) {
    case "Normal":
      return 1;
    case "Mild":
      return 2;
    case "Moderate":
      return 3;
    case "Severe":
      return 4;
    case "Extremely Severe":
      return 5;
    default:
      return 0;
  }
}
