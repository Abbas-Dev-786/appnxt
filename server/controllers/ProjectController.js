const route = require('express').Router()
const projectModel = require('../models/ProjectSchema')
require('dotenv').config();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
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
        const newFilename = `projects/${uniqueSuffix}${extension}`;
        cb(null, newFilename); // S3 key (path within the bucket)
    },
});


// Multer instance for handling file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit to 10 MB
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}).any(); 


route.get('/', async(req, res) => {
    try {
        const projects = await projectModel.find(); // Fetch all projects
        res.status(200).send({success: true, data: projects}); // Send projects to client
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
})

route.get('/:id', async(req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: "Error fetching project", error });
    }
});

route.post('/', upload, async(req, res) => {
    const { name, date, heading, status, content, type } = req.body;

    try {
        // Parse the content if it's a string (e.g., JSON string)
        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

        // Prepare mainBanner and banners from the uploaded files
        const mainBanner = req.files.find(file => file.fieldname === 'mainBanner') ? {
            s3Url: req.files.find(file => file.fieldname === 'mainBanner').location, // URL of the uploaded main banner
            s3Key: req.files.find(file => file.fieldname === 'mainBanner').key // Key of the uploaded main banner
        } : null;

        const banners = req.files.filter(file => file.fieldname === 'banners').map(banner => ({
            s3Url: banner.location, // URL of the uploaded banner
            s3Key: banner.key // Key of the uploaded banner
        }));


        const newProject = new projectModel({
            name,
            type,
            heading, // Assuming 'type' corresponds to 'heading'
            mainBanner,
            content: parsedContent.map(item => ({
                head: item.head,
                body: item.body
            })),
            banners,
            createdDate: date, // Use the provided date
            updatedDate: new Date(),
            status
        });

        await newProject.save(); // Save the new project
        res.status(201).send({success: true, data: newProject}); // Respond with the created project
    } catch (error) {
        console.error("Error creating project:", error); // Log the error for debugging
        res.status(500).json({ message: "Error creating project", error });
    }
})

route.put('/:id', upload, async(req, res) => {
    try {
        const { name, date, heading, status, content, type, deleteBanners } = req.body;
        const projectId = req.params.id;

        // Find existing project
        const existingProject = await projectModel.findById(projectId);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Handle file uploads if any
        let mainBanner = existingProject.mainBanner;
        let banners = [...(existingProject.banners || [])]; // Create a copy of existing banners

        // Parse deleteBanners if it's a string
        const parsedDeleteBanners = typeof deleteBanners === 'string' 
            ? JSON.parse(deleteBanners) 
            : deleteBanners;

        if (parsedDeleteBanners && Array.isArray(parsedDeleteBanners) && parsedDeleteBanners.length > 0) {

            // Delete specified banners from S3
            for (const s3Key of parsedDeleteBanners) {
                try {
                    await deleteFromS3(s3Key);
                } catch (deleteError) {
                    console.error('Error deleting banner from S3:', s3Key, deleteError);
                }
            }

            // Remove deleted banners from the banners array
            banners = banners.filter(banner => !parsedDeleteBanners.includes(banner.s3Key));
        }

        if (req.files && req.files.length > 0) {
            // Handle main banner update
            const newMainBanner = req.files.find(file => file.fieldname === 'mainBanner');
            if (newMainBanner) {
                // Delete old main banner from S3
                if (existingProject.mainBanner?.s3Key) {
                    await deleteFromS3(existingProject.mainBanner.s3Key);
                }
                mainBanner = {
                    s3Url: newMainBanner.location,
                    s3Key: newMainBanner.key
                };
            }

            // Handle other banners update - Append new banners to existing ones
            const newBanners = req.files.filter(file => file.fieldname === 'banners');
            if (newBanners.length > 0) {
                const newBannerObjects = newBanners.map(banner => ({
                    s3Url: banner.location,
                    s3Key: banner.key
                }));
                banners = [...banners, ...newBannerObjects]; // Combine existing and new banners
            }
        }

        // Parse content if it's a string
        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

        const updatedProject = await projectModel.findByIdAndUpdate(
            projectId,
            {
                name,
                type,
                heading,
                mainBanner,
                content: parsedContent?.map(item => ({
                    head: item.head,
                    body: item.body
                })) || existingProject.content,
                banners,
                createdDate: existingProject.createdDate,
                updatedDate: date,
                status
            },
            { new: true }
        );

        res.status(200).json({ 
            success: true, 
            data: updatedProject,
            deletedBanners: deleteBanners || [] 
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project", error });
    }
});

route.delete('/:id', async(req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Delete files from S3
        if (project.mainBanner?.s3Key) {
            await deleteFromS3(project.mainBanner.s3Key);
        }
        console.log(project)


        for (const banner of project.banners) {
            if (banner.s3Key) {
                await deleteFromS3(banner.s3Key);
            }
        }

        // Delete project from database
        await projectModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).send({ message: "Error deleting project", error });
    }
});

module.exports = route;