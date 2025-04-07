import axios from "axios";

const baseURL = "http://localhost:5000";

const getHabitList = async () => {
  try {
    const client = axios.create({ baseURL });
    console.log("inside habit-client api");

    const response = await client.get("/habit/list", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.warn(
      "Api client list- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
  }
};

const createHabit = async (formData) => {
  const client = axios.create({ baseURL });

  try {
    await client.post("/habit/create", formData, {
      withCredentials: true,
    });
  } catch (error) {
    console.warn(
      "Api client create- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
  }
};

const habitClient = { getHabitList, createHabit };

export default habitClient;
