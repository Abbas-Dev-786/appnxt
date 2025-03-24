require('../config/dataBase')
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: "" },
        type: { type: String, required: true, default: "" },
        heading: { type: String, required: true, default: "" },
        mainBanner: { 
            s3Url: { type: String, default: "" },
            s3Key: { type: String, default: "" }
        },
        content: [
            {
                head: { type: String, default: "" },
                body: { type: String, default: "" }
            }
        ],
        banners: [
            {
                s3Url: { type: String, default: "" },
                s3Key: { type: String, default: "" }
            }
        ],
        createdDate: { type: Date, default: Date.now() },
        updatedDate: { type: Date, default: Date.now() },
        status: { type: String, default: "" }
    },
    { collection: "projects" }
);

module.exports = mongoose.model("projects", projectSchema);
