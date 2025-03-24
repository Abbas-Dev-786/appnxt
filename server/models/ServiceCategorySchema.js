require('../config/dataBase')
const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema(
    {
        category: { type: Array, default: [] }
    },
    { collection: "serviceCategory" }
);

module.exports = mongoose.model("serviceCategory", serviceCategorySchema);
