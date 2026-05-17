import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function extractIntent(message) {
  try {
    console.log("USER MESSAGE:", message);

    const response = await openai.chat.completions.create({
      model: "openchat/openchat-7b:free",

      messages: [
        {
          role: "system",
          content: `
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

EXAMPLES:

User: Convert this design to 9:16

{
  "action":"resize_artboard",
  "width":1080,
  "height":1920
}

User: Move headline to top

{
  "action":"move_element",
  "target":"headline",
  "position":"top"
}

User: Center headline

{
  "action":"move_element",
  "target":"headline",
  "position":"center"
}

User: Make headline smaller

{
  "action":"change_text_size",
  "target":"headline",
  "scale":0.8
}

User: Make headline bigger

{
  "action":"change_text_size",
  "target":"headline",
  "scale":1.2
}

User: Move product to center

{
  "action":"move_element",
  "target":"product",
  "position":"center"
}

User: Make badge bigger

{
  "action":"resize_element",
  "target":"offer_badge",
  "scale":1.3
}

User: Keep the product large

{
  "action":"resize_element",
  "target":"product",
  "scale":1.2
}

User: Move the offer badge higher

{
  "action":"move_element",
  "target":"offer_badge",
  "position":"top"
}

User: Change headline color to red

{
  "action":"change_color",
  "target":"headline",
  "color":"#ff0000"
}

Return ONLY valid JSON.
`,
        },

        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0,
      max_tokens: 100,
    });

    const text = response.choices[0].message.content;

    console.log("AI RESPONSE:", text);

    return JSON.parse(text);

  } catch (error) {

    console.log("LLM ERROR:", error);

    const lower = message.toLowerCase();

    // Convert to 9:16
    if (
      lower.includes("9:16") ||
      lower.includes("story") ||
      lower.includes("reel")
    ) {
      return {
        action: "resize_artboard",
        width: 1080,
        height: 1920,
      };
    }

    // Move headline to top
    if (
      lower.includes("headline") &&
      (
        lower.includes("top") ||
        lower.includes("higher")
      )
    ) {
      return {
        action: "move_element",
        target: "headline",
        position: "top",
      };
    }

    // Center headline
    if (
      lower.includes("headline") &&
      lower.includes("center")
    ) {
      return {
        action: "move_element",
        target: "headline",
        position: "center",
      };
    }

    // Make headline smaller
    if (
      lower.includes("headline") &&
      (
        lower.includes("smaller") ||
        lower.includes("reduce") ||
        lower.includes("decrease")
      )
    ) {
      return {
        action: "change_text_size",
        target: "headline",
        scale: 0.8,
      };
    }

    // Make headline bigger
    if (
      lower.includes("headline") &&
      (
        lower.includes("bigger") ||
        lower.includes("larger") ||
        lower.includes("increase")
      )
    ) {
      return {
        action: "change_text_size",
        target: "headline",
        scale: 1.2,
      };
    }

    // Change headline color to red
    if (
      lower.includes("headline") &&
      lower.includes("red")
    ) {
      return {
        action: "change_color",
        target: "headline",
        color: "#ff0000",
      };
    }

    // Center product
    if (
      lower.includes("product") &&
      lower.includes("center")
    ) {
      return {
        action: "move_element",
        target: "product",
        position: "center",
      };
    }

    // Keep product large
    if (
      lower.includes("product") &&
      (
        lower.includes("large") ||
        lower.includes("bigger") ||
        lower.includes("larger")
      )
    ) {
      return {
        action: "resize_element",
        target: "product",
        scale: 1.2,
      };
    }

    // Make badge bigger
    if (
      (
        lower.includes("badge") ||
        lower.includes("discount")
      ) &&
      (
        lower.includes("bigger") ||
        lower.includes("larger")
      )
    ) {
      return {
        action: "resize_element",
        target: "offer_badge",
        scale: 1.3,
      };
    }

    // Move badge higher
    if (
      (
        lower.includes("badge") ||
        lower.includes("offer")
      ) &&
      (
        lower.includes("higher") ||
        lower.includes("top")
      )
    ) {
      return {
        action: "move_element",
        target: "offer_badge",
        position: "top",
      };
    }

    return {
      action: "unknown",
    };
  }
}
