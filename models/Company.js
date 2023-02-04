import mongoose from "mongoose";

const CompanyScheme = new mongoose.Schema(
  {
    companyName: String,
    companyLocation: String,
    memberSince: String,
    companyAddress: String,
    companyNumber: String,
    companyEmail: String,
    description: String,
    companyLogo: String,
    companyBackground: String,
    owner: String,
    ourVacancies: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", CompanyScheme);
