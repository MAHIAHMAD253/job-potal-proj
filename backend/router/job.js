import express from "express";
import { adminGetJob, getAllJob, getJobById, postjob } from "../controller/job.js";
import isAuthentcated from "../middleware/user.auth.js";

const router = express.Router();

router.post("/post",isAuthentcated, postjob);
router.get("/get",isAuthentcated, getAllJob);
router.get("/adminjobget",isAuthentcated, adminGetJob);
router.get("/get/:id",isAuthentcated, getJobById);


export default router;
