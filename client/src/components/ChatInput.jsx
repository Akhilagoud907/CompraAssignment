import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        className="border p-2 flex-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter instruction..."
      />

      <button
        onClick={handleSend}
        className="bg-black text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}