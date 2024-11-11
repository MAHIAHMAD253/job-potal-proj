import { Job } from "../models/job.model.js";
// created by owner
export const postjob = async (req, resp) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      resp.status(401).json({ message: "something are missing" });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return resp
      .status(200)
      .json({ message: "new job succcessfully !", success: true, job });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "interal error" });
  }
};

// alljob  students

export const getAllJob = async (req, resp) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const job = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!job) {
      resp.status(404).json({ message: "jobs not found" });
    }

    return resp.status(200).json({ message: "ok job", job, success: true });
  } catch (error) {
    console.log(error)
    return resp.status(500).json({ message: "internal error" });
  }
};

// alljobById  stduents ky liye han

export const getJobById = async (req, resp) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({path:"applications"})

    if (!job) {
      resp.status(404).json({ message: "jobs not found" });
    }

    return resp
      .status(200)
      .json({ message: "all job successfully", job, success: true });
  } catch (error) {
    return resp.status(500).json({ message: "internal error" });
  }
};

// admin ne kitni job post kr di han abi tak
export const adminGetJob = async (req, resp) => {
  try {
    const adminId = req.id;
    const job = await Job.find({ created_by: adminId }).populate({
      path:'company', createdAt:-1
    });
    if (!job) {
      resp.status(404).json({ message: "jobs not found" });
    }

    return resp.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return resp.status(500).json(error);
  }
};
