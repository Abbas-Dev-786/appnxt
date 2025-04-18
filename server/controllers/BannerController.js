const route = require("express").Router();
const bannerModel = require("../models/BannerSchema");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3Client } = require("../utils/aws");
const path = require("path");

// Multer S3 storage configuration
const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME,
  // acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const newFilename = `projects/${uniqueSuffix}${extension}`;
    cb(null, newFilename); // S3 key (path within the bucket)
  },
});

// Multer instance for handling file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Set file size limit to 10 MB
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}).any();

route.get("/:pageName", async (req, res) => {
  try {
    const data = await bannerModel.findOne(
      { pageName: req.params?.pageName || "service" },
      { pageName: 1, bannerImg: 1, _id: 0 }
    );

    if (!data) {
      return res
        .status(404)
        .send({ success: false, message: "No  data found" });
    }

    return res.status(200).send({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

route.get("/:id", async (req, res) => {});

route.post("/", upload, async (req, res) => {
  try {
    const { pageName } = req.body;

    if (!pageName) {
      return res
        .status(400)
        .send({ success: false, message: "Empty Data Not Accepted" });
    }

    const data = {
      pageName,
    };

    if (req.files.find((file) => file.fieldname === "bannerImg")) {
      data.bannerImg = {
        s3Url: req.files.find((file) => file.fieldname === "bannerImg")
          .location, // URL of the uploaded main banner
        s3Key: req.files.find((file) => file.fieldname === "bannerImg").key, // Key of the uploaded main banner
      };
    }

    await bannerModel.updateOne({ pageName }, { $set: data }, { upsert: true });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error updating banner:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {});

route.delete("/:id", async (req, res) => {});

module.exports = route;
