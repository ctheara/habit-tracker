import { pool } from "../config/db.js";

import { Habit } from "../models/habitMode.js";

/**
 * Create a new habit for a user
 * @param {Habit} habit A habit type
 * @returns
 */
const createNewHabit = async (habit: Habit) => {
  const client = await pool.connect();
  try {
    const insertStatement = `
      INSERT INTO habits (name, user_id, description, motivation, target_date, duration)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `;
    const values = [
      habit.habitName,
      habit.userId,
      habit.description || null,
      habit.motivation || null,
      habit.targetDate || null,
      habit.duration || null,
    ];

    const result = await client.query(insertStatement, values);
    return result.rows[0];
  } catch (err) {
    console.warn(`habitDAO-createNewHabit: ${JSON.stringify(err)}`);
    throw { statusCode: 500, message: "Error while creating new habit" };
  } finally {
    client.release();
  }
};

/***
 * Get a list of habits for a given user
 * @param {number} userId
 * @return {array} List of habit objects
 */
const getAllUserHabits = async (userId: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM habits WHERE user_id=${userId}`
    );
    // console.log(`dao-result: ${JSON.stringify(result)}`);
    // console.log(`dao-result.row: ${JSON.stringify(result.rows)}`);
    // console.log(`dao-result.row: ${result.rows}`);
    console.log("result.rows:");
    result.rows.forEach((element) => {
      console.log(JSON.stringify(element));
    });

    return result.rows;
  } catch (err) {
    console.warn(`habitDAO-getAllUserHabits err: ${JSON.stringify(err)}`);
    throw { statusCode: 500, message: "Error while getting habits" };
  }
};

/**
 * Get one habit with id
 * @param habitId
 * @returns {object} habit object
 */
const getOneHabit = async (habitId: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM habits WHERE habit_id=${habitId}`
    );
    return result.rows[0];
  } catch (err) {
    console.warn(`habitDAO-getOneHabit err: ${JSON.stringify(err)}`);
    throw { statusCode: 500, message: "Error while getting habit" };
  }
};

const updateHabit = async (habitId: number) => {};

/**
 * Delete a given habit
 * @param habitId
 * @returns {number} Number of rows affected
 */
const deleteHabit = async (habitId: number) => {
  try {
    const result = await pool.query(
      `DELETE FROM habits WHERE habit_id=${habitId}`
    );
    return result.rowCount;
  } catch (err) {
    console.warn(`habitDAO-deleteHabit err: ${JSON.stringify(err)}`);
    throw { statusCode: 500, message: "Error while deleting new habit" };
  }
};

export default {
  createNewHabit,
  getAllUserHabits,
  getOneHabit,
  updateHabit,
  deleteHabit,
};
