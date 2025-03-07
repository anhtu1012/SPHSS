import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "../../../components/Carousel";
import { getSurveys } from "../../../services/student/PsychologistDetail/api";
import "./survey.scss";
import { Survey } from "../../../models/student";

const surveyData = [
  {
    id: "68",
    title: "Trắc nghiệm đánh giá trầm cảm",
    description:
      "Đánh giá mức độ trầm cảm thông qua bộ câu hỏi Beck Depression Inventory (BDI).",
    image:
      "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2025/1/8/3-1736310917246225981750.jpg",
  },
  {
    id: "68",
    title: "Trắc nghiệm đánh giá lo âu",
    description:
      "Đánh giá mức độ lo âu dựa trên thang đánh giá Hamilton Anxiety Rating Scale (HAM-A).",
    image:
      "https://iphd.vn/wp-content/uploads/2024/09/bai-test-roi-loan-lo-au-5-1.jpg",
  },
  {
    id: "68",
    title: "Trắc nghiệm tính cách",
    description: "Đánh giá các đặc điểm tính cách dựa trên mô hình Big Five.",
    image: "https://innocom.vn/wp-content/uploads/2020/04/pic_MTBI.jpg",
  },
];

function SurveyList() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const fetchAllSurveys = useCallback(async () => {
    try {
      const res = await getSurveys();
      const data = res.data.data;
      setSurveys(data);
    } catch (error) {
      toast.error("Lỗi xảy ra khi lấy dữ liệu: " + error);
    }
  }, []);

  useEffect(() => {
    fetchAllSurveys();
  }, []);

  return (
    <div className="survey__container">
      <h1 className="survey__title">Khảo sát tâm lý trắc nghiệm</h1>
      <p className="survey__subtitle">
        Chọn một bài trắc nghiệm dưới đây để bắt đầu đánh giá tâm lý của bạn
      </p>
      <Carousel                                                                                                                                
        items={surveyData}
        renderItem={(survey) => (
          <div
            key={survey.id}
            className="survey__carousel-item"
            onClick={() => navigate(`/survey/${survey.id}`)}
          >
            <div className="survey__carousel-image-container">
              <img
                src={survey.image}
                alt={survey.title}
                className="survey__carousel-image"
              />
              <button
                className="survey__carousel-button"
                onClick={() => navigate(`/survey/${survey.id}`)}
              >
                Bắt đầu khảo sát
              </button>
              <div className="survey__carousel-overlay">
                <h3 className="survey__carousel-title">{survey.title}</h3>
                <p className="survey__carousel-description">
                  {survey.description}
                </p>
              </div>
            </div>
          </div>
        )}
      />

      <div className="survey__grid">
        {surveys.map((survey) => (
          <div key={survey.surveyId} className="survey__card">
            <h2 className="survey__card-title">{survey.title}</h2>
            <p className="survey__card-description">{survey.description}</p>
            <div className="survey__card-meta">
              <span>⏱ 10-20 phút</span>
              <span>❓ 21 câu hỏi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurveyList;
