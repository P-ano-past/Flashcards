import { pool } from "../postgres/db";
import { User } from "./types/UserTypes/UserTypes";

export const saveUserRole = async (
  auth0_id: string,
  roles: object
): Promise<User[]> => {
  const result = await pool.query(
    `UPDATE users
       SET roles = $1
       WHERE auth0_id = $2
       RETURNING *;`,
    [roles, auth0_id]
  );
  return result.rows;
};

export const purgeUserRoles = async (auth0_id: string): Promise<User[]> => {
  const result = await pool.query(
    `UPDATE users
     SET roles = '{}'
     WHERE auth0_id = $1
     RETURNING *;`,
    [auth0_id]
  );
  return result.rows;
};
