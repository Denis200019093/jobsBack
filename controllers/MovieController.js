import MovieModel from "../models/Movie.js";
import UserModel from "../models/User.js";
import VacancyModel from "../models/Vacancy.js";
import CompanyModel from "../models/Company.js";

export const getVacancies = async (req, res) => {
  try {
    const { filterName, limit } = req.query;

    const movies = await VacancyModel.find().limit(limit);

    res.json(movies);
  } catch (err) {
    res.status(500).json({
      message: "Failed fetch movies",
    });
  }
};

export const getSavedVacancies = async (req, res) => {
  try {
    const splitedArray = req.query.idSavedVacancies.split(",");

    const savedVacancies = await VacancyModel.find({
      _id: {
        $in: splitedArray,
      },
    });

    res.json(savedVacancies);
  } catch (err) {
    res.status(500).json({
      message: "Couldn't get saved vacancies",
    });
  }
};
export const getLatestAnnouncements = async (req, res) => {
  try {
    const newestAnnouncements = await MovieModel.find({
      $and: [{ status: "Announcement" }],
    })
      .limit(10)
      .sort({ $natural: -1 });

    res.json(newestAnnouncements);
  } catch (err) {
    res.status(500).json({
      message: "Couldn't get announcements",
    });
  }
};

export const getLatestReleases = async (req, res) => {
  try {
    const newestAnnouncements = await MovieModel.find({
      $and: [{ status: "Released" }],
    })
      .limit(10)
      .sort({ $natural: -1 });

    res.json(newestAnnouncements);
  } catch (err) {
    res.status(500).json({
      message: "Couldn't get releases",
    });
  }
};

export const getVacancyDetails = async (req, res) => {
  try {
    const vacancyId = req.params.id;

    VacancyModel.findOneAndUpdate(
      {
        _id: vacancyId,
      },
      // {
      //   $inc: { viewsCount: 1 },
      // },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Failed fetch vacancy",
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Vacancy not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Failed fetch movies",
    });
  }
};

export const getCandidateDetails = async (req, res) => {
  try {
    const vacancyId = req.params.id;

    UserModel.findOneAndUpdate(
      {
        _id: vacancyId,
      },
      // {
      //   $inc: { viewsCount: 1 },
      // },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Failed fetch vacancy",
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Vacancy not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Failed fetch movies",
    });
  }
};

