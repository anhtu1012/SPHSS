import React, { useState } from "react";
import { Button } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import ChatApp from "../../pages/Deepseek";
import "./style.scss";

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-chat-widget">
      {isOpen ? (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Trợ lý tâm lý AI 🤖</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={toggleChat}
              className="close-button"
            />
          </div>
          <div className="chat-content">
            <ChatApp isFloating={true} />
          </div>
        </div>
      ) : null}

      <Button
        className={`floating-chat-button ${isOpen ? "active" : ""}`}
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={toggleChat}
      />
    </div>
  );
};

export default FloatingChatWidget;
