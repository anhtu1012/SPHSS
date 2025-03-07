import { Modal, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
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
import { RootState } from "../../../redux/RootReducer";
import { getSurveyByUserId } from "../../../services/student/PsychologistDetail/api";
import { formatDate } from "../../../utils/dateUtils";
import { PrintTemplate } from "./PrintModal/PrintTemplate";
import "./userProfile.scss";

export interface Survey {
  surveyResultId: string;
  survey: {
    surveyId: string;
    title: string;
    description: string;
    categoryId: string;
    createdAt: string;
  };
  user: {
    id: string;
    userCode: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    image: string;
    description: string | null;
  };
  depressionScore: number;
  anxietyScore: number;
  stressScore: number;
  depressionLevel: string;
  anxietyLevel: string;
  stressLevel: string;
}

function SurveyHistory() {
  const [selectedSurvey, setSelectedSurvey] = useState<Survey>({
    surveyResultId: "",
    survey: {
      surveyId: "",
      title: "",
      description: "",
      categoryId: "",
      createdAt: "",
    },
    user: {
      id: "",
      userCode: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      gender: "",
      image: "",
      description: null,
    },
    depressionScore: 0,
    anxietyScore: 0,
    stressScore: 0,
    depressionLevel: "",
    anxietyLevel: "",
    stressLevel: "",
  });
  const user = useSelector((state: RootState) => state.user) as any | null;
  const [surveyData, setSurveyData] = useState([]);
  const [chartData, setChartData] = useState<
    { name: string; strength: number }[]
  >([]);

  const fetchSurveyHistory = useCallback(async () => {
    try {
      const res = await getSurveyByUserId(user.id);
      setSurveyData(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Lỗi khi lấy danh sách khảo sát");
    }
  }, []);

  useEffect(() => {
    fetchSurveyHistory();
  }, []);

  function generateChartData(resultData: any) {
    return [
      {
        name: "Trầm cảm",
        strength: getStrength(resultData.depressionLevel),
        label: getVietnameseLabel(resultData.depressionLevel),
      },
      {
        name: "Lo âu",
        strength: getStrength(resultData.anxietyLevel),
        label: getVietnameseLabel(resultData.anxietyLevel),
      },
      {
        name: "Căng thẳng",
        strength: getStrength(resultData.stressLevel),
        label: getVietnameseLabel(resultData.stressLevel),
      },
    ];
  }

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
    // Reset any changes made during printing
    document.body.style.overflow = "";
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    // Add any pre-print preparation if needed
    document.body.style.overflow = "visible";
    return Promise.resolve();
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Chi tiết bài khảo sát",
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    pageStyle: `
    @media print {
         .modal-cell {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;

    // Đảm bảo background color được in
    &[style*="background-color"] {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      forced-color-adjust: none !important;
    }
  }`,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSurveyDetail = (survey: Survey) => {
    setSelectedSurvey(survey);
    setChartData(generateChartData(survey));
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    const handleImageReady = () => {
      printFn();
    };

    setSelectedSurvey((prevSurvey) => ({
      ...prevSurvey,
      onImageReady: handleImageReady,
    }));
  };

  return (
    <>
      <div className="user-profile__survey-list">
        {surveyData.map((survey: any) => (
          <div
            key={survey.surveyResultId}
            className="survey-list-item"
            onClick={() => showSurveyDetail(survey)}
          >
            <div className="survey-list-item__title">{survey.survey.title}</div>
            <div className="survey-list-item__date">
              {formatDate(survey.survey.createdAt)}
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={selectedSurvey?.survey.title}
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
          <div className="survey-result__score__value">
            {Number(selectedSurvey.depressionScore) +
              Number(selectedSurvey.anxietyScore) +
              Number(selectedSurvey.stressScore)}
          </div>
          <div className="survey-result__score__label">Điểm của bạn</div>
        </div>
        <h2 style={{ textAlign: "center", color: "#08509f" }}>
          Chi tiết kết quả
        </h2>
        <ResponsiveContainer width={"100%"} height={400}>
          <BarChart
            data={chartData}
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
            {getResultInterpretation(
              Number(selectedSurvey.depressionScore) +
                Number(selectedSurvey.anxietyScore) +
                Number(selectedSurvey.stressScore)
            )}
          </p>
        </div>
        <div className="user-profile__health-status">
          <h3>Tình trạng sức khỏe</h3>
          <div className="status-item">
            <span className="status-item__label">Trầm cảm</span>
            <span className="status-item__value low">
              {getVietnameseLabel(selectedSurvey.depressionLevel)}
            </span>
          </div>
          <div className="status-item">
            <span className="status-item__label">Lo âu</span>
            <span className="status-item__value medium">
              {getVietnameseLabel(selectedSurvey.anxietyLevel)}
            </span>
          </div>
          <div className="status-item">
            <span className="status-item__label">Stress</span>
            <span className="status-item__value high">
              {getVietnameseLabel(selectedSurvey.stressLevel)}
            </span>
          </div>
        </div>
      </Modal>
      <div style={{ display: "none" }}>
        <PrintTemplate
          ref={componentRef}
          survey={selectedSurvey}
          onImageReady={handlePrint}
        />
      </div>
    </>
  );
}

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

function getVietnameseLabel(level: string) {
  switch (level) {
    case "Normal":
      return "Bình thường";
    case "Mild":
      return "Nhẹ";
    case "Moderate":
      return "Trung bình";
    case "Severe":
      return "Nặng";
    case "Extremely Severe":
      return "Báo động";
    default:
      return "Không xác định";
  }
}

export default SurveyHistory;
