const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Remote",
        "Full-Time",
        "Part-Time",
        "Contract",
        "Internship",
      ],
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    salaryMin: {
      type: Number,
      default: 0,
    },

    salaryMax: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      default: "Fresher",
    },

    applicationDeadline: {
      type: Date,
    },

    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);