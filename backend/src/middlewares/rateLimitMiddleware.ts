import rateLimit from "express-rate-limit";

/**
 * Limit 20 requests per 15 minutes per IP
 */
export const coachRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: {
    message: "Too many request to AI coach. Please try again in a few minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
