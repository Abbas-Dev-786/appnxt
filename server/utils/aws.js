const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const deleteFromS3 = async (imageKey) => {
    try {
        if (!imageKey) {
            console.error("Image key is missing");
            return;
        }

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey,
        };

        // console.log(`Attempting to delete image: ${imageKey}`);
        const command = new DeleteObjectCommand(deleteParams);
        const result = await s3Client.send(command);

        console.log(`Image ${imageKey} successfully deleted from S3`, result);
    } catch (error) {
        console.error(`Error deleting image ${imageKey} from S3:`, error);
        throw new Error(`Failed to delete image ${imageKey} from S3`);
    }
};

module.exports = { deleteFromS3, s3Client }