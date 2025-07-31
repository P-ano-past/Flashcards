import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

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

export const loginUserAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const logoutUserAccount = async (req: Request, res: Response) => {
  console.log("login user account:", req.body);
  res.status(201).json({ message: "Account created" });
};
export const getUserProfile = async (req: Request, res: Response) => {
  console.log("login user account:", req.body);
  res.status(201).json({ message: "Account created" });
};
