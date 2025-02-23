import { pool } from "../config/db.js";

import { User } from "../models/userModel.js";

/***
 *
 */
const findAUserByEmail = async (email: string) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error while querying for user:", err);
    throw new Error("Error while querying for user");
  }
};

/***
 * @parrm {User}
 * @returns
 */
const createUser = async (user: User) => {
  const client = await pool.connect();
  try {
    const insertStatement = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [user.firstName, user.lastName, user.email, user.password];

    const result = await client.query(insertStatement, values);
    // console.log("User created:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error while creating user");
    throw new Error("Error while creating user");
  } finally {
    client.release();
  }
};

export { findAUserByEmail, createUser };
