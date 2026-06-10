import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },

    upvotes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);