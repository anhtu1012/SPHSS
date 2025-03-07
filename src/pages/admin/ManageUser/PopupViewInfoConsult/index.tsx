/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";
import styles from "./popupInfoConsult.module.scss";
import dayjs from "dayjs";

interface PopupInfoConsultProps {
  isOpen: boolean;
  onClose: () => void;
  consultData: any | null;
}

const PopupInfoConsult: React.FC<PopupInfoConsultProps> = ({
  isOpen,
  onClose,
  consultData,
}) => {
  console.log("consultData:", consultData);

  if (!consultData) return null;
  const {
    appointment_date,
    appointment_id,
    appointment_status,
    end_time,
    feedback,
    full_name,
    health_level,
    health_status,
    report_id,
    start_time,
    student_id,
    user_email,
    user_phone,
    full_name_pys,
    pys_email,
    pys_phone,
    recommendations,
    createdAt,
  } = consultData.data;
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={750}>
      <div className={styles.popupContainer}>
        <h2 className={styles.title}>BÁO CÁO CHI TIẾT BUỔI TƯ VẤN</h2>

        <div className={styles.infoGrid}>
          <div>
            <p>NGÀY TƯ VẤN</p>
            <span className={styles.highlight}>
              {appointment_date
                ? dayjs(appointment_date).format("YYYY-MM-DD HH:mm:ss")
                : "-"}
            </span>
          </div>
          <div>
            <p>THỜI GIAN</p>
            <span className={styles.highlight}>
              {start_time || "-"} - {end_time}
            </span>
          </div>
          <div>
            <p>TRẠNG THÁI BUỔI TƯ VẤN</p>
            <span className={styles.highlight}>
              {appointment_status || "-"}
            </span>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div>
            <p>CHUYÊN VIÊN TƯ VẤN</p>
            <span className={styles.highlight}>{full_name_pys || "-"}</span>
          </div>
          <div>
            <p>EMAIL</p>
            <span className={styles.highlight}>{pys_email}</span>
          </div>
          <div>
            <p>ĐIỆN THOẠI LIÊN HỆ</p>
            <span className={styles.highlight}>{pys_phone}</span>
          </div>
        </div>

        <div className={styles.infoDetails}>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>HỌ VÀ TÊN SINH VIÊN</strong>
                </td>
                <td>{full_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>MSSV</strong>
                </td>
                <td>{student_id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Thông tin cá nhân</strong>
                </td>
                <td>
                  Email:{user_email} <br /> Phone: {user_phone}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>MỨC ĐỘ SỨC KHỎE</strong>
                </td>
                <td>{health_level || "-"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Tình trạng sức khẻo</strong>
                </td>
                <td>{health_status || "-"}</td>
              </tr>
              <tr>
                <td>
                  <strong>ĐÁNH GIÁ TỪ NGƯỜI TƯ VẤN</strong>
                </td>
                <td>{feedback || "-"}</td>
              </tr>
              <tr>
                <td>
                  <strong>GHI CHÚ</strong>
                </td>
                <td>{recommendations || "-"}</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.footerReport}>
            <p>Mã báo cáo: {report_id || "-"}</p>
            <p>
              Ngày tạo:{" "}
              {createdAt ? dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss") : "-"}
            </p>
            <p>Người tạo: {full_name_pys || "-"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopupInfoConsult;
