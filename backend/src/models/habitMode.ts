export interface Habit {
  habitId?: number;
  userId: number;
  habitName: string;
  description?: string;
  motivation?: string;
  duration?: string;
  targetDate?: Date;
  createdDate?: Date;
  updatedDate?: Date;
}
