import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controller/company.js";
import isAuthentcated from "../middleware/user.auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", isAuthentcated, registerCompany);
router.get("/getcompany", isAuthentcated, getCompany);
router.get("/getcompany/:id", isAuthentcated, getCompanyById);
router.put("/updatecompany/:id", isAuthentcated,singleUpload, updateCompany);
export default router;
