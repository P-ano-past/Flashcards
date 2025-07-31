import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });
import axios from "axios";

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

  if (!code) {
    res.status(400).json({ error: "Authorization code is missing" });
    return;
  }

  try {
    const response = await axios.post(
      `https://${auth0Domain}/oauth/token`,
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: callbackUrl,
        client_id: clientId,
        client_secret: clientSecret,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expires_in * 1000,
    });

    res.redirect(`${process.env.LOCAL_HOST_URL}`);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).json({
      error: "Failed to exchange authorization code for token.",
    });
  }
};

export const logoutUserAccount: RequestHandler = async (req, res) => {
  console.log("logout user account:", req.body);
  res.status(201).json({ message: "Account created" });
};

export const getUserProfile: RequestHandler = async (req, res) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized, access token missing" });
    return;
  }
  try {
    const response = await axios.get(`https://${auth0Domain}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile." });
  }
};
