import { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

/**
 * Chat input component with send button
 * @param {Function} onSendMessage - Callback when message is sent
 * @param {boolean} isLoading - True if waiting for AI response
 */
const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage(""); // Clear input
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (Shift+Enter for new line)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1,
        p: 2,
        borderTop: "1px solid #e0e0e0",
        bgcolor: "white",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={3}
        placeholder="Ask your coach anything about your habits..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        variant="outlined"
        size="small"
      />
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim() || isLoading}
        sx={{ alignSelf: "flex-end" }}
      >
        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
      </IconButton>
    </Box>
  );
};

export default ChatInput;
