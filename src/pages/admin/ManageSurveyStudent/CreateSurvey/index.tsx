import { useState } from "react";
import styles from "./SurveyCreate.module.scss";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Cbutton from "../../../../components/cButton";

const SurveyCreate = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([
    "Khảo Sát Dành Chương Trình",
    "Khảo Sát Dành Tư Vấn Viên",
  ]);
  const [isConfirming, setIsConfirming] = useState(false); 
  const handleAddClick = () => setIsAdding(true);
  const handleCancel = () => {
    setIsAdding(false);
    setNewQuestion("");
  };

  const handleConfirmAdd = () => setIsConfirming(true); 
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
      setIsAdding(false);
      setIsConfirming(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>BẠN MUỐN TẠO KHẢO SÁT GÌ ?</h2>

      <div className={styles.buttons}>
        {questions.map((question, index) => (
          <Cbutton key={index} className={styles.surveyButton}>
            {question}
          </Cbutton>
        ))}

        {isAdding ? (
          <div className={styles.inputContainer}>
            <Input
              autoFocus
              placeholder="Nhập loại khảo sát"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onPressEnter={handleConfirmAdd}
            />
            <div className={styles.actions}>
              <Cbutton className={styles.confirmButton} onClick={handleConfirmAdd}>
                Thêm
              </Cbutton>
              <Cbutton className={styles.cancelButton} onClick={handleCancel}>
                Hủy
              </Cbutton>
            </div>
          </div>
        ) : (
          <div className={styles.addQuestionWrapper} onClick={handleAddClick}>
            <PlusCircleOutlined className={styles.icon} />
            {/* đừng đổi Cbutton */}
            <button className={styles.addQuestionButton}>Bạn muốn thêm loại khảo sát ?</button>
          </div>
        )}
      </div>

      {isConfirming && (
        <div className={styles.overlay}>
          <div className={styles.confirmPopup}>
            <h3>Bạn có chắc chắn muốn thêm câu hỏi này?</h3>
            <div className={styles.popupActions}>
              <Cbutton className={styles.confirmButton} onClick={handleAddQuestion}>
                Xác nhận
              </Cbutton>
              <Cbutton className={styles.cancelButton} onClick={() => setIsConfirming(false)}>
                Hủy
              </Cbutton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyCreate;
