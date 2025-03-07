import Cbutton from "../../../../components/cButton";
import styles from "./SurveyView.module.scss";
import AntDComponent from "../../../../components/cTableAntD";
import { ColumnsType } from "antd/es/table";
import { getSurveyId, getSurveyDetailId } from "../../../../services/admin/api";
import {
  Survey,
  Question,
  QuestionOption,
  SurveyResult,
} from "../../../../models/admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const ManageAdminSurvey = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupType, setPopupType] = useState<"survey" | "result" | null>(null);
  const [selectedSurveyResult, setSelectedSurveyResult] =
    useState<SurveyResult | null>(null);
    
  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) return;

      setLoading(true);
      try {
        const [surveyRes, surveyQuestionsRes] = await Promise.all([
          getSurveyDetailId(surveyId),
          getSurveyId(surveyId),
        ]);
        const surveyData = surveyRes.data.data;
        const surveyQuestions = surveyQuestionsRes.data.data;

        setSurvey(surveyData);
        const formattedQuestions: Question[] = surveyQuestions.map(
          (q: any) => ({
            ...q,
            options: q.options.map((opt: any) => ({
              optionId: opt.optionId,
              value: opt.value.toString(),
              optionText: opt.optionText,
              questionId: q.questionId,
            })) as QuestionOption[],
          })
        );
        setQuestions(formattedQuestions);
        setSurveyResults(surveyData.results);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khảo sát:", error);
        setSurvey(null);
        setQuestions([]);
        setSurveyResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const translateLevel = (level: string) => {
    const mapping: { [key: string]: string } = {
      "Normal": "Bình thường",
      "Extremely Severe": "Cực kỳ nghiêm trọng",
      "Severe": "Nghiêm trọng",
      "Mild": "Nhẹ",
      "Moderate": "Trung bình",
    };
    return mapping[level] || level;
  };
  

  const columns: ColumnsType<SurveyResult> = [
    {
      title: "Họ tên",
      dataIndex: ["user", "firstName"],
      key: "userName",
      render: (_, surveyResult) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.surveyName}>
            <strong>{surveyResult.user.firstName} {surveyResult.user.lastName}</strong>
            <br/>
            MSSV:{surveyResult.user.id}
          </span>
        </div>
      ),
    },
    {
      title: "Ngày khảo sát",
      key: "createdAt",
      render: (_, surveyResult) => (
        <span>{dayjs(surveyResult.createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Mức trầm cảm",
      dataIndex: ["depressionLevel"],
      key: "depressionLevel",
      render: (level) => <span>{translateLevel(level)}</span>,
    },
    {
      title: "Mức lo lắng",
      dataIndex: ["anxietyLevel"],
      key: "anxietyLevel",
      render: (level) => <span>{translateLevel(level)}</span>,
    },
    {
      title: "Mức căng thẳng",
      dataIndex: ["stressLevel"],
      key: "stressLevel",
      render: (level) => <span>{translateLevel(level)}</span>,
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_, surveyResult) => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => {
            setSelectedSurveyResult(surveyResult);
            setPopupType("result");
          }}
        >
          Xem chi tiết
        </Cbutton>
      ),
    },
  ];

  const showPopup = (type: "survey" | "result") => {
    setPopupType(type);
  };

  const closePopup = () => {
    setPopupType(null);
  };

  if (loading) return <p>Đang tải...</p>;
  if (!survey) return <p>Không tìm thấy khảo sát.</p>;

  return (
    <div className={styles.userProfile}>
      <div className={styles.mainContent}>
        <div className={styles.leftProfile}>
          <div className={styles.profileHeader}>
            <div className={styles.profileName}>
              <div className={styles.profileInfo}>
                <h2> {survey.title}</h2>
                <p>
                  <strong>ID:</strong> {survey.surveyId}
                </p>
              </div>
            </div>
            <div className={styles.buttonS}>
              <div className={styles.form}>
                <Cbutton onClick={() => showPopup("survey")}>
                  Biểu mẫu khảo sát
                </Cbutton>
              </div>
            </div>
          </div>
          <p className={styles.sectionTitle}>
            Danh sách những người tham gia khảo sát
          </p>
          <AntDComponent dataSource={surveyResults} columns={columns} />
        </div>
      </div>

      {popupType === "survey" && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <Cbutton className={styles.closePopupButton} onClick={closePopup}>
              X
            </Cbutton>
            <h2>BIỂU MẪU KHẢO SÁT</h2>
            {questions.length === 0 ? (
              <p>Không có câu hỏi nào.</p>
            ) : (
              <ol>
                {questions.map((q) => (
                  <li key={q.questionId} className={styles.questionItem}>
                    <p>
                      <strong>{q.questionText}</strong>
                    </p>
                    <ul className={styles.readOnlyCheckboxList}>
                      {q.options.map((opt) => (
                        <li key={opt.optionId}>
                          <input
                            type="radio"
                            checked={false}
                            readOnly
                            title="Lựa chọn không thể thay đổi"
                            aria-label={opt.optionText}
                          />
                          {opt.optionText}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}

      {popupType === "result" && selectedSurveyResult && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <Cbutton className={styles.closePopupButton} onClick={closePopup}>
              X
            </Cbutton>
            <h2>KẾT QUẢ CỦA NGƯỜI LÀM KHẢO SÁT</h2>
            <div className={styles.headerResult}>
              <p>
                <strong>Ngày khảo sát:</strong>{" "}
                {dayjs(selectedSurveyResult.createdAt).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Mã khảo sát: </strong>
                {selectedSurveyResult.surveyResultId}
              </p>
            </div>

            <div className={styles.infoSurveyResult}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <strong>Họ tên sinh viên</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                    <th>
                      <strong>MSSV</strong>
                    </th>
                    <th>
                      <strong>Di động</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {selectedSurveyResult.user.firstName}{" "}
                      {selectedSurveyResult.user.lastName}
                    </td>
                    <td>{selectedSurveyResult.user.email}</td>
                    <td>{selectedSurveyResult.user.userCode}</td>
                    <td>{selectedSurveyResult.user.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.infoSurveyResult}>
              <table>
                <thead>
                  <tr>
                    <th>Loại đánh giá</th>
                    <th>Điểm</th>
                    <th>Mức độ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Trầm cảm</strong>
                    </td>
                    <td>{selectedSurveyResult.depressionScore}</td>
                    <td>{translateLevel(selectedSurveyResult.depressionLevel)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Lo âu</strong>
                    </td>
                    <td>{selectedSurveyResult.anxietyScore}</td>
                    <td>{translateLevel(selectedSurveyResult.anxietyLevel)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Căng thẳng</strong>
                    </td>
                    <td>{selectedSurveyResult.stressScore}</td>
                    <td>{translateLevel(selectedSurveyResult.stressLevel)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdminSurvey;
