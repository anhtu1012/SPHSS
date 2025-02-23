import { Modal } from "antd";
import "./userProfile.scss";
import { useState } from "react";

interface SurveyResponse {
  question: string;
  answer: string;
  score: number;
}

interface Survey {
  id: number;
  title: string;
  date: string;
  responses: SurveyResponse[];
}

function SurveyHistory() {
  const [selectedSurvey, setSelectedSurvey] = useState<{
    id: number;
    title: string;
    date: string;
    responses: { question: string; answer: string; score: number }[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mock data for survey responses
  const surveyResponses = [
    {
      id: 1,
      title: "Khảo sát trầm cảm",
      date: "05/01/2023",
      responses: [
        {
          question: "Bạn có thường xuyên cảm thấy buồn không?",
          answer: "Thỉnh thoảng",
          score: 2,
        },
        {
          question: "Bạn có gặp khó khăn khi ngủ không?",
          answer: "Hiếm khi",
          score: 1,
        },
        {
          question: "Bạn có cảm thấy mệt mỏi và thiếu năng lượng không?",
          answer: "Thường xuyên",
          score: 3,
        },
      ],
    },
    {
      id: 2,
      title: "Khảo sát lo âu",
      date: "10/02/2023",
      responses: [
        {
          question: "Bạn có thường xuyên cảm thấy căng thẳng không?",
          answer: "Thường xuyên",
          score: 3,
        },
        {
          question: "Bạn có hay lo lắng về tương lai không?",
          answer: "Rất thường xuyên",
          score: 4,
        },
      ],
    },
  ];

  const showSurveyDetail = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="user-profile__survey-list">
        {surveyResponses.map((survey) => (
          <div
            key={survey.id}
            className="survey-list-item"
            onClick={() => showSurveyDetail(survey)}
          >
            <div className="survey-list-item__title">{survey.title}</div>
            <div className="survey-list-item__date">{survey.date}</div>
          </div>
        ))}
      </div>
      <Modal
        title={selectedSurvey?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedSurvey && (
          <div className="survey-detail-modal">
            {selectedSurvey.responses.map((response, index) => (
              <div key={index} className="survey-detail-modal__item">
                <div className="question">{response.question}</div>
                <div className="answer">
                  Trả lời: {response.answer} (Điểm: {response.score})
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default SurveyHistory;
