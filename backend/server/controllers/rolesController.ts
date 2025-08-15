import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { saveUserRole, purgeUserRoles } from "../models/rolesModel";

const auth0Domain =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_DOMAIN_DEV
    : process.env.AUTH0_DOMAIN;

const clientId =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_CLIENT_ID_DEV
    : process.env.AUTH0_CLIENT_ID;

const clientSecret =
  process.env.NODE_ENV === "development"
    ? process.env.AUTH0_CLIENT_SECRET_DEV
    : process.env.AUTH0_CLIENT_SECRET;

export const getMgmtToken = async (): Promise<string> => {
  const tokenRes = await axios.post(`https://${auth0Domain}/oauth/token`, {
    client_id: clientId,
    client_secret: clientSecret,
    audience: `https://${auth0Domain}/api/v2/`,
    grant_type: "client_credentials",
  });

  return tokenRes.data.access_token;
};

export const getRole: RequestHandler = async (req, res) => {
  const userCookie = req.cookies.user;
  if (!userCookie) {
    res.status(401).json({ error: "No user cookie found" });
    return;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(userCookie);
  } catch {
    res.status(400).json({ error: "Invalid user cookie" });
    return;
  }

  const auth0_id = parsedUser?.sub;
  if (!auth0_id) {
    res.status(400).json({ error: "Missing auth0_id" });
    return;
  }

  try {
    const mgmtToken = await getMgmtToken();

    const rolesRes = await axios.get(
      `https://${auth0Domain}/api/v2/users/${encodeURIComponent(
        auth0_id
      )}/roles`,
      {
        headers: {
          Authorization: `Bearer ${mgmtToken}`,
        },
      }
    );

    res.status(200).json({ roles: rolesRes.data });
  } catch (error) {
    console.error("Error fetching role from Auth0:", error);
    res.status(500).json({ error: "Failed to fetch user role." });
  }
};

export const saveRole: RequestHandler = async (req, res) => {
  const userCookie = req.cookies.user;
  const { roles } = req.body;
  if (!userCookie) {
    res.status(401).json({ error: "No user cookie found" });
    return;
  }

  if (!roles) {
    res.status(401).json({ error: "No roles found in request" });
    return;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(userCookie);
  } catch {
    res.status(400).json({ error: "Invalid user cookie" });
    return;
  }

  const auth0_id = parsedUser?.sub;
  if (!auth0_id) {
    res.status(400).json({ error: "Missing auth0_id" });
    return;
  }
  try {
    await saveUserRole(auth0_id, roles);
  } catch (error) {
    console.error("Error saving role to DB:", error);
    res.status(500).json({ error: "Failed to save user role. " });
  }
};

export const removeAllRoles: RequestHandler = async (req, res) => {
  const userCookie = req.cookies.user;
  if (!userCookie) {
    res.status(401).json({ error: "No user cookie found" });
    return;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(userCookie);
  } catch {
    res.status(400).json({ error: "Invalid user cookie" });
    return;
  }

  const auth0_id = parsedUser?.sub;
  if (!auth0_id) {
    res.status(400).json({ error: "Missing auth0_id" });
    return;
  }
  try {
    const purgeRoles = await purgeUserRoles(auth0_id);
    console.log("purgeRoles", purgeRoles);
  } catch (error) {
    console.error("Error removing all roles from user:", error);
    res
      .status(500)
      .json({ error: "Failed to remove multiple user roles from db" });
  }
};
