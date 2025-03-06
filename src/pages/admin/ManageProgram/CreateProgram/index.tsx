import styles from "./CreateProgram.module.scss";
import { Input, Upload, message, DatePicker } from "antd";
import Cbutton from "../../../../components/cButton";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createProgram } from "../../../../services/admin/api";
import { Program2 } from "../../../../models/admin";

function ManageDashboard() {
  const [formData, setFormData] = useState<Program2>(() => ({
    title: "",
    description: "",
    categoryId: 0,
    startDate: "",
    endDate: "",
    time: "",
    frequency: "",
    targetAudience: "",
    location: "",
    organizerEmail: "",
    contactPhone: "",
    imageUrl: "",
    price: 0,
    rating: 0,
  }));

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDateChange = (
    field: "startDate" | "endDate",
    date: dayjs.Dayjs | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.utc().format("YYYY-MM-DDTHH:mm:ss[Z]") : "",
    }));
  };

  const handleImageUpload = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `programs/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        message.error("Upload ảnh thất bại.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, imageUrl: downloadURL }));
        message.success("Upload ảnh thành công!");
      }
    );
  };

  const handleSave = async () => {
    if (formData.startDate && formData.endDate) {
      const start = dayjs(formData.startDate);
      const end = dayjs(formData.endDate);
      if (end.isBefore(start)) {
        message.error("Ngày kết thúc không thể trước ngày bắt đầu!");
        return;
      }
    }

    const payload: Program2 = {
      ...formData,
      categoryId: Number(formData.categoryId),
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    try {
      await createProgram(payload);
      message.success("Tạo chương trình thành công!");
      setFormData({
        title: "",
        description: "",
        categoryId: 0,
        startDate: "",
        endDate: "",
        time: "",
        frequency: "",
        targetAudience: "",
        location: "",
        organizerEmail: "",
        contactPhone: "",
        imageUrl: "",
        price: 0,
        rating: 0,
      });
    } catch (error) {
      message.error("Lỗi khi tạo chương trình!");
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <h2 className={styles.modalTitle}>TẠO CHƯƠNG TRÌNH</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroups}>
          <div className={styles.formGroup}>
            <label>Tiêu đề</label>
            <Input
              placeholder="Nhập tiêu đề"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.mainDetail}>
          <div className={styles.leftDetail}>
            <div className={styles.formGroup}>
              <label>Ảnh chương trình</label>
              <Upload
                customRequest={({ file, onSuccess }) => {
                  if (file instanceof File) {
                    handleImageUpload(file);
                    onSuccess && onSuccess("done");
                  } else {
                    message.error("File không hợp lệ!");
                  }
                }}
                showUploadList={false}
              >
                <Cbutton icon={<UploadOutlined />}>Tải ảnh lên</Cbutton>
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
                <label>Đối tượng tham gia</label>
                <Input
                  placeholder="Nhập đối tượng tham gia"
                  value={formData.targetAudience}
                  onChange={(e) =>
                    handleChange("targetAudience", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Loại khảo sát</label>
                <Input
                  placeholder="Nhập ID loại khảo sát"
                  value={formData.categoryId}
                  onChange={(e) => handleChange("categoryId", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Giờ diễn ra</label>
                <Input
                  placeholder="Nhập giờ diễn ra (VD: 19:00 - 21:00)"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tần suất</label>
                <Input
                  placeholder="Nhập tần suất"
                  value={formData.frequency}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Email tổ chức</label>
                <Input
                  placeholder="Nhập email tổ chức"
                  value={formData.organizerEmail}
                  onChange={(e) =>
                    handleChange("organizerEmail", e.target.value)
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Địa điểm</label>
                <Input
                  placeholder="Nhập địa điểm"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Giá vé vào cửa</label>
                <Input
                  placeholder="Nhập giá"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Ngày bắt đầu</label>
                <div className={styles.dateForm}>
                  <DatePicker
                    value={
                      formData.startDate ? dayjs(formData.startDate) : null
                    }
                    onChange={(date) => {
                      if (date) {
                        handleDateChange(
                          "startDate",
                          date.set("minute", 0).set("second", 0)
                        );
                      }
                    }}
                    format="YYYY-MM-DD HH:mm"
                    showTime={{
                      defaultValue: dayjs("00:00", "HH:mm"),
                    }}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Ngày kết thúc</label>
                <div className={styles.dateForm}>
                  <DatePicker
                    value={formData.endDate ? dayjs(formData.endDate) : null}
                    onChange={(date) => {
                      if (date) {
                        handleDateChange(
                          "endDate",
                          date.set("minute", 0).set("second", 0)
                        );
                      }
                    }}
                    format="YYYY-MM-DD HH:mm"
                    showTime={{
                      defaultValue: dayjs("00:00", "HH:mm"),
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div className={styles.formGroups}>
              <div className={styles.formGroup}>
                <label>Đánh giá</label>
                <Input
                  placeholder="Nhập đánh giá"
                  value={formData.rating}
                  onChange={(e) => handleChange("rating", e.target.value)}
                />
              </div>
            </div> */}
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
      <div className={styles.footer}>
        <Cbutton className={styles.saveButton} onClick={handleSave}>
          Tạo Chương Trình
        </Cbutton>
      </div>
    </div>
  );
}

export default ManageDashboard;
