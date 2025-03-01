import { Modal, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./EditProgram.module.scss";
import Cbutton from "../../../../components/cButton";
import { UploadOutlined } from "@ant-design/icons";

interface Program {
  programId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: string;
  rating: string;
  categoryId: string;
  time: string;
}

interface ProgramPopupProps {
  isOpen: boolean;
  program: Program;
  onUpdate: (values: Partial<Program>) => Promise<void>;
  onClose: () => void;
}

const ProgramPopup = ({ isOpen, program, onUpdate, onClose }: ProgramPopupProps) => {
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

  // Cập nhật formData khi program thay đổi
  useEffect(() => {
    if (program) {
      setFormData({
        programName: program.title,
        startDate: program.startDate,
        endDate: program.endDate,
        participants: program.targetAudience,
        location: program.location,
        organizerEmail: program.organizerEmail,
        contactPhone: program.contactPhone,
        detailedContent: program.description,
        imageUrl: program.imageUrl,
      });
    }
  }, [program]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    onUpdate({
      title: formData.programName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      targetAudience: formData.participants,
      location: formData.location,
      organizerEmail: formData.organizerEmail,
      contactPhone: formData.contactPhone,
      description: formData.detailedContent,
      imageUrl: formData.imageUrl,
    }).then(() => onClose());
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} className={styles.customModal} width={900}>
      <h2 className={styles.modalTitle}>CHỈNH SỬA THÔNG TIN CHƯƠNG TRÌNH</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Tên chương trình</label>
            <Input className={styles.inputField} placeholder="Nhập tên chương trình" value={formData.programName} onChange={(e) => handleChange("programName", e.target.value)} />
          </div>
        </div>
        <div className={styles.mainDetail}>
          <div className={styles.leftDetail}>
            <div className={styles.formGroup}>
              <label>Ảnh chương trình</label>
              <Upload customRequest={({ file, onSuccess }) => { handleImageUpload(file); onSuccess && onSuccess(file); }} showUploadList={false}>
                <Cbutton icon={<UploadOutlined />} className={styles.uploadButton}>Tải ảnh lên</Cbutton>
              </Upload>
              {formData.imageUrl && <img src={formData.imageUrl} alt="Program" className={styles.previewImage} />}
            </div>
          </div>
          <div className={styles.rightDetail}>
            <div className={styles.formGroup}>
              <label>Ngày bắt đầu</label>
              <Input className={styles.inputField} value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Ngày kết thúc</label>
              <Input className={styles.inputField} value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {error && <p className={`${styles.errorText} ${isShaking ? styles.shaking : ""}`}>{error}</p>}

      <div className={styles.footer}>
        <Cbutton className={styles.saveButton} onClick={handleSave}>Lưu Thay Đổi</Cbutton>
      </div>
    </Modal>
  );
};

export default ProgramPopup;
