import asyncHandler from "express-async-handler";
import openaiService from "../services/openaiService.js";

const sendAiMessage = asyncHandler(async (req: any, res: any, next: any) => {
  const { message, conversationHistory } = req.body;

  if (!message || typeof message !== "string") {
    return next({
      statusCode: 400,
      message: "Message is required and must be a non-empty string",
    });
  }

  if (message.length > 1000) {
    return next({
      statusCode: 400,
      message: "Message is too long (max 1000 characters)",
    });
  }

  if (conversationHistory !== undefined) {
    if (!Array.isArray(conversationHistory)) {
      return next({
        statusCode: 400,
        message: "Conversation history must be an array",
      });
    }

    // Validate each message history
    const isValidHistory = conversationHistory.every(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        typeof msg.role === "string" &&
        typeof msg.content === "string" &&
        ["user", "assistant"].includes(msg.role)
    );

    if (!isValidHistory) {
      return next({
        statusCode: 400,
        message: "Invalid conversation history format",
      });
    }
  }

  try {
    const aiReponse = await openaiService.sendChatMessage(
      message,
      conversationHistory || []
    );

    return res
      .status(200)
      .json({ message: aiReponse, timestamp: new Date().toISOString() });
  } catch (err) {
    console.warn(`Error in coach chat: ${JSON.stringify(err)}`);

    next({
      statusCode: 500,
      message: "Failed to process your message. Please try again later.",
    });
  }
});

export default { sendAiMessage };
