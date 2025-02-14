import { Modal } from "antd";
import { useState } from "react";
import Cbutton from "../../../../components/cButton";
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

  return (
    <Modal
      title={
        <div className={styles.modalTitle}>
          {action === "lock"
            ? "Bạn muốn khóa tài khoản này?"
            : action === "unlock"
            ? "Bạn muốn mở tài khoản này?"
            : "Bạn có muốn khóa/mở tài khoản này?"}
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      className={styles.customModal}
    >
      <div className={styles.buttonContainer}>
        {!action ? (
          <>
            <Cbutton className={styles.lockButton} onClick={() => handleConfirm("lock")}>
              Khóa
            </Cbutton>
            <Cbutton className={styles.unlockButton} onClick={() => handleConfirm("unlock")}>
              Mở
            </Cbutton>
          </>
        ) : (
          <>
            <Cbutton
              className={action === "lock" ? styles.lockConfirmButton : styles.unlockConfirmButton}
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
    </Modal>
  );
};

export default PopupChangeStatus;
