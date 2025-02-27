import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./SurveyCreate.module.scss";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Cbutton from "../../../../components/cButton";
import { useNavigate } from "react-router-dom";
import { getCategory, createCategory } from "../../../../services/admin/api";
import { CategorySurvey } from "../../../../models/admin";

const SurveyCreate = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [category, setCategory] = useState<CategorySurvey[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    getCategory()
      .then((response) => {
        console.log("Category get:", response.data);
        const newData = response.data?.data || [];
        setCategory((prev) => (JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData));
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleNavigate = useCallback((categoryId: string) => {
    console.log("➡️ Navigating to:", `form/${categoryId}`);
    navigate(`form/${categoryId}`);
  }, [navigate]);

  const handleAddClick = () => setIsAdding(true);
  const handleCancel = () => {
    setIsAdding(false);
    setNewQuestion("");
  };

  const handleConfirmAdd = () => setIsConfirming(true);

  const handleAddQuestion = useCallback(() => {
    if (newQuestion.trim()) {
      createCategory({ name: newQuestion, description: "" })
        .then((response) => {
          const newCategory = response.data.data;
          setCategory((prevQuestions) => {
            const safePrevQuestions = Array.isArray(prevQuestions) ? prevQuestions : [];
            return [...safePrevQuestions, newCategory];
          });
          setNewQuestion("");
          setIsAdding(false);
          setIsConfirming(false);
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  }, [newQuestion]);

  const categoryList = useMemo(() => (
    category.map((categoryItem) => (
      <Cbutton
        key={categoryItem.categoryId}
        className={styles.surveyButton}
        onClick={() => handleNavigate(String(categoryItem.categoryId))}
      >
        {categoryItem.name}
      </Cbutton>
    ))
  ), [category, handleNavigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>BẠN MUỐN TẠO KHẢO SÁT GÌ ?</h2>
      <div className={styles.buttons}>
        {categoryList}
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
              <Cbutton
                className={styles.confirmButton}
                onClick={handleConfirmAdd}
              >
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
            <button className={styles.addQuestionButton}>
              Bạn muốn thêm loại khảo sát ?
            </button>
          </div>
        )}
      </div>
      {isConfirming && (
        <div className={styles.overlay}>
          <div className={styles.confirmPopup}>
            <h3>Bạn có chắc chắn muốn thêm câu hỏi này?</h3>
            <div className={styles.popupActions}>
              <Cbutton
                className={styles.confirmButton}
                onClick={handleAddQuestion}
              >
                Xác nhận
              </Cbutton>
              <Cbutton
                className={styles.cancelButton}
                onClick={() => setIsConfirming(false)}
              >
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