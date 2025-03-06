import Cbutton from "../../../../components/cButton";
import styles from "./SurveyView.module.scss";
import AntDComponent from "../../../../components/cTableAntD";
import { ColumnsType } from "antd/es/table";
import DetailPopup from "../PopupDetailSurvey";
import DeletePopup from "../PopupDeleteSurvey";
import ChangeInfoPopup from "../PopupChangeInfor";
import dayjs from "dayjs";
import { getSurveyId, getAllSurvey } from "../../../../services/admin/api";
import { Survey, Question, QuestionOption } from "../../../../models/admin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  date: string;
  id: string;
  attitude: string;
  comments: string;
  rating: number;
}

const ManageAdminSurvey = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState<DataType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isChangeInfoOpen, setIsChangeInfoOpen] = useState(false);

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (!surveyId) return;

      setLoading(true);
      try {
        const [allSurveysRes, surveyQuestionsRes] = await Promise.all([
          getAllSurvey(),
          getSurveyId(surveyId),
        ]);
        const allSurveys = allSurveysRes.data.data;
        const matchedSurvey = allSurveys.find(
          (s: Survey) => s.surveyId === surveyId
        );
        setSurvey(matchedSurvey || null);
        const formattedQuestions: Question[] = surveyQuestionsRes.data.data.map(
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
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khảo sát:", error);
        setSurvey(null);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      date: new Date("2024-12-12").toISOString(),
      id: "SE18021",
      attitude: "Thân thiện, nhiệt tình",
      comments: "Rất tốt, cần duy trì",
      rating: 5,
    },
    {
      key: "2",
      name: "Nguyễn Văn B",
      date: new Date("2024-12-12").toISOString(),
      id: "SE18022",
      attitude: "Bình thường",
      comments: "Không có góp ý",
      rating: 3,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Người khảo sát",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className={styles.userInfoContainer}>
          <span className={styles.surveyName}>{record.name}</span>
          <br />
          <span className={styles.id}>{record.id || "Chưa có ID"}</span>
        </div>
      ),
    },
    {
      title: "Ngày khảo sát",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div className={styles.surveyInfoContainer}>
          <span className={styles.surveyType}>
            {dayjs(record.date).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (_, record) => (
        <Cbutton
          origin={{ bgcolor: "#ec744a", hoverBgColor: "#ff7875" }}
          onClick={() => {
            setSelectedSurvey({
              key: record.key,
              name: record.name,
              date: record.date,
              id: record.id,
              attitude: record.attitude,
              comments: record.comments,
              rating: record.rating,
            });
            setIsDetailOpen(true);
          }}
        >
          Xem chi tiết
        </Cbutton>
      ),
    },
  ];

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
                <p></p>
              </div>
            </div>
            <div className={styles.status}>
              <Cbutton onClick={() => setIsDeleteOpen(true)}>
                Xóa khảo sát
              </Cbutton>
            </div>
          </div>
          <p className={styles.sectionTitle}>
            Danh sách những người tham gia khảo sát
          </p>
          <AntDComponent dataSource={data} columns={columns} />
        </div>
        <div className={styles.rightProfile}>
          <div className={styles.surveyQuestion}>
            <h2>CÂU HỎI KHẢO SÁT</h2>
            {questions.length === 0 ? (
              <p>Không có câu hỏi nào.</p>
            ) : (
              <ol>
                {questions.map((q) => (
                  <li key={q.questionId}>
                    <p>
                      <strong>{q.questionText}</strong>
                    </p>
                    <ul className={styles.readOnlyCheckboxList}>
                      {q.options.map((opt) => (
                        <li key={opt.optionId}>
                          <input
                            type="checkbox"
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
      </div>
      {selectedSurvey && (
        <DetailPopup
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          surveyData={{
            studentName: selectedSurvey.name,
            studentId: selectedSurvey.id,
            date: selectedSurvey.date,
            attitude: selectedSurvey.attitude,
            comments: selectedSurvey.comments,
            rating: selectedSurvey.rating,
          }}
        />
      )}

      <DeletePopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
        }}
      />
      <ChangeInfoPopup
        isOpen={isChangeInfoOpen}
        onClose={() => setIsChangeInfoOpen(false)}
        onSave={() => {
          setIsChangeInfoOpen(false);
        }}
      />
    </div>
  );
};

export default ManageAdminSurvey;
