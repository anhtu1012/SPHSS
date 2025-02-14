import AiChat from "./AiChat";
import "./index.scss";
import { FaRegPaperPlane } from "react-icons/fa";
import UserChat from "./UserChat";

const AiChatBot = () => {
  return (
    <>
      <div className="chatbot__container">
        <AiChat message="Chào bạn! Mình có thể giúp gì được cho bạn?" />
        <UserChat message="Mình cần hỗ trợ tư vấn tâm lý ạ!" />
        <AiChat message="Vâng ạ! Bạn vui lòng điền form khảo sát tâm lý giúp mình nhé!" />
        <UserChat message="Mình cảm ơn ạ!" />
      </div>

      {/* input */}
      <div className="chatbot__input__container">
        <input type="text" className="chatbot__input" />
        <button className="chatbot__input__icon__container">
          <FaRegPaperPlane className="chatbot__input__icon" color="#ffffff" />
        </button>
      </div>
    </>
  );
};

export default AiChatBot;
