import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import authClient from "../features/auth/api/auth-client";
import habitClient from "../features/habit/api/habit-client";
import HabitList from "../features/habit/components/HabitList";

const MainDashboard = ({ open, onClose }) => {
  const [habitList, setHabitList] = useState([]);

  const handleLogoff = async () => {
    try {
      await authClient.logoutUser();
      console.log("logout successful");
    } catch (error) {
      console.warn(`logout unsuccessful. error: ${JSON.stringify(error)}`);
    }
  };

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
    <>
      <h3>
        <ul>
          <li> See habit, progress, streak counter</li>
          <li> View plan that was generated, use input on plan</li>
          <li> See tips on the user habit and general building habit tips </li>
          <li> Refection note section</li>
        </ul>
      </h3>
      <Button onClick={handleLogoff}>Login Off</Button>

      <HabitList habits={habitList} />
    </>
  );
};

export default MainDashboard;