export const createVacancy = async (req, res) => {
  try {
    // console.log(req.body);
    const doc = new VacancyModel({
      backgroundURL: req.body.backgroundURL,
      avatarURL: req.body.avatarURL,
      jobTitle: req.body.jobTitle,
      jobTypes: req.body.jobTypes,
      jobTags: req.body.jobTags,
      jobIndustries: req.body.jobIndustries,
      jobPositions: req.body.jobPositions,
      jobSalary: req.body.jobSalary,
      jobExperience: req.body.jobExperience,
      jobLocation: req.body.jobLocation,
      jobCity: req.body.jobCity,
      jobDescription: req.body.jobDescription,
      jobAuthor: req.body.jobAuthor,
      companyName: req.body.companyName,
      companyLocation: req.body.companyLocation,
    });

    await CompanyModel.updateOne(
      { owner: req.body.jobAuthor },
      {
        $push: { ourVacancies: doc },
      }
    );

    const movie = await doc.save();

    res.json(movie);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const saveVacancy = async (req, res) => {
  try {
    if (!req.params.userId) {
      res.status(404).json({
        message: "User not found, try to register",
      });
    }

    if (!req.params.vacancyId) {
      res.status(404).json({
        message: "Something went wrong, try later",
      });
    }

    const foundVacancy = await VacancyModel.findById(req.params.vacancyId);

    await UserModel.updateOne(
      { _id: req.params.userId },
      {
        $push: { savedVacancies: req.params.vacancyId },
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
// export const createVacancy = async (req, res) => {
//   try {
//     console.log(req.body);
//     const doc = new MovieModel({
//       title: req.body.title,
//       original: req.body.original,
//       slogan: req.body.slogan,
//       director: req.body.director,
//       year: req.body.year,
//       country: req.body.country,
//       qualities: req.body.qualities,
//       ozvy4ka: req.body.ozvy4ka,
//       poster: req.body.poster,
//       background: req.body.background,
//       premiereDate: req.body.premiereDate,
//       duration: req.body.duration,
//       budget: req.body.budget,
//       dues: req.body.dues,
//       type: req.body.type,
//       description: req.body.description,
//       status: req.body.status,
//       genres: req.body.genres,
//     });

//     const movie = await doc.save();

//     res.json(movie);
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

export const removeMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    MovieModel.findOneAndDelete(
      {
        _id: movieId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Failed delete movies",
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Movie not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Failed fetch movie",
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    await MovieModel.updateOne(
      {
        _id: movieId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed update movie",
    });
  }
};

export const searchingVacancies = async (req, res) => {
  try {
    const search_value = req.query.search_query;

    if (!search_value) {
      return res.status(500).json({
        message: `Please enter something in the field`,
      });
    }

    const foundVacancies = await VacancyModel.aggregate([
      {
        $search: {
          index: "searchVacancies",
          text: {
            query: search_value,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
    ]);

    res.json(foundVacancies);
  } catch (e) {
    res.status(500).json({
      message: "Vacancies not found",
    });
  }
};

export const getAutoCompleteVacancies = async (req, res) => {
  try {
    console.log(req.query.search_query);
    // const positionsToFilter = positions
    //   .split(",")
    //   .filter((item) => item !== "undefined");
    // const locationsToFilter = locations
    //   .split(",")
    //   .filter((item) => item !== "undefined");

    const foundVacancies = await VacancyModel.aggregate([
      {
        $search: {
          index: "searchAutocompleteVacancies",
          autocomplete: {
            query: req.query.search_query,
            path: "jobTitle",
            tokenOrder: "sequential",
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          jobTitle: 1,
          jobTypes: 1,
          avatarURL: 1,
          jobCity: 1,
          jobLocation: 1,
        },
      },
    ]);
    console.log(foundVacancies);
    res.json(foundVacancies);
    // res.json([...foundVacancies, ...filteredResult]);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const searchingCandidates = async (req, res) => {
  try {
    const { search_query } = req.query;

    const foundCandidates = await UserModel.aggregate([
      {
        $search: {
          index: "searchingCandidates",
          text: {
            query: search_query,
            path: {
              wildcard: "*",
            },
            // fuzzy: {},
          },
        },
      },
      {
        $match: {
          typeUser: "Employee",
        },
      },
    ]);

    res.json(foundCandidates);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
export const filteringVacancies = async (req, res) => {
  try {
    const { industries, positions, search_query, locations, types } = req.query;
    console.log("query", req.query);
    // const allVacancies = !search_query.length ? await VacancyModel.find() : [];
    const industriesToFilter = industries
      .split(",")
      .filter((item) => item !== "undefined");
    const positionsToFilter = positions
      .split(",")
      .filter((item) => item !== "undefined");
    const locationsToFilter = locations
      .split(",")
      .filter((item) => item !== "undefined");
    const typesToFilter = types
      .split(",")
      .filter((item) => item !== "undefined");

    const foundVacancies = await VacancyModel.aggregate([
      search_query
        ? {
            $search: {
              index: "searchVacancies",
              text: {
                query: search_query,
                path: {
                  wildcard: "*",
                },
                // fuzzy: {},
              },
            },
          }
        : {
            $unwind: {
              path: "$jobTitle",
            },
          },
      {
        $match: {
          jobIndustries: industriesToFilter.length
            ? { $in: industriesToFilter }
            : { $exists: true },
          jobPositions: positionsToFilter.length
            ? { $in: positionsToFilter }
            : { $exists: true },
          jobLocation: locationsToFilter.length
            ? { $in: locationsToFilter }
            : { $exists: true },
          jobTypes: typesToFilter.length
            ? { $in: typesToFilter }
            : { $exists: true },
        },
      },
    ]);

    res.json(foundVacancies);
    // res.json([...foundVacancies, ...allVacancies]);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const updateInfoAboutMe = async (req, res) => {
  try {
    console.log(req.body);
    await UserModel.updateOne(
      { _id: req.params.id },
      {
        fullName: req.body.fullName,
        username: req.body.username,
        contactNumber: req.body.contactNumber,
        yourWebsite: req.body.yourWebsite,
        country: req.body.country,
        city: req.body.city,
        telegram: req.body.telegram,
        description: req.body.description,
        jobSalary: req.body.jobSalary,
        jobIndustries: req.body.jobIndustries,
        jobPositions: req.body.jobPositions,
        jobTypes: req.body.jobTypes,
        jobExperience: req.body.jobExperience,
        avatarURL: req.body.avatarURL,
        backgroundURL: req.body.backgroundURL,
        englishLevel: req.body.englishLevel,
        profession: req.body.profession,
        pdfFile: req.body.pdfFile,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: `Failed update info, try later`,
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "User not found",
          });
        }

        res.json({
          success: true,
        });
      }
    ).clone();
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const toggleMovieInsideBookmarks = async (req, res) => {
  try {
    const { userId, movieId, whereSave, whereDelete } = req.body;

    const foundItemForSave = await MovieModel.findById(movieId);

    await UserModel.updateOne(
      { _id: userId },
      {
        $pull: {
          [whereDelete]: foundItemForSave,
        },
        $set: {
          [whereSave]: foundItemForSave,
        },
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: `Failed save to ${whereSave}, try later again`,
          });
        }

        if (!doc) {
          res.status(404).json({
            message: "Movie not found",
          });
        }

        res.json({
          success: true,
        });
      }
    ).clone();
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const deleteFromBookmarks = async (req, res) => {
  try {
    const { userId, movieId, whereDelete } = req.params;

    const foundItemForDelete = await MovieModel.findById(movieId);

    const updated = await UserModel.updateOne(
      { _id: userId },
      {
        $pull: {
          [whereDelete]: foundItemForDelete,
        },
      }
    );

    if (updated) {
      res.send("Successful");
    } else {
      res.status(500).json({
        message: "Failed delete bookmark",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const addCommentToMovie = async (req, res) => {
  try {
    const { movieId, userName, commentText } = req.body;

    const theComment = {
      userName,
      commentText,
      replies: [],
    };

    await MovieModel.updateOne(
      { _id: movieId },
      {
        $set: {
          comments: theComment,
        },
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: `Couldn't add the comment`,
          });
        }
        if (doc.matchedCount === 0) {
          res.status(404).json({
            message: "Movie not found",
          });
        }

        res.json({
          success: true,
        });
      }
    ).clone();
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const deleteCommentMovie = async (req, res) => {
  try {
    const { movieId, userName, commentText } = req.body;

    // const foundItemForDelete = await MovieModel.findById(movieId);

    const theComment = {
      userName,
      commentText,
      replies: [],
    };

    await MovieModel.updateOne(
      { _id: movieId },
      {
        $pull: {
          comments: theComment,
        },
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: `Couldn't add the comment`,
          });
        }
        if (doc.matchedCount === 0) {
          res.status(404).json({
            message: "Movie not found",
          });
        }

        res.json({
          success: true,
        });
      }
    ).clone();
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
