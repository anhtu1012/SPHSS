import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createSurvey } from "../../../../../services/admin/api";
import styles from "./SurveyForm.module.scss";
import Cbutton from "../../../../../components/cButton";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const SurveyForm = () => {
  const location = useLocation();
  const categoryId = location.state?.categoryId || 1;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ value: 0, optionText: "" }] },
  ]);
  const [message, setMessage] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [{ value: 0, optionText: "" }] },
    ]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const updateQuestionText = (index: number, text: string) => {
    console.log("User nhập:", text); 
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };
  
  const addOption = (qIndex: number) => {
    const updatedQuestions = [...questions];
    const newOption = {
      value: 0, 
      optionText: "",
    };
    updatedQuestions[qIndex].options.push(newOption);
    setQuestions(updatedQuestions);
  };
  

  const removeOption = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].optionText = text;
    setQuestions(updatedQuestions);
  };

  const updateValue = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].value = Number(value) || 0; 
    setQuestions(updatedQuestions);
  };

  const handleCreateSurvey = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      questions.some((q) => !q.questionText.trim())
    ) {
      setMessage("⚠️ Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const surveyData = {
      title,
      description,
      categoryId: Number(categoryId), 
      questions,
    };
    
    console.log("Dữ liệu gửi đi:", surveyData);
  
    createSurvey(surveyData)
      .then((res) => {
        console.log("Survey created:", res.data);
        setMessage("✔ Khảo sát đã được tạo thành công!");
        setTitle("");
        setDescription("");
        setQuestions([
          { questionText: "", options: [{ value: 1, optionText: "" }] },
        ]);
        setTimeout(() => setMessage(""), 5000);
      })
      .catch((err) => {
        console.error("Lỗi API:", err);
        setMessage("❌ Có lỗi xảy ra. Vui lòng thử lại.");
      });
  };
  

  return (
    <div className={styles.surveyContainer}>
      <div className={styles.formGroup}>
        <label>Tên khảo sát</label>
        <input
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Mô tả</label>
        <input
          className={styles.inputField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả"
        />
      </div>

      <div className={styles.questionsContainer}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className={styles.questionBlock}>
            <p className={styles.questionTitle}>Câu hỏi {qIndex + 1}</p>
            <div className={styles.questionForm}>
              <input
                className={styles.inputField}
                value={q.questionText}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                placeholder="Nhập câu hỏi"
              />
              <Cbutton
                className={styles.removeButton}
                onClick={() => removeQuestion(qIndex)}
              >
                <DeleteOutlined />
              </Cbutton>
            </div>

            <div className={styles.optionsContainer}>
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className={styles.optionBlock}>
                  <input
                    className={styles.inputField}
                    value={opt.optionText}
                    onChange={(e) =>
                      updateOptionText(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Nhập lựa chọn ${oIndex + 1}`}
                  />

                  <input
                    className={styles.inputField}
                    type="number"
                    value={opt.value}
                    onChange={(e) =>
                      updateValue(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Nhập điểm`}
                  />

                  <Cbutton
                    className={styles.removeButton}
                    onClick={() => removeOption(qIndex, oIndex)}
                  >
                    <DeleteOutlined />
                  </Cbutton>
                  <Cbutton
                    className={styles.addOptionButton}
                    onClick={() => addOption(qIndex)}
                  >
                    <PlusOutlined />
                  </Cbutton>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Cbutton className={styles.addQuestionButton} onClick={addQuestion}>
          <PlusOutlined /> Thêm câu hỏi
        </Cbutton>
      </div>

      {message && <div className={styles.successMessage}>{message}</div>}

      <Cbutton onClick={handleCreateSurvey}>Tạo Khảo Sát</Cbutton>
    </div>
  );
};

export default SurveyForm;
