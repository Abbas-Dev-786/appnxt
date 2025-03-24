require('../config/dataBase')
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        createdDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: Date.now },
        status: { type: String, default: "" },
        link: {
            category: { type: String, default: "" },
            name: { type: String, default: "" },
            url: { type: String, default: "" }
        }, 
        banner: {
            s3Url: { type: String, default: "" },
            s3Key: { type: String, default: "" }
        },
        heading: { type: String, default: "" },
        description: { type: String, default: "" },
        content: {
            heading: { type: String, default: "" },
            description: { type: String, default: "" }
        },
        slider: {
            heading: { type: String, default: "" },
            description: { type: String, default: "" },
            slides: [
                {
                    heading: { type: String, default: "" },
                    description: { type: String, default: "" }
                }
            ]
        }
    },
    { collection: "services" }
);

module.exports = mongoose.model("services", serviceSchema);
