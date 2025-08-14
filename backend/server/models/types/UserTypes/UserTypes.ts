export interface User {
  id: number;
  auth0_id: string;
  email: string;
  name: string;
  picture: string;
  first_login: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}
