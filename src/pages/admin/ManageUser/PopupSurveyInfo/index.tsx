import { Modal, Rate } from "antd";
import styles from "./popupSurveyDetail.module.scss";

interface PopupSurveyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  surveyData: {
    studentName: string;
    studentId: string;
    date: string;
    attitude: string;
    comments: string;
    rating: number;
  };
}

const PopupSurveyDetail: React.FC<PopupSurveyDetailProps> = ({
  isOpen,
  onClose,
  surveyData,
}) => {
  if (!surveyData) return null;

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={750}>
      <div>
        <div className={styles.popupContainer}>
          <h2 className={styles.title}>ĐÁNH GIÁ CỦA HỌC/SINH VIÊN SAU BUỔI TƯ VẤN</h2>

          <div className={styles.infoGrid}>
            <div>
              <p>NGƯỜI LÀM ĐÁNH GIÁ</p>
              <span className={styles.highlight}>Tạ Hải Yến</span>
            </div>
            <div>
              <p>MÃ SỐ SINH VIÊN</p>
              <span className={styles.highlight}>SE170121</span>
            </div>
            <div>
              <p>NGÀY LÀM ĐÁNH GIÁ</p>
              <span className={styles.highlight}>23/12/2023</span>
            </div>
          </div>

          <div className={styles.infoDetails}>
            <p className={styles.question}>
              <strong>Thái độ của nhân viên tư vấn:</strong> 
            </p>
            <p className={styles.answer}>
              Tốt, tư vấn nhiệt tình 
            </p>
            <br/>
            <p className={styles.question}>
              <strong>Bạn có đóng góp ý kiến gì cho chuyên viên tư vấn không?</strong>
            </p>
            <p className={styles.answer}>
            Có, tôi đóng góp như sau: Cần nói chậm lại, tư vấn nhiệt tình hơn
            </p>
            <br/>
            <p className={styles.question}>
              <strong>Bạn đánh giá buổi tư vấn này như thế nào?</strong>
            </p>
            <p>
              <Rate disabled value={surveyData.rating ?? 0} />
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupSurveyDetail;
