import { Modal, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Cbutton from "../../../../components/cButton";
import styles from "./popupChangeInfoUser.module.scss";
import { updateUserInfo } from "../../../../services/admin/api";
import { User } from "../../../../models/admin";
import { EditOutlined } from "@ant-design/icons";

interface PopupChangeUserInfoProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const PopupChangeUserInfo = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}: PopupChangeUserInfoProps) => {
  const [formData, setFormData] = useState<User>(user);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  // const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadImage = async (file: File) => {
    // setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        message.error("Upload ảnh thất bại.");
        // setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, image: downloadURL }));
        message.success("Upload ảnh thành công!");
        // setUploading(false);
      }
    );
  };

  const handleSave = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email
    ) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (!formData.userCode) {
      setError("Lỗi: Không tìm thấy userCode.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    try {
      await updateUserInfo(formData.userCode, formData);
      message.success("Cập nhật thông tin thành công!");
      onUpdateUser(formData);
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      message.error("Cập nhật thất bại, vui lòng thử lại.");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={`${styles.customModal} ${isShaking ? styles.shake : ""}`}
      width={800}
      style={{ top: "5%" }}
    >
      <h2 className={styles.modalTitle}>THAY ĐỔI THÔNG TIN NGƯỜI DÙNG</h2>
      <div className={styles.formGrid}>
        <div className={styles.imageUp}>
          <label htmlFor="upload-avatar">
            <img src={formData.image} alt="avatar" className={styles.avatar} />
          </label>

          <label htmlFor="upload-avatar" className={styles.editIcon}>
            <EditOutlined />
          </label>

          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleUploadImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>ID</label>
            <Input
              className={styles.inputField}
              value={formData.userCode}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label>Loại tài khoản</label>
            <Input
              className={styles.inputField}
              value={formData.role}
              readOnly
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Họ<span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Tên<span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Số điện thoại<span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Giới tính<span className={styles.required}>*</span>
            </label>
            <Select
              className={styles.inputField}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              options={[
                { value: "female", label: "Nữ" },
                { value: "male", label: "Nam" },
              ]}
            />
          </div>
        </div>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>
              Email<span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Giới thiệu<span className={styles.required}>*</span>
            </label>
            <Input
              className={styles.inputField}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.footer}>
        <Cbutton className={styles.saveButton} onClick={handleSave}>
          Thay Đổi Thông Tin
        </Cbutton>
      </div>
    </Modal>
  );
};

export default PopupChangeUserInfo;
