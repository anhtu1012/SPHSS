import { Modal, Input, Select } from "antd";
import { useState } from "react";
import Cbutton from "../../../../components/cButton";
import styles from "./popupChangeInfoUser.module.scss";

interface PopupChangeUserInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupChangeUserInfo = ({ isOpen, onClose }: PopupChangeUserInfoProps) => {
  const [formData, setFormData] = useState({
    email: "ngocanh@gmail.com",
    fullName: "Nguyễn Ngọc Anh",
    id: "SE170121",
    phone: "0123456789",
    birthDate: "17-10-2005",
    address: "Hồ Chí Minh",
    school: "FPT HCM",
    country: "Việt Nam",
    mariage: "Độc thân",
    gender: "Nữ",
    typeAcc: "Học/Sinh viên",
  });
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const requiredFields: (keyof typeof formData)[] = [
      "fullName",
      "id",
      "phone",
      "birthDate",
      "address",
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
        <h2 className={styles.modalTitle}>THAY ĐỔI THÔNG TIN NGƯỜI DÙNG</h2>
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
            <label>Email</label>
            <Input
              className={styles.inputField}
              value={formData.email}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Họ và tên <span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Loại tài khoản</label>
            <Input
              className={styles.inputField}
              value={formData.typeAcc}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              {formData.typeAcc === "Phụ huynh"
                ? "Phụ huynh của học/sinh viên"
                : formData.typeAcc === "Tư vấn viên"
                ? "ID"
                : "MSSV"}
              <span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Số điện thoại <span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Ngày sinh <span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Tình trạng hôn nhân <span className={styles.required}>*</span>
            </label>
            <Select
              className={styles.inputField}
              value={formData.mariage}
              onChange={(value) => handleChange("mariage", value)}
              options={[
                { value: "Đã kết hôn", label: "Đã kết hôn" },
                { value: "Độc thân", label: "Độc thân" },
                { value: "Đã ly hôn", label: "Đã ly hôn" },
              ]}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Giới tính <span className={styles.required}>*</span>
            </label>
            <Select
              className={styles.inputField}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              options={[
                { value: "Nữ", label: "Nữ" },
                { value: "Nam", label: "Nam" },
              ]}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Trường <span className={styles.required}>*</span>
            </label>
            <Select
              className={styles.inputField}
              value={formData.school}
              onChange={(value) => handleChange("school", value)}
              options={[
                { value: "FPT Hà Nội", label: "FPT Hà Nội" },
                { value: "FPT Đà Nẵng", label: "FPT Đà Nẵng" },
                { value: "FPT Cần Thơ", label: "FPT Cần Thơ" },
                { value: "FPT Quy Nhơn", label: "FPT Quy Nhơn" },
                { value: "FPT Hồ Chí Minh", label: "FPT Hồ Chí Minh" },
              ]}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Quốc tịch <span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>
            Địa chỉ <span className={styles.required}>*</span>
          </label>
          <Input
            className={styles.inputField}
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
      {error && (
        <p className={`${styles.errorText} ${isShaking ? styles.shaking : ""}`}>
          {error}
        </p>
      )}

      <div className={styles.footer}>
        <Cbutton className={styles.saveButton} onClick={handleSave}>
          Thay Đổi Thông Tin
        </Cbutton>
      </div>
    </Modal>
  );
};

export default PopupChangeUserInfo;
