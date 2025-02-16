import { useNavigate } from "react-router-dom";
import "./survey.scss";

const surveys = [
  {
    id: "depression",
    title: "Trắc nghiệm đánh giá trầm cảm",
    description:
      "Đánh giá mức độ trầm cảm thông qua bộ câu hỏi Beck Depression Inventory (BDI)",
    duration: "10-15 phút",
    questions: 21,
  },
  {
    id: "anxiety",
    title: "Trắc nghiệm đánh giá lo âu",
    description:
      "Đánh giá mức độ lo âu dựa trên thang đánh giá Hamilton Anxiety Rating Scale (HAM-A)",
    duration: "8-12 phút",
    questions: 14,
  },
  {
    id: "stress",
    title: "Trắc nghiệm đánh giá stress",
    description: "Đánh giá mức độ stress dựa trên Perceived Stress Scale (PSS)",
    duration: "5-8 phút",
    questions: 10,
  },
  {
    id: "personality",
    title: "Trắc nghiệm tính cách",
    description: "Đánh giá các đặc điểm tính cách dựa trên mô hình Big Five",
    duration: "15-20 phút",
    questions: 25,
  },
];

function SurveyList() {
  const navigate = useNavigate();

  return (
    <div className="survey__container">
      <h1 className="survey__title">Khảo sát tâm lý trắc nghiệm</h1>
      <p className="survey__subtitle">
        Chọn một bài trắc nghiệm dưới đây để bắt đầu đánh giá tâm lý của bạn
      </p>

      <div className="survey__grid">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="survey__card"
            onClick={() => navigate(`/survey/${survey.id}`)}
          >
            <h2 className="survey__card-title">{survey.title}</h2>
            <p className="survey__card-description">{survey.description}</p>
            <div className="survey__card-meta">
              <span>⏱ {survey.duration}</span>
              <span>❓ {survey.questions} câu hỏi</span>
            </div>
            <button className="survey__start-button">Bắt đầu làm bài</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurveyList;
