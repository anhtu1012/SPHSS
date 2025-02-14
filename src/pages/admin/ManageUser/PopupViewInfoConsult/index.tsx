import React from "react";
import { Modal } from "antd";
import styles from "./popupInfoConsult.module.scss";

interface ConsultData {
  date: string;
  consultant: string;
  rating: string;
  studentName: string;
  studentId: string;
  reason: string;
  diagnosis: string;
  result: string;
}

interface PopupInfoConsultProps {
  isOpen: boolean;
  onClose: () => void;
  consultData: ConsultData;
}

const PopupInfoConsult: React.FC<PopupInfoConsultProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={750}>
      <div>
        <div className={styles.popupContainer}>
          <h2 className={styles.title}>THÔNG TIN CHI TIẾT BUỔI TƯ VẤN</h2>

          <div className={styles.infoGrid}>
            <div>
              <p>NGÀY TƯ VẤN</p>
              <span className={styles.highlight}>12/03/2024</span>
            </div>
            <div>
              <p>CHUYÊN VIÊN TƯ VẤN</p>
              <span className={styles.highlight}>Hoàng Bá Việt</span>
            </div>
            <div>
              <p>ĐÁNH GIÁ TƯ VẤN</p>
              <span className={styles.highlight}>Good</span>
            </div>
          </div>

          <div className={styles.infoDetails}>
            <p>
              <strong>HỌ VÀ TÊN HỌC/SINH VIÊN:</strong> &nbsp; Tạ Hải Yến
            </p>
            <p>
              <strong>MSSV:</strong> &nbsp;SE170121
            </p>
            <p>
              <strong>LÝ DO CẦN TƯ VẤN:</strong> &nbsp;Thường hay suy kiệt tinh thần
            </p>
            <p>
              <strong>CHUẨN ĐOÁN CỦA CHUYÊN VIÊN TƯ VẤN:</strong> &nbsp;AST
            </p>
            <p>
              <strong>GHI CHÚ:</strong> &nbsp;Ngủ sớm, ăn uống đầy
              đủ.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupInfoConsult;
