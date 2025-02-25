import { Modal, Rate } from "antd";
import styles from "./DetailPopup.module.scss";
import dayjs from "dayjs";

interface PopupSurveyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  surveyData?: {
    studentName: string;
    studentId: string;
    date: string;
    attitude: string;
    comments: string;
    rating: number;
  } | null;
}

const DetailPopup: React.FC<PopupSurveyDetailProps> = ({
  isOpen,
  onClose,
  surveyData,
}) => {
  if (!surveyData) return null;

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={750}>
      <div className={styles.popupContainer}>
        <h2 className={styles.title}>
          ĐÁNH GIÁ CỦA HỌC/SINH VIÊN SAU BUỔI TƯ VẤN
        </h2>

        <div className={styles.infoGrid}>
          <div>
            <p>NGƯỜI LÀM ĐÁNH GIÁ</p>
            <span className={styles.highlight}>
              {surveyData.studentName || "Không có tên"}
            </span>
          </div>
          <div>
            <p>MÃ SỐ SINH VIÊN</p>
            <span className={styles.highlight}>
              {surveyData.studentId || "Không có MSSV"}
            </span>
          </div>
          <div>
            <p>NGÀY LÀM ĐÁNH GIÁ</p>
            <span className={styles.highlight}>
              {surveyData.date
                ? dayjs(surveyData.date).format("DD/MM/YYYY")
                : "Không có ngày"}
            </span>
          </div>
        </div>

        <div className={styles.infoDetails}>
          <p className={styles.question}>
            <strong>Thái độ của nhân viên tư vấn:</strong>
          </p>
          <p className={styles.answer}>
            {surveyData.attitude || "Không có thông tin"}
          </p>
          <br />
          <p className={styles.question}>
            <strong>
              Bạn có đóng góp ý kiến gì cho chuyên viên tư vấn không?
            </strong>
          </p>
          <p className={styles.answer}>
            {surveyData.comments || "Không có ý kiến"}
          </p>
          <br />
          <p className={styles.question}>
            <strong>Bạn đánh giá buổi tư vấn này như thế nào?</strong>
          </p>
          <p>
            <Rate disabled value={surveyData.rating ?? 0} />
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DetailPopup;
