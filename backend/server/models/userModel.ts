import { pool } from "../postgres/db";
import { User } from "./types/UserTypes/UserTypes";

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
