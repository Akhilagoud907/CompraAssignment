import axios from "axios";

export const sendChatMessage = async (payload) => {
  const response = await axios.post(
    "http://localhost:3001/api/chat",
    payload
  );

  return response.data;
};