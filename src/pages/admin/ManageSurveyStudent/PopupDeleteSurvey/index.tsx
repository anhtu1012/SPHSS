
import styles from "./DeletePopup.module.scss";
import Cbutton from "../../../../components/cButton";

interface DeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletePopup = ({ isOpen, onClose, onConfirm } : DeletePopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Bạn có chắc chắn muốn xóa khảo sát này không?</h2>
        <div className={styles.buttonGroup}>
          <Cbutton className={styles.buttonDelete} onClick={onConfirm}>Xóa</Cbutton>
          <Cbutton onClick={onClose}>Hủy</Cbutton>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
