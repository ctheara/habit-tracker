import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:5000";

/**
 * @param userSignUpData object with signup form data
 * @return object with http status
 */
const signupUser = async (userSignUpData) => {
  try {
    const client = axios.create({ baseURL });

    // use http-only cookies over local session storage to prevent XSS attacks
    const response = await client.post("/v1/users/signup", userSignUpData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      return { status: response.status };
    } else {
      console.log("Unexpected response:", response);
      return { status: response.status };
    }
  } catch (error) {
    console.warn(
      "Api client signup- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
    return error;
  }
};

/**
 * @param userLoginData object with login form data
 * @return object with http status and data fields
 */
const loginUser = async (userLoginData) => {
  try {
    const client = axios.create({ baseURL });

    const response = await client.post("/v1/users/login", userLoginData, {
      withCredentials: true,
    });

    console.log(`response authclient api: ${JSON.stringify(response)}`);

    if (response.status === 200) {
      console.log(
        `response.status: ${JSON.stringify({ status: response.status })}`
      );
      return { status: response.status };
    }
  } catch (error) {
    console.warn(
      "Api client login- Error details:",
      JSON.stringify(error.response?.data || error.message)
    );
    return error;
  }
};

const logoutUser = async () => {
  try {
    const client = axios.create({ baseURL });

    await client.post("/v1/users/logout", {}, { withCredentials: true });
    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

const authClient = { signupUser, loginUser, logoutUser };

export default authClient;
