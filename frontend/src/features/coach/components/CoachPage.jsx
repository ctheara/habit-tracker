import { useState, useEffect, useRef } from "react";
import { Container, Typography, Box, Paper, Alert } from "@mui/material";
import coachClient from "../api/coach-client";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

/**
 * Main AI Coach page with chat interface
 */
const CoachPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message on mount
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your habit coach. I'm here to help you build and maintain healthy habits. I can see your current habits and provide personalized advice. How can I support you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  /**
   * Handle sending a message to the AI coach
   */
  const handleSendMessage = async (messageContent) => {
    // Add user message to chat
    const userMessage = {
      role: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setError("");
    setIsLoading(true);

    try {
      // Prepare conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send to API
      const response = await coachClient.sendMessage(
        messageContent,
        conversationHistory
      );

      // Add AI response to chat
      const aiMessage = {
        role: "assistant",
        content: response.message,
        timestamp: response.timestamp,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);

      // Determine error message
      let errorMessage = "Failed to reach your coach. Please try again.";

      if (err.response?.status === 429) {
        errorMessage =
          "You've sent too many messages. Please wait a few minutes and try again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);

      // Remove user message if request failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: "calc(100vh - 100px)" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Habit Coach
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get personalized advice and motivation for your habits
        </Typography>
      </Box>

      {/* Chat Container */}
      <Paper
        elevation={3}
        sx={{
          height: "calc(100% - 120px)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            bgcolor: "#fafafa",
          }}
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isUser={msg.role === "user"}
            />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Coach is thinking...
              </Typography>
            </Box>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </Box>

        {/* Error Display */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{ m: 2, mb: 0 }}
          >
            {error}
          </Alert>
        )}

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </Paper>
    </Container>
  );
};

export default CoachPage;
