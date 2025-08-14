import { pool } from "../postgres/db";
import { Query } from "./types/QueryTypes/QueryTypes";

export const getQuery = async (): Promise<Query[]> => {
  const result = await pool.query("SELECT * FROM queries");
  return result.rows;
};
