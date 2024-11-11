import express from "express";
import isAuthentcated from "../middleware/user.auth.js";
import { applayJob, getApplayJob, getApplication, updateStatus } from "../controller/application.js";

const router = express.Router();

router.get("/apply/:id", isAuthentcated, applayJob);
router.get("/get", isAuthentcated, getApplayJob);
router.get("/:id/applicants", isAuthentcated, getApplication);
router.post("/updateStatus/:id", isAuthentcated, updateStatus);
export default router;
