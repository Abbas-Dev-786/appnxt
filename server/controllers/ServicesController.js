const route = require('express').Router()
const serviceModel = require('../models/ServiceSchema')
require('dotenv').config();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs')
const { s3Client, deleteFromS3 } = require('../utils/aws')
const serviceCategoryModel = require('../models/ServiceCategorySchema');

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
        const newFilename = `services/${uniqueSuffix}${extension}`;
        cb(null, newFilename); // S3 key (path within the bucket)
    },
});


// Multer instance for handling file uploads
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}).any(); 

// Category routes (specific)
route.get('/category', async(req, res) => {
    try {
        const categoryDoc = await serviceCategoryModel.findOne();
        if (!categoryDoc) {
            // If no document exists, create one with empty array
            const newCategoryDoc = new serviceCategoryModel({ category: [] });
            await newCategoryDoc.save();
            return res.status(200).send({ success: true, data: [] });
        }
        res.status(200).send({ success: true, data: categoryDoc.category });
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});

route.post('/category', async(req, res) => {
    try {
        const { category } = req.body;
        
        if (!category) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Find or create the category document
        let categoryDoc = await serviceCategoryModel.findOne();
        if (!categoryDoc) {
            categoryDoc = new serviceCategoryModel({ category: [] });
        }

        // Check if category already exists (case insensitive)
        const categoryExists = categoryDoc.category.some(
            cat => cat.toLowerCase() === category.toLowerCase()
        );

        if (categoryExists) {
            return res.status(400).json({ 
                success: false, 
                message: "Category already exists" 
            });
        }

        // Add new category
        categoryDoc.category.push(category);
        await categoryDoc.save();

        res.status(201).send({ 
            success: true, 
            message: "Category added successfully",
            data: categoryDoc.category 
        });
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ message: "Error adding category", error });
    }
});

route.delete('/category/:name', async(req, res) => {
    try {
        const categoryName = req.params.name;
        
        // Find the category document
        const categoryDoc = await serviceCategoryModel.findOne();
        if (!categoryDoc) {
            return res.status(404).json({ message: "No categories found" });
        }

        // Find category index (case insensitive)
        const categoryIndex = categoryDoc.category.findIndex(
            cat => cat.toLowerCase() === categoryName.toLowerCase()
        );

        if (categoryIndex === -1) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Remove category
        categoryDoc.category.splice(categoryIndex, 1);
        await categoryDoc.save();

        res.status(200).send({ 
            success: true, 
            message: "Category deleted successfully",
            data: categoryDoc.category 
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Error deleting category", error });
    }
});

route.get('/', async(req, res) => {
    try {
        const services = await serviceModel.find();
        // console.log(services)
        res.status(200).send({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error });
    }
});

route.get('/:id', async(req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ message: "Error fetching service", error });
    }
});

route.post('/', upload, async(req, res) => {
    try {
        const { 
            status, 
            date,
            link,
            heading,
            description,
            content,
            slider 
        } = req.body;

        // Parse JSON strings if they exist
        const parsedLink = typeof link === 'string' ? JSON.parse(link) : link;
        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
        const parsedSlider = typeof slider === 'string' ? JSON.parse(slider) : slider;

        // Check if a service with the same link already exists
        const existingService = await serviceModel.findOne({ 'link.url': parsedLink.url });
        if (existingService) {
            return res.status(400).json({ 
                success: false, 
                message: "A service with the same link already exists" 
            });
        }

        // Handle banner upload
        const banner = req.files.find(file => file.fieldname === 'banner') ? {
            s3Url: req.files.find(file => file.fieldname === 'banner').location,
            s3Key: req.files.find(file => file.fieldname === 'banner').key
        } : null;

        const newService = new serviceModel({
            status,
            link: parsedLink,
            banner,
            heading,
            description,
            content: parsedContent,
            slider: parsedSlider,
            createdDate: date,
            updatedDate: new Date()
        });

        await newService.save();
        res.status(201).send({ success: true, data: newService });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Error creating service", error });
    }
});

route.put('/:id', upload, async(req, res) => {
    try {
        const { 
            status, 
            link,
            date,
            heading,
            description,
            content,
            slider,
            deleteBanner 
        } = req.body;
        const serviceId = req.params.id;

        // Find existing service
        const existingService = await serviceModel.findById(serviceId);
        if (!existingService) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Handle banner
        let banner = existingService.banner;

        // Delete existing banner if requested
        if (deleteBanner === 'true' && existingService.banner?.s3Key) {
            await deleteFromS3(existingService.banner.s3Key);
            banner = null;
        }

        // Handle new banner upload
        if (req.files && req.files.length > 0) {
            const newBanner = req.files.find(file => file.fieldname === 'banner');
            if (newBanner) {
                // Delete old banner from S3 if exists
                if (existingService.banner?.s3Key) {
                    await deleteFromS3(existingService.banner.s3Key);
                }
                banner = {
                    s3Url: newBanner.location,
                    s3Key: newBanner.key
                };
            }
        }

        // Parse JSON strings if they exist
        const parsedLink = typeof link === 'string' ? JSON.parse(link) : link;
        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
        const parsedSlider = typeof slider === 'string' ? JSON.parse(slider) : slider;

        const updatedService = await serviceModel.findByIdAndUpdate(
            serviceId,
            {
                status,
                link: parsedLink,
                banner,
                heading,
                description,
                content: parsedContent,
                slider: parsedSlider,
                updatedDate: date
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Error updating service", error });
    }
});

route.delete('/:id', async(req, res) => {
    try {
        const service = await serviceModel.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Delete banner from S3 if exists
        if (service.banner?.s3Key) {
            await deleteFromS3(service.banner.s3Key);
        }

        // Delete service from database
        await serviceModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Error deleting service", error });
    }
});


module.exports = route;