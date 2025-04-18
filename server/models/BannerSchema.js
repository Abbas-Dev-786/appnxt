require("../config/dataBase");
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    pageName: { type: String, default: "" },
    bannerImg: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
  },
  { collection: "Banner" }
);

module.exports = mongoose.model("banner", bannerSchema);
