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
      .then(({ data }) => {
        console.log("Category get:", data);
        setCategory((prev) => (JSON.stringify(prev) === JSON.stringify(data?.data) ? prev : data?.data || []));
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleNavigate = useCallback((categoryId: string) => {
    if (categoryId) {
      console.log("➡️ Navigating to:", `form/${categoryId}`);
      navigate(`form/${categoryId}`, { state: { categoryId } });
    }
  }, [navigate]);

  const handleAddQuestion = useCallback(() => {
    if (newQuestion.trim()) {
      setIsConfirming(true);
      createCategory({ name: newQuestion, description: "" })
        .then(({ data }) => {
          setCategory((prev) => [...prev, data.data]);
          setNewQuestion("");
          setIsAdding(false);
          setIsConfirming(false);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
          setIsConfirming(false);
        });
    }
  }, [newQuestion]);

  const categoryList = useMemo(() => (
    category.map((categoryItem) => (
      categoryItem.categoryId && (
        <Cbutton
          key={categoryItem.categoryId}
          className={styles.surveyButton}
          onClick={() => handleNavigate(String(categoryItem.categoryId))}
        >
          {categoryItem.name}
        </Cbutton>
      )
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
              onPressEnter={handleAddQuestion}
            />
            <div className={styles.actions}>
              <Cbutton className={styles.confirmButton} onClick={handleAddQuestion}>
                Thêm
              </Cbutton>
              <Cbutton className={styles.cancelButton} onClick={() => setIsAdding(false)}>
                Hủy
              </Cbutton>
            </div>
          </div>
        ) : (
          <div className={styles.addQuestionWrapper} onClick={() => setIsAdding(true)}>
            <PlusCircleOutlined className={styles.icon} />
            <button className={styles.addQuestionButton}>Bạn muốn thêm loại khảo sát ?</button>
          </div>
        )}
      </div>
      {isConfirming && (
        <div className={styles.overlay}>
          <div className={styles.confirmPopup}>
            <h3>Đang thêm loại khảo sát...</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyCreate;
