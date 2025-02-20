import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Radio, Progress, Tooltip } from "antd";
import type { RadioChangeEvent } from "antd";
import { motion } from "framer-motion";
import "./surveyQuestion.scss";
import { mockQuestions } from "./mockQuestions";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function SurveyQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const questions = mockQuestions[id as keyof typeof mockQuestions] || [];
  const progress = (currentQuestion / questions.length) * 100;

  //mock
  const data = [
    {
      name: "trầm cảm",
      strength: 1,
    },
    {
      name: "lo âu",
      strength: 2,
    },
    {
      name: "căng thẳng",
      strength: 4,
    },
  ];

  const handleAnswer = (e: RadioChangeEvent) => {
    setAnswers({ ...answers, [currentQuestion]: e.target.value });
  };

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, value) => sum + value,
      0
    );

    return totalScore;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResult();
      setFinalScore(result);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatYAxis = (value: any) => {
    if (value === 1) return "Bình thường";
    if (value === 2) return "Nhẹ";
    if (value === 3) return "Trung bình";
    if (value === 4) return "Nặng";
    if (value === 5) return "Báo động";
    else return "";
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
          <h2 className="survey-result__interpretation__title">Kết quả</h2>
          <p className="survey-result__interpretation__text">
            {getResultInterpretation(finalScore)}
          </p>
        </div>

        <div className="survey-result__detail">
          <h2 className="survey-result__detail__title">Chi tiết kết quả</h2>
          <ResponsiveContainer width={"100%"} height={400}>
            <BarChart
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={formatYAxis}
                domain={[0, 5]}
                interval={0}
                tickCount={6}
              />
              <Tooltip />
              <Bar
                dataKey="strength"
                fill="#B3CDAD"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="survey-result__info">
          <h2 className="survey-result__info__title">Than đo DASS21 là gì?</h2>
          <p className="survey-result__info__text">
            Thang đo Trầm cảm, Lo âu và Căng thẳng - 21 câu hỏi (DASS-21) là một
            bộ gồm ba thang đo tự đánh giá được thiết kế để đo lường các trạng
            thái cảm xúc trầm cảm, lo âu và căng thẳng.
            <br />
            <br /> Mỗi thang đo trong DASS-21 bao gồm 7 mục, được chia thành các
            tiểu mục có nội dung tương tự nhau. Thang đo trầm cảm đánh giá các
            trạng thái như tâm trạng chán nản, mất hy vọng, cảm giác cuộc sống
            vô nghĩa, tự ti, thiếu hứng thú / không tham gia vào các hoạt động,
            mất khả năng cảm nhận niềm vui và trì trệ. Thang đo lo âu đánh giá
            các phản ứng kích thích tự động, ảnh hưởng đến cơ xương, lo âu trong
            tình huống cụ thể và trải nghiệm chủ quan của trạng thái lo âu.
            Thang đo căng thẳng nhạy cảm với mức độ kích thích không đặc hiệu
            mãn tính, đánh giá khó khăn trong việc thư giãn, trạng thái kích
            thích thần kinh, dễ bị kích động / bực tức, cáu kỉnh / phản ứng thái
            quá và thiếu kiên nhẫn. Điểm số cho trầm cảm, lo âu và căng thẳng
            được tính bằng cách cộng điểm của các mục liên quan.
            <br />
            <br />
            DASS-21 dựa trên quan niệm liên tục thay vì phân loại rời rạc về rối
            loạn tâm lý. Giả định khi phát triển DASS-21 (và đã được dữ liệu
            nghiên cứu xác nhận) là sự khác biệt giữa mức độ trầm cảm, lo âu và
            căng thẳng ở những người bình thường và ở nhóm bệnh nhân lâm sàng
            chủ yếu là khác biệt về mức độ chứ không phải bản chất. Do đó,
            DASS-21 không có ý nghĩa trực tiếp trong việc phân loại bệnh nhân
            vào các nhóm chẩn đoán riêng biệt như trong các hệ thống phân loại
            DSM và ICD.
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
          disabled={!(answers[currentQuestion] + 1)}
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
function getResultInterpretation(score: number) {
  if (score >= 0 && score <= 9) {
    return "Kết quả cho thấy bạn đang có dấu hiệu của vấn đề tâm lý ở mức độ bình thường. Tiếp tục duy trì lối sống lành mạnh và cân bằng.";
  } else if (score >= 10 && score <= 13) {
    return "Bạn đang có một số dấu hiệu của vấn đề tâm lý ở mức độ nhẹ. Nên theo dõi và chú ý đến sức khỏe tinh thần của mình.";
  } else if (score >= 14 && score <= 20) {
    return "Bạn đang có một số dấu hiệu của vấn đề tâm lý ở mức độ trung bình. Bạn nên tìm đến chuyên gia tâm lý để được tư vấn.";
  } else if (score >= 21 && score <= 27) {
    return "Bạn đang có một số dấu hiệu của vấn đề tâm lý ở mức độ cao. Bạn nên tìm đến chuyên gia tâm lý càng sớm càng tốt.";
  }
  return "Kết quả của bạn ở mức báo động. Bạn cần tìm đến chuyên gia tâm lý ngay lập tức!.";
}

export default SurveyQuestion;
