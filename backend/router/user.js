import express from "express";
import { login, logout, profileUpdate, register } from "../controller/user.js";
import isAuthentcated from "../middleware/user.auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/logOut", logout);
router.post("/register", singleUpload,register);
router.post("/login", login);
router.post("/update", isAuthentcated, singleUpload, profileUpdate);

export default router;
