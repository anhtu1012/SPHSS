import { Modal, Input, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./EditProgram.module.scss";
import Cbutton from "../../../../components/cButton";
import { EditOutlined } from "@ant-design/icons";
import { Program } from "../../../../models/admin";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProgramInfo } from "../../../../services/admin/api";

interface ProgramPopupProps {
  isOpen: boolean;
  program: Program;
  onUpdate: (values: Partial<Program>) => void;
  onClose: () => void;
}

const ProgramPopup = ({
  isOpen,
  program,
  onUpdate,
  onClose,
}: ProgramPopupProps) => {
  const [formData, setFormData] = useState<Program>(program);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isOpen && program) {
      setFormData(program); // Đồng bộ lại dữ liệu khi popup mở
    }
  }, [isOpen, program]);

  const handleChange = (field: keyof Program, value: string) => {
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
        setFormData((prev) => ({ ...prev, imageUrl: downloadURL }));
        message.success("Upload ảnh thành công!");
        // setUploading(false);
      }
    );
  };

  const handleSave = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.categoryId ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.time ||
      !formData.frequency ||
      !formData.targetAudience ||
      !formData.location ||
      !formData.organizerEmail ||
      !formData.contactPhone ||
      !formData.rating ||
      !formData.price ||
      !formData.imageUrl
    ) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (!formData.programId) {
      setError("Lỗi: Không tìm thấy userCode.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    try {
      await updateProgramInfo(formData.programId, formData);
      message.success("Cập nhật thông tin thành công!");
      onUpdate(formData);
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
      className={styles.customModal}
      width={900}
    >
      <h2 className={styles.modalTitle}>CHỈNH SỬA THÔNG TIN CHƯƠNG TRÌNH</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Tên chương trình</label>
            <Input
              className={styles.inputField}
              placeholder="Nhập tên chương trình"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.mainDetail}>
          <div className={styles.leftDetail}>
            <div className={styles.formGroup}>
              <label htmlFor="upload-avatar">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.placeholder}>Loading...</div>
                )}
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
          </div>
          <div className={styles.rightDetail}>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Ngày bắt đầu</label>
                <Input
                  className={styles.inputField}
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  placeholder="Chọn ngày bắt đầu"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ngày kết thúc</label>
                <Input
                  className={styles.inputField}
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  placeholder="Chọn ngày kết thúc"
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Email đơn vị tổ chức</label>
                <Input
                  className={styles.inputField}
                  value={formData.organizerEmail}
                  onChange={(e) =>
                    handleChange("organizerEmail", e.target.value)
                  }
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
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Khoảng thời gian</label>
                <Input
                  className={styles.inputField}
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  placeholder="Nhập khoảng thời gian"
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
                <label>Tần suất</label>
                <Input
                  className={styles.inputField}
                  value={formData.frequency}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                  placeholder="Nhập tần suất"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Loại khảo sát</label>
                <Input
                  className={styles.inputField}
                  value={formData.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                  placeholder="Nhập địa điểm tổ chức"
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Đối tượng tham gia</label>
                <Input
                  className={styles.inputField}
                  value={formData.targetAudience}
                  onChange={(e) =>
                    handleChange("targetAudience", e.target.value)
                  }
                  placeholder="Nhập tần suất"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Vé vào cửa</label>
                <Input
                  className={styles.inputField}
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="Nhập địa điểm tổ chức"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.belowEdit}>
        <label>Nội dung chi tiết chương trình</label>
        <textarea
          className={styles.inputField}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
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
