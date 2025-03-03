/* eslint-disable prefer-const */
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import trainingData from "../../data/trainingData.json";
// import axios from "axios";
import { Card, Input, Button, Typography } from "antd";
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

interface ChatAppProps {
  isFloating?: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({ isFloating = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Thêm tin nhắn chào mừng khi component được mount
    const welcomeMessage: Message = {
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý tâm lý AI. Bạn có thể chia sẻ với tôi bất cứ điều gì đang khiến bạn trăn trở. Tôi luôn ở đây để lắng nghe và hỗ trợ bạn 😊",
    };
    setMessages([welcomeMessage]);
  }, []); // Chỉ chạy một lần khi component mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isThinking]);

  const findTrainingResponse = (input: string): string | null => {
    const normalizedInput = input.toLowerCase().trim();
    const inputWords = normalizedInput.split(" ");

    // Tạo mảng lưu các kết quả phù hợp và số từ khóa match
    let matches: { answer: string; matchCount: number }[] = [];

    trainingData.conversations.forEach((conv) => {
      let matchCount = 0;

      // Kiểm tra từng từ trong câu hỏi chính
      const questionWords = conv.question.toLowerCase().split(" ");
      questionWords.forEach((word) => {
        if (inputWords.includes(word)) matchCount++;
      });

      // Kiểm tra từng từ trong các câu hỏi tương tự
      conv.similarQuestions?.forEach((similar) => {
        const similarWords = similar.toLowerCase().split(" ");
        let similarMatchCount = 0;
        similarWords.forEach((word) => {
          if (inputWords.includes(word)) similarMatchCount++;
        });
        // Lấy số match cao nhất giữa câu hỏi chính và câu hỏi tương tự
        matchCount = Math.max(matchCount, similarMatchCount);
      });

      // Nếu có ít nhất 1 từ khóa match, thêm vào mảng kết quả
      if (matchCount > 0) {
        matches.push({
          answer: conv.answer,
          matchCount: matchCount,
        });
      }
    });

    // Sắp xếp theo số từ khóa match giảm dần và lấy câu trả lời có nhiều từ khóa match nhất
    matches.sort((a, b) => b.matchCount - a.matchCount);
    return matches.length > 0 ? matches[0].answer : null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsThinking(false);

    // Check training data first
    const trainedResponse = findTrainingResponse(input);
    if (trainedResponse) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: trainedResponse,
          },
        ]);
        setIsTyping(false);
      }, 1000);
      return;
    }

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
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              if (data.message.content.includes("<think>")) {
                setIsThinking(true);
                reasoningContent += data.message.content.replace("<think>", "");
              } else if (data.message.content.includes("</think>")) {
                setIsThinking(false);
                reasoningContent += data.message.content.replace(
                  "</think>",
                  ""
                );
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
      const cleanReasoningContent = reasoningContent
        .split("\n")
        .join(" ")
        .trim();

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
    <div className={`chat-container ${isFloating ? "floating-mode" : ""}`}>
      {!isFloating && (
        <h1 style={{ textAlign: "center" }}>
          <AppstoreAddOutlined /> Nhắn tin cùng trợ lý tư vấn tâm lí 🤖
        </h1>
      )}

      <Card className="chat-card" bodyStyle={{ padding: 0 }} hoverable>
        <div
          className="messages-list"
          style={{
            maxHeight: isFloating ? "400px" : "72vh",
            overflowY: "auto",
            fontSize: isFloating ? "13px" : "14px",
          }}
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
                  <Text className="reasoning-text">{msg.reasoning}</Text>
                )}
              </Card>
            </div>
          ))}
          {isTyping && (
            <div className="message-item">
              <Card className="message-card typing-card">
                <LoadingOutlined /> Đang suy nghĩ đợi tí nhé !!!😉
              </Card>
            </div>
          )}
          {isThinking && (
            <div className="message-item">
              {/* <Card className="message-card thinking-card">Đang suy nghĩ đợi tí nhé !!!😉</Card> */}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      <div className="input-container">
        <div className="input-wrapper">
          <Input
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            allowClear
          />
          <Button
            className="send-button"
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            disabled={!input.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
