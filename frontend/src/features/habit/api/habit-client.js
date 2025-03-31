import axios from "axios";

const baseURL = "http://localhost:5000";

const getHabitList = async () => {
  try {
    const client = axios.create({ baseURL });
    console.log("inside habit-client api");

    const response = await client.get("/habit/list", {
      withCredentials: true,
    });
    console.log(`habit list: ${JSON.stringify(response)}`);
  } catch (error) {
    console.warn("error getting habit list");
  }
};

const habitClient = { getHabitList };

export default habitClient;
