import { Router } from "express";
import QueryController from "../../../controllers/QueryController";
const router = Router();

router.post("/query", QueryController.sendQuery);

export default router;
