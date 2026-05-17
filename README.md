# Layout Agent

An AI-powered layout editing assistant that updates a design JSON based on natural language instructions.

Users can type commands like:

- "Move headline to top"
- "Convert this design to 9:16"

The app automatically updates the layout JSON and refreshes the live wireframe preview.

---

# Features

- AI-powered layout editing
- Live wireframe preview
- JSON layout transformations
- Natural language instructions
- Semantic element matching
- Error handling for invalid AI responses

---

# Prerequisites

Before running the project, make sure you have:

- Node.js v18+
- npm installed
- OpenRouter API key (or OpenAI-compatible API key)

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd layout-agent
```

---

## 2. Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `server` folder.

### server/.env

```env
OPENROUTER_API_KEY=your_api_key_here
```

---

## 4. Start the Backend Server

Inside the `server` folder:

```bash
npm run dev
```

Server runs at:

```text
http://localhost:3001
```

---

## 5. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Example Prompts

Try these instructions in the chat:

```text
Convert this design to 9:16
Move the headline to the top
Make the headline smaller
Center the product
Keep the product large
Move the offer badge higher
Change the headline color to red
Make the discount badge bigger
```

---

# Tech Stack

## Frontend

- React
- Vite
- Axios
- CSS

## Backend

- Node.js
- Express
- Nodemon

## AI Integration

- OpenRouter API
- OpenAI SDK
- Open-source LLM models

---

# Supported Actions

| Action | Description |
|--------|-------------|
| resize_artboard | Resize the design canvas |
| move_element | Move elements like headline/product |
| change_text_size | Increase/decrease text size |
| resize_element | Resize product/badge |
| change_color | Change text color |

---

# Error Handling

The project handles:

- Invalid AI JSON responses
- Network/API failures
- Unknown instructions
- Graceful fallback responses

---

# Future Improvements

- Undo/redo support
- Better conversational memory
- More semantic layout editing
- Drag-and-drop editor
- Support for Anthropic/OpenAI APIs

---

# License

This project is for educational and assignment purposes.