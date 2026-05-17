# Layout Agent – Approach Note

## 1. LLM Prompt Structure

The project uses an LLM-based intent extraction system to convert natural language instructions into structured JSON actions.

The prompt is designed using:

- A clear system role
- Supported action definitions
- Available target elements
- Multiple input/output examples
- Strict instruction to return valid JSON only

Example prompt structure:

```txt
You are a layout editing AI.

Convert user instructions into JSON actions.

AVAILABLE ACTIONS:
- resize_artboard
- move_element
- change_text_size
- resize_element
- change_color

AVAILABLE TARGETS:
- headline
- subheadline
- product
- offer_badge
- offer_text

Return ONLY valid JSON.
```

Few-shot examples are included to improve consistency:

```json
{
  "action": "move_element",
  "target": "headline",
  "position": "top"
}
```

This approach improves:
- Intent accuracy
- Structured output generation
- Reduced hallucinations
- Easier backend processing

---

# 2. Safe JSON Transformation Handling

The backend never modifies the original layout object directly.

Instead:

```js
let updatedLayout = structuredClone(layout);
```

A cloned version of the layout is transformed safely using helper functions such as:

- `resizeArtboard()`
- `moveElement()`
- `changeTextSize()`
- `resizeElement()`
- `changeColor()`

Semantic node matching is used to identify elements reliably:

```js
findSemanticNode(layout, "headline");
```

This prevents:
- Accidental mutation
- UI crashes
- Invalid node access
- Incorrect layout updates

Fallback handling is also implemented if:
- LLM returns invalid JSON
- API fails
- Unknown instruction is received

Example:

```js
return {
  action: "unknown"
};
```

---

# 3. Conversation Context Management

Conversation history is maintained in the frontend using React state:

```js
const [messages, setMessages] = useState([]);
```

Each user message and assistant response is appended to the chat history.

Recent messages are sent with each API request:

```js
history: [...messages, userMessage]
```

This allows the agent to:
- Understand follow-up instructions
- Maintain editing continuity
- Support conversational interactions

Example:

```txt
User: Convert design to 9:16
User: Keep the product large
```

The second instruction works because the layout state is continuously updated and preserved.

---

# 4. Trade-offs & Future Improvements

## Trade-offs Made

### Rule-based fallback logic

A keyword-based fallback system was added to ensure reliability when the LLM fails or returns invalid JSON.

Advantages:
- More stable demo experience
- Better error recovery
- Faster debugging

Disadvantage:
- Limited natural language understanding
- Requires manual rule additions

---

### Semantic matching using text content

Elements are identified using partial text matching:

```js
content.includes("Luxury Comfort")
```

Advantages:
- Simple implementation
- Easy to debug

Disadvantages:
- Fragile if content changes
- Not scalable for large designs

---

# Improvements With More Time

## Better semantic mapping

Introduce:
- Stable node IDs
- Element tagging
- Embedding-based matching

---

## More layout actions

Support:
- Alignment
- Padding
- Rotation
- Layer ordering
- Group editing

---

## Improved conversational memory

Use:
- Persistent session memory
- Summarized history
- Context-aware follow-up reasoning

---

## Better rendering engine

Current preview is simplified.

Future versions could support:
- True responsive scaling
- Drag-and-drop editing
- Live canvas rendering
- Animation support

---

## Anthropic integration

The current implementation uses OpenRouter.

Future improvement:
- Direct Anthropic Claude API integration
- Stronger structured JSON generation
- Better instruction understanding

---

# Summary

The system combines:
- LLM-based intent extraction
- Safe JSON transformation
- Semantic node matching
- Live UI rendering
- Conversational interaction

to create a lightweight AI-powered layout editing agent.