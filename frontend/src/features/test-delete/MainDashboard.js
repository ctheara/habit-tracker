import { Button } from "@mui/material";

import authClient from "../auth/api/auth-client";
import habitClient from "../habit/api/habit-client";

const MainDashboard = ({ open, onClose }) => {
  const handleLogoff = async () => {
    try {
      await authClient.logoutUser();
      console.log("logout successful");
    } catch (error) {
      console.warn(`logout unsuccessful. error: ${JSON.stringify(error)}`);
    }
  };

  const handleGetList = async () => {
    try {
      console.log("trying to get habit list");
      const response = await habitClient.getHabitList();
    } catch (error) {}
  };

  return (
    <>
      <h3>
        <ul>
          <li>See habit, progress, streak counter</li>
          <li> View plan that was generated, use input on plan</li>
          <li> See tips on the user habit and general building habit tips </li>
          <li>Refection note section</li>
        </ul>
      </h3>
      <Button onClick={handleGetList}>Get my habits list</Button>
      <Button onClick={handleLogoff}>Login Off</Button>
    </>
  );
};

export default MainDashboard;
