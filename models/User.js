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

const UserScheme = new mongoose.Schema(
  {
    typeUser: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarURL: String,
    backgroundURL: String,
    username: String,
    contactNumber: String,
    yourWebsite: String,
    country: String,
    city: String,
    telegram: String,
    description: String,
    jobIndustries: [String],
    jobPositions: [String],
    jobTypes: [String],
    jobExperience: String,
    englishLevel: String,
    profession: String,
    jobSalary: [Number],
    pdfFile: String,
    savedVacancies: [],
    company: CompanyScheme,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserScheme);
