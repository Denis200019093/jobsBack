import mongoose from "mongoose";

const CommentScheme = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const MovieScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    originalTitle: {
      type: String,
    },
    slogan: {
      type: String,
    },
    director: {
      type: Array,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    qualities: {
      type: Array,
      required: true,
    },
    ozvy4ka: {
      type: Array,
    },
    poster: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
    premiereDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
    },
    dues: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    genres: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    // poster: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movie", MovieScheme);
