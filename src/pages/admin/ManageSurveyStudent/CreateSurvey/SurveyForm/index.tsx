import { useState } from "react";
import styles from "./SurveyForm.module.scss";
import Cbutton from "../../../../../components/cButton";
import { Input, Select } from "antd";

interface Question {
  id: number;
  type: string;
  content: string;
  options?: string[];
}

const SurveyForm = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "radio",
      content: "",
      options: ["Lựa chọn 1", "Lựa chọn 2"],
    },
  ]);

  const addQuestion = () => {
    if (questions.length < 50) {
      setQuestions([
        ...questions,
        { id: questions.length + 1, type: "text", content: "" },
      ]);
    }
  };

  const updateQuestionType = (id: number, type: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              type,
              options:
                type === "radio" || type === "checkbox" ? [""] : undefined,
            }
          : q
      )
    );
  };

  const updateOption = (qId: number, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options?.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    );
  };

  const addOption = (qId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: [...(q.options || []), ""] } : q
      )
    );
  };

  return (
    <div className={styles.surveyContainer}>
      <div className={styles.formGroup}>
        <label>Tên khảo sát</label>
        <Input className={styles.inputField} />
      </div>
      <div className={styles.formGroup}>
        <label>Mô tả khảo</label>
        <Input className={styles.inputField} />
      </div>
      <div className={styles.questionList}>
        {questions.map((q, index) => (
          <div key={q.id} className={styles.questionItem}>
            <div className={styles.formGroup}>
              <label>Câu hỏi {index + 1}:</label>
              <Input
                className={styles.inputField}
                placeholder={`Câu hỏi ${index + 1}`}
              />
            </div>

            <Select
              className={styles.select}
              value={q.type}
              onChange={(value) => updateQuestionType(q.id, value)}
              title="Chọn loại câu hỏi"
            >
              <option value="radio">Lựa chọn</option>
              <option value="checkbox">Checkbox</option>
              <option value="rating">Xếp hạng</option>
            </Select>

            {(q.type === "radio" || q.type === "checkbox") && (
              <div className={styles.optionList}>
                {q.options?.map((opt, i) => (
                  <Input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(q.id, i, e.target.value)}
                    placeholder={`Lựa chọn ${i + 1}`}
                    className={styles.input}
                  />
                ))}
                <Cbutton
                  onClick={() => addOption(q.id)}
                  className={styles.addButton}
                >
                  + Thêm lựa chọn
                </Cbutton>
              </div>
            )}

            {q.type === "rating" && (
              <div className={styles.ratingPreview}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} className={styles.star}>
                    ⭐ {num}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Cbutton onClick={addQuestion} className={styles.addButton}>
        + Thêm câu hỏi
      </Cbutton>
    </div>
  );
};

export default SurveyForm;
