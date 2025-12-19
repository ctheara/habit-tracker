import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:5000";

const getHabitList = async () => {
  try {
    const client = axios.create({ baseURL });

    const response = await client.get("/v1/habits/list", {
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

const getHabitById = async (habitId) => {
  try {
    const client = axios.create({ baseURL });
    const response = await client.get(`/v1/habits/${habitId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.warn(
      "Api client getHabitById- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
    throw error;
  }
};

const createHabit = async (formData) => {
  const client = axios.create({ baseURL });

  try {
    await client.post("/v1/habits/create", formData, {
      withCredentials: true,
    });
  } catch (error) {
    console.warn(
      "Api client create- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
  }
};

const updateHabit = async (habitId, formData) => {
  try {
    const client = axios.create({ baseURL });
    await client.put(`/v1/habits/${habitId}`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    console.warn(
      "Api client update- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
    throw error;
  }
};

const deleteHabit = async (habitId) => {
  try {
    const client = axios.create({ baseURL });
    await client.delete(`/v1/habits/${habitId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.warn(
      "Api client delete- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
    throw error;
  }
};

const habitClient = {
  getHabitList,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
};

export default habitClient;
