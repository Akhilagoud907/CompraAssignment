export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`mb-3 p-3 rounded ${
            msg.role === "user"
              ? "bg-blue-200"
              : "bg-gray-200"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}