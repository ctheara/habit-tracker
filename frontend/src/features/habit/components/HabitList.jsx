import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const HabitList = ({ habits }) => {
  console.log(habits);
  return (
    <>
      <Typography variant="h5" gutterBottom>
        My Habits
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Habit Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Motivation</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Target Date</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habits.map((habit) => (
              <TableRow key={habit.habitId}>
                <TableCell>{habit.habitName}</TableCell>
                <TableCell>{habit.description || "-"}</TableCell>
                <TableCell>{habit.motivation || "-"}</TableCell>
                <TableCell>{habit.duration?.days ?? "-"} days</TableCell>
                <TableCell>
                  {habit.targetDate
                    ? dayjs(habit.targetDate).format("MMM DD, YYYY")
                    : "-"}
                </TableCell>
                <TableCell>
                  {dayjs(habit.createdDate).format("MMM DD, YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HabitList;
