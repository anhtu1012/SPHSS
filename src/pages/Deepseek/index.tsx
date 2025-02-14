import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
// import axios from "axios";
import { Card, Input, Button, Typography, Space } from "antd";
import {
  SendOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import "./ChatApp.scss"; // Assuming SCSS is set up

const { Text } = Typography;

interface Message {
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isThinking]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsThinking(false);

    try {
        const response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-r1:7b",
                messages: [...messages, userMessage],
                stream: true,
            }),
        });

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

        const decoder = new TextDecoder("utf-8");
        let messageContent = "";
        let reasoningContent = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());
            
            for (const line of lines) {
                try {
                    const data = JSON.parse(line);
                    if (data.message?.content) {
                        if (data.message.content.includes("<think>")) {
                            setIsThinking(true);
                            reasoningContent += data.message.content.replace("<think>", "");
                        } else if (data.message.content.includes("</think>")) {
                            setIsThinking(false);
                            reasoningContent += data.message.content.replace("</think>", "");
                        } else if (isThinking) {
                            reasoningContent += data.message.content;
                        } else {
                            messageContent += data.message.content;
                        }
                    }
                } catch (e) {
                    console.error("Error parsing chunk:", e);
                }
            }
        }

        // Clean up the contents and update messages
        const cleanMessageContent = messageContent.trim();
        const cleanReasoningContent = reasoningContent.split("\n").join(" ").trim();

        setMessages((prev) => {
            const assistantMessage: Message = {
                role: "assistant",
                content: cleanMessageContent,
                reasoning: cleanReasoningContent,
            };
            return [...prev, assistantMessage];
        });

    } catch (error) {
        console.error("Error in streaming response:", error);
    } finally {
        setIsTyping(false);
        setIsThinking(false);
    }
};


console.log("messages", messages);
console.log("isThinking", isThinking);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="chat-container">
      <h1 style={{ textAlign: "center" }}>
        <AppstoreAddOutlined /> Chat with your Custom agent 🤖
      </h1>

      <Card className="chat-card" bodyStyle={{ padding: 0 }} hoverable>
        <div
          className="messages-list"
          style={{ maxHeight: "40vh", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-item ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              <Card
                className={`message-card ${
                  msg.role === "user"
                    ? "user-message-card"
                    : "assistant-message-card"
                }`}
              >
                <Text>{msg.content}</Text>
                {msg.reasoning && (
                  <Text className="reasoning-text">
                     {msg.reasoning}
                  </Text>
                )}
              </Card>
            </div>
          ))}
          {isTyping && (
            <div className="message-item">
              <Card className="message-card typing-card">
                <LoadingOutlined /> Typing...
              </Card>
            </div>
          )}
          {isThinking && (
            <div className="message-item">
              <Card className="message-card thinking-card">
                Thinking...
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      <div className="input-container">
        <Space>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            allowClear
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            disabled={!input.trim()}
          />
        </Space>
      </div>
    </div>
  );
};

export default ChatApp;
