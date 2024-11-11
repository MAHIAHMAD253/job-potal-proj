import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, resp) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return resp
        .status(400)
        .json({ message: "something are missing", success: false });
    }

// cloudinary file put 

const file = req.file;
const fileUri = getDataUri(file);
const cloudResp = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return resp
        .status(400)
        .json({ message: "User already exists with email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profile:{profilePhoto:cloudResp.secure_url}
    });

    return resp
      .status(201)
      .json({ message: "User successfully registered", success: true });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Server error", error });
  }
};



export const login = async (req, resp) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return resp.status(400).json({ message: "Please fill in all fields." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(400).json({ message: "Incorrect email or password." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp.status(400).json({ message: "Incorrect password." });
    }

    if (role !== user.role) {
      return resp
        .status(404)
        .json({ message: "Account does not exist with the current role." });
    }

    // Generate JWT token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Create user response object
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set the token in an httpOnly cookie and return user info
    return resp
      .status(200)
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({
        message: "Welcome, you have successfully logged in.",
        user: userResponse,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Internal server error." });
  }
};

export const logout = async (req, resp) => {
  try {
    return resp.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successFully",
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({ message: "internal server" });
  }
};

export const profileUpdate = async (req, resp) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // cloudinary file

    const fileUri = getDataUri(file);
    const cloudinaryResp = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // middleware auth
    let user = await User.findById(userId);
    if (!user) {
      return resp.status(400).json({ message: "user not found" });
    }
    // updating data

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudinaryResp) {
      user.profile.resume = cloudinaryResp.secure_url; // save the  cloudinary url
      user.profile.resumeOriginalName = file.originalname; // save the original file name
    }

    await user.save();
    // user response from database
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return resp
      .status(200)
      .json({
        message: "profile update are successfully",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error)
    return resp.status(500).json({ message: "internal server" });
  }
};
