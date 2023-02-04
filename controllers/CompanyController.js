import MovieModel from "../models/Movie.js";
import UserModel from "../models/User.js";
import VacancyModel from "../models/Vacancy.js";
import CompanyModel from "../models/Company.js";

export const getCompanyOfUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { company, ...userData } = user._doc;

    if (!company) {
      return res.status(404).json({
        message: "User haven't registered company yet",
      });
    }

    res.json(company);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const doc = new CompanyModel({
      companyName: req.body.companyName,
      companyLocation: req.body.companyLocation,
      memberSince: req.body.memberSince,
      companyAddress: req.body.companyAddress,
      companyNumber: req.body.companyNumber,
      companyEmail: req.body.companyEmail,
      aboutCompany: req.body.aboutCompany,
      companyLogo: req.body.companyLogo,
      companyBackground: req.body.companyBackground,
      owner: req.body.owner,
    });

    const company = await doc.save();

    res.json(company);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getCompanyDetails = async (req, res) => {
  try {
    if (!req.params.ownerId) {
      return res.status(404).json({
        message: "Somethin went wrong",
      });
    }
    const foundCompany = await CompanyModel.findOne({
      owner: req.params.ownerId,
    });

    if (!foundCompany) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(foundCompany);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateInfoCompany = async (req, res) => {
  try {
    console.log(req);
    const companyId = req.params.companyId;

    if (!companyId) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    await CompanyModel.updateOne(
      {
        _id: companyId,
      },
      {
        companyName: req.body.companyName,
        companyLocation: req.body.companyLocation,
        memberSince: req.body.memberSince,
        companyAddress: req.body.companyAddress,
        companyLogo: req.body.companyLogo,
        companyBackground: req.body.companyBackground,
        description: req.body.description
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
