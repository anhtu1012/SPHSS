import { useState } from "react";
import Cbutton from "../../../../components/cButton";
import { X } from "lucide-react";
import styles from "./popupStatusChange.module.scss";
import { changeUserStatus } from "../../../../services/admin/api";

interface PopupChangeStatusProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; 
  currentStatus: boolean;
}


const PopupChangeStatus = ({ isOpen, onClose, userId, currentStatus }: PopupChangeStatusProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const newStatus = !currentStatus; 
      await changeUserStatus(userId, newStatus); 
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Lỗi khi thay đổi trạng thái.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <Cbutton className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </Cbutton>

        <div className={styles.modalTitle}>
          {currentStatus ? "Bạn muốn khóa tài khoản này?" : "Bạn muốn mở tài khoản này?"}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonContainer}>
          <Cbutton
            className={currentStatus ? styles.lockConfirmButton : styles.unlockConfirmButton}
            onClick={handleChangeStatus}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </Cbutton>
          <Cbutton className={styles.cancelButton} onClick={onClose} disabled={loading}>
            Hủy
          </Cbutton>
        </div>
      </div>
    </div>
  );
};

export default PopupChangeStatus;
