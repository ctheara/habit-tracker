export interface User {
  userId?: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
