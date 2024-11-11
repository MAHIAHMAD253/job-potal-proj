import { Company } from "../models/company-model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// all company get

export const registerCompany = async (req, resp) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return resp.status(400).json({ message: "Company name is required" });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return resp
        .status(400)
        .json({ message: "You cannot register the same company" });
    }

    // Create new company
    company = await Company.create({
      name: companyName,
      userId: req.id, // Assuming req.id is properly set from middleware
    });

    return resp.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return resp.status(500).json({ message: "Internal server error" });
  }
};

export const getCompany = async (req, resp) => {
  try {
    const userId = req.id; // logged user from user id
    const company = await Company.find({ userId });
    if (!company) {
      return resp.status(401).json({ message: "not found company" });
    }
    return resp
      .status(200)
      .json({ message: "get company successfully !", company, success:true });
  } catch (error) {
    console.log(error)
    return resp.status(500).json({ message: "internal server" });
  }
};

//get company by ID

export const getCompanyById = async (req, resp) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return resp.status(401).json({ message: "not found companybyId" });
    }
    resp.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "internal error" });
  }
};

// update company

export const updateCompany = async (req, resp) => {
  try {
    const { name, description, website, location } = req.body;
    
   
     // cloundary my nsy ai gi
    const file = req.file;

    const fileUri = getDataUri(file)
    const cloudResp = await cloudinary.uploader.upload(fileUri.content)
    const logo = cloudResp.secure_url;
    const updateData = { name, description, website, location , logo};

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return resp.status(401).json({ message: "not found company and update" });
    }
    return resp.status(200).json({ message: "company information update" , success:true});
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "internal error" });
  }
};
