import asyncHandler from "express-async-handler";

import openaiService from "../services/openaiService.js";
import habitDAO from "../dao/habitDAO.js";

const sendAiMessage = asyncHandler(async (req: any, res: any, next: any) => {
  const { message, conversationHistory } = req.body;
  const userId = req.user.id;

  try {
    const userHabits = await habitDAO.getAllUserHabits(userId);
    const aiReponse = await openaiService.sendChatMessage(
      message,
      conversationHistory || [],
      userHabits
    );

    return res
      .status(200)
      .json({ message: aiReponse, timestamp: new Date().toISOString() });
  } catch (err: any) {
    console.warn(`Error in coach chat: ${JSON.stringify(err)}`);

    if (err.message?.includes("API key")) {
      return next({
        statusCode: 500,
        message: "AI service configuration error",
      });
    }

    if (err.message?.includes("rate limit")) {
      return next({
        statusCode: 429,
        message: "Too many requests to AI services. Plesae try again later",
      });
    }

    next({
      statusCode: 500,
      message: "Failed to process your message. Please try again later.",
    });
  }
});

export default { sendAiMessage };
