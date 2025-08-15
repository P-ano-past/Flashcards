import { Router } from "express";
import {
  getRole,
  saveRole,
  removeAllRoles,
} from "../../../controllers/rolesController";

const router = Router();

router.route("/role").get(getRole).post(saveRole).put(removeAllRoles);

export default router;
