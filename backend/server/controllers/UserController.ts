import { Request, Response } from "express";

const createUserAccount = async (req: Request, res: Response) => {
  console.log("Creating user account:", req.body);
  res.status(201).json({ message: "Account created" });
};
const loginUserAccount = async (req: Request, res: Response) => {
  console.log("login user account:", req.body);
  res.status(201).json({ message: "Account created" });
};

export default {
  createUserAccount,
  loginUserAccount,
};
