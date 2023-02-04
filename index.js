import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
// Mine
import {
  loginValidation,
  registerValidation,
  movieCreateValidation,
  vacancyCreateValidation,
} from "./validations/validations.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import {
  UserController,
  MovieController,
  CompanyController,
} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://denis:denis@cluster0.if8ww.mongodb.net/movies?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// User / Auth
app.get("/users", UserController.getUsers);
// app.get("/company/:userId", UserController.getCompanyOfUser);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.patch(
  "/update-user-info/:id",
  checkAuth,
  MovieController.updateInfoAboutMe
);
app.patch(
  "/save-vacancy/:userId/:vacancyId",
  checkAuth,
  MovieController.saveVacancy
);

// Image
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

// Vacancies
app.get("/vacancies", MovieController.getVacancies);
app.get("/saved-vacancies", MovieController.getSavedVacancies);
app.get("/vacancies/autocomplete", MovieController.getAutoCompleteVacancies);
app.get("/movies/announcements", MovieController.getLatestAnnouncements);
app.get("/movies/releases", MovieController.getLatestReleases);
app.get("/vacancies/:id", MovieController.getVacancyDetails);
app.get("/candidate/:id", MovieController.getCandidateDetails);
app.post(
  "/vacancies",
  vacancyCreateValidation,
  checkAuth,
  MovieController.createVacancy
);
app.post("/company", checkAuth, CompanyController.registerCompany);
app.get("/company/:ownerId", checkAuth, CompanyController.getCompanyDetails);
app.patch(
  "/update-company/:companyId",
  checkAuth,
  CompanyController.updateInfoCompany
);
app.delete("/movies/:id", checkAuth, MovieController.removeMovie);
app.patch(
  "/movies/:id",
  checkAuth,
  movieCreateValidation,
  handleValidationErrors,
  MovieController.updateMovie
);
app.get("/candidates", MovieController.searchingCandidates);
// app.get("/search", MovieController.searchingVacancies);
app.get("/result", MovieController.filteringVacancies);
app.post(
  "/toggle-movie-inside-bookmarks",
  checkAuth,
  MovieController.toggleMovieInsideBookmarks
);
app.delete(
  "/delete-from-bookmarks",
  checkAuth,
  MovieController.deleteFromBookmarks
);
app.post("/add-comment", checkAuth, MovieController.addCommentToMovie);

app.listen(4444, (err) => {
  if (err) return console.log(err);

  console.log("Server OK");
});
