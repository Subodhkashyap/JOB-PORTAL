const Application = require("../models/Application");
const Job = require("../models/Job");

// ============================================================
// @desc    Apply for a job
// @route   POST /api/applications/apply/:jobId
// ============================================================

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check job ID
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check logged-in user
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login before applying",
      });
    }

    // Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      status: "Applied",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("APPLY JOB ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to apply for job",
    });
  }
};

// ============================================================
// @desc    Get logged-in user's applications
// @route   GET /api/applications/my-applications
// ============================================================

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const apps = await Application.find({
      applicant: userId,
    })
      .populate(
        "job",
        "title company location type category salary"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications: apps,
    });
  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get applications",
    });
  }
};

// ============================================================
// @desc    Get all applicants for a job
// @route   GET /api/applications/job/:jobId
// @access  Employer
// ============================================================

exports.getApplicantsForJob = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check employer ownership
    if (
      !job.company ||
      job.company.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view applications",
      });
    }

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
        "job",
        "title location category type salary company"
      )
      .populate(
        "applicant",
        "name email avatar resume"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get applicants",
    });
  }
};

// ============================================================
// @desc    Get application by ID
// @route   GET /api/applications/:id
// ============================================================

exports.getApplicationById = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const app = await Application.findById(req.params.id)
      .populate(
        "job",
        "title company location category type salary"
      )
      .populate(
        "applicant",
        "name email avatar resume"
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
        id: req.params.id,
      });
    }

    // Make sure job exists after populate
    if (!app.job) {
      return res.status(404).json({
        success: false,
        message: "Job associated with this application was not found",
      });
    }

    const isApplicant =
      app.applicant &&
      app.applicant._id.toString() === userId.toString();

    const isEmployer =
      app.job.company &&
      app.job.company.toString() === userId.toString();

    if (!isApplicant && !isEmployer) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application",
      });
    }

    return res.status(200).json({
      success: true,
      application: app,
    });
  } catch (err) {
    console.error("GET APPLICATION ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to get application",
    });
  }
};

// ============================================================
// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Employer
// ============================================================

exports.updateStatus = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const { status } = req.body;

    // Validate status
    const allowedStatuses = [
      "Applied",
      "Review",
      "Interview",
      "Accepted",
      "Rejected",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const app = await Application.findById(
      req.params.id
    ).populate("job");

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (!app.job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check employer ownership
    if (
      !app.job.company ||
      app.job.company.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this application",
      });
    }

    // Update status
    app.status = status;

    await app.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      status: app.status,
      application: app,
    });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update application status",
    });
  }
};