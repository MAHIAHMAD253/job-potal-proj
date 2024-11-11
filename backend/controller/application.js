import { Application } from "../models/application-model.js";
import { Job } from "../models/job.model.js";

export const applayJob = async (req, resp) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return resp.status(401).json({ message: "job is not required" });
    }
    // check if the user has alraedy applied for this job

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return resp
        .status(400)
        .json({ message: "you have alrady appluied this job", success: false });
    }
    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!jobId) {
      return resp.status(404).json({ message: "job is not required" });
    }

    //  create a new application database

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return resp
      .status(200)
      .json({ message: "job applied successfully", success: true });
  } catch (error) {
    return resp.status(500).json(error);
  }
};

export const getApplayJob = async (req, resp) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return resp.status(404).json({ message: "no application" });
    }

    return resp.status(200).json({ application, success: true });
  } catch (error) {
    console.log(error);
    return resp.status(500).json(error);
  }
};
// admin dekhe ga kitni user ne apply kiye han

export const getApplication = async (req, resp) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return resp.status(404).json({ message: "job not found" });
    }
    resp.status(200).json({ job, success: true });
  } catch (error) {
    return resp.status(500).json(error);
  }
};

export const updateStatus = async (req, resp) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!applicationId) {
      return resp.status(401).json({ message: "not found appplicationId" });
    }

    // find the  application by applicationId

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return resp.status(401).json({ message: "not found appplication" });
    }

    // update the status

    application.status = status.toLowerCase();
    await application.save();

    return resp.status(200).json({ message: "status updated successfully !" ,success:true });
  } catch (error) {
    console.log(error)
    return resp.status(500).json({meesage:"internal errror"});
  }
};
