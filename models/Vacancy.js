import mongoose from "mongoose";

export const CompanyScheme = new mongoose.Schema(
  {
    companyName: String,
    companyLocation: String,
    username: String,
    memberSince: String,
    companyAddress: String,
    companyNumber: String,
    companyEmail: String,
    aboutCompany: String,
    companyLogo: String,
    companyBackground: String,
  },
  {
    timestamps: true,
  }
);

const VacancyScheme = new mongoose.Schema(
  {
    backgroundURL: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobTypes: {
      type: [String],
      required: true,
    },
    jobTags: {
      type: [String],
    },
    jobIndustries: {
      type: [String],
      required: true,
    },
    jobPositions: {
      type: [String],
      required: true,
    },
    jobSalary: {
      type: [Number],
    },
    jobExperience: {
      type: String,
    },
    jobLocation: {
      type: [String],
    },
    jobCity: {
      type: String,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: String,
    companyLocation: String,
    companyDetails: CompanyScheme,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vacancy", VacancyScheme);
