import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Radio, Progress } from "antd";
import type { RadioChangeEvent } from "antd";
import { motion } from "framer-motion";
import "./surveyQuestion.scss";

// Mock data - in real app, this would come from an API
const mockQuestions = {
  depression: [
    {
      id: 1,
      question:
        "Trong 2 tuần vừa qua, bạn có thường xuyên cảm thấy chán nản, trầm cảm hoặc tuyệt vọng không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Vài ngày" },
        { value: 2, label: "Hơn nửa số ngày" },
        { value: 3, label: "Gần như mỗi ngày" },
      ],
    },
    {
      id: 2,
      question:
        "Bạn có thấy mất hứng thú hoặc niềm vui trong việc làm mọi thứ không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Vài ngày" },
        { value: 2, label: "Hơn nửa số ngày" },
        { value: 3, label: "Gần như mỗi ngày" },
      ],
    },
    {
      id: 3,
      question: "Bạn có gặp vấn đề về giấc ngủ (khó ngủ, ngủ quá nhiều)?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Vài ngày" },
        { value: 2, label: "Hơn nửa số ngày" },
        { value: 3, label: "Gần như mỗi ngày" },
      ],
    },
  ],
  anxiety: [
    {
      id: 1,
      question: "Bạn có cảm thấy lo lắng, bồn chồn hoặc căng thẳng không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Thỉnh thoảng" },
        { value: 2, label: "Thường xuyên" },
        { value: 3, label: "Liên tục" },
      ],
    },
    {
      id: 2,
      question: "Bạn có khó kiểm soát được những lo lắng của mình không?",
      options: [
        { value: 0, label: "Không hề" },
        { value: 1, label: "Thỉnh thoảng" },
        { value: 2, label: "Thường xuyên" },
        { value: 3, label: "Liên tục" },
      ],
    },
  ],
  stress: [
    {
      id: 1,
      question:
        "Trong tháng qua, bạn có thường xuyên cảm thấy căng thẳng và áp lực không?",
      options: [
        { value: 0, label: "Không bao giờ" },
        { value: 1, label: "Hiếm khi" },
        { value: 2, label: "Thỉnh thoảng" },
        { value: 3, label: "Thường xuyên" },
      ],
    },
    {
      id: 2,
      question:
        "Bạn có cảm thấy khó kiểm soát những điều quan trọng trong cuộc sống của mình không?",
      options: [
        { value: 0, label: "Không bao giờ" },
        { value: 1, label: "Hiếm khi" },
        { value: 2, label: "Thỉnh thoảng" },
        { value: 3, label: "Thường xuyên" },
      ],
    },
  ],
  personality: [
    {
      id: 1,
      question: "Tôi thấy mình là người hướng ngoại, thích giao tiếp",
      options: [
        { value: 0, label: "Hoàn toàn không đồng ý" },
        { value: 1, label: "Không đồng ý" },
        { value: 2, label: "Đồng ý" },
        { value: 3, label: "Hoàn toàn đồng ý" },
      ],
    },
    {
      id: 2,
      question: "Tôi là người có tổ chức và kế hoạch rõ ràng",
      options: [
        { value: 0, label: "Hoàn toàn không đồng ý" },
        { value: 1, label: "Không đồng ý" },
        { value: 2, label: "Đồng ý" },
        { value: 3, label: "Hoàn toàn đồng ý" },
      ],
    },
  ],
} as const;

function SurveyQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const questions = mockQuestions[id as keyof typeof mockQuestions] || [];
  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (e: RadioChangeEvent) => {
    setAnswers({ ...answers, [currentQuestion]: e.target.value });
  };

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, value) => sum + value,
      0
    );
    const maxPossibleScore = questions.length * 3; // Assuming max score per question is 3
    const percentageScore = (totalScore / maxPossibleScore) * 100;
    return {
      score: totalScore,
      percentage: percentageScore,
      level: getResultLevel(percentageScore),
      recommendations: getRecommendations(percentageScore),
    };
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResult();
      setFinalScore(result.score);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResult) {
    return (
      <div className="survey-result__container">
        <div className="survey-result__header">
          <h1 className="survey-result__header__title">Kết quả khảo sát</h1>
          <p className="survey-result__header__subtitle">
            Dựa trên câu trả lời của bạn
          </p>
        </div>

        <div className="survey-result__score">
          <div className="survey-result__score__value">{finalScore}</div>
          <div className="survey-result__score__label">Điểm của bạn</div>
        </div>

        <div className="survey-result__interpretation">
          <h2 className="survey-result__interpretation__title">
            Phân tích kết quả
          </h2>
          <p className="survey-result__interpretation__text">
            {getResultInterpretation(finalScore, questions.length)}
          </p>
        </div>

        <div className="survey-result__actions">
          <button className="primary" onClick={() => navigate("/survey")}>
            Quay lại danh sách khảo sát
          </button>
          <button className="secondary" onClick={() => window.print()}>
            Xuất kết quả
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div>Không tìm thấy bài khảo sát</div>;
  }

  return (
    <motion.div
      className="survey-question__container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Progress
        percent={progress}
        showInfo={false}
        className="survey-question__progress"
      />

      <motion.div
        className="survey-question__card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="survey-question__number">
          Câu hỏi {currentQuestion + 1}/{questions.length}
        </div>

        <h2 className="survey-question__text">
          {questions[currentQuestion].question}
        </h2>

        <motion.div
          className="survey-question__options"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Radio.Group onChange={handleAnswer} value={answers[currentQuestion]}>
            {questions[currentQuestion].options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="survey-question__option"
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        </motion.div>
      </motion.div>

      <motion.div
        className="survey-question__buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          className="survey-question__button survey-question__button--secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Quay lại
        </button>

        <button
          className="survey-question__button survey-question__button--primary"
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
        >
          {currentQuestion === questions.length - 1
            ? "Hoàn thành"
            : "Tiếp theo"}
        </button>
      </motion.div>
    </motion.div>
  );
}

// Helper functions
function getResultLevel(percentage: number) {
  if (percentage >= 75) return "Cao";
  if (percentage >= 50) return "Trung bình";
  return "Thấp";
}

function getResultInterpretation(score: number, totalQuestions: number) {
  const maxScore = totalQuestions * 3;
  const percentage = (score / maxScore) * 100;

  if (percentage >= 75) {
    return "Kết quả cho thấy bạn đang có dấu hiệu của vấn đề tâm lý ở mức độ cao. Chúng tôi khuyến nghị bạn nên tham khảo ý kiến chuyên gia tâm lý.";
  } else if (percentage >= 50) {
    return "Bạn đang có một số dấu hiệu của vấn đề tâm lý ở mức độ trung bình. Nên theo dõi và chú ý đến sức khỏe tinh thần của mình.";
  }
  return "Kết quả của bạn ở mức bình thường. Tiếp tục duy trì lối sống lành mạnh và cân bằng.";
}

function getRecommendations(percentage: number) {
  if (percentage >= 75) {
    return [
      "Tham khảo ý kiến chuyên gia tâm lý",
      "Thực hành các bài tập thư giãn",
      "Duy trì lịch sinh hoạt điều độ",
    ];
  }
  // Add more recommendation logic...
  return [];
}

export default SurveyQuestion;
