const AiChat = ({ message }: { message: string }) => {
  return (
    <div className="chatbot__ai__container">
      <div className="chatbot__ai__icon"></div>
      <div className="chatbot__ai__message">{message}</div>
    </div>
  );
};

export default AiChat;
