require("../config/dataBase");
const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    banner: { type: String, default: "" },
    bannerImg: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
  },
  { collection: "homeData" }
);

module.exports = mongoose.model("homeData", homeSchema);
