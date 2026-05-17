import { useState } from "react";
import axios from "axios";
import layoutData from "./data/initialLayout.json";
import WireframePreview from "./components/WireframePreview";
import "./App.css";

function App() {
  const [layout, setLayout] = useState(layoutData);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input,
  };

  // immediately show user message
  setMessages((prev) => [...prev, userMessage]);

  try {
    const response = await axios.post(
      "https://compraassignment.onrender.com/api/chat",
      {
        message: input,
        layout,
        history: [...messages, userMessage],
      }
    );

    // update layout
    setLayout(response.data.updatedLayout);

    // show assistant message
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response.data.explanation,
      },
    ]);
  } catch (error) {
    console.log(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong",
      },
    ]);
  }

  setInput("");
};

  return (
    <div className="app">
      <div className="chat-panel">
        <h1>Layout Agent</h1>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "message user"
                  : "message assistant"
              }
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter instruction..."
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div className="preview-panel">
        <WireframePreview layout={layout} />
      </div>
    </div>
  );
}

export default App;