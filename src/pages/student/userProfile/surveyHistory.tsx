import { Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Cbutton from "../../../components/cButton";
import "./userProfile.scss";
import { PrintTemplate } from "./PrintModal/PrintTemplate";

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

  const formatYAxis = (value: any) => {
    if (value === 1) return "Bình thường";
    if (value === 2) return "Nhẹ";
    if (value === 3) return "Trung bình";
    if (value === 4) return "Nặng";
    if (value === 5) return "Báo động";
    else return "";
  };

  // Phần in
  const componentRef = React.useRef(null);
  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
    // Reset any changes made during printing
    document.body.style.overflow = "";
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    // Add any pre-print preparation if needed
    document.body.style.overflow = "visible";
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Chi tiết bài khảo sát",
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
  });

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
        footer={[
          <Cbutton
            style={{ marginTop: "-50px" }}
            key="print"
            onClick={() => printFn()}
          >
            In / Lưu PDF
          </Cbutton>,
        ]}
        width={700}
      >
        <div className="survey-result__score">
          <h2 style={{ textAlign: "center", color: "#08509f" }}>
            Kết quả khảo sát
          </h2>
          <div className="survey-result__score__value">63</div>
          <div className="survey-result__score__label">Điểm của bạn</div>
        </div>
        <h2 style={{ textAlign: "center", color: "#08509f" }}>
          Chi tiết kết quả
        </h2>
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
        <div className="survey-result__interpretation">
          <h2 style={{ textAlign: "center", color: "#08509f" }}>Lời khuyên</h2>
          <p className="survey-result__interpretation__text">
            Kết quả của bạn ở mức báo động. Bạn cần tìm đến chuyên gia tâm lý
            ngay lập tức!.
          </p>
        </div>
        {selectedSurvey && (
          <div className="survey-detail-modal">
            <h2 style={{ textAlign: "center", color: "#08509f" }}>
              Chi tiết câu trả lời
            </h2>
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
      <div style={{ display: "none" }}>
        <PrintTemplate ref={componentRef} survey={selectedSurvey} />
      </div>
    </>
  );
}

export default SurveyHistory;
