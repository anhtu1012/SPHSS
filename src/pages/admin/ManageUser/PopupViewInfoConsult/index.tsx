import React from "react";
import { Modal } from "antd";
import styles from "./popupInfoConsult.module.scss";
import { Report } from "../../../../models/admin";

interface PopupInfoConsultProps {
  isOpen: boolean;
  onClose: () => void;
  consultData: Report | null;
}

const PopupInfoConsult: React.FC<PopupInfoConsultProps> = ({
  isOpen,
  onClose,
  consultData,
}) => {
  console.log("consultData:", consultData);
  if (!consultData) return null; 

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={750}>
      <div className={styles.popupContainer}>
        <h2 className={styles.title}>BÁO CÁO CHI TIẾT BUỔI TƯ VẤN</h2>

        <div className={styles.infoGrid}>
          <div>
            <p>NGÀY TƯ VẤN</p>
            <span className={styles.highlight}>
              {consultData.appointment_date
                ? new Date(consultData.appointment_date).toLocaleDateString("vi-VN")
                : "-"}
            </span>
          </div>
          <div>
            <p>MÃ LỊCH HẸN</p>
            <span className={styles.highlight}>{consultData.appointment_id || "-"}</span>
          </div>
          <div>
            <p>TRẠNG THÁI BUỔI TƯ VẤN</p>
            <span className={styles.highlight}>{consultData.health_status || "-"}</span>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div>
            <p>CHUYÊN VIÊN TƯ VẤN</p>
            <span className={styles.highlight}>{consultData.full_name_pys || "-"}</span>
          </div>
          <div>
            <p>EMAIL</p>
            <span className={styles.highlight}>pys_email</span> 
          </div>
          <div>
            <p>ĐIỆN THOẠI LIÊN HỆ</p>
            <span className={styles.highlight}>pys_phone</span> 
          </div>
        </div>

        <div className={styles.infoDetails}>
          <table>
            <tbody>
              <tr>
                <td><strong>HỌ VÀ TÊN SINH VIÊN</strong></td>
                <td>{consultData.full_name}</td>
              </tr>
              <tr>
                <td><strong>MSSV</strong></td>
                <td>student_id</td> 
              </tr>
              <tr>
                <td><strong>MỨC ĐỘ SỨC KHỎE</strong></td>
                <td>{consultData.health_level || "-"}</td>
              </tr>
              <tr>
                <td><strong>CHUẨN ĐOÁN</strong></td>
                <td>{consultData.health_status || "-"}</td>
              </tr>
              <tr>
                <td><strong>GHI CHÚ</strong></td>
                <td>{consultData.recommendations || "-"}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.footerReport}>
            <p>Mã báo cáo: {consultData.report_id || "-"}</p>
            <p>Ngày tạo: {consultData.createdAt ? new Date(consultData.createdAt).toLocaleDateString("vi-VN") : "-"}</p>
            <p>Người tạo: {consultData.full_name_pys || "-"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupInfoConsult;
