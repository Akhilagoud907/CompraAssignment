import { useState } from "react";

import initialLayout from "../data/initialLayout.json";

import { sendChatMessage } from "../utils/api";

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const data = await sendChatMessage({
        message: text,
        layout,
        history: messages.slice(-6),
      });

      setLayout(data.updatedLayout);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.explanation,
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return {
    layout,
    messages,
    loading,
    sendMessage,
  };
}