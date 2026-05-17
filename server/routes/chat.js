import express from "express";

import {
  resizeArtboard,
  moveElement,
  changeTextSize,
  resizeElement,
   changeColor,
} from "../services/layoutTransforms.js";

import { extractIntent } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, layout } = req.body;

    console.log("USER MESSAGE:", message);

    // AI intent
    const intent = await extractIntent(message);

    console.log("AI INTENT:", intent);

    let updatedLayout = structuredClone(layout);

    // Handle actions
    switch (intent.action) {
      case "resize_artboard":
        updatedLayout = resizeArtboard(
          updatedLayout,
          intent.width,
          intent.height
        );
        break;

      case "move_element":
        updatedLayout = moveElement(
          updatedLayout,
          intent.target,
          intent.position
        );
        break;

      case "change_text_size":
        updatedLayout = changeTextSize(
          updatedLayout,
          intent.target,
          intent.scale
        );
        break;

      case "resize_element":
        updatedLayout = resizeElement(
          updatedLayout,
          intent.target,
          intent.scale
        );
        break;

        case "change_color":
            updatedLayout = changeColor(
                updatedLayout,
                intent.target,
                intent.color
            );
            break;

      default:
        break;
    }

    // Better assistant response
    let assistantMessage = "Layout updated.";

    if (intent.action === "resize_artboard") {
      assistantMessage = `Converted design to ${intent.width} × ${intent.height}`;
    }

    if (intent.action === "move_element") {
      assistantMessage = `Moved ${intent.target} to ${intent.position}`;
    }

    if (intent.action === "change_text_size") {
      assistantMessage = `Updated ${intent.target} text size`;
    }

    if (intent.action === "resize_element") {
      assistantMessage = `Resized ${intent.target}`;
    }

    if (intent.action === "change_color") {
  assistantMessage = `Changed ${intent.target} color`;
}

    if (intent.action === "unknown") {
      assistantMessage = "Sorry, I could not understand that instruction.";
    }

    res.json({
      updatedLayout,
      explanation: assistantMessage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      explanation: "Server error",
    });
  }
});

export default router;