import styles from "./CreateProgram.module.scss";
import { Input, Upload, message } from "antd";
import Cbutton from "../../../../components/cButton";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

function ManageDashboard() {
  const [formData, setFormData] = useState({
    programName: "",
    startDate: "",
    endDate: "",
    participants: "",
    location: "",
    organizerEmail: "",
    contactPhone: "",
    detailedContent: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
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
    console.log("Dữ liệu chương trình:", formData);
  };

  const handleImageUpload = (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được tải lên file ảnh!");
      return false;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div>
      <h2 className={styles.modalTitle}>TẠO CHƯƠNG TRÌNH</h2>
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
        <div className={styles.mainDetail}>
          <div className={styles.leftDetail}>
            <div className={styles.formGroup}>
              <label>Ảnh chương trình</label>
              <Upload
                customRequest={({ file, onSuccess }) => {
                  handleImageUpload(file);
                  onSuccess && onSuccess(file);
                }}
                showUploadList={false}
              >
                <Cbutton
                  icon={<UploadOutlined />}
                  className={styles.uploadButton}
                >
                  Tải ảnh lên
                </Cbutton>
              </Upload>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Program"
                  className={styles.previewImage}
                />
              )}
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
          Tạo Chương Trình
        </Cbutton>
      </div>
    </div>
  );
}

export default ManageDashboard;
