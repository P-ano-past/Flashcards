import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });
import axios from "axios";
import { getAllUsers, getProfile, saveUserData } from "../models/userModel";

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

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL_DEV
    : process.env.BASE_URL;

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
        domain: baseUrl,
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

    try {
      await saveUserData(sub, email, name, picture);
    } catch (err) {
      console.error("Database save failed:", err);
      throw new Error("Failed to save user profile to the database.");
    }

    const userData = { sub };

    res.cookie("user", JSON.stringify(userData), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(`${baseUrl}`);

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
  try {
    res.clearCookie("user", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    const logoutUrl = `https://${auth0Domain}/v2/logout?client_id=${clientId}`;

    res.status(200).json({ logoutUrl });
  } catch (error) {
    console.error("Error during logout process:", error);
    res.status(500).json({ error: "Something went wrong while logging out." });
  }
};

export const getUserProfile: RequestHandler = async (req, res) => {
  const userCookie = req.cookies.user;

  if (!userCookie) {
    res.status(401).json({ error: "No user cookie found" });
    return;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(userCookie);
  } catch (err) {
    console.error("Failed to parse user cookie:", err);
    res.status(400).json({ error: "Invalid user cookie format" });
    return;
  }

  const { sub: auth0_id } = parsedUser;
  if (!auth0_id) {
    res.status(400).json({ error: "Missing auth0_id in cookie" });
    return;
  }

  try {
    const result = await getProfile(auth0_id);

    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(result[0]);
    return;
  } catch (error) {
    console.error("Error fetching user from DB:", error);
    res.status(500).json({ error: "Failed to fetch user profile." });
    return;
  }
};
