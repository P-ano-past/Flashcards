import { Router } from "express";
import {
  getRole,
  saveRole,
  removeAllRoles,
} from "../../../controllers/RolesController";

const router = Router();

router.route("/roleAction").get(getRole).post(saveRole).put(removeAllRoles);

export default router;
