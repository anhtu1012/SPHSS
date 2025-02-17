import { Modal, Input } from "antd";
import { useState } from "react";
import styles from "./EditProgram.module.scss";
import Cbutton from "../../../../components/cButton";

interface ProgramPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProgramPopup = ({ isOpen, onClose }: ProgramPopupProps) => {
  const [formData, setFormData] = useState({
    programName: "KS và những câu chuyện",
    startDate: "26-08-2024",
    endDate: "31-12-2025",
    participants: "SE1702_Fall24",
    location: "FPT Software",
    organizerEmail: "fptevent@fpt.vn",
    contactPhone: "0987654321",
    detailedContent: "KS là 20 sinh viên điên khùng và thú zị, rất iuiu",
  });

  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const requiredFields: (keyof typeof formData)[] = [
      "programName",
      "startDate",
      "endDate",
      "participants",
      "location",
      "organizerEmail",
      "contactPhone",
      "detailedContent",
    ];

    const isEmpty = requiredFields.some((field) => !formData[field].trim());
    if (isEmpty) {
      setError("Vui lòng không để trống các ô bắt buộc.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      return;
    }
    setError("");
    onClose();
  };

  return (
    <Modal
      title={
        <h2 className={styles.modalTitle}>CHỈNH SỬA THÔNG TIN CHƯƠNG TRÌNH</h2>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={styles.customModal}
      width={800}
      style={{ top: "5%" }}
    >
      <div className={styles.formGrid}>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Tên chương trình</label>
            <Input
              className={styles.inputField}
              placeholder="Nhập tên chương trình"
              value={formData.programName}
              onChange={(e) => handleChange("programName", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Ngày bắt đầu</label>
            <Input
              className={styles.inputField}
              value={formData.startDate}
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
              placeholder="Chọn ngày bắt đầu"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ngày kết thúc</label>
            <Input
              className={styles.inputField}
              value={formData.endDate}
              onChange={(e) =>
                handleChange("endDate", e.target.value)
              }
              placeholder="Chọn ngày kết thúc"
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Đối tượng tham gia</label>
            <Input
              className={styles.inputField}
              value={formData.participants}
              onChange={(e) => handleChange("participants", e.target.value)}
              placeholder="Nhập đối tượng tham gia"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Địa điểm tổ chức</label>
            <Input
              className={styles.inputField}
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Nhập địa điểm tổ chức"
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Email đơn vị tổ chức</label>
            <Input
              className={styles.inputField}
              value={formData.organizerEmail}
              onChange={(e) => handleChange("organizerEmail", e.target.value)}
              placeholder="Nhập email tổ chức"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Di động liên lạc</label>
            <Input
              className={styles.inputField}
              value={formData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
      </div>

      <div className={styles.belowEdit}>
        <label>Nội dung chi tiết chương trình</label>
        <textarea
          className={styles.inputField}
          value={formData.detailedContent}
          onChange={(e) => handleChange("detailedContent", e.target.value)}
          placeholder="Nhập nội dung chi tiết"
        />
      </div>
      {error && (
        <p className={`${styles.errorText} ${isShaking ? styles.shaking : ""}`}>
          {error}
        </p>
      )}

      <div className={styles.footer}>
        <Cbutton className={styles.saveButton} onClick={handleSave}>
          Lưu Thay Đổi
        </Cbutton>
      </div>
    </Modal>
  );
};

export default ProgramPopup;
