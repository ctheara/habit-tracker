import habitDao from "../dao/habitDAO.js";
import { Habit } from "../models/habitMode.js";

const createHabit = async (req: any, res: any, next: any) => {
  const { habitName, description, motivation, duration, targetDate } = req.body;

  if (!habitName) {
    console.log("Input missing error");
    throw { statusCode: 400, message: "Required input fields missing" };
  }

  try {
    const habit: Habit = {
      habitName,
      userId: req.user.id,
      description: description || null,
      motivation: motivation || null,
      duration: duration || null,
      targetDate: new Date(targetDate) || null,
    };

    const result = await habitDao.createNewHabit(habit);
    return res.json({ message: "Creation Successful" });
  } catch (err) {
    console.warn(`Error while creating habit ${JSON.stringify(err)}`);
    next(err);
  }
};

const getAllHabits = async (req: any, res: any, next: any) => {
  try {
    const result = await habitDao.getAllUserHabits(req.user.id);

    const habitList: Habit[] = [];
    if (result) {
      result.forEach((habit) => {
        habitList.push(mapHabitResult(habit));
      });
    }
    return res.status(200).send(habitList);
  } catch (err) {
    console.warn(`Error while getting habits ${JSON.stringify(err)}`);
    next(err);
  }
};

const getAHabit = async (req: any, res: any, next: any) => {
  const { habitId } = req.params;

  try {
    const result = await habitDao.getOneHabit(habitId);

    if (result) {
      const mappedHabit = mapHabitResult(result);
      return res.status(200).json(mappedHabit);
    } else {
      throw { statusCode: 500, message: "Cannot find habit" };
    }
  } catch (err) {
    console.warn(`Error while getting habit ${JSON.stringify(err)}`);
    next(err);
  }
};

const updateAHabit = async (req: any, res: any, next: any) => {
  res.send(`route`);
};

const deleteAHabit = async (req: any, res: any, next: any) => {
  const { habitId } = req.params;

  try {
    const result = await habitDao.deleteHabit(habitId);
    return res.json({ message: `Delete Successful, rows affected: ${result}` });
  } catch (err) {
    console.warn(`Error while deleting habit ${JSON.stringify(err)}`);
    next(err);
  }
};

const mapHabitResult = (habit: any) => {
  if (habit) {
    const mappedHabit: Habit = {
      habitId: habit.habit_id,
      userId: habit.user_id,
      habitName: habit.name,
      description: habit.description || undefined,
      motivation: habit.motivation || undefined,
      duration: habit.duration || undefined,
      targetDate: habit.target_date || undefined,
      createdDate: habit.created_date,
      updatedDate: habit.updated_date,
    };
    return mappedHabit;
  } else {
    throw { statusCode: 500, message: "Error mapping responce" };
  }
};

export default {
  createHabit,
  getAllHabits,
  getAHabit,
  updateAHabit,
  deleteAHabit,
};
