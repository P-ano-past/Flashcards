import { Router } from "express";
import { sendQuery } from "../../../controllers/QueryController";
const router = Router();

router.post("/query", sendQuery);

export default router;
