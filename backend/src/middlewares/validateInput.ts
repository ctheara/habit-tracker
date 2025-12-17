import { Request, Response, NextFunction } from "express";

const validateCoachMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, conversationHistory } = req.body;

  // Validate message
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

  // Validate conversationHistory
  if (conversationHistory !== undefined) {
    if (!Array.isArray(conversationHistory)) {
      return next({
        statusCode: 400,
        message: "Conversation history must be an array",
      });
    }

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

  next();
};

export { validateCoachMessage };
