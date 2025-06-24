import { Request, Response } from "express";

const sendQuery = async (req: Request, res: Response) => {
  console.log("Sending query:", req.body);
  // Here you would typically process the query, e.g., save it to a database or perform some action
  res.status(200).json({ message: "Query sent successfully" });
};

export default {
  sendQuery,
};
