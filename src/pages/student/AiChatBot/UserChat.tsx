const UserChat = ({ message }: { message: string }) => {
  return (
    <div className="chatbot__user__container">
      <div className="chatbot__user__message">{message}</div>
    </div>
  );
};

export default UserChat;
