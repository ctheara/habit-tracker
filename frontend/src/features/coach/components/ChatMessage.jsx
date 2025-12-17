import { Box, Paper, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

/**
 * Individual chat message component
 * @param {Object} message - Message object {role, content, timestamp}
 * @param {boolean} isUser - True if message is from user
 */
const ChatMessage = ({ message, isUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
        gap: 1,
      }}
    >
      {/* AI Avatar (left side) */}
      {!isUser && (
        <Avatar sx={{ bgcolor: "#1976d2" }}>
          <SmartToyIcon />
        </Avatar>
      )}

      {/* Message Content */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          bgcolor: isUser ? "#e3f2fd" : "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap", // Preserve line breaks
            wordBreak: "break-word",
          }}
        >
          {message.content}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>

      {/* User Avatar (right side) */}
      {isUser && (
        <Avatar sx={{ bgcolor: "#2c3e50" }}>
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
};

export default ChatMessage;
