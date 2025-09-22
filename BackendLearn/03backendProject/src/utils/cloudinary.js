/*
🧳 So, Where Does Cloudinary Store Files?
Cloudinary stores files in cloud storage — this means your files are saved on remote servers owned or managed by cloud providers like:
Amazon Web Services (AWS S3)
Google Cloud Storage
Microsoft Azure, etc.
Cloudinary builds its platform on top of this infrastructure and adds features 
like image/video optimization, transformation, CDN delivery, etc.
🔒 You don’t need to manage the physical servers or storage — Cloudinary does that for you, securely and at scale.
☁️ What Is “The Cloud”?
“The Cloud” refers to a network of remote servers (usually in huge data centers) that store and process data 
over the internet, instead of on your local computer or private server.
# Think of it like:
Instead of saving a file to your laptop’s hard drive, you’re saving it to a 
supercomputer that lives in a Google, Amazon, or Microsoft data center.
You can access it anytime, from anywhere, via the internet.
# Cloudinary pr file upload krne ki 2 approach : 
> Approach 1: The file is streamed directly to Cloudinary via Multer’s Cloudinary storage engine, bypassing local storage. This is 
fast and efficient since the file never touches your server’s disk or memory, but it offers limited control before upload.
> In Approach 2, the uploaded file is temporarily handled by your backend server, either saved on the server’s disk or kept in memory (RAM) 
depending on Multer’s configuration. This means the file passes through your server environment before being uploaded to 
Cloudinary, allowing you to validate or process it first. After uploading, you typically delete the temporary file to free up resources.
iss approach mein ye faida hai ki agar cloudinary pr upload fail hojae then we can retry it . ye ek professional industry approach hai.
*/

import { v2 as cloudinary } from 'cloudinary'; // import krliya 'v2' with name 'cloudinary' (v2 as cloudinary)
import fs from 'fs'; // filesystem module of nodejs
/*
The fs module in Node.js stands for File System. It allows you to interact with the file 
system on your computer — meaning you can read, write, create, delete, and manage files and directories using JavaScript.
fs.unlink() removes the name (link) from the file system.
The actual file data is deleted only when:
All links to it are gone, and
No process is using the file.
Once all processes are done and close the file, then the OS reclaims the space.
*/

// Initializes your app’s connection to Cloudinary.
// Sets authentication credentials.
// Must be called before making upload or management requests.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto' // ye auto detect krlega video hai ya image
        });
        
        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary " , response.url);
        fs.unlinkSync(localFilePath);

        return response;
    
    } catch (error) {
        // Sync means synchronously . bcoz hum nhi chahte ki unlink hue bina hum aage badhe . pehle unlink kro phir hi aage badho .
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed 
        
        return null;
    }
}


export {uploadOnCloudinary};



















