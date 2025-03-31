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
    console.error(`userDAO: Error while querying for user: ${err}`);
    throw { statusCode: 500, message: "Error while querying for user" };
  }
};

const getAUser = async (userId: number) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=${userId}`);
    return result.rows[0];
  } catch (err) {
    console.warn(`userDAO-getAUser err: ${JSON.stringify(err)}`);
    throw { statusCode: 500, message: "Error while getting user" };
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
    INSERT INTO users (first_name, last_name, email, password, role)
    VALUES ($1, $2, $3, $4, 'user')
    RETURNING *;
    `;
    const values = [user.firstName, user.lastName, user.email, user.password];

    const result = await client.query(insertStatement, values);
    return result.rows[0];
  } catch (err: any) {
    console.error(`useDAO: Error while querying for user: ${err}`);
    if (err.code === "23505") {
      throw { statusCode: 409, message: "Email already exist in system" };
    } else {
      throw { statusCode: 500, message: "Error while querying for user" };
    }
  } finally {
    client.release();
  }
};

export { findAUserByEmail, createUser, getAUser };
