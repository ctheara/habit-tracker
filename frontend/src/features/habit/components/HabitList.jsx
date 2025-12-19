import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";

const HabitList = ({ habits }) => {
  const navigate = useNavigate();

  const handleRowClick = (habitId) => {
    navigate(`/edit-habit/${habitId}`);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "600",
          color: "#1a2233",
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        My Habits ({habits.length})
      </Typography>

      {habits.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No habits yet!
          </Typography>
          <Typography variant="body1">
            Create your first habit to get started on your journey.
          </Typography>
        </Box>
      ) : (
        <Table
          sx={{
            minWidth: "100%",
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #e0e0e0",
              padding: "16px 12px",
            },
            "& .MuiTableHead-root .MuiTableCell-root": {
              backgroundColor: "#f8f9fa",
              fontWeight: "bold",
              color: "#1a2233",
              fontSize: "0.95rem",
            },
            "& .MuiTableBody-root .MuiTableRow-root": {
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            },
            "& .MuiTableBody-root .MuiTableRow-root:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 150 }}>Habit Name</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Description</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Motivation</TableCell>
              <TableCell sx={{ minWidth: 100 }}>Duration</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Target Date</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit) => (
              <TableRow
                key={habit.habitId}
                onClick={() => handleRowClick(habit.habitId)}
              >
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                    {habit.habitName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {habit.description || "No description"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {habit.motivation || "No motivation set"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${habit.duration?.days ?? 0} days`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {habit.targetDate
                      ? dayjs(habit.targetDate).format("MMM DD, YYYY")
                      : "No target set"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {dayjs(habit.createdDate).format("MMM DD, YYYY")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default HabitList;
