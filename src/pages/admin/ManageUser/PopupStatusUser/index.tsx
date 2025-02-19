import { useState } from "react";
import Cbutton from "../../../../components/cButton";
import { X } from "lucide-react"; // Import icon X từ lucide-react
import styles from "./popupStatusChange.module.scss";

interface PopupChangeStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupChangeStatus = ({ isOpen, onClose }: PopupChangeStatusProps) => {
  const [action, setAction] = useState<"lock" | "unlock" | null>(null);

  const handleConfirm = (type: "lock" | "unlock") => {
    setAction(type);
  };

  const handleCancel = () => {
    setAction(null);
    onClose();
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <Cbutton className={styles.closeButton} onClick={handleCancel}>
          <X size={20} />
        </Cbutton>

        <div className={styles.modalTitle}>
          {action === "lock"
            ? "Bạn muốn khóa tài khoản này?"
            : action === "unlock"
            ? "Bạn muốn mở tài khoản này?"
            : "Bạn có muốn khóa/mở tài khoản này?"}
        </div>
        <div className={styles.buttonContainer}>
          {!action ? (
            <>
              <Cbutton
                className={styles.lockButton}
                onClick={() => handleConfirm("lock")}
              >
                Khóa
              </Cbutton>
              <Cbutton
                className={styles.unlockButton}
                onClick={() => handleConfirm("unlock")}
              >
                Mở
              </Cbutton>
            </>
          ) : (
            <>
              <Cbutton
                className={
                  action === "lock"
                    ? styles.lockConfirmButton
                    : styles.unlockConfirmButton
                }
                onClick={handleCancel}
              >
                Xác nhận
              </Cbutton>
              <Cbutton className={styles.cancelButton} onClick={handleCancel}>
                Hủy
              </Cbutton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupChangeStatus;
