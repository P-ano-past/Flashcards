import { pool } from "../postgres/db";
import { User } from "./types/UserTypes/UserTypes";

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const saveUserData = async (
  sub: string,
  email: string,
  name: string,
  picture: string
): Promise<User[]> => {
  const result = await pool.query(
    `
  INSERT INTO users (auth0_id, email, name, picture, first_login, last_login, updated_at)
  VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW())
  ON CONFLICT (auth0_id)
  DO UPDATE SET
  email = COALESCE(EXCLUDED.email, users.email),
  name = COALESCE(NULLIF(EXCLUDED.name, ''), users.name),
  picture = COALESCE(NULLIF(EXCLUDED.picture, ''), users.picture),
    last_login = NOW(),
    updated_at = NOW();
`,
    [sub, email, name, picture]
  );
  return result.rows;
};

export const getProfile = async (auth0_id: string): Promise<User[]> => {
  const result = await pool.query(
    `SELECT 
        id, 
        auth0_id, 
        email, 
        name, 
        picture, 
        first_login, 
        roles 
      FROM users
      WHERE auth0_id = $1
      `,
    [auth0_id]
  );
  return result.rows;
};
