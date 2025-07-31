import { Request, Response } from "express";

export const loginUserAccount = async (req: Request, res: Response) => {
  try {
    let auth0Domain, clientId, callbackUrl;

    if (process.env.NODE_ENV === "development") {
      auth0Domain = process.env.AUTH0_DOMAIN_DEV;
      clientId = process.env.AUTH0_CLIENT_ID_DEV;
      callbackUrl = process.env.AUTH0_CALLBACK_URL_DEV;
    } else {
      auth0Domain = process.env.AUTH0_DOMAIN;
      clientId = process.env.AUTH0_CLIENT_ID;
      callbackUrl = process.env.AUTH0_CALLBACK_URL;
    }

    if (!auth0Domain || !clientId || !callbackUrl) {
      return res
        .status(500)
        .json({ error: "Missing required environment variables" });
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
