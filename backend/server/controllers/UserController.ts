import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });
import axios from "axios";
import { pool } from "../postgres/db";

const auth0Domain =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_DOMAIN_DEV
    : process.env.AUTH0_DOMAIN;

const clientId =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_CLIENT_ID_DEV
    : process.env.AUTH0_CLIENT_ID;

const callbackUrl =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_CALLBACK_URL_DEV
    : process.env.AUTH0_CALLBACK_URL;

const clientSecret =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_CLIENT_SECRET_DEV
    : process.env.AUTH0_CLIENT_SECRET;

export const loginUserAccount: RequestHandler = async (req, res) => {
  try {
    if (!auth0Domain || !clientId || !callbackUrl) {
      res.status(500).json({ error: "Missing required environment variables" });
      return;
    }
    const auth0LoginUrl = `https://${auth0Domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&scope=openid profile email`;
    res.status(200).json({ loginUrl: auth0LoginUrl });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({
      error: "Something went wrong while constructing the login URL.",
    });
  }
};

export const handleCallback: RequestHandler = async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(
      `https://${auth0Domain}/oauth/token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: callbackUrl,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      `https://${auth0Domain}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { sub, email, name, picture } = userInfoResponse.data;

    const query = `
  INSERT INTO users (auth0_id, email, name, picture, first_login, last_login, updated_at)
  VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW())
  ON CONFLICT (auth0_id)
  DO UPDATE SET
  email = COALESCE(EXCLUDED.email, users.email),
  name = COALESCE(NULLIF(EXCLUDED.name, ''), users.name),
  picture = COALESCE(NULLIF(EXCLUDED.picture, ''), users.picture),
    last_login = NOW(),
    updated_at = NOW();
`;

    await pool.query(query, [sub, email, name, picture]);

    const userData = { sub, email, name, picture };
    res.cookie("user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
    });

    res.redirect("/");
    return;
  } catch (error) {
    console.error("Error exchanging code for token or writing to DB:", error);

    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : String(error);

    res.status(500).json({
      success: false,
      error: "Failed to process Auth0 callback.",
      details: errorMessage,
    });
    return;
  }
};

export const logoutUserAccount: RequestHandler = async (req, res) => {
  console.log("logout user account:", req.body);
  res.status(201).json({ message: "Account created" });
};

export const getUserProfile: RequestHandler = async (req, res) => {
  const { auth0_id } = req.body;

  if (!auth0_id) {
    res.status(400).json({ error: "Missing auth0_id" });
    return;
  }

  try {
    const result = await pool.query(
      "SELECT id, auth0_id, email, name, picture, first_login FROM users WHERE auth0_id = $1",
      [auth0_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    res.status(500).json({ error: "Failed to fetch user profile." });
  }
};
