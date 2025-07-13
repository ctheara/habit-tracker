import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

import habitClient from "../features/habit/api/habit-client";
import HabitList from "../features/habit/components/HabitList";

const MainDashboard = ({ open, onClose }) => {
  const [habitList, setHabitList] = useState([]);

  const loadHabitList = async () => {
    try {
      console.log("trying to get habit list");
      const response = await habitClient.getHabitList();
      setHabitList(response.data);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  };

  useEffect(() => {
    loadHabitList();
  }, []);

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Habit Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Track your progress and build lasting habits
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <HabitList habits={habitList} />
      </Paper>
    </Container>
  );
};

export default MainDashboard;
