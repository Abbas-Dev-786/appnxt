const route = require('express').Router()
const sliderModel = require('../models/SliderSchema')
require('dotenv').config();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multerS3 = require('multer-s3');
const multer = require('multer');
const fs = require('fs')
const { s3Client, deleteFromS3 } = require('../utils/aws')


// Multer S3 storage configuration
const storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        const newFilename = `slider/${uniqueSuffix}${extension}`;
        cb(null, newFilename); // S3 key (path within the bucket)
    },
});

// Multer instance with limits and file type filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});

// Multer setup for storing images locally with their original extensions


route.get('/', async (req, res) => {
    try {
        const allSlides = await sliderModel.find({});

        if (!allSlides || allSlides.length === 0) {
            return res.status(404).send({ success: false, message: 'No slides found.' });
        }

        res.status(200).send({ success: true, data: allSlides });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Server error' });
    }
});

route.get('/:id', async(req, res) => {

})

route.post(
    "/",
    upload.fields([
        { name: "image1" }, { name: "image2" }, { name: "image3" },
        { name: "image4" }, { name: "image5" }, { name: "image6" }, { name: "image7" },
    ]),
    async (req, res) => {
        try {
            const files = req.files;
            if (!files || Object.keys(files).length === 0) {
                return res.status(400).json({ message: "No images uploaded" });
            }

            const updatedSliderData = [];

            for (let i = 1; i <= 7; i++) {
                const fieldName = `image${i}`;

                if (files[fieldName]) {
                    const file = files[fieldName][0];

                    // Check if an existing image is in the same position
                    const existingImage = await sliderModel.findOne({ position: i });

                    if (existingImage && existingImage.key) {
                        await deleteFromS3(existingImage.key); // Delete old file from S3
                    }

                    const newImage = {
                        position: i,
                        key: file.key, // Store the S3 key
                        url: file.location, // Store the URL from S3
                    };

                    // Upsert (update existing or insert new)
                    await sliderModel.findOneAndUpdate(
                        { position: i },
                        newImage,
                        { upsert: true, new: true }
                    );

                    updatedSliderData.push(newImage);
                } else {
                    // Fetch existing image (if it exists)
                    const existingImage = await sliderModel.findOne({ position: i });
                    if (existingImage) {
                        updatedSliderData.push(existingImage);
                    }
                }
            }

            res.status(200).json({
                message: "Slider updated successfully!",
                success: true,
                data: updatedSliderData.sort((a, b) => a.position - b.position),
            });
        } catch (error) {
            console.error("Error updating slider:", error);
            res.status(500).json({ message: "Failed to update slider", error });
        }
    }
);

route.put('/:id', async(req, res) => {

})

route.delete('/:id', async(req, res) => {

})


module.exports = route;