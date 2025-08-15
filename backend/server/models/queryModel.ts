import { pool } from "../postgres/db";
import { Query } from "./types/QueryTypes/QueryTypes";

export const getQuery = async (): Promise<Query[]> => {
  const result = await pool.query("SELECT * FROM queryResults");
  return result.rows;
};
export const saveQuery = async (
  users_id: string,
  query: string,
  results: string[],
  saved_cards: string[]
): Promise<Query[]> => {
  const sql = `
    INSERT INTO queryResults (users_id, query, results, saved_cards, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    ON CONFLICT (users_id) 
    DO UPDATE SET 
      query = COALESCE(NULLIF(EXCLUDED.query, ''), queryResults.query),
      results = COALESCE(EXCLUDED.results, queryResults.results),
      saved_cards = COALESCE(EXCLUDED.saved_cards, queryResults.saved_cards),
      update_count = queryResults.update_count + 1,
      updated_at = NOW()
    RETURNING *;
  `;

  const result = await pool.query(sql, [users_id, query, results, saved_cards]);

  return result.rows.map((row) => ({
    id: row.id,
    users_id: row.users_id,
    query: row.query,
    queryResults: row.results,
    update_count: row.update_count,
    saved_cards: row.saved_cards,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
  }));
};
