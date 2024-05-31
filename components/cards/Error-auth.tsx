type MessageProps = {
  message?: string;
  type: "success" | "error";
};

const MessageAuth = ({ message, type }: MessageProps) => {
  if (!message) return null;
  const messageClasses = {
    success: "bg-green-300 border-green-500",
    error: "bg-red-300 border-red-500",
  };

  return (
    <div className={`p-2 rounded-md border-2 text-sm ${messageClasses[type]}`}>
      {message}
    </div>
  );
};

export default MessageAuth;
