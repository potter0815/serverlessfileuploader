const AWS = require('aws-sdk');
const s3 = new AWS.S3();
let mime = require('mime-types')

exports.handler = async (event) => {
    debugger;

    console.log("Request received");

    // Extract file content
    let fileContent = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;

    // Generate file name from current timestamp
    let fileName = `${Date.now()}`;

    // Determine file extension
    let contentType = event.headers['content-type'] || event.headers['Content-Type'];
    let extension = contentType ? mime.extension(contentType) : '';

    let fullFileName = extension ? `${fileName}.${extension}` : fileName;

    // Upload the file to S3
    try {
        let data = await s3.putObject({
            Bucket: "fluffyproject",
            Key: fullFileName,
            Body: fileContent,
            Metadata: {}
        }).promise();

        let sigened_url = "here comes the signed url: ...";

        console.log("Successfully uploaded file", fullFileName);
        return "Successfully uploaded...." + sigened_url;

    } catch (err) {
        console.log("Failed to upload file", fullFileName, err);
        throw err;
    };
};