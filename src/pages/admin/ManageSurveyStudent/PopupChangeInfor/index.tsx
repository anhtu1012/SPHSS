import React, { useState } from "react";
import styles from "./ChangeInfoPopup.module.scss";
import Cbutton from "../../../../components/cButton";

interface ChangeInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newInfo: string) => void;
}

const ChangeInfoPopup: React.FC<ChangeInfoPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [newInfo, setNewInfo] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newInfo);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Thay đổi thông tin khảo sát</h2>
        <input 
          type="text" 
          value={newInfo} 
          onChange={(e) => setNewInfo(e.target.value)} 
          placeholder="Nhập thông tin mới..."
        />
        <div className={styles.buttonGroup}>
          <Cbutton onClick={handleSave}>Lưu</Cbutton>
          <Cbutton onClick={onClose}>Hủy</Cbutton>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoPopup;
